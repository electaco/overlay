import { IPC } from "../../src/shared/IPC";

const path = require('path');
const { app, ipcMain } = require('electron')
const fs = require('fs');

const configFolder = app.getPath("userData");

interface iLOG {
    source: any,
    message: string,
    timestamp: number
}

const LOGS: iLOG[] = [];

function getTimestamp() {
    const pad = (n, s = 2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date();

    return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function log(source, message) {
    LOGS.push({
        source: source,
        message: message,
        timestamp: Date.now()
    });
    var msg = getTimestamp() + " [" + source + "] " + message
    let logfile = path.join(configFolder, "log.txt");
    fs.appendFileSync(logfile, msg + "\r\n");
    console.log(msg);
}


ipcMain.on(IPC.Log, (event, sender, arg) => {
    log(sender, arg);
});

ipcMain.on(IPC.Error, (event, arg) => {
    log("Unknown", arg);
  });
  