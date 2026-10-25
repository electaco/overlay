import { IPosition } from "../common";
import { IGenericMarker } from "../render/marker";

export interface ISourceVideoData {
    url: string;
    type: string;
    ratio: [number, number];
    // Seconds behind the live edge to play a live stream (hls.js liveSyncDuration). Unset or 0:
    // 30 s, or the start of the playlist window if that is shorter.
    liveDelay?: number;
}

export interface IVideoDataExtra {
    source: ISourceVideoData;
    rotation: IPosition;
    scale: number;
}

export interface IVideoData extends IVideoDataExtra, IGenericMarker {}