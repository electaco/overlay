// For class-transformer
import 'reflect-metadata';

const { app } = require('electron')
const { ipcMain } = require('electron')
const fs = require('fs');

import { InitAutoUpdate } from './electron_main_parts/auto_update';
import { LoadMarkerPacksFromCommandLine, InitSettings } from './electron_main_parts/settings';
import { createConfigButtonWindow, createRenderWindow, getConfigButtonWindow, getRenderWindow, getWindows as getOpenWindows } from './electron_main_parts/windows';
import { SetupBackgroundService } from './electron_main_parts/background_service';
import { mapService, SetMapsUpdatedCallback } from './electron_main_parts/service_map';
import { configUpdated } from './electron_main_parts/settings';
import { IPC } from '../src/shared/ipc';
import { Settings } from '../src/shared/models/settings/Settings';
import { maps as bundledMaps, GetActiveMaps } from '../src/components/helpers/constants';

// If we're in wrong folder, we need to change folder to the app's folder
if (!fs.existsSync("gw2data/WebSocketServerNetFramework.exe")) {
  process.chdir(app.getPath("exe").substring(0, app.getPath("exe").lastIndexOf("\\")));
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  // Another instance owns the app. Quitting is queued rather than immediate, so everything
  // below must stay gated on gotTheLock: previously SetupBackgroundService() and
  // whenReady()==>onGameStarted() ran anyway, leaving a window that kept the app alive with
  // SETTINGS still undefined (and configUpdated() then threw on saveConfig()).
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance
    LoadMarkerPacksFromCommandLine(commandLine, workingDirectory);
  });
  var settings = InitSettings();
  LoadMarkerPacksFromCommandLine(process.argv, process.cwd());

  SetupBackgroundService();

  // Keep the GW2 map table fresh. Uses the bundled table until (and unless) a newer one is
  // downloaded, and re-pushes marker data if the table changes mid-session.
  // Only the map ids and names are pushed to the windows; the full table (geometry,
  // levels, floors) is only needed in the main process.
  const mapNames = () => {
    const names: { [id: string]: string } = {};
    const table = GetActiveMaps();
    for (const id in table) {
      names[id] = table[id]?.map_name ?? id;
    }
    return names;
  };

  SetMapsUpdatedCallback(() => {
    try {
      const names = mapNames();
      const windows = getOpenWindows();
      for (const key of Object.keys(windows)) {
        windows[key]?.webContents.send(IPC.Maps.Updated, names);
      }
      // Marker data is keyed on map ids, so let the overlay recompute too.
      configUpdated();
    } catch (e) {
      console.log("Map table refresh could not trigger a redraw: " + e);
    }
  });

  ipcMain.on(IPC.Maps.Get, (event: any) => {
    event.sender.send(IPC.Maps.Updated, mapNames());
  });

  mapService.Initialize(bundledMaps);
}

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
if (gotTheLock) {
  app.whenReady().then(onReady);
}