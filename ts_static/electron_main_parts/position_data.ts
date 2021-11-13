import { TranslateMapId } from "../../src/components/helpers/constants";
import { configUpdated } from "./settings";
const { ipcMain } = require('electron')

let LASTPOS = null;

export function getMapId(position): number {
    if (!position || !position?.coordinates?.MapId) { return null; }
    return TranslateMapId(position.coordinates.MapId);
}

ipcMain.on("gw2data", (event, arg) => {
    if (getMapId(LASTPOS) != getMapId(arg)) {
        LASTPOS = arg;
        configUpdated();
    }
    LASTPOS = arg;
});

export function getLastPosition(): any {
    return LASTPOS;
}