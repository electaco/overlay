import * as THREE from 'three';
import { IArrowCandidate } from '../../src/shared/interfaces/render/renderdata';
import { ICameraPositionResult } from './CameraPositionManager';

// The marker arrow: a small HUD element at the top centre of the overlay pointing at the nearest
// candidate marker (the render data's `arrow`, see Settings.arrowCandidates), with its name,
// distance and whether it is well above or below. The arrow is turned relative to where the
// camera looks: straight up means ahead. Plain DOM over the WebGL canvas, so text stays sharp.

const HEIGHT_HINT_M = 5;
const STYLE = `
#arrowhud {
  position: fixed; top: 6vh; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 12px; padding: 8px 16px 8px 10px;
  background: rgba(14, 16, 20, 0.72); border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 12px;
  color: #fff; font: 600 16px "Segoe UI", system-ui, sans-serif; pointer-events: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6); white-space: nowrap;
}
#arrowhud[hidden] { display: none; }
#arrowhud svg { width: 34px; height: 34px; flex: none; }
#arrowhud .name { font-size: 16px; }
#arrowhud .detail { font-size: 13px; font-weight: 400; color: rgba(255, 255, 255, 0.75); }
`;

export class ArrowHud {
  private root: HTMLDivElement;
  private arrow: SVGElement;
  private name: HTMLDivElement;
  private detail: HTMLDivElement;
  private candidates: { pos: THREE.Vector3; data: IArrowCandidate }[] = [];
  private lastText = "";

  constructor() {
    const style = document.createElement('style');
    style.textContent = STYLE;
    document.head.appendChild(style);
    this.root = document.createElement('div');
    this.root.id = 'arrowhud';
    this.root.hidden = true;
    this.root.innerHTML = `
      <svg viewBox="-20 -20 40 40"><path d="M0 -17 L13 13 L0 6 L-13 13 Z" fill="#ffd166" stroke="#1a1a1a" stroke-width="2.5" stroke-linejoin="round"/></svg>
      <div><div class="name"></div><div class="detail"></div></div>`;
    this.arrow = this.root.querySelector('svg')!;
    this.name = this.root.querySelector('.name')!;
    this.detail = this.root.querySelector('.detail')!;
    document.body.appendChild(this.root);
  }

  SetCandidates(candidates: IArrowCandidate[] | undefined) {
    this.candidates = (candidates ?? []).map((data) => ({
      data,
      pos: new THREE.Vector3(data.position.X, data.position.Y, data.position.Z),
    }));
  }

  // Every rendered frame, with the camera that frame uses.
  Update(position: ICameraPositionResult, camera: THREE.Camera, visible: boolean) {
    if (!visible || this.candidates.length === 0) {
      this.root.hidden = true;
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

    // Direction in camera space: x right, -z ahead. Turn the arrow by the horizontal angle.
    const toTarget = best.pos.clone().sub(camera.position).applyQuaternion(camera.quaternion.clone().invert());
    const angle = Math.atan2(toTarget.x, -toTarget.z) * 180 / Math.PI;
    this.arrow.style.transform = `rotate(${angle.toFixed(1)}deg)`;

    const dy = best.pos.y - player.y;
    const height = Math.abs(dy) >= HEIGHT_HINT_M ? `  ·  ${dy > 0 ? "▲" : "▼"} ${Math.round(Math.abs(dy))} m` : "";
    const text = `${best.data.name}|${Math.round(bestDistance)} m  ·  ${best.data.group}${height}`;
    if (text !== this.lastText) {
      this.lastText = text;
      const [name, detail] = text.split("|");
      this.name.textContent = name;
      this.detail.textContent = detail;
    }
    this.root.hidden = false;
  }
}
