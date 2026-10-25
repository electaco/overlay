import * as THREE from 'three';
import { IArrowCandidate } from '../../src/shared/interfaces/render/renderdata';
import { ICameraPositionResult } from './CameraPositionManager';

// The marker arrow: a shaded 3D arrow floating a few metres ahead of the camera, a little above
// the middle of the view, pointing straight at the nearest candidate marker (the render data's
// `arrow`, see Settings.arrowCandidates), up and down included. A small label under it gives the
// marker's name, distance, pack and whether it is well above or below. The label is plain DOM so
// its text stays sharp.

const ARROW_DISTANCE = 3;     // metres in front of the camera
const ARROW_RAISE = 0.55;     // metres above the view's centre line
const HEIGHT_HINT_M = 5;
const COLOR = 0xffc94d;

const STYLE = `
#arrowlabel {
  position: fixed; transform: translate(-50%, 0); padding: 4px 10px; text-align: center;
  background: rgba(14, 16, 20, 0.7); border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 8px;
  color: #fff; font: 600 15px "Segoe UI", system-ui, sans-serif; pointer-events: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6); white-space: nowrap;
}
#arrowlabel[hidden] { display: none; }
#arrowlabel .detail { font-size: 12px; font-weight: 400; color: rgba(255, 255, 255, 0.75); }
`;

function buildArrow(): THREE.Group {
  const material = new THREE.MeshLambertMaterial({ color: COLOR, emissive: 0x4a3200, depthTest: false, transparent: true });
  const outline = new THREE.MeshBasicMaterial({ color: 0x141414, side: THREE.BackSide, depthTest: false, transparent: true });
  const group = new THREE.Group();
  // Built along +Z, the axis Object3D.lookAt() points at the target.
  const parts: [THREE.BufferGeometry, number][] = [
    [new THREE.CylinderGeometry(0.05, 0.05, 0.36, 20), -0.06],
    [new THREE.ConeGeometry(0.15, 0.3, 28), 0.27],
  ];
  for (const [geometry, z] of parts) {
    geometry.rotateX(Math.PI / 2);
    geometry.translate(0, 0, z);
    const body = new THREE.Mesh(geometry, material);
    const edge = new THREE.Mesh(geometry, outline);
    edge.scale.setScalar(1.12);
    edge.renderOrder = 10;
    body.renderOrder = 11;
    group.add(edge, body);
  }
  group.visible = false;
  group.userData.SkipRemove = true;
  return group;
}

export class ArrowHud {
  private arrow: THREE.Group;
  private label: HTMLDivElement;
  private name: HTMLDivElement;
  private detail: HTMLDivElement;
  private candidates: { pos: THREE.Vector3; data: IArrowCandidate }[] = [];
  private lastText = "";

  constructor(scene: THREE.Scene) {
    this.arrow = buildArrow();
    scene.add(this.arrow);
    // Lights only affect the arrow; every other overlay material is unlit.
    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(0.4, 1, 0.3);
    for (const light of [ambient, sun]) {
      light.userData.SkipRemove = true;
      scene.add(light);
    }

    const style = document.createElement('style');
    style.textContent = STYLE;
    document.head.appendChild(style);
    this.label = document.createElement('div');
    this.label.id = 'arrowlabel';
    this.label.hidden = true;
    this.label.innerHTML = `<div class="name"></div><div class="detail"></div>`;
    this.name = this.label.querySelector('.name')!;
    this.detail = this.label.querySelector('.detail')!;
    document.body.appendChild(this.label);
  }

  SetCandidates(candidates: IArrowCandidate[] | undefined) {
    this.candidates = (candidates ?? []).map((data) => ({
      data,
      pos: new THREE.Vector3(data.position.X, data.position.Y, data.position.Z),
    }));
  }

  // Every frame before rendering, with the camera that frame uses.
  Update(position: ICameraPositionResult, camera: THREE.Camera, visible: boolean) {
    if (!visible || this.candidates.length === 0) {
      this.arrow.visible = false;
      this.label.hidden = true;
      return;
    }
    const player = position.playerposition;
    let best = this.candidates[0];
    let bestDistance = Infinity;
    for (const c of this.candidates) {
      const d = c.pos.distanceTo(player);
      if (d < bestDistance) {
        best = c;
        bestDistance = d;
      }
    }

    camera.updateMatrixWorld();
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
    this.arrow.position.copy(camera.position).addScaledVector(forward, ARROW_DISTANCE).addScaledVector(up, ARROW_RAISE);
    this.arrow.lookAt(best.pos);
    this.arrow.visible = true;

    // Label just under the arrow.
    const anchor = this.arrow.position.clone().addScaledVector(up, -0.32).project(camera);
    this.label.style.left = ((anchor.x + 1) / 2 * window.innerWidth).toFixed(0) + "px";
    this.label.style.top = ((1 - anchor.y) / 2 * window.innerHeight).toFixed(0) + "px";

    const dy = best.pos.y - player.y;
    const height = Math.abs(dy) >= HEIGHT_HINT_M ? `  ·  ${dy > 0 ? "▲" : "▼"} ${Math.round(Math.abs(dy))} m` : "";
    const text = `${best.data.name}|${Math.round(bestDistance)} m  ·  ${best.data.group}${height}`;
    if (text !== this.lastText) {
      this.lastText = text;
      const [name, detail] = text.split("|");
      this.name.textContent = name;
      this.detail.textContent = detail;
    }
    this.label.hidden = false;
  }
}
