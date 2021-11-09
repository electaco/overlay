//let win = require('electron').remote.getCurrentWindow();

const menuHeader = document.getElementById('header')
const mouseTarget = document.getElementById('app');

const minHeight = menuHeader.offsetHeight;
const minWidth = menuHeader.offsetWidth;
const maxHeight = mouseTarget.offsetHeight;
const maxWidth = mouseTarget.offsetWidth;

ipcRenderer.send("resize", {w: minWidth, h: minHeight});

//win.setSize(minWidth, minHeight);

mouseTarget.addEventListener('mouseenter', e => {
    ipcRenderer.send("resize", {w: maxWidth, h: maxHeight});
  });

mouseTarget.addEventListener('mouseleave', e => {
    ipcRenderer.send("resize", {w: minWidth, h: minHeight});
});

function exit_program() {
    ipcRenderer.send("exit", "");
}

function openWindow(name) {
    ipcRenderer.send("show-page", {path: name, show:true});
}

ipcRenderer.on("connstatus", (evt, arg)=> {
    let item = document.getElementById("connstatus");
    item.className = arg;
});