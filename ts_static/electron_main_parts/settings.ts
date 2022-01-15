import { IGw2MumbleLinkData } from "../../src/shared/interfaces/datatransfer/IGw2MumbleLinkData";
import { IMarkerRemovalInfo } from "../../src/shared/interfaces/datatransfer/IMarkerRemovalInfo";
import IMarkerTypeChange from "../../src/shared/interfaces/datatransfer/IMarkerTypeChange";
import { MarkerType } from "../../src/shared/interfaces/render/marker";
import { Position } from "../../src/shared/models/Position";
import { MarkerGroupSettings } from "../../src/shared/models/settings/MarkerGroupSettings";
import { MarkerSettings } from "../../src/shared/models/settings/MarkerSettings";
import { Settings } from "../../src/shared/models/settings/Settings";
import { log } from "./logging";
import { getLastPosition, getMapId } from "./position_data";
import { getRenderWindow, getWindows as getOpenWindows } from "./windows";
import { IPC } from '../../src/shared/IPC';

var objectPath = require("object-path");
const { app, ipcMain, dialog } = require('electron')
const fs = require('fs');
const path = require('path');

let SETTINGS:Settings|null = null;

export function InitSettings(): Settings {
    const configFolder = app.getPath("userData");
    const configFile = path.join(configFolder, "settings2.json");

    console.log("Settings file: " + configFile);

    SETTINGS = Settings.loadConfig(configFile);

    return SETTINGS;
}

export function GetSettings() {
    return SETTINGS;
}

// Process command line arguments
export function LoadMarkerPacksFromCommandLine(argv: string[], workingDirectory: string) {
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

function addMarker(markerSetNum: number) {
    let mapid: string = getMapId(getLastPosition());
    if (mapid == null) { return; }

    if (!SETTINGS.marks[markerSetNum]) {
        return;
    }
    let markerGroup = SETTINGS.marks[markerSetNum];

    let markerPos = 1;
    if (markerGroup.markers[mapid]) {
        markerPos = markerGroup.markers[mapid].length + 1;
    }

    let point = Position.FromGw2Position(getLastPosition().coordinates.playerPosition);
    let markerName = "Marker #" + markerPos;
    let marker = new MarkerSettings(point, markerName);
    log("main", "Adding marker: " + JSON.stringify(marker));
    markerGroup.AddMarker(marker, mapid.toString());
    configUpdated();
}

ipcMain.on(IPC.Marker.Add, (event, arg) => {
    log("Main", "MarkerAdd");
    addMarker(arg);
});

ipcMain.on(IPC.Marker.Remove, (event, arg: IMarkerRemovalInfo) => {
    SETTINGS.marks[arg.markerpack].RemoveMarker(arg.index, arg.map);
    configUpdated();
});


ipcMain.on(IPC.Marker.NewGroup, (event, arg) => {
    log("Main", "new marker group added");
    SETTINGS.addMarkerGroup(new MarkerGroupSettings());
    configUpdated();
});

ipcMain.on(IPC.Marker.RemoveGroup, (event, arg: number) => {
    SETTINGS.removeMarkerGroup(arg);
    configUpdated();
});

ipcMain.on(IPC.Settings.Get, (event, arg) => {
    event.sender.send(IPC.Settings.Set, SETTINGS);
})


ipcMain.on(IPC.Marker.SaveGroup, (event, arg) => {
    log("savemarkergroup", arg);
    var markers = SETTINGS.getMarkerGroup(arg);
    dialog.showSaveDialog({
        title: "Save marker group",
        defaultPath: markers.name + ".etmp",
        filters: [
            { name: "Marker files", extensions: ["etmp"] }
        ]
    }).then((result) => {
        if (result.canceled) { return; }
        fs.writeFileSync(result.filePath, markers.ToJSON());
    }).catch(err => {
        log("MAIN", "Loadfile error:" + err);
    })
})

ipcMain.on(IPC.Marker.LoadJson, (event, arg) => {
    SETTINGS.addMarkerGroup(arg);
    configUpdated();
});

ipcMain.on(IPC.Marker.LoadGroup, (event, arg) => {
    dialog.showOpenDialog({
        properties: ['openFile'],
        title: "Load marker group",
        filters: [
            { name: "Marker files", extensions: ["etmp"] }
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

ipcMain.on(IPC.Marker.ChangeType, (event, arg: IMarkerTypeChange) => {
    var mark = SETTINGS.marks[arg.markergroup].markers[arg.map][arg.id];
    mark.type = arg.type;
    if (mark.type == MarkerType.VideoMarker) {
        mark.extraData = {
            source: {
                "type": "video/mp4",
                "ratio": [16, 9],
                "url": ""
            },
            rotation: { X: 0, Y: 0, Z: 0 },
            scale: 1,
        }
        mark.visibleDistance = 100;
        mark.fadeInDistance = 70;

    }
    SETTINGS.marks[arg.markergroup].markers[arg.map][arg.id] = mark;
    configUpdated();
});


ipcMain.on(IPC.Settings.Update, (event, arg) => {
    objectPath.set(SETTINGS, arg.path, arg.value);
    log("MAIN", "Config updated: " + arg.path + " = " + arg.value);
    configUpdated();
});

function sendRenderData(settings: Settings) {
    let rd = settings.createRenderData(getMapId(getLastPosition()));
    getRenderWindow()?.webContents.send(IPC.Render, rd);
}

export function configUpdated() {
    SETTINGS.saveConfig();

    sendRenderData(SETTINGS);
    let windows = getOpenWindows();
    for (var key of Object.keys(windows)) {
        windows[key]?.webContents.send(IPC.Settings.Set, SETTINGS);
    }
}

ipcMain.on(IPC.GetRender, (event, arg) => {
    sendRenderData(SETTINGS);
})

ipcMain.on(IPC.Gw2Data, (event, arg: IGw2MumbleLinkData) => {
    let mapid = getMapId(arg);
    if (mapid != SETTINGS.runtimeData.map) {
        SETTINGS.setMap(mapid);
        configUpdated();
    }
});