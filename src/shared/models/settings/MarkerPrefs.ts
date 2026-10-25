import { IMarkerGroupSettings } from "../../interfaces/settings/IMarkerGroupSettings";
import { IMarkerSettings } from "../../interfaces/settings/IMarkerSettings";
import { MarkerType } from "../../interfaces/render/marker";

// Personal marker preferences, kept apart from marker pack data so they survive pack updates
// (an update replaces the whole pack). Keyed by pack id and marker id. Anything not set here
// falls back to the pack's own value, so packs can ship defaults (e.g. a marker hidden by default).
// See docs/ARCHITECTURE.md (marker packs).

export interface IMarkerPrefs {
  // Shown or hidden by the player; overrides the marker's own `active`.
  active?: boolean;
  // When auto-hide marked the marker done (ms since epoch). It stays hidden until the pack's
  // reappear rule says otherwise; null/absent means not done.
  doneAt?: number | null;
  // Video markers: this player's own volume (0..1, absent means full) and mute. The distance
  // fade is applied on top.
  volume?: number;
  muted?: boolean;
}

// Only the ids matter for the paths below (the overlay's action bar has no full pack or marker).
type PackRef = Pick<IMarkerGroupSettings, "id">;
type MarkerRef = Pick<IMarkerSettings, "id">;

// Auto-hide (a pack option): a marker the player stays near for a while is marked done and hidden
// until it reappears: never by itself (manual), after a custom time, or at GW2's daily or weekly
// reset. Checked in the main process (marker_progress.ts).
export type ReappearMode = "manual" | "after" | "daily" | "weekly";

export interface IAutoHideOptions {
  enabled: boolean;
  // Within this many metres of the marker...
  distance: number;
  // ...for this many seconds.
  seconds: number;
  reappear: ReappearMode;
  // For reappear "after".
  afterMinutes: number;
}

export const DEFAULT_AUTO_HIDE: IAutoHideOptions = {
  enabled: false,
  distance: 5,
  seconds: 2,
  reappear: "daily",
  afterMinutes: 60,
};

export function AutoHideOptions(pack: IMarkerGroupSettings): IAutoHideOptions {
  return { ...DEFAULT_AUTO_HIDE, ...(pack.autoHide ?? {}) };
}

const DAY_MS = 24 * 60 * 60 * 1000;

// GW2 resets: daily at 00:00 UTC, weekly on Monday at 07:30 UTC.
export function NextDailyReset(after: number): number {
  return Math.floor(after / DAY_MS) * DAY_MS + DAY_MS;
}

export function NextWeeklyReset(after: number): number {
  const d = new Date(after);
  const todayAt0730 = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 7, 30);
  const daysToMonday = (1 - d.getUTCDay() + 7) % 7;
  let next = todayAt0730 + daysToMonday * DAY_MS;
  if (next <= after) next += 7 * DAY_MS;
  return next;
}

// When a marker done at `doneAt` shows again (Infinity: only when the player shows it).
export function ReappearsAt(options: IAutoHideOptions, doneAt: number): number {
  switch (options.reappear) {
    case "after": return doneAt + Math.max(0, options.afterMinutes) * 60 * 1000;
    case "daily": return NextDailyReset(doneAt);
    case "weekly": return NextWeeklyReset(doneAt);
    default: return Infinity;
  }
}

export function MarkerDoneAtPath(pack: PackRef, marker: MarkerRef): string[] {
  return ["markerPrefs", pack.id, "markers", marker.id, "doneAt"];
}

// Auto-hide only applies to position markers, in packs that have it switched on.
export function UsesAutoHide(pack: IMarkerGroupSettings, marker: IMarkerSettings): boolean {
  return !!pack.autoHide?.enabled && (marker.type ?? MarkerType.PositionMarker) === MarkerType.PositionMarker;
}

// The reappear time if the marker is currently hidden as done, else null.
export function DoneUntil(prefs: IMarkerPrefsMap | undefined, pack: IMarkerGroupSettings, marker: IMarkerSettings, now: number): number | null {
  if (!UsesAutoHide(pack, marker)) return null;
  const doneAt = prefs?.[pack.id]?.markers?.[marker.id]?.doneAt;
  if (!doneAt) return null;
  const until = ReappearsAt(AutoHideOptions(pack), doneAt);
  return now < until ? until : null;
}

// Whether a marker is drawn now: shown by the player (or pack default) and not hidden as done.
export function IsMarkerShownNow(prefs: IMarkerPrefsMap | undefined, pack: IMarkerGroupSettings, marker: IMarkerSettings, now: number): boolean {
  return IsMarkerActive(prefs, pack, marker) && DoneUntil(prefs, pack, marker, now) === null;
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
export function PackActivePath(pack: PackRef): string[] {
  return ["markerPrefs", pack.id, "active"];
}

export function MarkerActivePath(pack: PackRef, marker: MarkerRef): string[] {
  return ["markerPrefs", pack.id, "markers", marker.id, "active"];
}

export function MarkerVolumePath(pack: PackRef, marker: MarkerRef): string[] {
  return ["markerPrefs", pack.id, "markers", marker.id, "volume"];
}

export function MarkerMutedPath(pack: PackRef, marker: MarkerRef): string[] {
  return ["markerPrefs", pack.id, "markers", marker.id, "muted"];
}

// The playback volume setting of a marker, 0..1.
export function MarkerVolume(prefs: IMarkerPrefsMap | undefined, pack: PackRef, marker: MarkerRef): number {
  const v = prefs?.[pack.id]?.markers?.[marker.id]?.volume;
  return typeof v === "number" && isFinite(v) ? Math.min(1, Math.max(0, v)) : 1;
}

export function IsMarkerMuted(prefs: IMarkerPrefsMap | undefined, pack: PackRef, marker: MarkerRef): boolean {
  return !!prefs?.[pack.id]?.markers?.[marker.id]?.muted;
}

export function IsPackActive(prefs: IMarkerPrefsMap | undefined, pack: IMarkerGroupSettings): boolean {
  return prefs?.[pack.id]?.active ?? pack.active;
}

export function IsMarkerActive(prefs: IMarkerPrefsMap | undefined, pack: IMarkerGroupSettings, marker: IMarkerSettings): boolean {
  return prefs?.[pack.id]?.markers?.[marker.id]?.active ?? marker.active;
}

// The markers of a pack drawn on a map now, in pack order. The one place deciding this, used by
// the render data, the main-process progress checks, the arrow and the settings UI. A sequential
// pack draws only the first marker (in pack order) that is neither hidden nor done, so hiding it
// (by hand or by auto-hide) reveals the next.
export function VisibleMarkers(prefs: IMarkerPrefsMap | undefined, pack: IMarkerGroupSettings, mapId: string, now: number): IMarkerSettings[] {
  if (!IsPackActive(prefs, pack)) return [];
  const shown = (pack.markers[mapId] ?? []).filter((marker) => IsMarkerShownNow(prefs, pack, marker, now));
  return pack.sequential ? shown.slice(0, 1) : shown;
}

// Starting a sequential pack over: forget which of its markers were hidden or done.
export function PackMarkerPrefsPath(pack: IMarkerGroupSettings): string[] {
  return ["markerPrefs", pack.id, "markers"];
}

export function VisibleMarkerIds(prefs: IMarkerPrefsMap | undefined, pack: IMarkerGroupSettings, mapId: string, now: number): string[] {
  return VisibleMarkers(prefs, pack, mapId, now).map((marker) => marker.id);
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
