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

// Don't check more often than this, even across restarts.
const CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000;
// How many times to retry a build mismatch before backing off (guards against a build id
// that changes without the map table actually updating).
const MAX_REFRESHES = 2;
// After giving up, wait this long before trying again.
const RETRY_BACKOFF_MS = 24 * 60 * 60 * 1000;

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

    private async RefreshIfStale() {
        if (!this.IsDue()) {
            log('Maps', 'Map table checked recently; skipping API check');
            return;
        }

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
