import { IPC } from "../../src/shared/ipc";
import { Position } from "../../src/shared/models/Position";
import { AutoHideOptions, IsMarkerShownNow, IsPackActive, MarkerDoneAtPath, UsesAutoHide, VisibleMarkerIds } from "../../src/shared/models/settings/MarkerPrefs";
import { log } from "./logging";
import { getLastPosition, getMapId } from "./position_data";
import { configUpdated, GetSettings } from "./settings";
const { ipcMain } = require('electron');
var objectPath = require("object-path");

// Auto-hide progress: a marker in an auto-hide pack that the player stays near for the pack's
// time is marked done (markerPrefs ... doneAt) and drops out of the render data until it
// reappears. Also notices reappear times passing, so markers come back without a settings change.
// Runs against the last relayed position, which stays valid while the player stands still.

const TICK_MS = 500;

// When the player came within range of each marker ("packId|markerId" -> ms).
const nearSince = new Map<string, number>();
let loadingScreen = false;
let lastVisible = "";

// The overlay relays the position service's loading screen events: during one the last position
// is stale (still at the old spot), so nothing may count as standing near a marker.
ipcMain.on(IPC.LoadingScreen, (event, loading: boolean) => {
    loadingScreen = !!loading;
    if (loadingScreen) nearSince.clear();
});

function tick() {
    const settings = GetSettings();
    if (!settings) return;
    const now = Date.now();
    const lastpos = getLastPosition();
    const mapId = getMapId(lastpos);
    if (!lastpos || !mapId) return;

    let changed = false;
    if (!loadingScreen) {
        const player = Position.FromGw2Position(lastpos.coordinates.playerPosition);
        const seen = new Set<string>();
        for (const pack of settings.marks) {
            if (!pack.autoHide?.enabled || !IsPackActive(settings.markerPrefs, pack)) continue;
            const options = AutoHideOptions(pack);
            for (const marker of pack.markers[mapId] ?? []) {
                if (!UsesAutoHide(pack, marker) || !IsMarkerShownNow(settings.markerPrefs, pack, marker, now)) continue;
                const p = marker.position;
                const distance = Math.hypot(p.X - player.X, p.Y - player.Y, p.Z - player.Z);
                if (distance > options.distance) continue;
                const key = pack.id + "|" + marker.id;
                seen.add(key);
                const since = nearSince.get(key) ?? now;
                nearSince.set(key, since);
                if (now - since >= options.seconds * 1000) {
                    objectPath.set(settings, MarkerDoneAtPath(pack, marker), now);
                    nearSince.delete(key);
                    log("Markers", `Auto-hid "${marker.name}" (${pack.name})`);
                    changed = true;
                }
            }
        }
        for (const key of Array.from(nearSince.keys())) {
            if (!seen.has(key)) nearSince.delete(key);
        }
    }

    // Reappear times passing (or anything else changing what is drawn on this map).
    const visible = mapId + ":" + settings.marks.map((pack) => VisibleMarkerIds(settings.markerPrefs, pack, mapId, now).join(",")).join(";");
    if (visible !== lastVisible) {
        if (lastVisible) changed = true;
        lastVisible = visible;
    }

    if (changed) {
        configUpdated();
    }
}

export function InitMarkerProgress() {
    setInterval(tick, TICK_MS);
}
