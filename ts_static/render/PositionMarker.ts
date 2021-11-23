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
      var sprite = makeTextSprite3(marker.text);
      sprite.position.set(marker.text.offset.X, marker.text.offset.Y, marker.text.offset.Z);
      markerGroup.add(sprite);
    }
    markerGroup.userData = {
      mouseover: marker.markerMouseoverData,
        autoScale: true,
        
    }
    if (marker.text) {
        markerGroup.userData.onAfterRender = (camerapos: ICameraPositionResult, scene: THREE.Scene) => {
            sprite.visible = markerGroup.position.distanceTo(camerapos.playerposition) < 200;
        }
    }
    return markerGroup;
  }