// Loaded by the win-* windows (build/index.html) and by config_button.html.
// Uses the preload bridge; the windows no longer have nodeIntegration, so the old
// `require('electron')` here would throw before window.onerror was ever installed.
const ipc = (window.electaco && window.electaco.ipc) || window.ipcRenderer;

window.onerror = function (message, source, lineno, colno, error) {
    if (!ipc) { return; }
    const data = JSON.stringify({
        message, source, lineno, colno, error
    });
    ipc.send("error", data);
};
