import { IPC } from "../../src/shared/ipc";
import { IMountPlacement, MOUNT_EDGE_INSET, MOUNT_WINDOW_SIZE } from "../../src/shared/mounts";
import { configUpdated, GetSettings } from "./settings";
import { IGameCover } from "../../src/shared/interfaces/datatransfer/IGameCover";
import { app, BrowserWindow, ipcMain, Rectangle, screen } from 'electron';
import * as pathModule from 'path';

let rendererWindow: BrowserWindow | null = null;
let configButton: BrowserWindow | null = null;
let openWindows: { [key: string]: BrowserWindow | undefined } = {};

// Mount menu window. A fixed MOUNT_WINDOW_SIZE square that is never resized, and always lies
// fully inside one display: a window spanning two displays with different scale factors gets
// rescaled by Windows (it grew 1.5x between a 150% and a 100% monitor). It is centred on the
// hub where that fits; near an edge it is clamped onto the display and the hub sits off-centre
// in it. mountsLayout() is the one place that decides this. Opening and closing the fan is
// purely a rendering change in the page.
//
// Hub position in absolute screen coordinates. This is the source of truth; the window is
// derived from it. Kept across close/reopen, and saved in the settings when a drag ends
// (overlaySettings.mounts.position) so it survives restarts.
let mountsHub: { x: number; y: number } | null = null;
// Timer that moves the window with the cursor during a grip drag.
let mountsDrag: NodeJS.Timeout | null = null;
let mountsWatchingDisplays = false;

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
        overlayClickThrough();
        rendererWindow.webContents.reload();
    }
});

export function createRenderWindow(): BrowserWindow {
    if (rendererWindow != null) {
        rendererWindow.close();
    }
    // Create the browser window.
    const preloadPath = pathModule.join(app.getAppPath(), 'build', 'electron', 'preload.js');
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            preload: preloadPath,
        },
        frame: false,
        transparent: true,
        fullscreen: true,
        resizable: false,
        // A click on a marker action bar must not take focus from the game (WS_EX_NOACTIVATE,
        // like the mount menu). Nothing in the overlay page needs the keyboard.
        focusable: false,
    })

    win.setAlwaysOnTop(true, "screen-saver");
    win.setIgnoreMouseEvents(true, { forward: true });
    // Whatever the page had switched on (click capture over an action bar) must not outlive it.
    win.webContents.on('did-start-loading', overlayClickThrough);
    win.webContents.on('render-process-gone', overlayClickThrough);

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

// The overlay takes clicks only while the cursor is over one of its marker action bars (the page
// asks, see renderer.ts); everywhere else it is click-through so GW2 gets every click.
function overlayClickThrough() {
    if (!rendererWindow || rendererWindow.isDestroyed()) return;
    rendererWindow.setIgnoreMouseEvents(true, { forward: true });
}

ipcMain.on(IPC.OverlaySetClickable, (event, clickable: boolean) => {
    if (!rendererWindow || rendererWindow.isDestroyed()) return;
    // forward:true keeps mouse moves flowing so the page can tell when the cursor leaves the bar.
    rendererWindow.setIgnoreMouseEvents(!clickable, { forward: true });
});

ipcMain.on(IPC.Window.ResizeConfig, (event, arg) => {
    if (!configButton || configButton.isDestroyed()) return;
    const b = configButton.getBounds();
    const target = { x: b.x, y: b.y, width: arg.w, height: arg.h };
    // In this order so the bar never shows over another window for a frame, at either size.
    const growing = arg.w > b.width || arg.h > b.height;
    if (growing) applyConfigButtonGameVisibility(target);
    configButton.setSize(arg.w, arg.h);
    if (!growing) applyConfigButtonGameVisibility(target);
})


export function createConfigButtonWindow() {
    const preloadPath = pathModule.join(app.getAppPath(), 'build', 'electron', 'preload.js');
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
    const preloadPath = pathModule.join(app.getAppPath(), 'build', 'electron', 'preload.js');

    // The mount menu is a radial that fans out from its own centre; anything else is a
    // normal settings window.
    const isMounts = windowPath === 'mounts';
    const width = isMounts ? MOUNT_WINDOW_SIZE : 600;
    const height = isMounts ? MOUNT_WINDOW_SIZE : 400;

    const opts: any = {
        width,
        height,
        minWidth: isMounts ? width : 100,
        minHeight: isMounts ? height : 80,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: preloadPath,
        },
        frame: false,
        transparent: true,
        parent: parent,
    };

    if (isMounts) {
        // Opened while the map is up, a loading screen is up or the game is covered: show it once that is over.
        // Around the remembered hub: this run's, else the saved one, else the primary display's
        // centre. mountsLayout() pulls a saved position onto the nearest display, so a hub left
        // on a monitor that is gone or has changed resolution still comes back on screen.
        const layout = mountsLayout(mountsHub ?? savedMountsHub() ?? primaryCentre());
        mountsHub = layout.hub;
        opts.show = !mountsHiddenByGame({ x: layout.x, y: layout.y, width: MOUNT_WINDOW_SIZE, height: MOUNT_WINDOW_SIZE });
        watchDisplaysForMounts();
        opts.resizable = false;
        opts.fullscreenable = false;
        opts.maximizable = false;
        opts.skipTaskbar = true;
        // Never take focus from the game (WS_EX_NOACTIVATE). Otherwise a click activates this
        // window, the position service then has to pull GW2 back to the foreground before it
        // sends the chord (which Windows' foreground lock can refuse, losing the keys), and the
        // focus change blurs this page.
        opts.focusable = false;
        opts.useContentSize = true;
        opts.x = layout.x;
        opts.y = layout.y;
    }

    const cwin = new BrowserWindow(opts);

    cwin.setAlwaysOnTop(true, "screen-saver");
    cwin.loadFile('build/index.html', { hash: "/" + windowPath });

    cwin.webContents.send(IPC.Settings.Set, GetSettings());

    if (isMounts) {
        // Starts fully click-through; the page turns capture on over its controls.
        cwin.setIgnoreMouseEvents(true, { forward: true });
        cwin.on('closed', stopMountDrag);
    }

    return cwin;
}

/**
 * Where the mount window goes for a hub at `wanted` (absolute screen coordinates).
 *
 * The hub is kept on the display nearest to it (MOUNT_EDGE_INSET inside), and the window
 * is centred on the hub, then clamped to lie fully on that display. Uses the display's full
 * bounds, not workArea: GW2 runs fullscreen, so the taskbar reservation is not a real limit.
 */
function mountsLayout(wanted: { x: number; y: number }) {
    const area = screen.getDisplayNearestPoint({ x: Math.round(wanted.x), y: Math.round(wanted.y) }).bounds;
    const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
    const inset = MOUNT_EDGE_INSET;
    const size = MOUNT_WINDOW_SIZE;
    const hub = {
        x: Math.round(clamp(wanted.x, area.x + inset, area.x + area.width - inset)),
        y: Math.round(clamp(wanted.y, area.y + inset, area.y + area.height - inset)),
    };
    const x = clamp(hub.x - size / 2, area.x, area.x + area.width - size);
    const y = clamp(hub.y - size / 2, area.y, area.y + area.height - size);
    return { hub, area, x, y };
}

/** Move the mount window for a hub at `wanted` and tell the page where everything is. */
function placeMounts(win: BrowserWindow, wanted: { x: number; y: number }) {
    const layout = mountsLayout(wanted);
    mountsHub = layout.hub;

    const b = win.getBounds();
    if (b.x !== layout.x || b.y !== layout.y || Math.abs(b.width - MOUNT_WINDOW_SIZE) > 1) {
        // setBounds rather than setPosition: on scaled displays setPosition can change the
        // window size by a pixel, and the size must stay fixed.
        win.setBounds({ x: layout.x, y: layout.y, width: MOUNT_WINDOW_SIZE, height: MOUNT_WINDOW_SIZE });
    }

    const placement: IMountPlacement = {
        hub: { x: layout.hub.x - layout.area.x, y: layout.hub.y - layout.area.y },
        display: { width: layout.area.width, height: layout.area.height },
        hubInWindow: { x: layout.hub.x - layout.x, y: layout.hub.y - layout.y },
    };
    win.webContents.send(IPC.Mounts.Position, placement);
    // Moved: cut (or hide) it for the new spot. Not hidden mid-drag; see mountsHiddenByGame.
    applyMountsGameVisibility();
}

function stopMountDrag() {
    if (mountsDrag) {
        clearInterval(mountsDrag);
        mountsDrag = null;
        saveMountsHub();
        // Dropped on top of a covering window: hide now.
        applyMountsGameVisibility();
    }
}

function primaryCentre() {
    const primary = screen.getPrimaryDisplay().bounds;
    return { x: primary.x + primary.width / 2, y: primary.y + primary.height / 2 };
}

function savedMountsHub(): { x: number; y: number } | null {
    return GetSettings()?.overlaySettings?.mounts?.position ?? null;
}

// Written straight to disk rather than through configUpdated(), which would also resend every
// marker to the overlay and the whole settings object to every window for a position change.
function saveMountsHub() {
    const settings = GetSettings();
    if (!settings?.overlaySettings?.mounts) { return; }
    if (mountsHub) {
        settings.overlaySettings.mounts.position = { x: mountsHub.x, y: mountsHub.y };
    } else {
        delete settings.overlaySettings.mounts.position;
    }
    settings.saveConfig();
}

// A display being removed or changing resolution can leave the window off screen or spanning
// two displays; re-place it around the same hub, which mountsLayout() pulls back on screen.
// Registered on first use: the screen module cannot be used before the app is ready.
function watchDisplaysForMounts() {
    if (mountsWatchingDisplays) { return; }
    mountsWatchingDisplays = true;
    const replace = () => {
        const win = openWindows['mounts'];
        if (win && !win.isDestroyed() && mountsHub) {
            placeMounts(win, mountsHub);
        }
    };
    screen.on('display-removed', replace);
    screen.on('display-metrics-changed', replace);
}

// The overlay page cannot tell on its own when the cursor has left it: a click-through window
// with forwarded mouse moves gets a mouseleave after every single move (see renderer.ts).
ipcMain.handle(IPC.CursorInOverlay, () => {
    if (!rendererWindow || rendererWindow.isDestroyed()) return false;
    const p = screen.getCursorScreenPoint();
    const b = rendererWindow.getBounds();
    return p.x >= b.x && p.x < b.x + b.width && p.y >= b.y && p.y < b.y + b.height;
});

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

// The mount menu keeps out of the way while the in-game map is open, a loading screen is up, the
// game is minimized or another program's window is over the menu (the overlay relays all of
// these). It is hidden and shown again without changing whether the player has it open.
let gameMapOpen = false;
let gameLoadingScreen = false;
let gameCover: IGameCover = { minimized: false, rects: [] };

// The parts of a window at `b` (screen DIP) that no other program's window covers, relative to
// the window: `b` minus every cover rect, as rectangles. Our own windows never appear in the cover
// rects (the service skips this app's processes), so the menu can't cut itself.
function uncoveredParts(b: Rectangle): Rectangle[] {
    let parts: Rectangle[] = [{ x: 0, y: 0, width: b.width, height: b.height }];
    for (const c of gameCover.rects) {
        // Whole pixels, rounded outwards so no sliver of the menu shows over the other window.
        const x0 = Math.floor(c.x - b.x), y0 = Math.floor(c.y - b.y);
        const x1 = Math.ceil(c.x + c.width - b.x), y1 = Math.ceil(c.y + c.height - b.y);
        const next: Rectangle[] = [];
        for (const p of parts) {
            if (x0 >= p.x + p.width || x1 <= p.x || y0 >= p.y + p.height || y1 <= p.y) {
                next.push(p);
                continue;
            }
            // Up to four pieces around the cut: full-width above and below, then left and right.
            const top = Math.max(p.y, y0), bottom = Math.min(p.y + p.height, y1);
            if (top > p.y) { next.push({ x: p.x, y: p.y, width: p.width, height: top - p.y }); }
            if (bottom < p.y + p.height) { next.push({ x: p.x, y: bottom, width: p.width, height: p.y + p.height - bottom }); }
            if (x0 > p.x) { next.push({ x: p.x, y: top, width: x0 - p.x, height: bottom - top }); }
            if (x1 < p.x + p.width) { next.push({ x: x1, y: top, width: p.x + p.width - x1, height: bottom - top }); }
        }
        parts = next;
    }
    return parts;
}

// `b`: where the menu is (or will be). Other programs' windows don't hide it: they are cut out of
// it (see applyMountsGameVisibility), unless nothing is left.
function mountsHiddenByGame(b: Rectangle) {
    // Not hidden in the middle of the player's own drag: it is re-checked when the drag ends.
    return gameMapOpen || gameLoadingScreen || gameCover.minimized || (!mountsDrag && uncoveredParts(b).length === 0);
}

// Windows currently cut with setShape.
const cutWindows = new WeakSet<BrowserWindow>();

// Draws (and takes clicks on) only `parts` of a window at `b`, so it looks as if other windows are
// in front of it. With nothing left the last shape stays: an empty one would mean "uncut".
function cutWindow(win: BrowserWindow, b: Rectangle, parts: Rectangle[]) {
    if (parts.length === 0) { return; }
    const whole = parts.length === 1 && parts[0].width === b.width && parts[0].height === b.height;
    if (!whole) {
        win.setShape(parts);
        cutWindows.add(win);
    } else if (cutWindows.has(win)) {
        // An empty shape makes the window rectangular again.
        win.setShape([]);
        cutWindows.delete(win);
    }
}

// The bar at the top (config button window) sits behind other programs' windows like the mount
// menu, but stays up for the map and loading screens. `b`: where it is about to be, when resizing.
function applyConfigButtonGameVisibility(b?: Rectangle) {
    if (!configButton || configButton.isDestroyed()) { return; }
    const bounds = b ?? configButton.getBounds();
    const parts = uncoveredParts(bounds);
    if (gameCover.minimized || parts.length === 0) {
        if (configButton.isVisible()) { configButton.hide(); }
        return;
    }
    cutWindow(configButton, bounds, parts);
    if (!configButton.isVisible()) {
        configButton.showInactive();
    }
}

function applyMountsGameVisibility() {
    const win = openWindows['mounts'];
    if (!win || win.isDestroyed()) { return; }
    const bounds = win.getBounds();
    if (mountsHiddenByGame(bounds)) {
        stopMountDrag();
        if (win.isVisible()) { win.hide(); }
        return;
    }
    // Like the overlay, the menu looks as if other windows are in front of it: only its uncovered
    // parts are drawn (and clickable), also while it is dragged.
    cutWindow(win, bounds, uncoveredParts(bounds));
    if (!win.isVisible()) {
        win.showInactive();
    }
}

ipcMain.on(IPC.MapOpen, (event, open: boolean) => {
    gameMapOpen = !!open;
    if (open) overlayClickThrough();
    applyMountsGameVisibility();
});

ipcMain.on(IPC.LoadingScreen, (event, loading: boolean) => {
    gameLoadingScreen = !!loading;
    if (loading) overlayClickThrough();
    applyMountsGameVisibility();
});

ipcMain.on(IPC.GameCover, (event, cover: IGameCover) => {
    gameCover = { minimized: !!cover?.minimized, rects: cover?.rects ?? [] };
    if (gameCover.minimized) overlayClickThrough();
    applyMountsGameVisibility();
    applyConfigButtonGameVisibility();
});

// Reopens the mount menu at startup if the player left it showing.
export function restoreMountsWindow() {
    if (GetSettings()?.overlaySettings?.mounts?.open && !openWindows['mounts'] && rendererWindow) {
        openWindows['mounts'] = createWindow(rendererWindow, 'mounts');
        applyMountsGameVisibility();
    }
}

// Only the player's own open/close goes through IPC.Window.Open, so this is the place to
// remember it: windows closing because the app quits must not count as closing the menu.
function rememberMountsOpen(open: boolean) {
    const settings = GetSettings();
    if (!settings?.overlaySettings?.mounts || settings.overlaySettings.mounts.open === open) { return; }
    settings.overlaySettings.mounts.open = open;
    settings.saveConfig();
}

ipcMain.on(IPC.Window.Open, (event, arg: { show: boolean, path: string }) => {
    if (arg.path === 'mounts') {
        rememberMountsOpen(arg.show);
    }
    if (arg.show) {
        if (!openWindows[arg.path]) {
            openWindows[arg.path] = createWindow(rendererWindow!, arg.path);
            if (arg.path === 'mounts') { applyMountsGameVisibility(); }
        }
    } else {
        const win = openWindows[arg.path];
        if (win) {
            win.close();
            openWindows[arg.path] = undefined;
        }
    }
});

// The mount menu covers a chunk of the game. Everything that is not a button must be
// click-through, otherwise the window swallows clicks meant for Guild Wars 2. The renderer
// tracks which regions are interactive and asks us to toggle this.
ipcMain.on(IPC.Mounts.SetClickable, (event, clickable: boolean) => {
    const win = openWindows['mounts'];
    if (!win || win.isDestroyed()) { return; }
    // forward:true keeps mouse-move events flowing so the renderer can still tell when the
    // cursor enters an interactive region and re-enable clicking.
    win.setIgnoreMouseEvents(!clickable, { forward: true });
});

// The mount window needs to know where it is on screen so its fan points inwards instead of
// off the edge (a window near the left edge should be a half circle, a corner a quarter).
ipcMain.on(IPC.Mounts.GetPosition, (event) => {
    const win = openWindows['mounts'];
    if (!win || win.isDestroyed()) { return; }
    const b = win.getBounds();
    placeMounts(win, mountsHub ?? { x: b.x + b.width / 2, y: b.y + b.height / 2 });
});

// Grip drag. The page reports press and release; in between we move the window with the
// cursor from here. That is as smooth as a native drag (no IPC per mouse move, which was
// visibly laggy) without -webkit-app-region, whose OS-owned area hides mouse events from the
// page and kept breaking the click-through handling.
ipcMain.on(IPC.Mounts.DragStart, () => {
    const win = openWindows['mounts'];
    if (!win || win.isDestroyed()) { return; }
    stopMountDrag();

    // The hub follows the cursor, keeping the offset at which the grip was grabbed.
    const cursor = screen.getCursorScreenPoint();
    const start = mountsHub ?? cursor;
    const offsetX = cursor.x - start.x;
    const offsetY = cursor.y - start.y;
    let last = { x: NaN, y: NaN };

    mountsDrag = setInterval(() => {
        if (win.isDestroyed()) { stopMountDrag(); return; }
        const c = screen.getCursorScreenPoint();
        if (c.x === last.x && c.y === last.y) { return; }
        last = c;
        placeMounts(win, { x: c.x - offsetX, y: c.y - offsetY });
    }, 16);
});

// Settings button: put the menu back in the middle of the primary display and forget the
// saved position.
ipcMain.on(IPC.Mounts.ResetPosition, () => {
    stopMountDrag();
    mountsHub = null;
    saveMountsHub();
    const win = openWindows['mounts'];
    if (win && !win.isDestroyed()) {
        placeMounts(win, primaryCentre());
    }
});

ipcMain.on(IPC.Mounts.DragEnd, () => {
    stopMountDrag();
});
