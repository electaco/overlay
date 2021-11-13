import { IVideoDataExtra } from '../datatransfer/IVideoData';
import { IGenericMarker } from '../render/marker';
import { INamePlateSetting } from './INamePlateSetting';

export interface IMarkerSettings extends IGenericMarker {
  id: string;
  name: string;
  active: boolean;
  description: string;
  nameplate: INamePlateSetting;
  extraData?: IVideoDataExtra;
}
