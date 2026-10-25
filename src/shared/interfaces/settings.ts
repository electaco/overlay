
import { IRenderData } from './render/renderdata';
import { IMarkerGroupSettings } from './settings/IMarkerGroupSettings';
import { IRenderSettings } from './settings/IRenderSettings';
import { IOverlaySettings } from './settings/IOverlaySettings';
import { IMarkerPrefsMap } from '../models/settings/MarkerPrefs';

export interface IRuntimeSettings {
  map: string | null;
}

export interface ISettings {
  render: IRenderSettings;
  marks: Array<IMarkerGroupSettings>;
  // Personal marker preferences, separate from pack data (see MarkerPrefs.ts).
  markerPrefs: IMarkerPrefsMap;
  overlaySettings: IOverlaySettings;
  runtimeData: IRuntimeSettings | null;

  createRenderData(MapId: string): IRenderData;
}