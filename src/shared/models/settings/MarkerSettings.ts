import { IPosition } from "../../interfaces/common";
import { IMarkerSettings } from "../../interfaces/settings/IMarkerSettings";
import { INamePlateSetting } from "../../interfaces/settings/INamePlateSetting";
import { IVideoData } from "../../interfaces/datatransfer/IVideoData";
import { MarkerType } from "../../interfaces/render/marker";
import { NamePlateSetting } from "./NamePlateSetting";
const { v4: uuidv4 } = require('uuid');

export class MarkerSettings implements IMarkerSettings {
    id: string;
    name: string;
    active: boolean = true;
    position: IPosition;
    description: string = "";
    nameplate: INamePlateSetting = new NamePlateSetting();
    type = MarkerType.PositionMarker;
    extraData?: IVideoData;
    
    constructor(point: IPosition, name: string, active: boolean = true) {
        this.position = point;
        this.name = name;
        this.id = uuidv4();
        this.active = active;
    }
}