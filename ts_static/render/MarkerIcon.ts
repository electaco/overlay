import { IMarkerIcon } from "../../src/shared/interfaces/render/marker";
import * as THREE from 'three';

const materialMap: Array<THREE.SpriteMaterial> = [];

function getMarkerIconMaterial(icon: IMarkerIcon) {
  var key = icon.color +"-" +  icon.icon;
  if (!materialMap[key]) {
    const map = new THREE.TextureLoader().load( icon.icon );
    const material = new THREE.SpriteMaterial( { map: map} );
    material.color.set(icon.color);
    material.sizeAttenuation = false;
    materialMap[key] = material;
  }
  
  return materialMap[key];
}

export function createMarkerIcon(icon: IMarkerIcon) {
  const sprite = new THREE.Sprite( getMarkerIconMaterial(icon) );
  sprite.center.set(0.5, 0);
  const spriteScale = 0.02;
  sprite.scale.set(spriteScale, spriteScale, spriteScale);
  sprite.layers.enable(2);
  return sprite;
}