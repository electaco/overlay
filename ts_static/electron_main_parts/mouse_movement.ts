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


export function InitializeMouseMove() {
  mouseCursorCheckInterval = setInterval(getMouseCursorPosition, 300);
}

function getMouseCursorPosition() {
  try {
    var point = screen.getCursorScreenPoint();

    if (point.x != mousePoint.x || point.y != mousePoint.y) {
      let display = screen.getPrimaryDisplay();
      var boundRect = display.bounds;
      if (point.x > boundRect.x && point.x < boundRect.width) {
        var np = {
          x: transformRange(point.x, boundRect.width),
          y: transformRange(point.y, boundRect.height) * -1,
        };
        getRenderWindow()?.webContents.send(IPC.MouseMove, np);
      }
      mousePoint = point;
    }
  } catch (error) {
    if (error.message !== "Object has been destroyed") {
      console.error("An unexpected error occurred:", error);
    }
    // Otherwise, silently ignore the "Object has been destroyed" error
  }
}

let mouseCursorCheckInterval: NodeJS.Timer|null = null;