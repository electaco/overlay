import { IPC } from "../../src/shared/IPC";
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
        getConfigButtonWindow().webContents.send(IPC.UpdateAvailable);
    }
    log("updater", "Update available");
});

autoUpdater.on(IPC.AutoUpdate.UpdateDownloaded, () => {
    getConfigButtonWindow().webContents.send(IPC.UpdateDownloaded);
    log("updater", "Update downloaded");
});

autoUpdater.on(IPC.AutoUpdate.CheckingForUpdate, () => {
    log("updater", "Checking for update");
})

autoUpdater.on(IPC.AutoUpdate.UpdateNotAvailable, (info) => {
    log("updater", "Update not available");
})

autoUpdater.on(IPC.AutoUpdate.Error, (err) => {
    log("updater", "Error in auto-updater: " + err);
})