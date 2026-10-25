// The preload runs in a privileged (pre-isolation) context, so it must not depend on
// a global `ipcRenderer` being injected into it. Some pages (e.g. the legacy
// `errorhandler.js`) still expect that global, so it is deliberately bridged below.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, callback) => {
        const subscription = (_event, ...args) => callback(...args);
        ipcRenderer.on(channel, subscription);
        return () => ipcRenderer.removeListener(channel, subscription);
    },
    removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
});

contextBridge.exposeInMainWorld('electaco', {
    ipc: {
        send(channel, ...args) {
            // `restart`/`exit` are handled in electron_main.ts. `gw2data` is bidirectional:
            // the renderer relays its throttled position to main (settings.ts,
            // position_data.ts) so main knows when the map changes. Without it main never
            // has a last position and sendRenderData() silently sends no markers.
            const validChannels = [
                // Main process
                'restart', 'exit', 'sendkeys',
                'fallback_positionupate', 'connstatus', 'log', 'error',
                // Overlay renderer (renderer.ts)
                'gw2data', 'getrender', 'debugrenderer', 'reloadRender', 'loadingscreen',
                // Map table (requesting it from a settings window)
                'getmaps',
                // Mount radial window asking where it was placed, toggling click-through
                // based on what is under the cursor, and dragging from its grip.
                'get-mounts-position', 'set-mounts-clickable',
                'mounts-drag-start', 'mounts-drag-end',
                // Settings window: put the mount menu back in the middle of the screen.
                'mounts-reset-position',
                // Settings / marker windows
                'addMarker', 'removeMarker', 'updateMarker', 'newMarkerGroup',
                'loadmarkergroup', 'removeMarkerGroup', 'savemarkergroup',
                'loadmarkergroup_json', 'markertype-change',
                'getsettings', 'setsettings', 'updateconfig',
                'debug-window', 'show-page',
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, ...args);
            }
        },
        on(channel, callback) {
            const validChannels = [
                // Settings / marker windows
                'setsettings', 'updateconfig', 'connstatus', 'maps-updated',
                // Mount radial window
                'mounts-position',
                // Overlay renderer
                'render', 'gw2data',
                // Auto updater
                'update_downloaded', 'update_available', 'update-downloaded',
                'update-available', 'checking-for-update', 'update-not-available',
                'error',
            ];
            if (validChannels.includes(channel)) {
                const subscription = (_event, ...args) => callback(...args);
                ipcRenderer.on(channel, subscription);
                return () => ipcRenderer.removeListener(channel, subscription);
            }
        },
        removeAllListeners(channel) {
            ipcRenderer.removeAllListeners(channel);
        },
        invoke(channel, args) {
            const validChannels = [
                'getsettings', 'getrender',
                // Overlay renderer: is the cursor still over the overlay window?
                'cursor-in-overlay',
            ];
            if (validChannels.includes(channel)) {
                return ipcRenderer.invoke(channel, ...args);
            }
            return Promise.resolve(undefined);
        },
    },
  config: {
        send(channel, ...args) {
            const validChannels = [
                'resize', 'exit', 'download_update', 'restart_app', 'show-page',
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, ...args);
            }
        },
        on(channel, callback) {
            const validChannels = [
                'connstatus', 'update_downloaded', 'update_available',
            ];
            if (validChannels.includes(channel)) {
                const subscription = (_event, ...args) => callback(...args);
                ipcRenderer.on(channel, subscription);
                return () => ipcRenderer.removeListener(channel, subscription);
            }
        },
        removeAllListeners(channel) {
            ipcRenderer.removeAllListeners(channel);
        },
    },
});
