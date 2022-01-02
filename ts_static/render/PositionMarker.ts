import * as THREE from 'three';
import { IPositionMarker } from "../../src/shared/interfaces/render/marker";
import { ICameraPositionResult } from './CameraPositionManager';
import { createMarkerIcon } from "./MarkerIcon";
import { makeTextSprite3 } from './textsprite';

export function CreateMarker(marker: IPositionMarker) {
    const markerGroup = new THREE.Group();
    markerGroup.position.set(marker.position.X, marker.position.Y, marker.position.Z);
    markerGroup.name = "Hello world";
    if (marker.icon) {
      let icon = createMarkerIcon(marker.icon);
      markerGroup.add(icon);
  
    }

    if (marker.text) {
      var textSprite = makeTextSprite3(marker.text);
      textSprite.position.set(marker.text.offset.X, marker.text.offset.Y, marker.text.offset.Z);
      markerGroup.add(textSprite);
  }
  
  let showMarkerName = false;
    markerGroup.userData = {
      mouseover: marker.markerMouseoverData,
      onMouseOverEnter: () => {
        showMarkerName = true;
      },
      onMouseOverExit: () => {
        showMarkerName = false;
      },
      onAfterRender: (camerapos: ICameraPositionResult, scene: THREE.Scene) => {
        var distance = markerGroup.position.distanceTo(camerapos.playerposition);
        if (marker.text?.showDistance) {
          textSprite.visible = distance < marker.text.showDistance || showMarkerName;
        }
        distance = THREE.MathUtils.clamp(distance, 10, 1500);
        var scale = THREE.MathUtils.mapLinear(distance, 5, 1500, 1.4, 0.0001);
        markerGroup.scale.set(scale, scale, scale);
      }
    }
    return markerGroup;
  }