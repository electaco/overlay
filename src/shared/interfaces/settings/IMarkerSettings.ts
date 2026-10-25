import { IVideoDataExtra } from '../datatransfer/IVideoData';
import { IGenericMarker } from '../render/marker';
import { INamePlateSetting } from './INamePlateSetting';

export interface IMarkerSettings extends IGenericMarker {
  id: string;
  name: string;
  active: boolean;
  description: string;
  nameplate: INamePlateSetting;
  // Overrides the pack's icon for this marker; empty uses the pack's (see markerIcons.ts).
  icon?: string | null;
  extraData?: IVideoDataExtra;
}
