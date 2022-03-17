import { IOverlaySettings } from "../../interfaces/settings/IOverlaySettings";

export class OverlaySettings implements IOverlaySettings {
    checkForUpdates: boolean = true;
    autoUpdate: boolean = true;
    checkForMarkerUpdates: boolean = true;
}