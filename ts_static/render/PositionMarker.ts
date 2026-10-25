import * as THREE from 'three';
import { IPositionMarker } from "../../src/shared/interfaces/render/marker";
import { ICameraPositionResult } from './CameraPositionManager';
import { createMarkerIcon } from "./MarkerIcon";
import { TroikaTextSprite } from './textsprite';
import { BarTargetOf } from './MarkerActions';

// Where the action bar hangs for a marker: just right of its icon, vertically centred on it.
// The icon is a sprite without size attenuation, drawn `scale / tan(fov / 2)` of half the view's
// height tall and as wide, standing on the marker's position.
export function MarkerBarAnchor(group: THREE.Object3D, camera: THREE.PerspectiveCamera, width: number, height: number) {
  const p = group.position.clone().project(camera);
  if (p.z > 1 || p.z < -1) return null;
  const size = (group.userData.icon as THREE.Object3D | undefined)?.scale.y ?? 0.02;
  const iconPx = size / Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * height / 2;
  const x = (p.x + 1) / 2 * width, y = (1 - p.y) / 2 * height;
  return { x: x + iconPx / 2 + 6, y: y - iconPx / 2 };
}

export function CreateMarker(marker: IPositionMarker) {
    const markerGroup = new THREE.Group();
    markerGroup.position.set(marker.position.X, marker.position.Y, marker.position.Z);
    markerGroup.name = "Hello world";
    if (marker.icon) {
      var icon = createMarkerIcon(marker.icon);
      markerGroup.add(icon);
  
    }

    if (marker.text) {
      var textSprite = TroikaTextSprite(marker.text);
      textSprite.position.set(marker.text.offset.X, marker.text.offset.Y, marker.text.offset.Z);
      markerGroup.add(textSprite);
  }
  
  let showMarkerName = false;
    const barTarget = BarTargetOf(marker);
    markerGroup.userData = {
      mouseover: marker.markerMouseoverData,
      barTarget,
      icon: marker.icon ? icon! : null,
      lookAtUser: true,
      onMouseOverEnter: () => {
        showMarkerName = true;
      },
      onMouseOverExit: () => {
        showMarkerName = false;
      },
      // Runs every frame before rendering, with the camera that frame is drawn with.
      onFrame: (camerapos: ICameraPositionResult, scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
        var distance = markerGroup.position.distanceTo(camerapos.playerposition);
        if (marker.text?.showDistance) {
          textSprite.visible = distance < marker.text.showDistance || showMarkerName;
        }
        //distance = THREE.MathUtils.clamp(distance, 10, 1500);
        var scale = THREE.MathUtils.mapLinear(distance, 5, 1500, .02, 0.000012);

        if (marker.text) {
          var textScale = THREE.MathUtils.mapLinear(distance, 1, 1500, 1, 100);
          var textOffset = THREE.MathUtils.mapLinear(distance, 5, 1500, 0, 15);
          textSprite.position.set(marker.text.offset.X, marker.text.offset.Y + textOffset, marker.text.offset.Z);
          textSprite.scale.set(textScale, textScale, textScale);
          if (textSprite.visible) {
            textSprite.lookAt(camera.position);
          }
        }
        if (marker.icon) {
          icon.scale.set(scale, scale, scale);
        }
      }
    }
    return markerGroup;
  }