const { ipcRenderer } = require('electron')

const log = function(text) {
    ipcRenderer.send("log", "ErrorHandler", text);
  }

window.onerror = function (message, source, lineno, colno, error) {
    let data = JSON.stringify({
        message, source, lineno, colno, error
    });
    ipcRenderer.send("error", data);
  };