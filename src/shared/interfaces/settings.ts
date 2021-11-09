
import { IRenderData } from './render/renderdata';
import { IMarkerGroupSettings } from './settings/IMarkerGroupSettings';
import { IRenderSettings } from './settings/IRenderSettings';

export interface ISettings {
  render: IRenderSettings;
  marks: Array<IMarkerGroupSettings>;

  createRenderData(MapId: number): IRenderData;
}