// Geometry for the mount radial menu.
//
// The menu fans items out from a hub. Which directions are available depends on where the
// hub sits relative to the screen: a window near the left edge should fan only to the
// right, one in a corner should use a quarter, and so on. Kept separate from the component
// so the arithmetic can be reasoned about (and tested) on its own.

import { mountFanRadius, mountFanReach } from '../../shared/mounts';

export interface IPoint {
    x: number;
    y: number;
}

export interface IArc {
    /** Centre of the arc, in degrees clockwise from 12 o'clock. */
    centerAngle: number;
    /** Total sweep in degrees: 360, 180 or 90. */
    sweep: number;
}

// Angles clockwise from 12 o'clock: right = 90, bottom = 180, left = 270.
const FULL: IArc = { centerAngle: 0, sweep: 360 };

/**
 * Decide which arc a fan of `count` buttons uses, given the hub's position on its display.
 *
 * Narrower arcs need a bigger radius to keep the buttons apart (mountFanRadius), so this
 * escalates: a full circle if it fits; otherwise a half circle away from the edge that is in
 * the way, if THAT (wider) fits; otherwise a quarter away from the nearest corner.
 *
 * `hub` must be relative to the display's own top-left corner. Absolute screen coordinates
 * break on any display that does not start at (0, 0): a second monitor at x = 1920 would
 * count every hub as "at the right edge".
 */
export function availableArc(
    hub: IPoint,
    display: { width: number; height: number },
    count: number
): IArc {
    const blocked = (reach: number) => ({
        left: hub.x < reach,
        right: hub.x > display.width - reach,
        top: hub.y < reach,
        bottom: hub.y > display.height - reach,
    });

    let b = blocked(mountFanReach(count, 360));
    if (!b.left && !b.right && !b.top && !b.bottom) { return FULL; }

    const edges = (e: typeof b) => [e.left, e.right, e.top, e.bottom].filter(Boolean).length;
    if (edges(b) === 1) {
        // One edge in the way: try a half circle away from it, with the half circle's radius.
        const half = blocked(mountFanReach(count, 180));
        if (edges(half) === 1) {
            if (half.left) { return { centerAngle: 90, sweep: 180 }; }    // fan right
            if (half.right) { return { centerAngle: 270, sweep: 180 }; }  // fan left
            if (half.top) { return { centerAngle: 180, sweep: 180 }; }    // fan down
            return { centerAngle: 0, sweep: 180 };                        // fan up
        }
        b = half;
    }

    // Two edges in the way (or a display too small for anything else): a quarter away from the
    // corner. Ties (opposite edges both blocked) go to whichever side has more room.
    const left = b.left && (!b.right || hub.x < display.width - hub.x);
    const top = b.top && (!b.bottom || hub.y < display.height - hub.y);
    if (top) { return left ? { centerAngle: 135, sweep: 90 } : { centerAngle: 225, sweep: 90 }; }  // down-right / down-left
    return left ? { centerAngle: 45, sweep: 90 } : { centerAngle: 315, sweep: 90 };                 // up-right / up-left
}

/**
 * Lay `count` items out along the available arc around the hub.
 *
 * @param hubOnDisplay where the hub is on its display (picks the arc)
 * @param hubInWindow  where the hub is drawn in the window (the positions are relative to this)
 * @returns item centres, relative to the window's top-left
 */
export function layoutRadial(
    count: number,
    hubOnDisplay: IPoint,
    display: { width: number; height: number },
    hubInWindow: IPoint
): IPoint[] {
    if (count <= 0) { return []; }

    const arc = availableArc(hubOnDisplay, display, count);
    const radius = mountFanRadius(count, arc.sweep);

    // Spread items evenly across the arc. A full circle divides by `count` so the last item
    // does not land back on the first (0deg and 360deg are the same position); a partial arc
    // divides by `count - 1` so the first and last sit exactly on the arc's ends.
    const isFullCircle = arc.sweep >= 360;
    const divisions = isFullCircle ? count : Math.max(count - 1, 1);
    const step = count > 1 ? arc.sweep / divisions : 0;
    const first = count > 1 ? arc.centerAngle - arc.sweep / 2 : arc.centerAngle;

    const positions: IPoint[] = [];
    for (let i = 0; i < count; i++) {
        const radians = ((first + step * i) * Math.PI) / 180;
        // 0deg = up, clockwise.
        positions.push({
            x: hubInWindow.x + Math.sin(radians) * radius,
            y: hubInWindow.y - Math.cos(radians) * radius,
        });
    }
    return positions;
}
