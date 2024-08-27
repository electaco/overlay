import { TranslateMapId } from "../../src/components/helpers/constants";
import { IGw2MumbleLinkData } from "../../src/shared/interfaces/datatransfer/IGw2MumbleLinkData";
import { IPC } from "../../src/shared/IPC";
import { configUpdated } from "./settings";
import { getConfigButtonWindow } from "./windows";
const { ipcMain } = require('electron')

let LASTPOS: IGw2MumbleLinkData | null = null;

export function getMapId(position: IGw2MumbleLinkData | null): string | null{
    if (!position || position == null || !position?.coordinates?.MapId) { return null; }
    return TranslateMapId(position.coordinates.MapId);
}

ipcMain.on(IPC.Gw2Data, (event, arg: IGw2MumbleLinkData) => {
    if (LASTPOS == null || getMapId(LASTPOS) != getMapId(arg)) {

        LASTPOS = arg;
        configUpdated();
    }
    LASTPOS = arg;
});

export function getLastPosition(): IGw2MumbleLinkData | null{
    return LASTPOS;
}

ipcMain.on(IPC.ConnectionStatus, (event, arg) => {
    getConfigButtonWindow().webContents.send(IPC.ConnectionStatus, arg);
});