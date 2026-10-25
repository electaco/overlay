// What the marker arrow points at: a pack (its nearest drawn marker, or the current one of a
// sequential pack) or one marker. Unset: the nearest drawn marker of any pack.
export interface IArrowTarget {
  packId: string;
  markerId?: string;
}

export interface IRenderSettings {
  debugBoxes: boolean;
  showMarkerNames: boolean;
  markerNameViewDistance: number;
  // The HUD arrow pointing at a marker, with its name and distance.
  showArrow?: boolean;
  arrowTarget?: IArrowTarget | null;
}
