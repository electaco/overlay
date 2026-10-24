import { IMountsSettings } from "../../models/settings/MountsSettings";

export interface IOverlaySettings {
    checkForUpdates: boolean;
    autoUpdate: boolean;
    checkForMarkerUpdates: boolean;
    mounts: IMountsSettings;
}