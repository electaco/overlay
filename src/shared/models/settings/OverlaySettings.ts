import { IOverlaySettings } from "../../interfaces/settings/IOverlaySettings";
import { IMountsSettings, DefaultMountsSettings } from "./MountsSettings";

export class OverlaySettings implements IOverlaySettings {
    checkForUpdates: boolean = true;
    autoUpdate: boolean = true;
    checkForMarkerUpdates: boolean = true;
    mounts: IMountsSettings = DefaultMountsSettings();
}