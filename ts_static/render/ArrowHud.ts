import * as THREE from 'three';
import { IArrowCandidate } from '../../src/shared/interfaces/render/renderdata';
import { ICameraPositionResult } from './CameraPositionManager';

// The marker arrow: a small shaded 3D arrow at the character's feet, pointing straight at the
// nearest candidate marker (the render data's `arrow`, see Settings.arrowCandidates), up and down
// included. It is drawn over the character. A small label under it gives the marker's name,
// distance, pack and whether it is well above or below. The label is plain DOM so its text stays
// sharp.

const ARROW_RAISE = -0.35;    // metres from the character's position, which is about knee high
const ARROW_SCALE = 0.8;
// The game's character position steps out of time with its camera, so the arrow's place is
// smoothed in view space (where the character barely moves while running or turning the camera).
const SMOOTH_MS = 250;
const SNAP_M = 4;             // further than this from the smoothed place (teleports): jump there
const HEIGHT_HINT_M = 5;
const COLOR = 0xffc94d;

export interface CoverRect { x: number; y: number; w: number; h: number }

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
  // A flat, bevelled arrow lying face up, so its outline shows the direction from the usual
  // camera above and behind the character.
  const shape = new THREE.Shape();
  shape.moveTo(-0.08, -0.35);
  shape.lineTo(0.08, -0.35);
  shape.lineTo(0.08, 0.05);
  shape.lineTo(0.2, 0.05);
  shape.lineTo(0, 0.35);
  shape.lineTo(-0.2, 0.05);
  shape.lineTo(-0.08, 0.05);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.015, bevelSegments: 2,
  });
  geometry.translate(0, 0, -0.025);
  // Tip from +Y to +Z, the axis Object3D.lookAt() points at the target; the face then looks up.
  geometry.rotateX(Math.PI / 2);
  const body = new THREE.Mesh(geometry, material);
  const edge = new THREE.Mesh(geometry, outline);
  edge.scale.setScalar(1.1);
  edge.renderOrder = 10;
  body.renderOrder = 11;
  group.add(edge, body);
  group.scale.setScalar(ARROW_SCALE);
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
  private viewOffset: THREE.Vector3 | null = null;
  private lastFrame = 0;

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

  // Every frame before rendering, with the camera that frame uses. `covers` are the parts of the
  // screen other windows are over, in CSS pixels; the label is DOM and can't be cut out like the canvas.
  Update(position: ICameraPositionResult, camera: THREE.Camera, visible: boolean, covers: CoverRect[]) {
    if (!visible || this.candidates.length === 0) {
      this.arrow.visible = false;
      this.label.hidden = true;
      this.viewOffset = null;
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
    this.arrow.position.copy(this.smoothedFeet(player, camera));
    this.arrow.lookAt(best.pos);
    this.arrow.visible = true;

    // Label just under the arrow.
    const anchor = this.arrow.position.clone().add(new THREE.Vector3(0, -0.3, 0)).project(camera);
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
    if (covers.length > 0) {
      const b = this.label.getBoundingClientRect();
      this.label.hidden = covers.some((c) =>
        c.x < b.right && c.x + c.w > b.left && c.y < b.bottom && c.y + c.h > b.top);
    }
  }

  // Where the arrow goes: under the character's feet, smoothed as seen from the camera.
  private smoothedFeet(player: THREE.Vector3, camera: THREE.Camera): THREE.Vector3 {
    const now = performance.now();
    const dt = this.lastFrame ? now - this.lastFrame : 0;
    this.lastFrame = now;
    const toView = camera.quaternion.clone().invert();
    const feet = new THREE.Vector3(player.x, player.y + ARROW_RAISE, player.z);
    const offset = feet.sub(camera.position).applyQuaternion(toView);
    if (!this.viewOffset || this.viewOffset.distanceTo(offset) > SNAP_M) {
      this.viewOffset = offset;
    } else {
      this.viewOffset.lerp(offset, 1 - Math.exp(-dt / SMOOTH_MS));
    }
    return this.viewOffset.clone().applyQuaternion(camera.quaternion).add(camera.position);
  }
}
