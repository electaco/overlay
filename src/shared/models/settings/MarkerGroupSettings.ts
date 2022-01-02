import { IMarkerGroupSettings } from "../../interfaces/settings/IMarkerGroupSettings";
import { IMarkerMapSettings } from "../../interfaces/settings/IMarkerMapSettings";
import { IMarkerSettings } from "../../interfaces/settings/IMarkerSettings";
import { INamePlateSetting } from "../../interfaces/settings/INamePlateSetting";
import { NamePlateSetting } from "./NamePlateSetting";
import { Type } from 'class-transformer';

const { v4: uuidv4 } = require('uuid');

export class MarkerGroupSettings implements IMarkerGroupSettings {
    AddMarker(marker: IMarkerSettings, map: string): void {
        if (!this.markers[map]) {
            this.markers[map] = [];
        }
        this.markers[map].push(marker);
    }

    RemoveMarker(index: number, map: string): void {
        if (this.markers[map]) {
            this.markers[map].splice(index, 1);
            if (this.markers[map].length === 0) {
                delete this.markers[map];
            }
        }
        
    }

    name: string = "New Marker Group";
    active: boolean = true;
    icon: string = "marker1.webp";
    color: string = "#ffffff";
    id: string;
    markers: IMarkerMapSettings = {};
    description: string = "";

    @Type(() => NamePlateSetting)
    defaultNamePlate: INamePlateSetting = new NamePlateSetting();

    ToJSON(): string {
        return JSON.stringify(this);
    }

    constructor() {
        this.id = uuidv4();
    }
    
}