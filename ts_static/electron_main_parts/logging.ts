import { IPC } from "../../src/shared/ipc";

const path = require('path');
const { app, ipcMain } = require('electron')
const fs = require('fs');

interface iLOG {
    source: any,
    message: string,
    timestamp: number
}

const LOGS: iLOG[] = [];

// Resolved lazily, not at module load: app.getPath("userData") needs the app to be
// initialised, and this module is imported before whenReady(). Resolving it eagerly is what
// turned a startup-ordering problem into a silent `Cannot read properties of undefined`.
let logFolder: string | null = null;

function getLogFolder(): string | null {
    if (logFolder) return logFolder;
    try {
        logFolder = app.getPath("userData");
    } catch {
        // Falling back keeps logging alive instead of killing the main process; console
        // output below still works.
        try {
            logFolder = app.getPath("temp");
        } catch {
            logFolder = null;
        }
    }
    return logFolder;
}

function getTimestamp() {
    const pad = (n: number, s: number = 2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date();

    return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function log(source: string, message: string) {
    LOGS.push({
        source: source,
        message: message,
        timestamp: Date.now()
    });

    var msg = getTimestamp() + " [" + source + "] " + message;

    // Never let logging throw: this is called from child-process and socket callbacks
    // (including during shutdown), where an EPERM/EBUSY on the log file would otherwise
    // surface as an uncaught exception and crash the main process.
    try {
        const folder = getLogFolder();
        if (folder) {
            fs.appendFileSync(path.join(folder, "log.txt"), msg + "\r\n");
        }
    } catch {
        // Ignore: file logging is best-effort.
    }

    try {
        console.log(msg);
    } catch {
        // Ignore: stdout may already be closed during teardown.
    }
}


ipcMain.on(IPC.Log, (event, sender, arg) => {
    log(sender, arg);
});

ipcMain.on(IPC.Error, (event, arg) => {
    log("Unknown", arg);
});
