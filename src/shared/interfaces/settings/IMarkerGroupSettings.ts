import { IMarkerMapSettings } from './IMarkerMapSettings';
import { IMarkerSettings } from './IMarkerSettings';
import { INamePlateSetting } from './INamePlateSetting';

export interface IMarkerGroupSettings {
  name: string;
  active: boolean;
  icon: string;
  color: string;
  description: string;
  id: string;
  version?: string;
  updateurl?: string;
  markers: IMarkerMapSettings;
  defaultNamePlate: INamePlateSetting;

  AddMarker(marker: IMarkerSettings, map: string): void;
}
