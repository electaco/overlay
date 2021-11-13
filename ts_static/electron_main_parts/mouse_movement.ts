import { getRenderWindow } from "./windows";

var mousePoint = { x: 0, y: 0 };

var transformRange = (value, r2) => {
  var scale = 2 / r2;
  return (value * scale) - 1;
}

let myscreen = null;

export function InitializeMouseMove(ascreen) {
  myscreen = ascreen;
  mouseCursorCheckInterval = setInterval(getMouseCursorPosition, 300);
}

function getMouseCursorPosition() {
  var point = myscreen.getCursorScreenPoint();

  if (point.x != mousePoint.x || point.y != mousePoint.y) {
    let display = myscreen.getPrimaryDisplay();
    var boundRect = display.bounds;
    if (point.x > boundRect.x && point.x < boundRect.width) {
      var np = {
        x: transformRange(point.x, boundRect.width),
        y: transformRange(point.y, boundRect.height) * -1,
      };
      getRenderWindow()?.webContents.send("mousemove", np);
    }
    mousePoint = point;
  }

}

let mouseCursorCheckInterval = null;