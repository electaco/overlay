//let win = require('electron').remote.getCurrentWindow();

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

window.config.on("update_downloaded", (evt, arg)=> {
    document.getElementById("updatestatus").className = "";
});

window.config.on("update_available", (evt, arg)=> {
    document.getElementById("updatestatus_download").className = "";
});