// For class-transformer
import 'reflect-metadata';

const { app } = require('electron')
const { ipcMain } = require('electron')
const fs = require('fs');

import { InitializeMouseMove } from './electron_main_parts/mouse_movement';
import { InitAutoUpdate } from './electron_main_parts/auto_update';
import { LoadMarkerPacksFromCommandLine, InitSettings } from './electron_main_parts/settings';
import { createConfigButtonWindow, createRenderWindow, getConfigButtonWindow, getRenderWindow } from './electron_main_parts/windows';
import { SetupBackgroundService } from './electron_main_parts/background_service';
import { IPC } from '../src/shared/IPC';
import { Settings } from '../src/shared/models/settings/Settings';

// If we're in wrong folder, we need to change folder to the app's folder
if (!fs.existsSync("gw2data/WebSocketServerNetFramework.exe")) {
  process.chdir(app.getPath("exe").substring(0, app.getPath("exe").lastIndexOf("\\")));
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance
    LoadMarkerPacksFromCommandLine(commandLine, workingDirectory);
  });
  var settings = InitSettings();
  LoadMarkerPacksFromCommandLine(process.argv, process.cwd());
}

SetupBackgroundService();

ipcMain.on(IPC.Restart, (event, arg) => {
  app.relaunch();
  app.exit(0);
});

ipcMain.on(IPC.Exit, (event, arg) => {
  app.quit();
})

function onGameStarted() {
  createRenderWindow();
  createConfigButtonWindow();
  InitializeMouseMove();
  InitAutoUpdate();
  if (settings.overlaySettings.checkForMarkerUpdates) {
    settings.CheckForMarkerUpdates();
  }
}

function onReady() {
  onGameStarted();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(onReady)