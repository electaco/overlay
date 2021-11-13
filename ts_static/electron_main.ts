// For class-transformer
import 'reflect-metadata';

const { app } = require('electron')
const { ipcMain } = require('electron')
const fs = require('fs');

import { log } from './electron_main_parts/logging';
import { InitializeMouseMove } from './electron_main_parts/mouse_movement';
import { InitAutoUpdate } from './electron_main_parts/auto_update';
import { configUpdated, GetSettings, InitSettings } from './electron_main_parts/settings';
import { createConfigButtonWindow, createRenderWindow, getConfigButtonWindow, getRenderWindow } from './electron_main_parts/windows';
import { SetupBackgroundService } from './electron_main_parts/background_service';

// Check if file exists
if (!fs.existsSync("gw2data/WebSocketServerNetFramework.exe")) {
  process.chdir(app.getPath("exe").substring(0, app.getPath("exe").lastIndexOf("\\")));
}

InitSettings();

// Process argv
function handleArgv(argv: string[], workingDirectory: string) {
  argv = argv.slice(1);
  if (argv.length > 0) {
    for (let i = 0; i < argv.length; i++) {
      // Check if it's a file
      if (fs.existsSync(argv[i]) && fs.statSync(argv[i]).isFile()) {
        log("Main", "Loading marker file: " + argv[i]);
        let data = fs.readFileSync(argv[i]);
        GetSettings().addMarkerGroupFromJson(data);
      }
      // Check if starts with emtp:
      else if (argv[i].startsWith("emtp:")) {
        log("Main", "Loading marker URL: " + argv[i]);
        //Load data from url
        let url = argv[i].substring(5);
        let data = fs.readFileSync(url);
        GetSettings().addMarkerGroupFromJson(data);
      }
    }
    configUpdated();
  }
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    handleArgv(commandLine, workingDirectory);
  });
  handleArgv(process.argv, process.cwd());
}

SetupBackgroundService();

let CONNSTATUS = "red";

ipcMain.on("connstatus", (event, arg) => {
  CONNSTATUS = arg;
  getConfigButtonWindow().webContents.send("connstatus", arg);
});

ipcMain.on("restart", (event, arg) => {
  app.relaunch();
  app.exit(0);
});

ipcMain.on("exit", (event, arg) => {
  app.quit();
})

function onGameStarted() {
  createRenderWindow();
  createConfigButtonWindow();
  InitializeMouseMove();
  InitAutoUpdate();
}

function onReady() {
  onGameStarted();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(onReady)