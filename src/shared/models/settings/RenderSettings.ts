import { IArrowTarget, IRenderSettings } from "../../interfaces/settings/IRenderSettings";

export class RenderSettings implements IRenderSettings {
    debugBoxes: boolean = false;
    showMarkerNames: boolean = true;
    markerNameViewDistance: number = 80;
    showArrow: boolean = false;
    arrowTarget: IArrowTarget | null = null;
}