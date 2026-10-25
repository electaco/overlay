import { IPosition } from "../common";
import { ITextSprite } from "./textsprite";

export enum MarkerType {
    PositionMarker,
    VideoMarker
}

export interface IMarkerIcon {
    icon: string,
    color: string
}

export interface IMarkermouseoverData {
    markerGroup: number;
    markerIndex: number;
}

export interface IPositionMarker extends IGenericMarker {
    markerMouseoverData: IMarkermouseoverData | null;
    icon: IMarkerIcon | null;
    text: ITextSprite | null;
}

export interface IGenericMarker {
    // Which marker this is, for the overlay's action bar (settings changes use ids, not indices).
    packId?: string;
    markerId?: string;
    markerName?: string;
    packName?: string;
    // Whether "Mark done" applies: the pack has auto-hide on.
    packAutoHide?: boolean;
    position: IPosition;
    type: MarkerType;
    fadeInDistance?: number;
    visibleDistance?: number;
    // Continent coordinates and display name, for drawing on the in-game map.
    continent?: { x: number, y: number };
    mapLabel?: string;
}

