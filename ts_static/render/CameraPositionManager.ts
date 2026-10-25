import * as THREE from 'three';
import { IPosition } from '../../src/shared/interfaces/common';
import { IGw2MumbleLinkData } from '../../src/shared/interfaces/datatransfer/IGw2MumbleLinkData';

// Camera samples arrive at the game's frame rate, unrelated to the display's vsync. Drawing the
// newest sample as-is makes the camera step by uneven amounts between presented frames, which
// shows as marker jitter. Instead each frame is rendered at a time slightly in the past, between
// two samples. Set INTERPOLATE to false to use the newest sample (no added latency).
const INTERPOLATE = true;
// Render delay = DELAY_SCALE * the estimated sample interval. 1.0 keeps two samples to blend
// between; lower trades smoothness for latency, 0 is the same as no delay.
const DELAY_SCALE = 1.0;
const MAX_DELAY_MS = 40;
// Longer gaps are stalls or standing still (the service only sends on change), not the rate.
const MAX_INTERVAL_MS = 100;
const INTERVAL_EMA = 0.2;
const MAX_SAMPLES = 8;
// A camera moving further than this between two samples is a teleport or map change: no blending.
const TELEPORT_DISTANCE = 20;

export interface ICameraPositionManager {
    SetPosition(coordinates: IGw2MumbleLinkData): void;
    Advance(now: number): void;
    GetPosition(): ICameraPositionResult;
    UpdateCameraPosition(camera: THREE.PerspectiveCamera): void;
  }

export interface ICameraPositionResult {
    position: THREE.Vector3;
    target: THREE.Vector3;
    playerposition: THREE.Vector3;
    fov: number;
}

interface ICameraSample {
    t: number;
    camPos: THREE.Vector3;
    camFront: THREE.Vector3;
    playerPos: THREE.Vector3;
    fov: number;
}

function v3ize(data: IPosition) {
  return new THREE.Vector3(data.Z, data.Y, data.X);
}

export class CameraPositionManager implements ICameraPositionManager {
    private samples: ICameraSample[] = [];
    private intervalMs = 0;
    // Reused every frame; GetPosition hands out this same object.
    private current: ICameraPositionResult = {
      position: new THREE.Vector3(),
      target: new THREE.Vector3(),
      playerposition: new THREE.Vector3(),
      fov: 0
    };
    private front = new THREE.Vector3();
    isReady: boolean = false;

    UpdateCameraPosition(camera: THREE.PerspectiveCamera): void {
      if (!this.isReady) return;
  
      let cameraData = this.GetPosition();
      camera.position.set(cameraData.position.x, cameraData.position.y, cameraData.position.z);
      camera.lookAt(cameraData.target);
  
      if (cameraData.fov != camera.fov) {
        camera.fov = cameraData.fov;
        camera.updateProjectionMatrix();
      }
    }
  
    SetPosition(result: IGw2MumbleLinkData) {
      const now = performance.now();
      const sample: ICameraSample = {
        t: now,
        camPos: v3ize(result.coordinates.cameraPosition),
        camFront: v3ize(result.coordinates.cameraAngle).normalize(),
        playerPos: v3ize(result.coordinates.playerPosition),
        fov: result.identity.FovDegrees
      };

      const last = this.samples[this.samples.length - 1];
      if (last) {
        if (last.camPos.distanceTo(sample.camPos) > TELEPORT_DISTANCE) {
          this.samples.length = 0;
        } else {
          const dt = now - last.t;
          if (dt <= MAX_INTERVAL_MS) {
            this.intervalMs = this.intervalMs ? this.intervalMs + (dt - this.intervalMs) * INTERVAL_EMA : dt;
          }
        }
      }
      this.samples.push(sample);
      if (this.samples.length > MAX_SAMPLES) this.samples.shift();

      // Until the first Advance there is nothing else to show.
      if (!this.isReady) this.apply(sample);
      this.isReady = true;
    }

    // Computes the camera state for the frame about to be rendered; call once per frame.
    Advance(now: number): void {
      const s = this.samples;
      if (s.length === 0) return;
      const newest = s[s.length - 1];
      if (!INTERPOLATE || s.length === 1) {
        this.apply(newest);
        return;
      }

      const delay = Math.min(Math.max(this.intervalMs * DELAY_SCALE, 0), MAX_DELAY_MS);
      const rt = now - delay;
      if (rt >= newest.t) {
        // No extrapolation: hold the newest sample.
        this.apply(newest);
        return;
      }
      if (rt <= s[0].t) {
        this.apply(s[0]);
        return;
      }
      let i = s.length - 1;
      while (i > 0 && s[i - 1].t > rt) i--;
      const a = s[i - 1], b = s[i];
      const k = (rt - a.t) / (b.t - a.t);

      const cur = this.current;
      cur.position.lerpVectors(a.camPos, b.camPos, k);
      cur.playerposition.lerpVectors(a.playerPos, b.playerPos, k);
      this.front.lerpVectors(a.camFront, b.camFront, k);
      if (this.front.lengthSq() < 1e-9) this.front.copy(b.camFront);
      this.front.normalize();
      cur.target.copy(cur.position).add(this.front);
      cur.fov = b.fov;
    }

    private apply(sample: ICameraSample) {
      const cur = this.current;
      cur.position.copy(sample.camPos);
      cur.target.copy(sample.camPos).add(sample.camFront);
      cur.playerposition.copy(sample.playerPos);
      cur.fov = sample.fov;
    }
  
    GetPosition(): ICameraPositionResult {
      return this.current;
    }
  }
