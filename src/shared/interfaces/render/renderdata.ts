import { IGenericMarker } from './marker';
import { IPosition } from '../common';

// A marker the HUD arrow may point at; the overlay picks the nearest each frame.
export interface IArrowCandidate {
    position: IPosition,
    name: string,
    group: string,
}

export interface IRenderData {
    markers: Array<IGenericMarker>,
    // Present when the arrow is switched on.
    arrow?: { candidates: Array<IArrowCandidate> },
}