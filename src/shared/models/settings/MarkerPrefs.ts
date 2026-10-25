import { IMarkerGroupSettings } from "../../interfaces/settings/IMarkerGroupSettings";
import { IMarkerSettings } from "../../interfaces/settings/IMarkerSettings";

// Personal marker preferences, kept apart from marker pack data so they survive pack updates
// (an update replaces the whole pack). Keyed by pack id and marker id. Anything not set here
// falls back to the pack's own value, so packs can ship defaults (e.g. a marker hidden by default).
// See docs/ARCHITECTURE.md (marker packs).

export interface IMarkerPrefs {
  // Shown or hidden by the player; overrides the marker's own `active`.
  active?: boolean;
}

export interface IPackPrefs {
  // Shown or hidden by the player; overrides the pack's own `active`.
  active?: boolean;
  markers?: { [markerId: string]: IMarkerPrefs };
}

export interface IMarkerPrefsMap {
  [packId: string]: IPackPrefs;
}

// Settings paths as arrays, so ids are never split on "." by object-path.
export function PackActivePath(pack: IMarkerGroupSettings): string[] {
  return ["markerPrefs", pack.id, "active"];
}

export function MarkerActivePath(pack: IMarkerGroupSettings, marker: IMarkerSettings): string[] {
  return ["markerPrefs", pack.id, "markers", marker.id, "active"];
}

export function IsPackActive(prefs: IMarkerPrefsMap | undefined, pack: IMarkerGroupSettings): boolean {
  return prefs?.[pack.id]?.active ?? pack.active;
}

export function IsMarkerActive(prefs: IMarkerPrefsMap | undefined, pack: IMarkerGroupSettings, marker: IMarkerSettings): boolean {
  return prefs?.[pack.id]?.markers?.[marker.id]?.active ?? marker.active;
}

// Hidden packs and markers were stored on the pack data itself before preferences existed;
// carry them over so nothing reappears. Shown ones stay with the pack default.
export function MigrateMarkerPrefs(packs: IMarkerGroupSettings[]): IMarkerPrefsMap {
  const prefs: IMarkerPrefsMap = {};
  for (const pack of packs) {
    const packPrefs: IPackPrefs = {};
    if (pack.active === false) {
      packPrefs.active = false;
    }
    for (const markers of Object.values(pack.markers ?? {})) {
      for (const marker of markers) {
        if (marker.active === false) {
          packPrefs.markers = packPrefs.markers ?? {};
          packPrefs.markers[marker.id] = { active: false };
        }
      }
    }
    if (packPrefs.active !== undefined || packPrefs.markers) {
      prefs[pack.id] = packPrefs;
    }
  }
  return prefs;
}
