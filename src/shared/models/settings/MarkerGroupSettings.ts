import { IMarkerGroupSettings } from "../../interfaces/settings/IMarkerGroupSettings";
import { IMarkerMapSettings } from "../../interfaces/settings/IMarkerMapSettings";
import { IMarkerSettings } from "../../interfaces/settings/IMarkerSettings";
import { INamePlateSetting } from "../../interfaces/settings/INamePlateSetting";
import { NamePlateSetting } from "./NamePlateSetting";
import { Type, deserialize } from 'class-transformer';
import fetch from 'cross-fetch'

const { v4: uuidv4 } = require('uuid');

export interface IUpdateAvailable {
    version?: string;
    url?: string;
    updateAvailable: boolean;
    markerid: string;
}

export class MarkerGroupSettings implements IMarkerGroupSettings {
    static fromJson(json: string) {
        return deserialize(MarkerGroupSettings, json);
    }

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
    id!: string;
    updateurl?: string | undefined;
    version?: string | undefined;
    markers: IMarkerMapSettings = {};
    description: string = "";

    @Type(() => NamePlateSetting)
    defaultNamePlate: INamePlateSetting = new NamePlateSetting();

    ToJSON(): string {
        this.version = new Date().toISOString();
        return JSON.stringify(this);
    }

    createId(): void {
        this.id = uuidv4();
    }

    constructor() {
        this.createId();
    }
    
    async CheckForUpdates(): Promise<IUpdateAvailable> {
        if (this.updateurl) {
            console.log("Checking for updates for " + this.id + " at " + this.updateurl);
            try {
                var response = await fetch(this.updateurl);
            } catch (error) {
                console.log("Error fetching update url for " + this.id + ": " + error);
                return { updateAvailable: false, markerid: this.id };
            }
            
            if (!response?.ok) {
                console.log("Failed to check for updates for " + this.id + " at " + this.updateurl);
                const message = `An error has occured: ${response?.status}`;
                throw new Error(message);
            }
            var json = (await response.json()) as any;
            if (json.url && json.version && json.version !== this.version) {
                console.log("Update found for " + this.id + " at " + json.url);
                return {
                    updateAvailable: true,
                    version: json.version,
                    url: json.url,
                    markerid: this.id
                }
            } else {
                console.log("No update found for " + this.id);
                return {updateAvailable: false, markerid: this.id};
            }
        }
        return {updateAvailable: false, markerid: this.id};
    }

}