// For class-transformer
import 'reflect-metadata';
import { IWebSocketCommand } from '../../src/shared/interfaces/datatransfer/IWebSocketCommand';
import { IPC } from '../../src/shared/ipc';
import { log } from './logging';
import { getRenderWindow } from './windows';

const { ipcMain } = require('electron')
const { spawn } = require('child_process')
const WebSocket = require("ws");

export const BACKGROUND_SERVICE_PATH = 'gw2data\\WebSocketServerNetFramework.exe';
const WS_CLIENT = "ws://localhost:19939/control";

let webSocket: any = null;
// The control socket is wanted while the position service runs (not in fallback mode).
let controlWanted = false;
let reconnectTimer: NodeJS.Timeout | null = null;
const RECONNECT_DELAY_MS = 2000;

//Start external program to get position from GW2
let bat: any = null;
let bat_prefix = "";
const TD = new TextDecoder("utf-8");

export function SetupBackgroundService() {
    bat = spawn(bat_prefix + BACKGROUND_SERVICE_PATH);
    controlWanted = true;

    bat.stdout.on("data", (data: any) => {
        if (webSocket == null) {
            setupWebSocket();
        }
        var text = TD.decode(data);
        log("PositionServer", text)
    });
    bat.on("close", () => {
        log("PositionServer", "Program closed");
        controlWanted = false;
    });
}

ipcMain.on(IPC.UseFallbackPositionUpdate, (event: any) => {
    log("Main", "Fallback position activating");
    controlWanted = false;
    if (bat)
        bat.kill();

    bat = spawn(bat_prefix + "gw2data\\fallback\\TacoCli.exe");

    bat.stdout.on("data", (data: any) => {
        try {
            var json = TD.decode(data);
            var decoded = JSON.parse(json);
            if (!decoded?.coordinates) { return; }
            // Send new position data to render window
            getRenderWindow()?.webContents.send(IPC.Gw2Data, decoded);
        } catch {
            return;
        }
    });
});


ipcMain.on(IPC.SendKeys, (event: any, arg: any) => {
    let msg: IWebSocketCommand = {
        Data: arg,
        Type: "keys",
    }
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(JSON.stringify(msg));
    } else {
        log("Main", "Keys not sent, control socket not connected: " + arg);
    }
})

// Connects to the service's control socket, and keeps reconnecting while the service runs.
// The first attempt is made on the service's first line of output, which comes before it
// starts listening, so it can be refused. Without a retry the socket then stayed dead for the
// whole run and every mount click was silently dropped.
function setupWebSocket() {
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }
    const ws = new WebSocket(WS_CLIENT);
    webSocket = ws;
    let opened = false;

    ws.onopen = function (event: any) {
        opened = true;
        log("Main", "Connected to web socket");
    }

    ws.onclose = function (event: any) {
        // Refused attempts while the service starts up are expected; only log real drops.
        if (opened) {
            log("Main", "Disconnected from web socket");
        }
        if (webSocket === ws) {
            webSocket = null;
            scheduleReconnect();
        }
    }

    ws.onerror = function (event: any) {
        // 'close' follows and handles reconnecting.
        if (opened) {
            log("Main", "Error on web socket");
        }
    }

    ws.onmessage = function (event: any) {
        let msg: IWebSocketCommand = JSON.parse(event.data);
        log("Main", "Got ws message: " + event.data);
        if (msg.Type == "gamerunning") {
            setGameState(msg.Data == "True");
        }
    }
}

function scheduleReconnect() {
    if (!controlWanted || reconnectTimer) {
        return;
    }
    reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        if (controlWanted && webSocket == null) {
            setupWebSocket();
        }
    }, RECONNECT_DELAY_MS);
}

function setGameState(state: boolean) {
    log("Main", "Game running: " + state);
}