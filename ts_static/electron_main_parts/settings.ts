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

var objectPath = require("object-path");
const { app, ipcMain, dialog } = require('electron')
const fs = require('fs');
const path = require('path');

let SETTINGS = null;

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

function addMarker(markerSetNum: number) {
    let mapid: number = getMapId(getLastPosition());
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

ipcMain.on("addMarker", (event, arg) => {
    log("Main", "MarkerAdd");
    addMarker(arg);
});

ipcMain.on("removeMarker", (event, arg: IMarkerRemovalInfo) => {
    SETTINGS.marks[arg.markerpack].RemoveMarker(arg.index, arg.map);
    configUpdated();
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
            { name: "Marker files", extensions: ["etmp"] }
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

ipcMain.on("markertype-change", (event, arg: IMarkerTypeChange) => {
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


ipcMain.on("updateconfig", (event, arg) => {
    objectPath.set(SETTINGS, arg.path, arg.value);
    log("MAIN", "Config updated: " + arg.path + " = " + arg.value);
    configUpdated();
});

function sendRenderData(settings: Settings) {
    let rd = settings.createRenderData(getMapId(getLastPosition()));
    getRenderWindow()?.webContents.send("render", rd);
}

export function configUpdated() {
    SETTINGS.saveConfig();

    sendRenderData(SETTINGS);
    let windows = getOpenWindows();
    for (var key of Object.keys(windows)) {
        windows[key]?.webContents.send("setsettings", SETTINGS);
    }
}

ipcMain.on("getrender", (event, arg) => {
    sendRenderData(SETTINGS);
})