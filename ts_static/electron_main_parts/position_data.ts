import { TranslateMapId } from "../../src/components/helpers/constants";
import { configUpdated } from "./settings";
import { getConfigButtonWindow } from "./windows";
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

ipcMain.on("connstatus", (event, arg) => {
    getConfigButtonWindow().webContents.send("connstatus", arg);
});