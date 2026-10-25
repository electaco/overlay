import { IPosition } from "./interfaces/common";

// GW2 world units are inches; stored positions are metres.
const INCHES_PER_METRE = 39.3701;

export interface IMapRects {
    // [[x0, y0], [x1, y1]] in inches / continent units, as the GW2 maps API gives them.
    map_rect?: any;
    continent_rect?: any;
}

// Stored marker position (MumbleLink X and Z swapped, see Position.FromGw2Position) to continent
// coordinates, the unit of MumbleLink's MapCenter/MapPlayer. Null when the map has no usable rects.
export function MarkerToContinent(position: IPosition, map: IMapRects | undefined): { x: number, y: number } | null {
    const mr = map?.map_rect;
    const cr = map?.continent_rect;
    if (!Array.isArray(mr) || !Array.isArray(cr)) return null;
    const [[x0, y0], [x1, y1]] = mr;
    const [[cx0, cy0], [cx1, cy1]] = cr;
    if (!(x1 - x0) || !(y1 - y0)) return null;
    // Swapped back: stored Z is the map's x, stored X is its y.
    const inX = position.Z * INCHES_PER_METRE;
    const inY = position.X * INCHES_PER_METRE;
    return {
        x: cx0 + (inX - x0) / (x1 - x0) * (cx1 - cx0),
        // Map y grows north, continent y grows south.
        y: cy0 + (y1 - inY) / (y1 - y0) * (cy1 - cy0),
    };
}
