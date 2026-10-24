// Mount menu geometry and the placement message, shared by the main process
// (ts_static/electron_main_parts/windows.ts) and the renderer (components/mounts). Keeping
// them in one place is what stops the two sides drifting apart.

/** Diameter of the hub and of each mount button. */
export const MOUNT_HUB_SIZE = 68;

/** Normal distance from the hub's centre to each mount button's centre. */
export const MOUNT_ICON_RADIUS = 150;

/** Minimum distance between neighbouring button centres: a button plus a small gap. */
export const MOUNT_BUTTON_SPACING = MOUNT_HUB_SIZE + 6;

/** How far a button reaches past its centre: half a button scaled up on hover (1.12) + ~18px glow. */
export const MOUNT_ICON_EXTENT = Math.ceil(MOUNT_HUB_SIZE / 2 * 1.12) + 18;

/**
 * The fan, and so the window, is sized for this many buttons: every built-in mount. With more
 * (custom mounts) the radius stops growing and buttons on half / quarter arcs may overlap.
 */
export const MOUNT_FAN_SIZED_FOR = 9;

/** Drag grip and close button diameter. */
export const MOUNT_GRIP_SIZE = 28;

/** Gap between the hub's edge and the grip / close button. */
export const MOUNT_GRIP_GAP = 2;

// Radius at which `count` buttons spread evenly over `sweep` degrees are MOUNT_BUTTON_SPACING
// apart, but never less than the normal radius. A full circle divides by `count`, a partial arc
// by `count - 1` (its first and last button sit on the arc's ends).
function spacedRadius(count: number, sweep: number): number {
    if (count < 2) { return MOUNT_ICON_RADIUS; }
    const divisions = sweep >= 360 ? count : count - 1;
    const step = (sweep * Math.PI) / 180 / divisions;
    return Math.max(MOUNT_ICON_RADIUS, MOUNT_BUTTON_SPACING / (2 * Math.sin(step / 2)));
}

/**
 * Fan radius for `count` buttons on a `sweep`-degree arc (360, 180 or 90). Partial arcs grow
 * so the buttons do not overlap: with 9 mounts about 150 / 190 / 377.
 */
export function mountFanRadius(count: number, sweep: number): number {
    return Math.min(spacedRadius(count, sweep), spacedRadius(MOUNT_FAN_SIZED_FOR, sweep));
}

/** How far a fan of `count` buttons on a `sweep`-degree arc reaches from the hub's centre. */
export function mountFanReach(count: number, sweep: number): number {
    return mountFanRadius(count, sweep) + MOUNT_ICON_EXTENT;
}

/**
 * The mount window is this size, square, always. The worst case is a corner: the hub can be
 * up to a half arc's reach from the edges (any closer and the half arc would not fit, see
 * availableArc in radialLayout.ts), and the quarter arc then reaches its own distance inwards.
 */
export const MOUNT_WINDOW_SIZE = Math.ceil(
    (mountFanReach(MOUNT_FAN_SIZED_FOR, 180) + mountFanReach(MOUNT_FAN_SIZED_FOR, 90)) / 10
) * 10;

/** Distance from the hub's centre to the grip's / close button's centre, along a diagonal. */
export const MOUNT_SATELLITE_OFFSET = (MOUNT_HUB_SIZE / 2 + MOUNT_GRIP_GAP + MOUNT_GRIP_SIZE / 2) * Math.SQRT1_2;

/**
 * How close the hub's centre may get to a display edge. Far enough that the grip and close
 * button on its diagonals stay on screen, and that the end buttons of a half / quarter arc,
 * which sit level with the hub, keep their hover glow on screen.
 */
export const MOUNT_EDGE_INSET = Math.ceil(Math.max(MOUNT_SATELLITE_OFFSET + MOUNT_GRIP_SIZE / 2, MOUNT_ICON_EXTENT));

/** Main -> mount window: where the hub is, sent on request and whenever main moves the window. */
export interface IMountPlacement {
    /** Hub centre relative to its display's top-left corner (not absolute screen space). */
    hub: { x: number; y: number };
    /** Size of the display the hub is on. Full bounds: GW2 runs fullscreen over the taskbar. */
    display: { width: number; height: number };
    /** Where to draw the hub in the window: the centre, except near a display edge. */
    hubInWindow: { x: number; y: number };
}
