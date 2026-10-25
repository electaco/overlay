import { IMarkerMapSettings } from './IMarkerMapSettings';
import { IMarkerSettings } from './IMarkerSettings';
import { INamePlateSetting } from './INamePlateSetting';
import { IAutoHideOptions } from '../../models/settings/MarkerPrefs';

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
  // Pack behaviour, set by the pack author (part of the pack data, replaced by updates).
  autoHide?: IAutoHideOptions;

  AddMarker(marker: IMarkerSettings, map: string): void;
}
