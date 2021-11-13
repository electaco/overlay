import { IPosition } from "../common";
import { IGenericMarker } from "../render/marker";

export interface ISourceVideoData {
    url: string;
    type: string;
    ratio: [number, number];
}

export interface IVideoDataExtra {
    source: ISourceVideoData;
    rotation: IPosition;
    scale: number;
}

export interface IVideoData extends IVideoDataExtra, IGenericMarker {}