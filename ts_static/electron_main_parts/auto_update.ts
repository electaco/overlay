import { log } from "./logging";
import { getConfigButtonWindow } from "./windows";

const { ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater');

export function InitAutoUpdate() {
    autoUpdater.checkForUpdatesAndNotify();
}

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});

autoUpdater.on('update-available', () => {
    getConfigButtonWindow().webContents.send('update_available');
    log("updater", "Update available");
});

autoUpdater.on('update-downloaded', () => {
    getConfigButtonWindow().webContents.send('update_downloaded');
    log("updater", "Update downloaded");
});

autoUpdater.on('checking-for-update', () => {
    log("updater", "Checking for update");
})

autoUpdater.on('update-not-available', (info) => {
    log("updater", "Update not available");
})

autoUpdater.on('error', (err) => {
    log("updater", "Error in auto-updater: " + err);
})