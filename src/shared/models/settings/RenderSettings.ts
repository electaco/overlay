import { IRenderSettings } from "../../interfaces/settings/IRenderSettings";

export class RenderSettings implements IRenderSettings {
    debugBoxes: boolean = false;
    showMarkerNames: boolean = true;
    markerNameViewDistance: number = 80;
}