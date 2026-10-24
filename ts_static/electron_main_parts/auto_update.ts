import { IPC } from "../../src/shared/ipc";
import { log } from "./logging";
import { GetSettings } from "./settings";
import { getConfigButtonWindow } from "./windows";

const { ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater');

export function InitAutoUpdate() {
    var settings = GetSettings();
    autoUpdater.autoDownload = settings.overlaySettings.autoUpdate;
    if (settings.overlaySettings.checkForUpdates) {
        autoUpdater.checkForUpdatesAndNotify();
    }
}

ipcMain.on(IPC.RestartApp, () => {
    autoUpdater.quitAndInstall(true, true);
});

ipcMain.on(IPC.DownloadUpdate, () => {
    autoUpdater.downloadUpdate();
});

autoUpdater.on(IPC.AutoUpdate.UpdateAvailable, () => {
    if (!GetSettings().overlaySettings.autoUpdate) {
        const win = getConfigButtonWindow();
        if (win) win.webContents.send(IPC.UpdateAvailable);
    }
    log("updater", "Update available");
});

autoUpdater.on(IPC.AutoUpdate.UpdateDownloaded, () => {
    const win = getConfigButtonWindow();
    if (win) win.webContents.send(IPC.UpdateDownloaded);
    log("updater", "Update downloaded");
});

autoUpdater.on(IPC.AutoUpdate.CheckingForUpdate, () => {
    log("updater", "Checking for update");
})

autoUpdater.on(IPC.AutoUpdate.UpdateNotAvailable, (info: any) => {
    log("updater", "Update not available");
})

autoUpdater.on(IPC.AutoUpdate.Error, (err: any) => {
    log("updater", "Error in auto-updater: " + err);
})