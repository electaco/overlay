import * as THREE from 'three';
import { IPositionMarker } from "../../src/shared/interfaces/render/marker";
import { ICameraPositionResult } from './CameraPositionManager';
import { createMarkerIcon } from "./MarkerIcon";
import { TroikaTextSprite } from './textsprite';

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
    markerGroup.userData = {
      mouseover: marker.markerMouseoverData,
      lookAtUser: true,
      onMouseOverEnter: () => {
        showMarkerName = true;
      },
      onMouseOverExit: () => {
        showMarkerName = false;
      },
      onAfterRender: (camerapos: ICameraPositionResult, scene: THREE.Scene, camera) => {
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