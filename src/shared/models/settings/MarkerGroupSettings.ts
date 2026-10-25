import { IMarkerGroupSettings } from "../../interfaces/settings/IMarkerGroupSettings";
import { IMarkerMapSettings } from "../../interfaces/settings/IMarkerMapSettings";
import { IMarkerSettings } from "../../interfaces/settings/IMarkerSettings";
import { INamePlateSetting } from "../../interfaces/settings/INamePlateSetting";
import { NamePlateSetting } from "./NamePlateSetting";
import { Type, deserialize } from 'class-transformer';
import fetch from 'cross-fetch'
import { DEFAULT_MARKER_ICON } from "../../markerIcons";
import { IAutoHideOptions } from "./MarkerPrefs";

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
    icon: string = DEFAULT_MARKER_ICON;
    color: string = "#ffffff";
    id!: string;
    updateurl?: string | undefined;
    version?: string | undefined;
    markers: IMarkerMapSettings = {};
    description: string = "";
    autoHide?: IAutoHideOptions;
    sequential?: boolean;

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
    
    // A marker-pack update is downloaded and installed without review, so it must not
    // travel over plaintext http where it could be swapped in transit. Allow localhost
    // for development, and anything else only over https.
    static IsUpdateUrlAllowed(url: string): boolean {
        let parsed: URL;
        try {
            parsed = new URL(url);
        } catch {
            return false;
        }
        if (parsed.protocol === 'https:') {
            return true;
        }
        if (parsed.protocol === 'http:') {
            const host = parsed.hostname.toLowerCase();
            return host === 'localhost' || host === '127.0.0.1' || host === '::1';
        }
        return false;
    }

    async CheckForUpdates(): Promise<IUpdateAvailable> {
        if (this.updateurl) {
            console.log("Checking for updates for " + this.id + " at " + this.updateurl);
            if (!MarkerGroupSettings.IsUpdateUrlAllowed(this.updateurl)) {
                console.log("Refusing to check for updates for " + this.id + ": updateurl is not https");
                return { updateAvailable: false, markerid: this.id };
            }
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
            if (json.url && !MarkerGroupSettings.IsUpdateUrlAllowed(String(json.url))) {
                console.log("Refusing update for " + this.id + ": pack url is not https (" + json.url + ")");
                return { updateAvailable: false, markerid: this.id };
            }
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