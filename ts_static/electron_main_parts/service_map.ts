// Keeps the GW2 map table up to date without hammering the API.
//
// Strategy:
//   - The bundled table (src/components/helpers/constants.ts) is always the floor. If the
//     network is down, the cache is corrupt, or anything else goes wrong, the app keeps
//     working exactly as it did before this service existed.
//   - A cached copy plus a metadata file (build id + last-checked time) live in userData.
//   - On startup, only if the metadata is older than CHECK_INTERVAL, fetch the tiny
//     /v2/build endpoint (18 bytes). The 582 KB map table is downloaded only when that
//     build id differs from the one we cached.
//   - If the build id still differs after MAX_REFRESHES we stop re-fetching for a while,
//     so a persistent mismatch cannot turn into a request on every launch.
//
// The GW2 API sends `Cache-Control: public, max-age=3600` and no ETag, so there is nothing
// to make conditional requests against; /v2/build is the cheap change-detection key.
import { GetStoragePathFor } from './settings';
import { log } from './logging';
import { IMaps, SetActiveMaps } from '../../src/components/helpers/constants';
// Same HTTP client the settings/marker-update code already uses in the main process.
import fetch from 'cross-fetch';

const fs = require('fs');

const BUILD_URL = 'https://api.guildwars2.com/v2/build';
const MAPS_URL = 'https://api.guildwars2.com/v2/maps?ids=all';

// Routine check cadence. Cheap: this is the 18-byte /v2/build endpoint, and the map table is
// only re-downloaded when the build id actually changed.
const CHECK_INTERVAL_MS = 60 * 60 * 1000;
// How many times to retry a build mismatch before backing off (guards against a build id
// that changes without the map table actually updating).
const MAX_REFRESHES = 2;
// After giving up, wait this long before trying again.
const RETRY_BACKOFF_MS = 60 * 60 * 1000;
// Floor between two API checks, whatever triggered them. An unknown map is strong evidence
// the table is stale, but a map that ArenaNet has genuinely removed from the API would
// otherwise ask forever, so never check more often than this.
const MIN_CHECK_GAP_MS = 5 * 60 * 1000;
// Collapse a burst of unknown-map reports (the position stream runs at ~2/s) into one check.
const UNKNOWN_MAP_DEBOUNCE_MS = 3 * 1000;

const MAPS_FILE = 'gw2_maps.json';
const META_FILE = 'gw2_maps.meta.json';

interface IMapsMeta {
    build: number | null;
    lastChecked: number;
    refreshes: number;
    source: 'api' | 'cache' | 'bundled';
}

// Invoked after the table changes. Set by the caller (electron_main.ts) so this module does
// not have to import settings.ts/windows.ts and create an import cycle.
let onMapsUpdated: (() => void) | null = null;

export function SetMapsUpdatedCallback(cb: () => void) {
    onMapsUpdated = cb;
}

export class MapService {
    private maps: IMaps | null = null;
    private meta: IMapsMeta = { build: null, lastChecked: 0, refreshes: 0, source: 'bundled' };
    // Unknown-map handling: one request per distinct id, one in-flight check at a time.
    private unknownSeen: { [id: string]: boolean } = {};
    private debounceTimer: ReturnType<typeof setTimeout> | null = null;
    private refreshing = false;
    // When this process last hit the API at all (session-scoped, not persisted), used to
    // rate limit unknown-map driven checks.
    private lastCheckAt = 0;

    get mapsPath() { return GetStoragePathFor(MAPS_FILE); }
    get metaPath() { return GetStoragePathFor(META_FILE); }

    /** Current table: cached copy if loaded/valid, otherwise whatever was passed in. */
    GetMaps(fallback: IMaps): IMaps {
        return this.maps ?? fallback;
    }

    /**
     * Load the cache synchronously so the very first position lookup already sees it,
     * then (re)validate against the API in the background.
     */
    Initialize(bundled: IMaps) {
        this.LoadCache();
        if (!this.maps) {
            this.maps = bundled;
        }
        // Publish immediately: TranslateMapId() reads from the shared table.
        SetActiveMaps(this.maps);
        // Deliberately not awaited: startup must not wait on the network.
        this.RefreshIfStale()
            .then(() => {
                // A refresh may have swapped the table; re-publish so map lookups (and the
                // marker sets keyed on them) use it, then let the windows redraw.
                if (this.maps) {
                    SetActiveMaps(this.maps);
                    onMapsUpdated?.();
                }
            })
            .catch((e) => log('Maps', 'Background refresh failed: ' + e));
    }

    /**
     * Called when the game reports a map id the table does not know. That is proof the table
     * is stale (new expansion/map), so check the API now instead of waiting for the routine
     * interval. Debounced, deduplicated per id, and rate limited so a map that genuinely is
     * not in the API cannot turn into a request loop.
     */
    OnUnknownMap(mapId: string) {
        if (mapId in this.unknownSeen) { return; }   // already asked once for this id
        this.unknownSeen[mapId] = true;
        log('Maps', `Unknown map id ${mapId}; checking for an updated map table`);

        if (this.debounceTimer !== null) { return; } // a check is already queued
        this.debounceTimer = setTimeout(() => {
            this.debounceTimer = null;
            // Respect the minimum gap even for unknown maps.
            const sinceLast = Date.now() - this.lastCheckAt;
            if (sinceLast < MIN_CHECK_GAP_MS) {
                log('Maps', `Unknown map seen, but last check was ${Math.round(sinceLast / 1000)}s ago; waiting`);
                return;
            }
            this.RefreshNow('unknown map').catch((e) => log('Maps', 'Unknown-map refresh failed: ' + e));
        }, UNKNOWN_MAP_DEBOUNCE_MS);
    }

    /** Force a check now (bypassing the interval), sharing the unknown-map rate limit. */
    async RefreshNow(reason: string): Promise<void> {
        if (this.refreshing) { return; }
        this.lastCheckAt = Date.now();
        await this.RefreshIfStale(true);
        log('Maps', `Refresh finished (${reason})`);
    }

    private LoadCache() {
        try {
            if (!fs.existsSync(this.metaPath) || !fs.existsSync(this.mapsPath)) { return; }
            this.meta = JSON.parse(fs.readFileSync(this.metaPath, 'utf-8'));
            const data = MapService.ToMapTable(JSON.parse(fs.readFileSync(this.mapsPath, 'utf-8')));
            // Reject a table whose entries have no names: an older bug cached the raw API
            // array, and such a cache must not be trusted (nor kept as "current").
            if (data === null || !MapService.LooksValid(data)) {
                log('Maps', 'Cached map table is unusable; ignoring it');
                this.maps = null;
                this.meta.build = null;
                return;
            }
            this.maps = data;
            this.meta.source = 'cache';
            log('Maps', `Loaded ${Object.keys(data).length} maps from cache (build ${this.meta.build})`);
        } catch (e) {
            log('Maps', 'Could not read map cache, using bundled table: ' + e);
            this.maps = null;
        }
    }

    /** A usable table: keyed by id, and a decent fraction of entries actually name a map. */
    static LooksValid(table: IMaps): boolean {
        const ids = Object.keys(table);
        if (ids.length === 0) { return false; }
        let named = 0;
        for (const id of ids) {
            if (table[id] && typeof table[id].map_name === 'string' && table[id].map_name) {
                named++;
            }
        }
        return named >= ids.length * 0.9;
    }

    private IsDue(): boolean {
        if (!this.maps || this.meta.build === null) { return true; }          // never fetched
        if (Date.now() - this.meta.lastChecked >= CHECK_INTERVAL_MS) { return true; }
        if (this.meta.refreshes >= MAX_REFRESHES) {
            // Gave up repeatedly; only try again after the backoff window.
            return Date.now() - this.meta.lastChecked >= RETRY_BACKOFF_MS;
        }
        return false;
    }

    private async RefreshIfStale(force: boolean = false) {
        if (!force && !this.IsDue()) {
            log('Maps', 'Map table checked recently; skipping API check');
            return;
        }
        if (this.refreshing) { return; }

        this.refreshing = true;
        try {
            await this.RefreshUnsafe();
        } finally {
            this.refreshing = false;
        }
    }

    private async RefreshUnsafe() {
        this.lastCheckAt = Date.now();

        const build = await this.FetchBuildId();
        if (build === null) { return; }                     // offline; keep what we have

        if (build === this.meta.build) {
            // Same build: the table we have is current. Just move the clock.
            this.meta.lastChecked = Date.now();
            this.meta.refreshes = 0;
            this.SaveMeta();
            log('Maps', `Map table is current (build ${build})`);
            return;
        }

        log('Maps', `Build changed (${this.meta.build} -> ${build}); downloading map table`);
        const fresh = await this.FetchMaps();
        if (fresh === null) { return; }

        this.maps = fresh;
        this.meta = {
            build,
            lastChecked: Date.now(),
            refreshes: this.meta.refreshes + 1,
            source: 'api',
        };
        this.SaveMeta();
        this.SaveMaps(fresh);
        log('Maps', `Map table updated to build ${build} (${Object.keys(fresh).length} maps)`);
    }

    private async FetchBuildId(): Promise<number | null> {
        try {
            const res = await fetch(BUILD_URL);
            if (!res.ok) {
                log('Maps', `Build check failed: HTTP ${res.status}`);
                return null;
            }
            const json = await res.json() as { id?: number };
            return typeof json?.id === 'number' ? json.id : null;
        } catch (e) {
            log('Maps', 'Build check failed (offline?): ' + e);
            return null;
        }
    }

    /**
     * /v2/maps?ids=all returns an ARRAY of maps with `id` and `name`. The bundled table (and
     * everything downstream) uses an object keyed by id with `map_name`, so convert here:
     * caching the raw array would silently produce an unusable table.
     */
    private async FetchMaps(): Promise<IMaps | null> {
        try {
            const res = await fetch(MAPS_URL);
            if (!res.ok) {
                log('Maps', `Map download failed: HTTP ${res.status}`);
                return null;
            }
            const json = await res.json() as unknown;
            const table = MapService.ToMapTable(json);
            if (table === null) {
                log('Maps', 'Map download had an unexpected shape; keeping the existing table');
                return null;
            }
            return table;
        } catch (e) {
            log('Maps', 'Map download failed: ' + e);
            return null;
        }
    }

    /** Normalise either API (array) or bundled/cached (object) shape into the bundled shape. */
    static ToMapTable(json: unknown): IMaps | null {
        if (!json) { return null; }

        if (Array.isArray(json)) {
            const table: IMaps = {};
            for (const entry of json as any[]) {
                const id = entry?.id;
                if (id === undefined || id === null) { continue; }
                const { id: _ignoredId, name, ...rest } = entry;
                table[String(id)] = { ...rest, map_name: name };
            }
            return Object.keys(table).length > 0 ? table : null;
        }

        if (typeof json === 'object') {
            // Already keyed by id; make sure map_name survived (cached copies do).
            const table = json as IMaps;
            return Object.keys(table).length > 0 ? table : null;
        }

        return null;
    }

    private SaveMaps(data: IMaps) {
        try {
            const tmp = this.mapsPath + '.tmp';
            fs.writeFileSync(tmp, JSON.stringify(data));
            fs.renameSync(tmp, this.mapsPath);
        } catch (e) {
            log('Maps', 'Could not write map cache: ' + e);
        }
    }

    private SaveMeta() {
        try {
            const tmp = this.metaPath + '.tmp';
            fs.writeFileSync(tmp, JSON.stringify(this.meta));
            fs.renameSync(tmp, this.metaPath);
        } catch (e) {
            log('Maps', 'Could not write map metadata: ' + e);
        }
    }
}

export const mapService = new MapService();
