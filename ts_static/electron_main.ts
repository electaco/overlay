// For class-transformer
import 'reflect-metadata';

const { app, BrowserWindow, screen } = require('electron')
const { ipcMain, dialog } = require('electron')
const { spawn } = require('child_process')
const fs = require('fs');
const path = require('path');
const WebSocket = require("ws");
const { autoUpdater } = require('electron-updater');

import { Settings } from '../src/shared/models/settings/Settings';
import { Position } from '../src/shared/models/Position';
import { MarkerSettings } from '../src/shared/models/settings/MarkerSettings';
import { MarkerGroupSettings } from '../src/shared/models/settings/MarkerGroupSettings';
import { IMarkerRemovalInfo } from '../src/shared/interfaces/datatransfer/IMarkerRemovalInfo';
import IMarkerTypeChange from '../src/shared/interfaces/datatransfer/IMarkerTypeChange';
import { IWebSocketCommand } from '../src/shared/interfaces/datatransfer/IWebSocketCommand';
import { TranslateMapId } from '../src/components/helpers/constants';
import { MarkerType } from '../src/shared/interfaces/render/marker';

const DEBUG = false;
const configFolder = app.getPath("userData");
const configFile = path.join(configFolder, "settings2.json");
const WS_CLIENT = "ws://localhost:19939/control";

// Check if file exists
if (!fs.existsSync("gw2data/WebSocketServerNetFramework.exe")) {
  process.chdir(app.getPath("exe").substring(0, app.getPath("exe").lastIndexOf("\\")));
}

console.log("Settings file: " + configFile);

let renderWindow = null;
let webSocket = null;
let LASTPOS = null;

var objectPath = require("object-path");

let SETTINGS = Settings.loadConfig(configFile);

let rendererWindow = null;
let openWindows: { [path: string]: typeof BrowserWindow } = {};

//Start external program to get position from GW2
let bat = null;
let bat_prefix = "";
const TD = new TextDecoder("utf-8");

const LOGS = [];

// Change working directory to executable path


// Process argv
function handleArgv(argv: string[], workingDirectory: string) {
  argv = argv.slice(1);
  if (argv.length > 0) {
    for(let i = 0; i < argv.length; i++) {
      // Check if it's a file
      if (fs.existsSync(argv[i]) && fs.statSync(argv[i]).isFile()) {
        log("Main","Loading marker file: " + argv[i]);
        let data = fs.readFileSync(argv[i]);
        SETTINGS.addMarkerGroupFromJson(data);
      }
      // Check if starts with emtp:
      else if (argv[i].startsWith("emtp:")) {
        log("Main","Loading marker URL: " + argv[i]);
        //Load data from url
        let url = argv[i].substring(5);
        let data = fs.readFileSync(url);
        SETTINGS.addMarkerGroupFromJson(data);
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

function getMapId(position): number {
  if (!position || !position?.coordinates?.MapId) { return null; }
  return TranslateMapId(position.coordinates.MapId);
}

function getTimestamp () {
  const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
  const d = new Date();
  
  return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function log(source, message) {
  LOGS.push({
    source: source,
    message: message,
    timestamp: Date.now()
  });
  var msg = getTimestamp() + " ["+source+"] " + message
  let logfile = path.join(configFolder, "log.txt");
  fs.appendFileSync(logfile, msg + "\r\n");
  console.log(msg);
}


if (true) {
  bat = spawn(bat_prefix + 'gw2data\\WebSocketServerNetFramework.exe');

  bat.stdout.on("data", (data) => {
    if (webSocket == null) {
      setupWebSocket();
    }
    var text = TD.decode(data);
    log("PositionServer", text)
  });
  bat.on("close", () => {
    log("PositionServer", "Program closed");
  });
}

ipcMain.on("show-page", (event, arg: { show: boolean, path: string }) => {
  if (arg.show) {
    if (!openWindows[arg.path]) {
      openWindows[arg.path] = createWindow(rendererWindow, arg.path);
    }
  } else {
    if (openWindows[arg.path]) {
      openWindows[arg.path].close();
      openWindows[arg.path] = null;
    }
  }
});

ipcMain.on("error", (event, arg) => {
  log("Unknown", arg);
});

let CONNSTATUS = "red";

ipcMain.on("connstatus", (event, arg) => {
  CONNSTATUS = arg;
  configButton.webContents.send("connstatus", arg);
});

ipcMain.on('fallback_positionupdate', (event) => {
  log("Main", "Fallback position activating");
  if (bat)
    bat.kill();

  bat = spawn(bat_prefix + "gw2data\\fallback\\TacoCli.exe");
  
  bat.stdout.on("data", (data) => {
    try {
      var json = TD.decode(data);
      var decoded = JSON.parse(json);
      if (!decoded?.coordinates) {return;}
      // Send new position data to render window
      renderWindow.webContents.send("gw2data", decoded);
    } catch {
      return;
    }
  });
});

ipcMain.on("gw2data", (event, arg) => {
  if (getMapId(LASTPOS) != getMapId(arg)) {
    LASTPOS = arg;
    configUpdated();
  }
  LASTPOS = arg;
});

function addMarker(markerSetNum: number) {
  let mapid: number = getMapId(LASTPOS);
  if (mapid == null) { return; }

  if (!SETTINGS.marks[markerSetNum]) {
    return;
  }
  let markerGroup = SETTINGS.marks[markerSetNum];

  let markerPos = 1;
  if (markerGroup.markers[mapid]) {
    markerPos = markerGroup.markers[mapid].length + 1;
  }
  
  let point = Position.FromGw2Position(LASTPOS.coordinates.playerPosition);
  let markerName = "Marker #" + markerPos;
  let marker = new MarkerSettings(point, markerName);
  log("main","Adding marker: " + JSON.stringify(marker));
  markerGroup.AddMarker(marker, mapid.toString());
  configUpdated();
}

ipcMain.on("addMarker", (event, arg) => {
  log("Main", "MarkerAdd");
  addMarker(arg);
});

ipcMain.on("removeMarker", (event, arg: IMarkerRemovalInfo) => {
  SETTINGS.marks[arg.markerpack].RemoveMarker(arg.index, arg.map);
  configUpdated();
});

ipcMain.on("debugrenderer", (event, arg) => {
  //renderer.setIgnoreMouseEvents(false);
  rendererWindow.webContents.openDevTools({ mode: 'detach' });
});

ipcMain.on("debug-window", (event, arg: string) => {
  //renderer.setIgnoreMouseEvents(false);
  openWindows[arg]?.webContents.openDevTools({ mode: 'detach' });
});

ipcMain.on("restart", (event, arg) => {
  app.relaunch();
  app.exit(0);
});

ipcMain.on("newMarkerGroup", (event, arg) => {
  log("Main", "new marker group added");
  SETTINGS.addMarkerGroup(new MarkerGroupSettings());
  configUpdated();
});

ipcMain.on("removeMarkerGroup", (event, arg: number) => {
  SETTINGS.removeMarkerGroup(arg);
  configUpdated();
});

ipcMain.on("log", (event, sender, arg) => {
  log(sender, arg);
});

ipcMain.on("reloadRender", (event, arg) => {
  rendererWindow.setIgnoreMouseEvents(true);
  rendererWindow.reload();
});

ipcMain.on("cleanup-done", (event, arg) => {
  rendererWindow.reload();
});

ipcMain.on("exit", (event, arg) => {
  app.quit();
})

ipcMain.on("getsettings", (event, arg) => {
  event.sender.send("setsettings", SETTINGS);
})

ipcMain.on("savemarkergroup", (event, arg) => {
  log("savemarkergroup", arg);
  var markers = SETTINGS.getMarkerGroup(arg);
  dialog.showSaveDialog({ 
    title: "Save marker group",
    defaultPath: markers.name + ".etmp",
    filters: [
      {name:"Marker files", extensions:["etmp"]}
    ]
  }).then((result) => {
    if (result.canceled) { return; }
    fs.writeFileSync(result.filePath, markers.ToJSON());
  }).catch(err => {
    log("MAIN", "Loadfile error:" + err);
  })
})

ipcMain.on("loadmarkergroup_json", (event, arg) => {
  SETTINGS.addMarkerGroup(arg);
  configUpdated();
});

ipcMain.on("loadmarkergroup", (event, arg) => {
  dialog.showOpenDialog({ 
    properties: ['openFile'],
    title: "Load marker group",
    filters: [
      {name:"Marker files", extensions:["etmp"]}
    ]
  }).then((result) => {
    if (result.canceled) { return; }
    let data = fs.readFileSync(result.filePaths[0]);
    SETTINGS.addMarkerGroupFromJson(data);
    configUpdated();
  }).catch(err => {
    log("MAIN", "Loadfile error:" + err);
  })

})

ipcMain.on("markertype-change", (event, arg:IMarkerTypeChange) => {
  var mark = SETTINGS.marks[arg.markergroup].markers[arg.map][arg.id];
  mark.type = arg.type;
  if (mark.type == MarkerType.VideoMarker) {
    mark.extraData = {
      source: {
        "type": "video/mp4",
        "ratio": [16,9],
        "url": ""
      },
      rotation: {X: 0, Y: 0, Z: 0},
      scale: 1,
    }
    mark.visibleDistance = 100;
    mark.fadeInDistance= 70;

  }
  SETTINGS.marks[arg.markergroup].markers[arg.map][arg.id] = mark;
  configUpdated();
});

ipcMain.on("resize", (event, arg) => {
  configButton?.setSize(arg.w, arg.h);
})

ipcMain.on("sendkeys", (event, arg) => {
  let msg: IWebSocketCommand = {
    Data: arg,
    Type: "keys",
  }
  if (webSocket) {
    webSocket.send(JSON.stringify(msg));
  }
})

ipcMain.on("getrender", (event, arg) => {
  sendRenderData(SETTINGS);
})

ipcMain.on("updateconfig", (event, arg) => {
  objectPath.set(SETTINGS, arg.path, arg.value);
  log("MAIN", "Config updated: " + arg.path + " = " + arg.value);
  configUpdated();
});

function sendRenderData(settings: Settings) {
  let rd = settings.createRenderData(getMapId(LASTPOS));
  rendererWindow?.webContents.send("render", rd);
}

function configUpdated() {
  SETTINGS.saveConfig();

  sendRenderData(SETTINGS);
  for (var key of Object.keys(openWindows)) {
    openWindows[key]?.webContents.send("setsettings", SETTINGS);
  }
}

function createRenderWindow(): typeof BrowserWindow {
  if (rendererWindow != null) {
    rendererWindow.close();
  }
  // Create the browser window.
  const win: typeof BrowserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false,
    transparent: true,
    fullscreen: true,
    resizable: false,
  })

  win.setAlwaysOnTop(true, "screen-saver");
  win.setIgnoreMouseEvents(true, { forward: true });

  win.loadFile('build/renderer.html')
  
  rendererWindow = win;
  configUpdated();
  return win;
}

function createConfigButtonWindow(parent) {
  // Create the browser window.
  const cwin = new BrowserWindow({
    width: 200,
    height: 500,
    x: 350,
    y: 0,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false,
    transparent: true,
    maximizable: false,
    fullscreenable: false,
    parent: parent,
  })

  cwin.setAlwaysOnTop(true, "screen-saver");
  cwin.loadFile('build/config_button.html')
  return cwin;
}

function createWindow(parent, path: string) {
  // Create the browser window.
  const cwin = new BrowserWindow({
    width: 600,
    height: 400,
    minWidth: 100,
    minHeight: 80,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false,
    transparent: true,
    parent: parent,
  })

  cwin.setAlwaysOnTop(true, "screen-saver");
  cwin.loadFile('build/index.html', { hash: "/" + path });
  
  cwin.webContents.send("setsettings", SETTINGS);
  if (DEBUG) {
    cwin.webContents.openDevTools({ mode: 'detach' });
  }
  return cwin;
}
let configButton = null;

var mousePoint = {x: 0, y: 0};

var transformRange = (value,  r2) => {
  var scale = 2/r2;
  return (value * scale)-1;
}

function getMouseCursorPosition() {
  var point = screen.getCursorScreenPoint();

  if (point.x != mousePoint.x || point.y != mousePoint.y) {
    let display = screen.getPrimaryDisplay();
    var boundRect = display.bounds;
    if (point.x > boundRect.x && point.x < boundRect.width) {
      var np = {
        x:transformRange(point.x, boundRect.width),
        y:transformRange(point.y, boundRect.height) * -1,
      };
      rendererWindow?.webContents.send("mousemove", np);
    }
    mousePoint = point;
  }
  
}

let mouseCursorCheckInterval = null;

function onGameStarted() {
  renderWindow = createRenderWindow();
  configButton = createConfigButtonWindow(renderWindow);
  mouseCursorCheckInterval = setInterval(getMouseCursorPosition, 300);
}

function onGameStopped() {

}

function onReady() {
  onGameStarted();
  autoUpdater.checkForUpdatesAndNotify();
}

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
autoUpdater.on('update-available', () => {
  configButton.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  configButton.webContents.send('update_downloaded');
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(onReady)

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function setGameState(state: boolean) {
  log("Main", "Game running: " + state);
}



function setupWebSocket() {
  webSocket = new WebSocket(WS_CLIENT);

  webSocket.onopen = function (event) {
    log("Main", "Connected to web socket");
  }
  
  webSocket.onclose = function (event) {
    log("Main","Disconnected from web socket");
  }
  
  webSocket.onerror = function (event) {
    log("Main","Error on web socket");
  }
  
  webSocket.onmessage = function (event) {
    let msg: IWebSocketCommand = JSON.parse(event.data);
    log("Main", "Got ws message: " + event.data);
    if (msg.Type == "gamerunning") {
      setGameState(msg.Data == "True");
    }
  }
}

  