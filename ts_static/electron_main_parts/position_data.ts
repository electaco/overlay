import { TranslateMapId } from "../../src/components/helpers/constants";
import { IGw2MumbleLinkData } from "../../src/shared/interfaces/datatransfer/IGw2MumbleLinkData";
import { configUpdated } from "./settings";
import { getConfigButtonWindow, getWindow } from "./windows";
const { ipcMain } = require('electron')

let LASTPOS: IGw2MumbleLinkData | null = null;

export function getMapId(position: IGw2MumbleLinkData): string {
    if (!position || !position?.coordinates?.MapId) { return null; }
    return TranslateMapId(position.coordinates.MapId);
}

ipcMain.on("gw2data", (event, arg: IGw2MumbleLinkData) => {
    if (getMapId(LASTPOS) != getMapId(arg)) {
        LASTPOS = arg;
        configUpdated();
    }
    LASTPOS = arg;
    getWindow("speedometer")?.webContents.send("gw2data", arg);
});

export function getLastPosition(): IGw2MumbleLinkData {
    return LASTPOS;
}

ipcMain.on("connstatus", (event, arg) => {
    getConfigButtonWindow().webContents.send("connstatus", arg);
});