//let win = require('electron').remote.getCurrentWindow();

window.config = {
    send: (channel, arg) => {
        const validChannels = [
            'resize', 'exit', 'download_update', 'restart_app', 'show-page',
        ];
        if (validChannels.includes(channel)) {
            window.electaco.config.send(channel, arg);
        }
    },
    on: (channel, callback) => {
        const validChannels = [
            'connstatus', 'update_downloaded', 'update_available',
        ];
        if (validChannels.includes(channel)) {
            // preload already strips the IPC event, so hand the callback through as-is.
            return window.electaco.config.on(channel, callback);
        }
    },
    removeAllListeners: (channel) => {
        window.electaco.config.removeAllListeners(channel);
    },
};

const menuHeader = document.getElementById('header')
const mouseTarget = document.getElementById('app');

const minHeight = menuHeader.offsetHeight;
const minWidth = menuHeader.offsetWidth;
const maxHeight = mouseTarget.offsetHeight;
const maxWidth = mouseTarget.offsetWidth;

window.config.send("resize", {w: minWidth, h: minHeight});

//win.setSize(minWidth, minHeight);

mouseTarget.addEventListener('mouseenter', e => {
    window.config.send("resize", {w: maxWidth, h: maxHeight});
  });

mouseTarget.addEventListener('mouseleave', e => {
    window.config.send("resize", {w: minWidth, h: minHeight});
});

function exit_program() {
    window.config.send("exit", "");
}

function download_update() {
    window.config.send("download_update", "");
    document.getElementById("updatestatus_download").className = "hidden";
}

function restart_app() {
    window.config.send("restart_app", "");
}

function openWindow(name) {
    window.config.send("show-page", {path: name, show:true});
}

window.config.on("connstatus", (arg)=> {
    let item = document.getElementById("connstatus");
    item.className = arg;
});

window.config.on("update_downloaded", (arg)=> {
    document.getElementById("updatestatus").className = "";
});

window.config.on("update_available", (arg)=> {
    document.getElementById("updatestatus_download").className = "";
});