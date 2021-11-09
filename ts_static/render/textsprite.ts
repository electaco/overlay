import * as THREE from 'three';
import { ITextSprite } from "../../src/shared/interfaces/render/textsprite";

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  
export function makeTextSprite3(textdata: ITextSprite) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var metrics = null,
      canvasHeight = 64,
      canvasWidth = 512,
      border = 4,
      borderpadding = 4,
      borderdistance = border + borderpadding;
  
    metrics = context.measureText(textdata.text);
    var textWidth2 = metrics.width;
  
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.font = "normal " + canvasHeight + "px Arial";
  
    // Draw rect
    var start = (canvasWidth / 2) - (textWidth2 * 2);
    context.fillStyle = "rgba(0,0,0,0.5)";
    context.strokeStyle = "rgba(255,255,255,0.7)";
    context.lineWidth = border;
    roundRect(context, start - borderdistance, border, textWidth2 * 4 + (borderdistance * 2), canvasHeight - border, 8);
  
    // Draw text
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#ff0000";
    context.fillText(textdata.text, canvasWidth / 2, canvasHeight / 2 + 6, textWidth2 * 4);
  
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    var material = new THREE.SpriteMaterial({ map: texture });
    var sprite = new THREE.Sprite(material);
    material.sizeAttenuation = false;
  
    var textObject = new THREE.Object3D();
    const scale = 0.025;
    sprite.scale.set(12 * scale, 1 * scale, 1 * scale);
  
    textObject.add(sprite);
    textObject.userData = { 
      showDistance: textdata.showDistance
    }
    return textObject;
  }