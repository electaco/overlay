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
    position: IPosition;
    type: MarkerType;
    fadeInDistance?: number;
    visibleDistance?: number;
}

