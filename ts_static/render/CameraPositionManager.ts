import * as THREE from 'three';
import { IPosition } from '../../src/shared/interfaces/common';
import { IGw2MumbleLinkData } from '../../src/shared/interfaces/datatransfer/IGw2MumbleLinkData';

// Camera samples arrive at the game's frame rate, unrelated to the display's vsync. Drawing the
// newest sample as-is makes the camera step by uneven amounts between presented frames, which
// shows as marker jitter. Instead each frame shows the camera at a render time on a smooth
// timeline through the samples: between two samples when it is in the past, or continued from
// the last two (prediction) when it is ahead of the newest, which makes up for the overlay being
// drawn later than the game's own frame.
export const CameraTuning = {
    // Render time = now + lead * the estimated sample interval. Negative blends in the past
    // (smoothest, laggiest), 0 continues the motion up to now, positive predicts further ahead.
    lead: 0.75,
    // Prediction never goes further than this past the newest sample.
    maxPredictMs: 40,
    // How many sample intervals back prediction measures the motion over. 1 reacts fastest but
    // passes on the samples' noise; more is steadier but slower to follow a change of direction.
    velocitySpan: 1,
    // Off: just the newest sample.
    enabled: true,
};
// Longer gaps are stalls or standing still (the service only sends on change), not the rate.
const MAX_INTERVAL_MS = 100;
const INTERVAL_EMA = 0.2;
const MAX_SAMPLES = 8;
// A camera moving further than this between two samples is a teleport or map change: no blending.
const TELEPORT_DISTANCE = 20;
// The service stamps samples with the time it saw the game frame. Mapped to local time by the
// smallest (arrival - stamp) seen, which strips the varying delay of the websocket and of this
// page's busy event loop. A larger jump than this (service restarted) starts the mapping over.
const CLOCK_RESYNC_MS = 100;

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
    private clockOffset: number | null = null;
    private lastStamp = -Infinity;
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
      const now = this.sampleTime(result.sampleTime, performance.now());
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
      if (!CameraTuning.enabled || s.length === 1) {
        this.apply(newest);
        return;
      }

      const interval = Math.min(this.intervalMs || MAX_INTERVAL_MS, MAX_INTERVAL_MS);
      const rt = now + CameraTuning.lead * interval;
      if (rt <= s[0].t) {
        this.apply(s[0]);
        return;
      }
      let a: ICameraSample, b: ICameraSample, k: number;
      if (rt >= newest.t) {
        // Ahead of the newest sample: continue the last two samples' motion, but not for long,
        // and not at all once samples have stopped (standing still: the service sends nothing).
        a = s[Math.max(0, s.length - 1 - Math.max(1, Math.round(CameraTuning.velocitySpan)))];
        b = newest;
        const stopped = now - newest.t > 2 * interval + 5;
        const ahead = stopped ? 0 : Math.min(rt - newest.t, CameraTuning.maxPredictMs);
        // Two samples of one game frame have no time between them: nothing to continue.
        k = b.t > a.t ? 1 + ahead / (b.t - a.t) : 1;
      } else {
        let i = s.length - 1;
        while (i > 0 && s[i - 1].t > rt) i--;
        a = s[i - 1];
        b = s[i];
        k = b.t > a.t ? (rt - a.t) / (b.t - a.t) : 1;
      }

      const cur = this.current;
      cur.position.lerpVectors(a.camPos, b.camPos, k);
      cur.playerposition.lerpVectors(a.playerPos, b.playerPos, k);
      this.front.lerpVectors(a.camFront, b.camFront, k);
      if (this.front.lengthSq() < 1e-9) this.front.copy(b.camFront);
      this.front.normalize();
      cur.target.copy(cur.position).add(this.front);
      cur.fov = b.fov;
    }

    // Local time of a sample: the service's stamp mapped to this clock, else the arrival time.
    private sampleTime(stamp: number | undefined, arrival: number): number {
      if (typeof stamp !== "number") return arrival;
      const offset = arrival - stamp;
      if (this.clockOffset === null || stamp < this.lastStamp || offset - this.clockOffset > CLOCK_RESYNC_MS) {
        this.clockOffset = offset;
      } else if (offset < this.clockOffset) {
        this.clockOffset = offset;
      }
      this.lastStamp = stamp;
      return stamp + this.clockOffset;
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
