// If text here is changed, please check 
// public\config_button.js too and make sure 
// they are the same.

export const IPC = {
    UI: {
        AddElement: 'UI_AddElement',
        RemoveElement: 'UI_RemoveElement',
        OnClick: 'UI_OnClick',
    },
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
    GetRender: "getrender",
    Restart: "restart",
    Exit: "exit",
    Render: "render",
    Video: "video",
    Gw2Data: "gw2data",
    MouseMove: "mousemove",
    MouseClick: "mouseclick",
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