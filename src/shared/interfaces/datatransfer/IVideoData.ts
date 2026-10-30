import { IPosition } from "../common";
import { IGenericMarker } from "../render/marker";

export interface ISourceVideoData {
    url: string;
    type: string;
    ratio: [number, number];
    // Tallest the screen may get, in the same units as ratio (scale applies on top). A taller video
    // shrinks as a whole, keeping its aspect. Unset or 0: no limit.
    maxHeight?: number;
    // Seconds behind the live edge to play a live stream (hls.js liveSyncDuration). Unset or 0:
    // 30 s, or the start of the playlist window if that is shorter.
    liveDelay?: number;
}

export interface IVideoDataExtra {
    source: ISourceVideoData;
    rotation: IPosition;
    scale: number;
}

// The player's own audio preference for this marker (markerPrefs), 0..1 and mute.
export interface IVideoAudio {
    volume?: number;
    muted?: boolean;
}

export interface IVideoData extends IVideoDataExtra, IGenericMarker, IVideoAudio {}