import { IPC } from "../../src/shared/IPC";
import { configUpdated, GetSettings } from "./settings";
import { app, BrowserWindow, ipcMain, screen } from 'electron';
import * as pathModule from 'path';

let rendererWindow: BrowserWindow | null = null;
let configButton: BrowserWindow | null = null;
let openWindows: { [key: string]: BrowserWindow | undefined } = {};

ipcMain.on(IPC.Debug.DebugWindowRender, (event, arg) => {
    //renderer.setIgnoreMouseEvents(false);
    rendererWindow?.webContents.openDevTools({ mode: 'detach' });
});

ipcMain.on(IPC.Debug.DebugWindow, (event, arg: string) => {
    //renderer.setIgnoreMouseEvents(false);
    openWindows[arg]?.webContents.openDevTools({ mode: 'detach' });
});


ipcMain.on(IPC.Debug.ReloadRender, (event, arg) => {
    if (rendererWindow) {
        rendererWindow.setIgnoreMouseEvents(true);
        rendererWindow.webContents.reload();
    }
});

export function createRenderWindow(): BrowserWindow {
    if (rendererWindow != null) {
        rendererWindow.close();
    }
    // Create the browser window.
    const preloadPath = pathModule.join(app.getAppPath(), 'public', 'electron', 'preload.js');
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: preloadPath,
        },
        frame: false,
        transparent: true,
        fullscreen: true,
        resizable: false,
    })

    win.setAlwaysOnTop(true, "screen-saver");
    win.setIgnoreMouseEvents(true, { forward: true });

    win.on("always-on-top-changed", (event, isAlwaysOnTop) => {
        console.log("Always on top changed", isAlwaysOnTop);
    });
    win.on("blur", () => {
        console.log("blur");
     });
    win.on("focus", () => {
        console.log("focus");
    });
    win.on("show", () => {
        console.log("show");
    });
    win.on("hide", () => {
        console.log("hide");
    }); 
    win.on("leave-full-screen", () => {
        console.log("leave-full-screen");
    });
    
    
    win.loadFile('build/renderer.html')

    rendererWindow = win;
    configUpdated();
    return win;
}

ipcMain.on(IPC.Window.ResizeConfig, (event, arg) => {
    configButton?.setSize(arg.w, arg.h);
})


export function createConfigButtonWindow() {
    const preloadPath = pathModule.join(app.getAppPath(), 'public', 'electron', 'preload.js');
    // Create the browser window.
    const cwin = new BrowserWindow({
        width: 200,
        height: 500,
        x: (screen.getPrimaryDisplay().workAreaSize.width /2) -70,
        y: 0,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: preloadPath,
        },
        frame: false,
        transparent: true,
        maximizable: false,
        fullscreenable: false,
        parent: rendererWindow || undefined,
    })

    cwin.setAlwaysOnTop(true, "screen-saver");
    cwin.loadFile('build/config_button.html')
    configButton = cwin;
    return cwin;
}

function createWindow(parent: BrowserWindow, windowPath: string) {
    const preloadPath = pathModule.join(app.getAppPath(), 'public', 'electron', 'preload.js');
    // Create the browser window.
    const cwin = new BrowserWindow({
        width: 600,
        height: 400,
        minWidth: 100,
        minHeight: 80,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: preloadPath,
        },
        frame: false,
        transparent: true,
        parent: parent,
    })

    cwin.setAlwaysOnTop(true, "screen-saver");
    cwin.loadFile('build/index.html', { hash: "/" + windowPath });

    cwin.webContents.send(IPC.Settings.Set, GetSettings());
    
    return cwin;
}

export function getRenderWindow() {
    return rendererWindow;
}
export function getConfigButtonWindow() {
    return configButton;
}

export function getWindow(windowPath: string) {
    return openWindows[windowPath] || undefined;
}

export function getWindows() {
    return openWindows;
}

ipcMain.on(IPC.Window.Open, (event, arg: { show: boolean, path: string }) => {
    if (arg.show) {
        if (!openWindows[arg.path]) {
            openWindows[arg.path] = createWindow(rendererWindow!, arg.path);
        }
    } else {
        const win = openWindows[arg.path];
        if (win) {
            win.close();
            openWindows[arg.path] = undefined;
        }
    }
});
