// Moves a marker within its map's list: from index `from` to index `to` (both in the list as it
// is before the move).
export interface IMarkerMoveInfo {
    markerpack: number;
    map: string;
    from: number;
    to: number;
}
