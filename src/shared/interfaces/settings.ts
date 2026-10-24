
import { IRenderData } from './render/renderdata';
import { IMarkerGroupSettings } from './settings/IMarkerGroupSettings';
import { IRenderSettings } from './settings/IRenderSettings';
import { IOverlaySettings } from './settings/IOverlaySettings';

export interface IRuntimeSettings {
  map: string | null;
}

export interface ISettings {
  render: IRenderSettings;
  marks: Array<IMarkerGroupSettings>;
  overlaySettings: IOverlaySettings;
  runtimeData: IRuntimeSettings | null;

  createRenderData(MapId: string): IRenderData;
}