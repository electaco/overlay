// For class-transformer
import 'reflect-metadata';
import { IPC } from '../../src/shared/IPC';

const { screen } = require('electron')
import { getRenderWindow } from "./windows";

var mousePoint = { x: 0, y: 0 };

var transformRange = (value, r2) => {
  var scale = 2 / r2;
  return (value * scale) - 1;
}

export function OnMouseClick(button:string) {
  let np = getMouseCursorPosition(screen.getCursorScreenPoint());
  if (np) {
    np.button = button;
    getRenderWindow()?.webContents.send(IPC.MouseClick, np);
    console.log("Mouse click: ",np);
  }
}

export function InitializeMouseMove() {
  mouseCursorCheckInterval = setInterval(MouseOver, 300);
}

function MouseOver() {
  var point = screen.getCursorScreenPoint();
  if (point.x == mousePoint.x || point.y == mousePoint.y) return;
  let np = getMouseCursorPosition(point);
  if (np) {
    getRenderWindow()?.webContents.send(IPC.MouseMove, np);
  }
  mousePoint = point;
}

function getMouseCursorPosition(point) {
  let np = null;
  let display = screen.getPrimaryDisplay();
  var boundRect = display.bounds;
  if (point.x > boundRect.x && point.x < boundRect.width) {
    np = {
      x: transformRange(point.x, boundRect.width),
      y: transformRange(point.y, boundRect.height) * -1,
    };
    
  }
  return np;
}

let mouseCursorCheckInterval = null;