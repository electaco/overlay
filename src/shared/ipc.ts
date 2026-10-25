// If text here is changed, please check 
// public\config_button.js too and make sure 
// they are the same.

export const IPC = {
    Marker: {
        Add: "addMarker",
        Remove: "removeMarker",
        Update: "updateMarker",
        NewGroup: "newMarkerGroup",
        LoadGroup: "loadmarkergroup",
        RemoveGroup: "removeMarkerGroup",
        SaveGroup: "savemarkergroup",
        LoadJson: "loadmarkergroup_json",
        ChangeType: "markertype-change",
    },
    Settings: {
        Get: "getsettings",
        Set: "setsettings",
        Update: "updateconfig"
    },
    Debug: {
        DebugWindowRender: "debugrenderer",
        DebugWindow: "debug-window",
        ReloadRender: "reloadRender",
    },
    Window: {
        ResizeConfig: "resize",
        Open: "show-page",
    },
    Maps: {
        // Main -> windows: the GW2 map table was refreshed from the API.
        Updated: "maps-updated",
        // Window -> main: ask for the current table (on mount).
        Get: "getmaps",
    },
    Mounts: {
        // Main -> mount window: IMountPlacement (src/shared/mounts.ts), so the fan points inwards.
        Position: "mounts-position",
        // Mount window -> main: request that placement.
        GetPosition: "get-mounts-position",
        // Mount window -> main: enable/disable mouse capture for the region under the cursor.
        SetClickable: "set-mounts-clickable",
        // Mount window -> main: the grip was pressed / released. Main moves the window with
        // the cursor in between.
        DragStart: "mounts-drag-start",
        DragEnd: "mounts-drag-end",
        // Settings window -> main: move the menu back to the primary display's centre.
        ResetPosition: "mounts-reset-position",
    },
    GetRender: "getrender",
    Restart: "restart",
    Exit: "exit",
    Render: "render",
    Video: "video",
    Gw2Data: "gw2data",
    CursorInOverlay: "cursor-in-overlay",
    // Overlay renderer -> main: the position service's loading screen state (true/false).
    LoadingScreen: "loadingscreen",
    ConnectionStatus: "connstatus",
    UseFallbackPositionUpdate: "fallback_positionupate",
    UpdateDownloaded: "update_downloaded",
    RestartApp: "restart_app",
    DownloadUpdate: "download_update",
    UpdateAvailable: "update_available",
    SendKeys: "sendkeys",
    Error: "error",
    Log: "log",
    AutoUpdate: {
        UpdateAvailable: "update-available",
        UpdateDownloaded: "update-downloaded",
        CheckingForUpdate: "checking-for-update",
        UpdateNotAvailable: "update-not-available",
        Error: "error"
    }
}