
import { IRenderData } from './render/renderdata';
import { IMarkerGroupSettings } from './settings/IMarkerGroupSettings';
import { IRenderSettings } from './settings/IRenderSettings';

export interface IRuntimeSettings {
  map: string | null;
}

export interface ISettings {
  render: IRenderSettings;
  marks: Array<IMarkerGroupSettings>;
  runtimeData: IRuntimeSettings | null;

  createRenderData(MapId: string): IRenderData;
}