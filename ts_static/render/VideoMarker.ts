import { IVideoData, ISourceVideoData } from "../../src/shared/interfaces/datatransfer/IVideoData";
import * as THREE from 'three';
import { ICameraPositionResult } from "./CameraPositionManager";
import Hls, { ErrorData } from "hls.js";
import { IPC } from "../../src/shared/ipc";
import { send } from "../../src/shared/electron_ipc";
import { BlackBarDetector } from "./BlackBars";

// Video markers share one <video> element, one stream and one screen, so only one plays at a
// time: the nearest marker in range. See docs/ARCHITECTURE.md (video markers).
//
// Update() runs once per rendered frame and works out which marker *should* be active from the
// current inputs (marker list, player position). The player is then brought in line with that.
// Nothing else starts, stops or shows the video, so the screen, the stream and the audio cannot
// drift apart from what the player is near.

const DEFAULT_VISIBLE_DISTANCE = 65;
const DEFAULT_FADE_IN_DISTANCE = 50;
// The active marker is kept until the player is this far beyond its visibleDistance, so standing
// on the edge does not reload the stream every frame.
const RANGE_HYSTERESIS = 2;
// Another marker in range has to be this much nearer than the active one to take over.
const SWITCH_MARGIN = 5;
// Playback (re)starts only with the stream's buffer target buffered ahead, so a slow stream
// pauses cleanly behind the buffering indicator instead of stuttering frame by frame as each segment
// trickles in. The target adapts per stream: each time playback runs dry it moves one step up
// (waiting longer also drifts playback further behind live, which is what makes the buffer
// bigger), and after BUFFER_STABLE_MS of playing without running dry it moves one step down.
// Video markers are mostly used for watching films, where extra delay is fine and interruptions
// are not: the target roughly doubles per stall, reaching the 90 s cap after four, and backs off
// only slowly. Delay that has built up is never deliberately won back (no fast playback); a
// lower target only means a shorter wait at the next stall.
const BUFFER_STEPS_S = [8, 15, 30, 60, 90];
const BUFFER_STABLE_MS = 10 * 60000;
// hls.js stops loading at maxBufferLength seconds / maxBufferSize bytes ahead (defaults 30 s,
// 60 MB), which would make the higher targets unreachable for films (VOD). Leave headroom above
// the cap, and keep little behind the playhead so long films do not exhaust the media buffer.
const HLS_MAX_BUFFER_S = 120;
const HLS_MAX_BUFFER_BYTES = 150 * 1000 * 1000;
const HLS_BACK_BUFFER_S = 30;
// ...unless no more is coming for a while (a live stream whose whole playlist is already
// buffered and the next segment is very late); then play what there is. At least this long, and
// at least three segment durations (see patience()).
const RESUME_ANYWAY_MS = 20000;
// The first fill of a live stream waits for at least this much (or the learned target, if
// larger). With a short playlist window (often ~15 s) starting at once means playing that and
// stalling soon after; with a long one (see DEFAULT_LIVE_DELAY_S) this fills in a moment.
const LIVE_FIRST_FILL_S = 15;
// How far behind the live edge a live stream starts, unless the marker sets its own. With a long
// playlist window this much is already published, so it downloads in seconds: playback starts
// almost at once with a big buffer, and an encoder hiccup shorter than this never stalls it.
// hls.js starts at the oldest segment when the window is shorter.
const DEFAULT_LIVE_DELAY_S = 30;
// The learned buffer target per source URL survives restarts here (the overlay page's
// localStorage, kept in Electaco's user data folder), so a stream that needed a big buffer
// starts with it next time instead of relearning it through stalls. Stored in seconds so the
// steps can change; the older key held an index into LEGACY_BUFFER_STEPS_S.
const TARGET_STORE_KEY = 'electaco.videoBufferTargets';
const LEGACY_STEP_STORE_KEY = 'electaco.videoBufferSteps';
const LEGACY_BUFFER_STEPS_S = [4, 8, 15, 30, 60, 90];

function readStore(key: string): { [url: string]: number } {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}') || {};
  } catch {
    return {};
  }
}

// The step to start a stream at: the smallest one that covers the saved target.
function savedStep(url: string) {
  let seconds = readStore(TARGET_STORE_KEY)[url];
  if (typeof seconds !== 'number') {
    const legacy = readStore(LEGACY_STEP_STORE_KEY)[url];
    if (!Number.isInteger(legacy)) return 0;
    seconds = LEGACY_BUFFER_STEPS_S[THREE.MathUtils.clamp(legacy, 0, LEGACY_BUFFER_STEPS_S.length - 1)];
  }
  const step = BUFFER_STEPS_S.findIndex((target) => target >= seconds);
  return step < 0 ? BUFFER_STEPS_S.length - 1 : step;
}
// Reload if playback is not advancing although there is data to play (decoder stuck).
const STUCK_PLAYING_MS = 8000;
// Reload if no new data has arrived for this long while buffering. Live streams that publish
// segments late or unevenly stay well under this; a stream that died without a fatal error
// does not. At least this long, and at least four segment durations.
const NO_DATA_MS = 30000;
// Wait this long before retrying after a fatal stream error (e.g. the stream is offline).
const RETRY_DELAY_MS = 5000;

// What a stream has taught us, kept per source URL for the app run so returning to a marker
// starts at the level that worked.
interface IStreamHistory {
  url: string;
  step: number;
  stableMs: number;
  stalls: number;
}

// Info panel drawn on the screen's top-left corner while the cursor is over it. The canvas has
// well over the pixels the panel covers at normal viewing distance and is mipmapped, so text
// stays sharp both close up and far away; the panel itself is a fixed share of the screen.
const INFO_CANVAS_W = 960;
const INFO_CANVAS_H = 380;
const INFO_SCREEN_SHARE = 0.32;
const INFO_REDRAW_MS = 250;
// The card fades in once the cursor has rested on the screen for a moment (so brushing past it
// shows nothing) and fades out when it leaves.
const INFO_SHOW_DELAY_MS = 350;
const INFO_FADE_IN_MS = 200;
const INFO_FADE_OUT_MS = 250;
const HOVER_GRACE_MS = 200;
// Status icon in the screen's lower-left corner while loading, buffering or offline.
const STATUS_CANVAS = 256;
const STATUS_SCREEN_SHARE = 0.16;
const STATUS_REDRAW_MS = 50;
// How often the playing video is checked for letterbox / pillarbox bars.
const BARS_SAMPLE_MS = 1000;
// How long the action bar's own volume change outranks render data (it is saved within 250 ms).
const LOCAL_AUDIO_MS = 2000;

const UI_FONT = '"Segoe UI", "Segoe UI Variable", system-ui, sans-serif';
const COLOR_OK = '#7ee0a0';
const COLOR_WAIT = '#ffd166';
const COLOR_ERROR = '#ff5c5c';

type PlayerState = 'offline' | 'loading' | 'buffering' | 'playing';

function makeCanvasTexture(canvas: HTMLCanvasElement) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  // Mipmaps (the default minFilter) plus anisotropy keep small text legible at an angle and at a
  // distance; three.js clamps this to what the GPU supports.
  texture.anisotropy = 8;
  return texture;
}

function formatTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, sec = s % 60;
  const mmss = `${String(m).padStart(h ? 2 : 1, '0')}:${String(sec).padStart(2, '0')}`;
  return h ? `${h}:${mmss}` : mmss;
}

interface IVideoMark {
  key: string;
  marker: IVideoData;
  pos: THREE.Vector3;
}

function visibleDistance(marker: IVideoData) {
  return marker.visibleDistance || DEFAULT_VISIBLE_DISTANCE;
}

function fadeInDistance(marker: IVideoData) {
  return marker.fadeInDistance || DEFAULT_FADE_IN_DISTANCE;
}

// Identity of a marker across render data refreshes. Rotation, scale and distances are left out
// so editing them updates the screen in place instead of restarting the video.
function markerKey(marker: IVideoData) {
  const p = marker.position;
  return `${marker.source.url}|${p.X},${p.Y},${p.Z}`;
}

// What has to change for the stream to be reloaded.
function sourceKey(source: ISourceVideoData) {
  return `${source.url}|${source.liveDelay || 0}`;
}

function isHlsSource(source: ISourceVideoData) {
  return /mpegurl/i.test(source.type ?? "") || /\.m3u8(\?|#|$)/i.test(source.url);
}

export class MovieManager {
  private video: HTMLVideoElement;
  // rig carries the marker's position, rotation and scale; screen, backdrop, status and info sit in it.
  private rig: THREE.Group;
  private screen: THREE.Mesh;
  private backdrop: THREE.Mesh;
  private status: THREE.Mesh;
  private statusCanvas: HTMLCanvasElement;
  private statusTexture: THREE.CanvasTexture;
  private statusDrawn = 0;
  private materials: THREE.MeshBasicMaterial[];
  private infoMaterial: THREE.MeshBasicMaterial;
  // Distance fade of the whole screen, and the card's own hover fade on top of it.
  private distanceOpacity = 1;
  private hovering = false;
  private hoverSince = 0;
  private hoverLeft = 0;
  private infoFade = 0;
  private hoverUpdated = 0;

  private markers: IVideoMark[] = [];
  private active: IVideoMark | null = null;
  // Volume / mute set on the action bar, used until render data carries the saved values (the
  // round trip through main), so the slider acts at once; given up after LOCAL_AUDIO_MS so a
  // change made elsewhere (settings window) is not shadowed. By marker key.
  private audioLocal = new Map<string, { volume: number; muted: boolean; until: number }>();

  private hls: Hls | null = null;
  private loadedKey: string | null = null;
  private retryAt = 0;
  // Buffering: paused on purpose until the stream's buffer target is buffered ahead.
  private buffering = true;
  private streams = new Map<string, IStreamHistory>();
  private history: IStreamHistory = { url: "", step: 0, stableMs: 0, stalls: 0 };
  private isLive = false;
  private suspended = false;
  // Bars baked into the video are made transparent in the screen's shader (see BlackBars.ts).
  private bars = new BlackBarDetector();
  private barUniforms = { uBarV: { value: 0 }, uBarH: { value: 0 } };
  private barsSampled = 0;
  // Waiting for the first fill after loading a source.
  private firstFill = true;
  private info: THREE.Mesh;
  private infoCanvas: HTMLCanvasElement;
  private infoTexture: THREE.CanvasTexture;
  private infoDrawn = 0;
  private hoverRay = new THREE.Raycaster();
  // Longest segment duration (HLS target duration), 0 if unknown.
  private segmentS = 0;
  private lastTick = 0;
  private lastCurrentTime = -1;
  private lastProgress = 0;
  private lastBufferedEnd = -1;
  private lastNewData = 0;

  constructor(scene: THREE.Scene) {
    this.video = document.getElementById('player') as HTMLVideoElement;
    this.video.crossOrigin = "anonymous";
    // Playback is started by tick() once enough is buffered, not by the element itself.
    this.video.autoplay = false;
    // A video that ends would otherwise sit on its last frame for as long as the player is near.
    this.video.loop = true;
    this.video.addEventListener('error', () => {
      // Native (non-HLS) sources report failures here; hls.js reports through its own events.
      if (this.hls || !this.active) return;
      this.log("Video error: " + (this.video.error?.message || this.video.error?.code));
      this.scheduleRetry();
    });

    // The stream's own dimensions decide the screen's aspect: known once metadata loads, and
    // 'resize' fires again when the stream switches resolution (adaptive or a restarted stream).
    const reshape = () => { if (this.active) this.placeScreen(this.active.marker); };
    this.video.addEventListener('loadedmetadata', reshape);
    this.video.addEventListener('resize', reshape);

    const texture = new THREE.VideoTexture(this.video);
    texture.colorSpace = THREE.SRGBColorSpace;
    const plane = new THREE.PlaneGeometry(1, 1);
    // transparent is needed for the distance fade (opacity) to have any effect.
    const screenMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.FrontSide, transparent: true });
    // Inside the detected bars, near-black pixels become transparent: the bars disappear while
    // burned-in subtitles drawn in them stay visible. The picture area itself is never keyed.
    // diffuseColor is linear here, so the thresholds are ~0.1-0.25 in sRGB terms.
    screenMaterial.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, this.barUniforms);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', '#include <common>\nuniform float uBarV;\nuniform float uBarH;')
        .replace('#include <map_fragment>', [
          '#include <map_fragment>',
          'if (vMapUv.y < uBarV || vMapUv.y > 1.0 - uBarV || vMapUv.x < uBarH || vMapUv.x > 1.0 - uBarH) {',
          '  float barLuma = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));',
          '  diffuseColor.a *= smoothstep(0.008, 0.05, barLuma);',
          '}',
        ].join('\n'));
    };
    const backdropMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.FrontSide, transparent: true });
    this.statusCanvas = document.createElement('canvas');
    this.statusCanvas.width = this.statusCanvas.height = STATUS_CANVAS;
    this.statusTexture = makeCanvasTexture(this.statusCanvas);
    const statusMaterial = new THREE.MeshBasicMaterial({ map: this.statusTexture, side: THREE.FrontSide, transparent: true, depthWrite: false });
    this.infoCanvas = document.createElement('canvas');
    this.infoCanvas.width = INFO_CANVAS_W;
    this.infoCanvas.height = INFO_CANVAS_H;
    this.infoTexture = makeCanvasTexture(this.infoCanvas);
    const infoMaterial = new THREE.MeshBasicMaterial({ map: this.infoTexture, side: THREE.FrontSide, transparent: true, depthWrite: false });
    this.materials = [screenMaterial, backdropMaterial, statusMaterial];
    this.infoMaterial = infoMaterial;

    // Unit planes; the stream's aspect is applied through the screen's scale.
    this.screen = new THREE.Mesh(plane, screenMaterial);
    // Stands in for the screen until the first frame is decoded.
    this.backdrop = new THREE.Mesh(plane, backdropMaterial);
    this.status = new THREE.Mesh(plane, statusMaterial);
    this.status.renderOrder = 1;

    this.rig = new THREE.Group();
    // In front of the video, like the status icon, so it moves, turns, scales and fades with it.
    this.info = new THREE.Mesh(plane, infoMaterial);
    this.info.renderOrder = 2;
    this.info.visible = false;

    this.rig.add(this.screen, this.backdrop, this.status, this.info);
    this.rig.visible = false;
    this.rig.userData.SkipRemove = true;
    scene.add(this.rig);
  }

  // Called whenever the overlay gets new render data (map change, any settings change, map
  // opened or closed). An empty list stops and hides the video.
  SetVideoMarkers(markers: IVideoData[]) {
    this.markers = markers.map((marker) => ({
      key: markerKey(marker),
      marker,
      pos: new THREE.Vector3(marker.position.X, marker.position.Y, marker.position.Z),
    }));
    for (const m of this.markers) {
      const local = this.audioLocal.get(m.key);
      if (local && (performance.now() > local.until
          || (local.volume === (m.marker.volume ?? 1) && local.muted === !!m.marker.muted))) {
        this.audioLocal.delete(m.key);
      }
    }

    if (this.active) {
      // Settings changes resend every marker. Keep playing if the active one is still there.
      const same = this.markers.find((m) => m.key === this.active!.key);
      if (same) {
        this.active = same;
        this.placeScreen(same.marker);
        if (this.loadedKey !== sourceKey(same.marker.source)) {
          this.load(same.marker.source);
        }
      } else {
        this.deactivate();
      }
    }
  }

  // The game stopped updating (a loading screen): hide the screen and pause the video, but keep
  // the stream, since the position is stale until the game is back. Update() takes over again
  // afterwards and deactivates the marker if the player ended up elsewhere.
  SetSuspended(suspended: boolean) {
    if (suspended === this.suspended) return;
    this.suspended = suspended;
    if (suspended) {
      this.rig.visible = false;
      this.video.pause();
    } else if (this.active) {
      this.rig.visible = true;
      // Time spent suspended is not a stall or a stuck decoder.
      const now = performance.now();
      this.lastProgress = now;
      this.lastNewData = now;
      this.lastTick = 0;
    }
  }

  Update(position: ICameraPositionResult) {
    if (this.suspended) return;
    const target = this.pickMarker(position.playerposition);
    if (target !== this.active) {
      if (target) {
        this.activate(target);
      } else {
        this.deactivate();
      }
    }
    if (this.active) {
      this.tick(this.active, position.playerposition);
    }
  }

  private pickMarker(player: THREE.Vector3): IVideoMark | null {
    let nearest: IVideoMark | null = null;
    let nearestDistance = Infinity;
    for (const m of this.markers) {
      const distance = m.pos.distanceTo(player);
      if (distance < visibleDistance(m.marker) && distance < nearestDistance) {
        nearest = m;
        nearestDistance = distance;
      }
    }

    if (this.active) {
      const activeDistance = this.active.pos.distanceTo(player);
      const inRange = activeDistance < visibleDistance(this.active.marker) + RANGE_HYSTERESIS;
      const clearlyCloser = nearest && nearest !== this.active && nearestDistance < activeDistance - SWITCH_MARGIN;
      if (inRange && !clearlyCloser) {
        return this.active;
      }
    }
    return nearest;
  }

  private activate(mark: IVideoMark) {
    this.log("Activate video marker " + mark.key);
    this.active = mark;
    this.placeScreen(mark.marker);
    this.rig.visible = true;
    // Markers sharing a source (the same stream shown in several places) keep the stream running.
    if (this.loadedKey !== sourceKey(mark.marker.source)) {
      this.load(mark.marker.source);
    }
  }

  private deactivate() {
    if (this.active) {
      this.log("Deactivate video marker " + this.active.key);
    }
    this.active = null;
    this.rig.visible = false;
    this.unload();
  }

  // The configured ratio's width sets the screen's size; its height follows the video's actual
  // aspect when known, so a stream that does not match the configured ratio is not stretched.
  private placeScreen(marker: IVideoData) {
    const width = marker.source.ratio?.[0] || 16;
    let height = marker.source.ratio?.[1] || 9;
    if (this.video.videoWidth > 0 && this.video.videoHeight > 0) {
      height = width * this.video.videoHeight / this.video.videoWidth;
    }
    this.rig.position.set(marker.position.X, marker.position.Y, marker.position.Z);
    this.rig.rotation.set(marker.rotation.X, marker.rotation.Y, marker.rotation.Z);
    this.rig.scale.setScalar(marker.scale);
    this.screen.scale.set(width, height, 1);
    this.backdrop.scale.set(width, height, 1);

    // The card and icon go inside the picture area, not in letterbox bars.
    const picW = width * (1 - 2 * this.bars.bars.horizontal);
    const picH = height * (1 - 2 * this.bars.bars.vertical);
    const margin = Math.min(picW, picH) * 0.035;
    const statusSize = Math.min(picW, picH) * STATUS_SCREEN_SHARE;
    this.status.position.set(-picW / 2 + margin + statusSize / 2, -picH / 2 + margin + statusSize / 2, 0.02);
    this.status.scale.set(statusSize, statusSize, 1);

    let infoWidth = picW * INFO_SCREEN_SHARE;
    let infoHeight = infoWidth * INFO_CANVAS_H / INFO_CANVAS_W;
    if (infoHeight > picH * 0.8) {
      infoWidth *= picH * 0.8 / infoHeight;
      infoHeight = picH * 0.8;
    }
    this.info.position.set(-picW / 2 + margin + infoWidth / 2, picH / 2 - margin - infoHeight / 2, 0.03);
    this.info.scale.set(infoWidth, infoHeight, 1);
  }

  // Where the cursor (normalized device coordinates) is on the active video's screen, as 0..1
  // from its top-left corner, or null when it is not over it. Only the front counts. Controls
  // drawn on the screen can hit-test against these coordinates.
  ScreenPointAt(pointer: THREE.Vector2, camera: THREE.Camera): THREE.Vector2 | null {
    if (!this.active || !this.rig.visible) return null;
    camera.updateMatrixWorld();
    this.rig.updateMatrixWorld();
    this.hoverRay.setFromCamera(pointer, camera);
    // The backdrop has the screen's exact size and is raycast even while hidden.
    const hit = this.hoverRay.intersectObject(this.backdrop, false)[0];
    if (!hit?.uv) return null;
    return new THREE.Vector2(hit.uv.x, 1 - hit.uv.y);
  }

  IsHovered() {
    return this.hovering;
  }

  // The marker whose screen is showing, if any.
  ActiveMarker(): { key: string; marker: IVideoData } | null {
    return this.active ? { key: this.active.key, marker: this.active.marker } : null;
  }

  // The marker's audio as played: the bar's own change if it is still waiting to be saved.
  AudioOf(key: string): { volume: number; muted: boolean } {
    const local = this.audioLocal.get(key);
    if (local && performance.now() <= local.until) return local;
    const marker = this.markers.find((m) => m.key === key)?.marker;
    return { volume: marker?.volume ?? 1, muted: !!marker?.muted };
  }

  SetLocalAudio(key: string, volume: number, muted: boolean) {
    this.audioLocal.set(key, { volume: THREE.MathUtils.clamp(volume, 0, 1), muted, until: performance.now() + LOCAL_AUDIO_MS });
  }

  // Where the middle of the screen's bottom edge is, in normalized device coordinates (the volume
  // bar hangs from it), or null when the screen is not showing.
  BottomAnchor(camera: THREE.Camera): THREE.Vector3 | null {
    if (!this.active || !this.rig.visible) return null;
    camera.updateMatrixWorld();
    this.rig.updateMatrixWorld();
    const edge = new THREE.Vector3(0, -0.5, 0).applyMatrix4(this.backdrop.matrixWorld);
    return edge.project(camera);
  }

  // Where a bar of w x h CSS px hung under the screen lands on the screen, drawn in the screen's
  // plane so it follows the video at an angle: its corners (top-left, top-right, bottom-right,
  // bottom-left) in CSS px, or null when not showing or partly behind the camera. Its size is
  // picked so that, seen straight on, it is w x h.
  BarQuad(camera: THREE.Camera, w: number, h: number, viewW: number, viewH: number): [number, number][] | null {
    if (!this.active || !this.rig.visible) return null;
    camera.updateMatrixWorld();
    this.rig.updateMatrixWorld();
    const toPx = (x: number, y: number) => {
      const p = new THREE.Vector3(x, y, 0).applyMatrix4(this.backdrop.matrixWorld).project(camera);
      return p.z > 1 ? null : new THREE.Vector2((p.x + 1) / 2 * viewW, (1 - p.y) / 2 * viewH);
    };
    // The screen's own size on screen, along its edges (local units: the screen is 1 x 1).
    const bl = toPx(-0.5, -0.5), br = toPx(0.5, -0.5), tl = toPx(-0.5, 0.5);
    if (!bl || !br || !tl) return null;
    const sw = bl.distanceTo(br), sh = bl.distanceTo(tl);
    if (sw < 1 || sh < 1) return null;
    const lw = w / sw, lh = h / sh, gap = 2 / sh;
    const top = -0.5 - gap, bottom = top - lh;
    const corners = [toPx(-lw / 2, top), toPx(lw / 2, top), toPx(lw / 2, bottom), toPx(-lw / 2, bottom)];
    if (corners.some((c) => !c)) return null;
    return corners.map((c) => [c!.x, c!.y] as [number, number]);
  }

  // How far the info card has faded in (eased, 0..1); the volume bar follows it.
  InfoOpacity() {
    return this.infoFade * this.infoFade * (3 - 2 * this.infoFade);
  }

  // Called every frame with the cursor (or null when it is off the overlay). `onBar`: the cursor is
  // on the video's volume bar, which counts as still hovering (the card stays up).
  UpdateHover(pointer: THREE.Vector2 | null, camera: THREE.Camera, onBar = false) {
    const now = performance.now();
    const elapsed = this.hoverUpdated ? Math.min(now - this.hoverUpdated, 100) : 0;
    this.hoverUpdated = now;

    const hovering = onBar || (!!pointer && !!this.ScreenPointAt(pointer, camera));
    // A moment off it (crossing to the volume bar below) doesn't restart the card's show delay.
    if (hovering && !this.hovering && now - this.hoverLeft > HOVER_GRACE_MS) this.hoverSince = now;
    if (!hovering && this.hovering) this.hoverLeft = now;
    this.hovering = hovering;

    const show = hovering && now - this.hoverSince >= INFO_SHOW_DELAY_MS;
    this.infoFade = show
      ? Math.min(1, this.infoFade + elapsed / INFO_FADE_IN_MS)
      : Math.max(0, this.infoFade - elapsed / INFO_FADE_OUT_MS);
    this.info.visible = this.infoFade > 0;
    // Eased so the start and end of the fade are soft.
    this.infoMaterial.opacity = this.distanceOpacity * this.InfoOpacity();

    // Keep the contents fresh while shown, and draw them right before it starts fading in.
    if ((this.info.visible || (hovering && now - this.hoverSince >= INFO_SHOW_DELAY_MS - 50))
        && now - this.infoDrawn >= INFO_REDRAW_MS) {
      this.infoDrawn = now;
      this.drawInfo();
    }
  }

  // What the player is doing, for the info panel and the status icon.
  private state(): PlayerState {
    if (this.retryAt) return 'offline';
    if (this.video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA && this.bufferedAhead() === 0) return 'loading';
    if (this.buffering) return 'buffering';
    return 'playing';
  }

  private drawInfo() {
    const ctx = this.infoCanvas.getContext('2d')!;
    const w = INFO_CANVAS_W, h = INFO_CANVAS_H, pad = 44;
    ctx.clearRect(0, 0, w, h);
    ctx.textBaseline = 'middle';

    // Card
    ctx.fillStyle = 'rgba(14, 16, 20, 0.84)';
    ctx.beginPath();
    ctx.roundRect(2, 2, w - 4, h - 4, 34);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 3;
    ctx.stroke();

    const v = this.video;
    const state = this.state();
    const [label, color] = {
      offline: ["Source offline", COLOR_ERROR],
      loading: ["Loading", COLOR_WAIT],
      buffering: ["Buffering", COLOR_WAIT],
      playing: ["Playing", COLOR_OK],
    }[state];

    // Header: status dot and state, plus a LIVE / FILM tag once the stream type is known.
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pad + 16, 82, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = `600 66px ${UI_FONT}`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, pad + 52, 84);
    if (state === 'buffering' || state === 'playing') {
      const tag = this.isLive ? "LIVE" : "FILM";
      ctx.font = `700 38px ${UI_FONT}`;
      const tagW = ctx.measureText(tag).width + 40;
      ctx.fillStyle = this.isLive ? 'rgba(235, 64, 64, 0.95)' : 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.roundRect(w - pad - tagW, 54, tagW, 58, 14);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(tag, w - pad - tagW + 20, 85);
    }

    // Two detail lines: label on the left, value right-aligned.
    const line = (y: number, left: string, right: string) => {
      ctx.font = `400 50px ${UI_FONT}`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.66)';
      ctx.fillText(left, pad, y);
      ctx.font = `600 50px ${UI_FONT}`;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(right, w - pad - ctx.measureText(right).width, y);
    };

    if (state === 'offline') {
      const wait = Math.max(0, Math.ceil((this.retryAt - performance.now()) / 1000));
      line(210, "Retrying", wait ? `in ${wait} s` : "now");
      let host = "";
      try { host = new URL(this.active?.marker.source.url ?? "").host; } catch { /* not a URL */ }
      line(296, "Source", host || "–");
    } else {
      // Buffer bar: buffered seconds against the target (the white tick), scaled to show both.
      const ahead = this.bufferedAhead(), target = this.resumeTarget();
      const span = Math.max(target * 1.5, ahead, 1);
      const barX = pad, barY = 150, barW = w - pad * 2, barH = 24;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW, barH, barH / 2);
      ctx.fill();
      const fill = Math.min(ahead / span, 1) * barW;
      if (fill > 1) {
        ctx.fillStyle = ahead >= target ? COLOR_OK : COLOR_WAIT;
        ctx.beginPath();
        ctx.roundRect(barX, barY, Math.max(fill, barH), barH, barH / 2);
        ctx.fill();
      }
      const tickX = barX + (target / span) * barW;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(tickX - 3, barY - 10, 6, barH + 20);

      line(242, "Buffer", `${ahead.toFixed(0)} s  of  ${target} s`);
      const stalls = this.history.stalls;
      const resolution = v.videoHeight ? `${v.videoWidth}×${v.videoHeight}  ·  ` : "";
      const stallText = `${resolution}${stalls} ${stalls === 1 ? "stall" : "stalls"}`;
      if (this.isLive) {
        const latency = this.hls?.latency;
        line(326, latency !== undefined && isFinite(latency) ? `${formatTime(latency)} behind` : "Live", stallText);
      } else if (isFinite(v.duration) && v.duration > 0) {
        line(326, `${formatTime(v.currentTime)} / ${formatTime(v.duration)}`, stallText);
      } else {
        line(326, formatTime(v.currentTime), stallText);
      }
    }
    this.infoTexture.needsUpdate = true;
  }

  // The lower-left status icon: a spinning arc while loading, a spinning arc filling towards the buffer
  // target while buffering, red while the source is offline.
  private drawStatus(now: number, state: Exclude<PlayerState, 'playing'>) {
    const ctx = this.statusCanvas.getContext('2d')!;
    const size = STATUS_CANVAS, c = size / 2, r = size * 0.36;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = 'rgba(14, 16, 20, 0.72)';
    ctx.beginPath();
    ctx.arc(c, c, size * 0.48, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineCap = 'round';
    ctx.lineWidth = size * 0.075;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const track = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.stroke();
    };

    if (state === 'offline') {
      ctx.strokeStyle = COLOR_ERROR;
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = COLOR_ERROR;
      ctx.font = `800 ${Math.round(size * 0.42)}px ${UI_FONT}`;
      ctx.fillText("!", c, c + size * 0.02);
    } else if (state === 'loading') {
      track();
      const start = (now / 1000) * Math.PI * 2;
      ctx.strokeStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(c, c, r, start, start + Math.PI * 0.6);
      ctx.stroke();
    } else {
      const progress = THREE.MathUtils.clamp(this.bufferedAhead() / this.resumeTarget(), 0, 1);
      track();
      // The arc's length is the progress and it keeps turning like a spinner; a minimum length
      // keeps it visibly moving at 0%, and a gap stays so the turning shows near 100%.
      const start = (now / 1000) * Math.PI * 1.5;
      const length = THREE.MathUtils.clamp(progress, 0.12, 0.92) * Math.PI * 2;
      ctx.strokeStyle = COLOR_WAIT;
      ctx.beginPath();
      ctx.arc(c, c, r, start, start + length);
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = `700 ${Math.round(size * 0.2)}px ${UI_FONT}`;
      ctx.fillText(`${Math.floor(progress * 100)}%`, c, c + size * 0.01);
    }
    this.statusTexture.needsUpdate = true;
  }

  // Seconds of media buffered ahead of the playhead.
  private bufferedAhead() {
    const t = this.video.currentTime;
    const b = this.video.buffered;
    for (let i = 0; i < b.length; i++) {
      if (b.start(i) <= t + 0.1 && t < b.end(i)) {
        return b.end(i) - t;
      }
    }
    return 0;
  }

  private bufferedEnd() {
    const b = this.video.buffered;
    return b.length ? b.end(b.length - 1) : 0;
  }

  // Data arrives a whole segment at a time, plus a playlist refresh, so how long counts as "no
  // new data" has to scale with segment length: long segments from a slow source are routinely
  // more than 20 s apart, and giving up on them early brings the interruptions back.
  private patience(minimumMs: number, segments: number) {
    return Math.max(minimumMs, this.segmentS * segments * 1000);
  }

  // What a (re)start waits for: the learned target, or more on a live stream's first fill.
  private resumeTarget() {
    return this.firstFill && this.isLive ? Math.max(this.bufferTarget(), LIVE_FIRST_FILL_S) : this.bufferTarget();
  }

  private saveStep() {
    if (!this.history.url) return;
    try {
      const targets = readStore(TARGET_STORE_KEY);
      targets[this.history.url] = this.bufferTarget();
      localStorage.setItem(TARGET_STORE_KEY, JSON.stringify(targets));
    } catch {
      // Storage unavailable: the step is still kept in memory for this run.
    }
  }

  private bufferTarget() {
    return BUFFER_STEPS_S[this.history.step];
  }

  // Ran dry: pause and wait for a (bigger) margin instead of playing each frame as it arrives.
  private startBuffering() {
    this.log(`Buffering at ${this.video.currentTime.toFixed(1)}s`);
    this.buffering = true;
    this.history.stableMs = 0;
    this.history.stalls++;
    if (this.history.step < BUFFER_STEPS_S.length - 1) {
      this.history.step++;
      this.saveStep();
      this.log(`buffer target ${this.bufferTarget()}s after stall`);
    }
    this.video.pause();
  }



  // Per-frame upkeep for the active marker: retry, fade, buffering, stall detection, visibility.
  private tick(mark: IVideoMark, player: THREE.Vector3) {
    const now = performance.now();
    const distance = mark.pos.distanceTo(player);
    const fadeIn = fadeInDistance(mark.marker);
    let opacity = 1;
    if (distance > fadeIn) {
      opacity = THREE.MathUtils.mapLinear(distance, fadeIn, visibleDistance(mark.marker), 1, 0);
      opacity = THREE.MathUtils.clamp(opacity, 0, 1);
    }
    for (const material of this.materials) {
      material.opacity = opacity;
    }
    this.distanceOpacity = opacity;
    const audio = this.AudioOf(mark.key);
    this.video.volume = opacity * (audio.muted ? 0 : audio.volume);

    if (this.retryAt) {
      if (now >= this.retryAt) {
        this.log("Retrying video source " + mark.marker.source.url);
        this.load(mark.marker.source);
      }
      this.updateVisuals(now);
      return;
    }

    const ahead = this.bufferedAhead();
    const end = this.bufferedEnd();
    if (end !== this.lastBufferedEnd) {
      this.lastBufferedEnd = end;
      this.lastNewData = now;
    }

    const elapsed = this.lastTick ? Math.min(now - this.lastTick, 1000) : 0;
    this.lastTick = now;

    if (this.buffering) {
      const enough = ahead >= this.resumeTarget();
      // A video (not live: hls.js gives live streams a finite duration too) whose rest is all
      // buffered: there is nothing more to wait for.
      const toTheEnd = !this.isLive && isFinite(this.video.duration) && this.bufferedEnd() >= this.video.duration - 0.5;
      const noMoreComing = ahead > 0.5 && (toTheEnd || now - this.lastNewData > this.patience(RESUME_ANYWAY_MS, 3));
      if (this.video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA && (enough || noMoreComing)) {
        this.log(`Resuming with ${ahead.toFixed(1)}s buffered`);
        this.firstFill = false;
        this.buffering = false;
        this.lastProgress = now;
        this.play();
      } else if (now - this.lastNewData > this.patience(NO_DATA_MS, 4)) {
        this.log("No new video data; reloading " + mark.marker.source.url);
        this.load(mark.marker.source);
      }
    } else if (this.video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA && ahead < 0.5) {
      this.startBuffering();
    } else {
      this.history.stableMs += elapsed;
      if (this.history.step > 0 && this.history.stableMs >= BUFFER_STABLE_MS) {
        this.history.step--;
        this.saveStep();
        this.history.stableMs = 0;
        this.log(`buffer target ${this.bufferTarget()}s after ${BUFFER_STABLE_MS / 60000} min without stalling`);
      }

      if (this.video.paused) {
        // Whatever paused it (an interrupted play(), something external), the active marker plays.
        this.play();
      }
      if (now - this.barsSampled >= BARS_SAMPLE_MS) {
        this.barsSampled = now;
        if (this.bars.sample(this.video)) this.applyBars(mark);
      }
      if (this.video.currentTime !== this.lastCurrentTime) {
        this.lastCurrentTime = this.video.currentTime;
        this.lastProgress = now;
      } else if (now - this.lastProgress > STUCK_PLAYING_MS) {
        this.log("Video playback stuck with data buffered; reloading " + mark.marker.source.url);
        this.load(mark.marker.source);
      }
    }

    this.updateVisuals(now);
  }

  private updateVisuals(now: number) {
    // Show the video once there is a frame to show; until then a dark stand-in.
    const hasFrame = !this.retryAt && this.video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
    this.screen.visible = hasFrame;
    this.backdrop.visible = !hasFrame;
    const state = this.state();
    this.status.visible = state !== 'playing';
    if (state !== 'playing' && now - this.statusDrawn >= STATUS_REDRAW_MS) {
      this.statusDrawn = now;
      this.drawStatus(now, state);
    }
  }

  private load(source: ISourceVideoData) {
    this.unload();
    this.loadedKey = sourceKey(source);
    this.buffering = true;
    if (!this.streams.has(source.url)) {
      this.streams.set(source.url, { url: source.url, step: savedStep(source.url), stableMs: 0, stalls: 0 });
    }
    this.firstFill = true;
    this.history = this.streams.get(source.url)!;
    this.log(`buffer target ${this.bufferTarget()}s`);
    this.lastNewData = performance.now();
    this.log("Load video source " + source.url);

    if (isHlsSource(source) && Hls.isSupported()) {
      const hls = new Hls({
        // Not low-latency: sit back from the live edge so late segments do not starve playback.
        lowLatencyMode: false,
        maxBufferLength: HLS_MAX_BUFFER_S,
        maxMaxBufferLength: HLS_MAX_BUFFER_S,
        maxBufferSize: HLS_MAX_BUFFER_BYTES,
        backBufferLength: HLS_BACK_BUFFER_S,
        liveSyncDuration: source.liveDelay || DEFAULT_LIVE_DELAY_S,
      });
      hls.on(Hls.Events.ERROR, (_event, data) => this.onHlsError(hls, data));
      hls.on(Hls.Events.LEVEL_LOADED, (_event, data) => {
        if (hls !== this.hls) return;
        this.isLive = data.details.live;
        this.segmentS = data.details.targetduration;
      });
      hls.attachMedia(this.video);
      hls.loadSource(source.url);
      this.hls = hls;
    } else {
      this.video.src = source.url;
    }
  }

  // Stops playback, audio and network activity for the current source.
  private applyBars(mark: IVideoMark) {
    const { vertical, horizontal } = this.bars.bars;
    this.barUniforms.uBarV.value = vertical;
    this.barUniforms.uBarH.value = horizontal;
    this.placeScreen(mark.marker);
    this.log(`Black bars: ${(vertical * 100).toFixed(1)}% top/bottom, ${(horizontal * 100).toFixed(1)}% left/right`);
  }

  private unload() {
    this.bars.reset();
    this.barUniforms.uBarV.value = 0;
    this.barUniforms.uBarH.value = 0;
    this.retryAt = 0;
    this.buffering = true;
    this.lastCurrentTime = -1;
    this.lastBufferedEnd = -1;
    this.lastTick = 0;
    this.isLive = false;
    this.segmentS = 0;
    this.loadedKey = null;
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
    this.video.pause();
    if (this.video.hasAttribute('src')) {
      this.video.removeAttribute('src');
      this.video.load();
    }
  }

  private play() {
    this.video.play()?.catch((error) => {
      // AbortError: the source was changed, unloaded or paused for buffering first. Expected.
      if (error?.name !== 'AbortError') {
        this.log("Video play() failed: " + error);
      }
    });
  }

  private onHlsError(hls: Hls, data: ErrorData) {
    // Events from an instance that has since been replaced are irrelevant.
    if (hls !== this.hls || !data.fatal) return;
    this.log(`HLS fatal error: ${data.type} ${data.details}`);
    if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
      hls.recoverMediaError();
    } else {
      this.scheduleRetry();
    }
  }

  private scheduleRetry() {
    this.retryAt = performance.now() + RETRY_DELAY_MS;
  }

  private log(text: string) {
    console.log("[Video] " + text);
    send(IPC.Log, "Video", text);
  }
}
