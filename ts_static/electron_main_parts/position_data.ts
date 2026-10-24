import { TranslateMapId, KnowsMap } from "../../src/components/helpers/constants";
import { mapService } from "./service_map";
import { IGw2MumbleLinkData } from "../../src/shared/interfaces/datatransfer/IGw2MumbleLinkData";
import { IPC } from "../../src/shared/ipc";
import { configUpdated } from "./settings";
import { getConfigButtonWindow } from "./windows";
const { ipcMain } = require('electron')

let LASTPOS: IGw2MumbleLinkData | null = null;

export function getMapId(position: IGw2MumbleLinkData | null): string | null{
    if (!position || position == null || !position?.coordinates?.MapId) { return null; }
    const rawId = String(position.coordinates.MapId);

    // A map id we have never heard of means the map table is out of date (new expansion,
    // new or renamed map). Treat seeing it as proof and ask the API right away rather than
    // waiting for the routine interval. OnUnknownMap debounces and rate limits, so this is
    // safe to call from the ~2/s position stream.
    if (!KnowsMap(rawId)) {
        mapService.OnUnknownMap(rawId);
    }

    return TranslateMapId(rawId);
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
    const win = getConfigButtonWindow();
    if (win) win.webContents.send(IPC.ConnectionStatus, arg);
});