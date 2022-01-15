import { TranslateMapId } from "../../src/components/helpers/constants";
import { IGw2MumbleLinkData } from "../../src/shared/interfaces/datatransfer/IGw2MumbleLinkData";
import { IPC } from "../../src/shared/IPC";
import { configUpdated } from "./settings";
import { getConfigButtonWindow } from "./windows";
const { ipcMain } = require('electron')

let LASTPOS: IGw2MumbleLinkData | null = null;

export function getMapId(position: IGw2MumbleLinkData): string {
    if (!position || !position?.coordinates?.MapId) { return null; }
    return TranslateMapId(position.coordinates.MapId);
}

ipcMain.on(IPC.Gw2Data, (event, arg: IGw2MumbleLinkData) => {
    if (getMapId(LASTPOS) != getMapId(arg)) {

        LASTPOS = arg;
        configUpdated();
    }
    LASTPOS = arg;
});

export function getLastPosition(): IGw2MumbleLinkData {
    return LASTPOS;
}

ipcMain.on(IPC.ConnectionStatus, (event, arg) => {
    getConfigButtonWindow().webContents.send(IPC.ConnectionStatus, arg);
});