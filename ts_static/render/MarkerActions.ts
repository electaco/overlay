import { IPC } from '../../src/shared/ipc';
import { send } from '../../src/shared/electron_ipc';
import { IArrowTarget } from '../../src/shared/interfaces/settings/IRenderSettings';
import {
  MarkerActivePath, MarkerDoneAtPath, MarkerMutedPath, MarkerVolumePath, PackActivePath,
} from '../../src/shared/models/settings/MarkerPrefs';
import { CoverRect } from './ArrowHud';
import { IGenericMarker } from '../../src/shared/interfaces/render/marker';

// The hover action bar for markers: a small DOM bar next to the marker the cursor rests on, with
// buttons for hiding it, pointing the arrow at it and so on (video markers also get volume).
// The overlay window is click-through (GW2 uses both mouse buttons to turn the camera), so it
// asks main to take clicks only while the cursor is over the bar, like the mount menu does.
// See docs/ARCHITECTURE.md (marker interaction).

const SHOW_DELAY_MS = 400;
const HIDE_DELAY_MS = 500;
const FADE_MS = 150;
// Slack around the bar in which clicks are already captured, so its edge is not a flickering line.
const EDGE_PX = 3;
const SAVE_VOLUME_MS = 250;
// Main forgets nothing by itself, but a stuck "clickable" would swallow the game's clicks, so it
// is re-asserted while on.
const CLICKABLE_REFRESH_MS = 1000;

export interface IBarTarget {
  // Identity across render data refreshes.
  key: string;
  kind: 'position' | 'video';
  packId: string;
  markerId: string;
  packName: string;
  markerName: string;
  packAutoHide: boolean;
}

// A marker's bar target (its marker and pack actions), or null without ids.
export function BarTargetOf(marker: IGenericMarker): IBarTarget | null {
  if (!marker.packId || !marker.markerId) return null;
  return {
    key: marker.packId + '|' + marker.markerId,
    kind: 'position',
    packId: marker.packId,
    markerId: marker.markerId,
    packName: marker.packName ?? '',
    markerName: marker.markerName ?? '',
    packAutoHide: !!marker.packAutoHide,
  };
}

// A target and where its bar hangs, in CSS pixels. `below`: the bar's top centre sits at x, y
// (under a video); otherwise its left edge at x, centred on y (next to an icon). `opacity`: the
// bar follows this fade (a video's info card) instead of its own show delay and fade.
export interface IBarFrame {
  target: IBarTarget;
  x: number;
  y: number;
  below?: boolean;
  opacity?: number;
  // Corners (top-left, top-right, bottom-right, bottom-left, CSS px) for a bar of the given size
  // drawn in perspective (on a video's plane); null hides it for now.
  quad?: (w: number, h: number) => [number, number][] | null;
}

// CSS matrix3d that maps a w x h element onto the quad (a projective square-to-quad mapping).
function quadTransform(w: number, h: number, q: [number, number][]) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = den ? (dx3 * dy2 - dx2 * dy3) / den : 0;
  const k = den ? (dx1 * dy3 - dx3 * dy1) / den : 0;
  const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3;
  const d = y1 - y0 + g * y1, e = y3 - y0 + k * y3;
  return `matrix3d(${a / w},${d / w},0,${g / w},${b / h},${e / h},0,${k / h},0,0,1,0,${x0},${y0},0,1)`;
}

export interface IBarAudio {
  get(key: string): { volume: number; muted: boolean };
  set(key: string, volume: number, muted: boolean): void;
}

const STYLE = `
#markerbar {
  position: fixed; left: 0; top: 0; transform-origin: 0 0; display: none; align-items: center; gap: 2px; padding: 3px;
  background: rgba(14, 16, 20, 0.82); border: 1px solid rgba(255, 255, 255, 0.16); border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45); opacity: 0; transition: opacity ${FADE_MS}ms ease;
  font: 600 12px "Segoe UI", system-ui, sans-serif; color: #fff; user-select: none;
}
#markerbar.shown { opacity: 1; }
#markerbar button {
  width: 26px; height: 26px; padding: 0; display: flex; align-items: center; justify-content: center;
  background: transparent; border: 0; border-radius: 5px; color: rgba(255, 255, 255, 0.85); cursor: pointer;
}
#markerbar button:hover { background: rgba(255, 255, 255, 0.16); color: #fff; }
#markerbar button:active { background: rgba(255, 255, 255, 0.28); }
#markerbar button.on { background: rgba(255, 201, 77, 0.28); color: #ffc94d; }
#markerbar svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
#markerbar .gap { width: 8px; }
#markerbar .icon { display: flex; padding: 0 2px 0 4px; color: rgba(255, 255, 255, 0.85); }
#markerbar input[type=range] { width: 80px; height: 18px; margin: 0 4px; accent-color: #ffc94d; cursor: pointer; }
`;

// 24x24 stroked glyphs.
const ICONS = {
  hide: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20 20 4"/>',
  track: '<circle cx="12" cy="12" r="6"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>',
  hidePack: '<rect x="3" y="7" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/><path d="M4 22 22 4"/>',
  done: '<path d="M4 12.5 9.5 18 20 6"/>',
  sound: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 5.5a9 9 0 0 1 0 13"/>',
};

function svg(name: keyof typeof ICONS) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;
}

// Pack and marker ids as the preference path helpers take them.
function ids(t: IBarTarget): [{ id: string }, { id: string }] {
  return [{ id: t.packId }, { id: t.markerId }];
}

function intersects(r: { left: number; right: number; top: number; bottom: number }, covers: CoverRect[]) {
  return covers.some((c) => c.x < r.right && c.x + c.w > r.left && c.y < r.bottom && c.y + c.h > r.top);
}

export class MarkerActionBar {
  private el: HTMLDivElement;
  private audio: IBarAudio;
  private current: IBarTarget | null = null;
  private lastActive = 0;
  private pendingKey: string | null = null;
  private pendingSince = 0;
  private clickable = false;
  private clickableSent = 0;
  private rect: DOMRect | null = null;
  // Buttons that change with state, rebuilt only when the target changes (a rebuild would drop
  // the hover and an ongoing slider drag).
  private trackButton: HTMLButtonElement | null = null;
  private slider: HTMLInputElement | null = null;
  private dragging = false;
  private volumeTimer = 0;

  constructor(audio: IBarAudio) {
    this.audio = audio;
    const style = document.createElement('style');
    style.textContent = STYLE;
    document.head.appendChild(style);
    this.el = document.createElement('div');
    this.el.id = 'markerbar';
    document.body.appendChild(this.el);
    window.addEventListener('pointerup', () => { this.dragging = false; });
  }

  // Whether the window currently takes clicks (the cursor is on the bar).
  IsClickable() {
    return this.clickable;
  }

  // Whether the cursor is on a video's volume bar (keeps the video's info card up).
  IsOnVideoBar() {
    return this.clickable && this.current?.kind === 'video';
  }

  // Whether the bar is up, for deciding if the cursor needs watching.
  IsShown() {
    return this.current !== null;
  }

  // Every frame. `hovered`: what the cursor rests on now (null: nothing). `resolve`: where a
  // target is now, null once it is gone. `enabled`: false while the scene is hidden (loading,
  // minimized, the map open).
  Update(now: number, hovered: IBarFrame | null, resolve: (key: string) => IBarFrame | null,
    enabled: boolean, covers: CoverRect[], pointer: { x: number; y: number } | null, arrowTarget: IArrowTarget | null | undefined) {
    if (!enabled) {
      this.hide();
      return;
    }

    const overBar = this.current !== null && !!pointer && !!this.rect && pointer.x >= this.rect.left - EDGE_PX
      && pointer.x <= this.rect.right + EDGE_PX && pointer.y >= this.rect.top - EDGE_PX && pointer.y <= this.rect.bottom + EDGE_PX;

    // Show after the cursor has rested on a marker for a moment, so brushing past shows nothing.
    if (hovered && !overBar) {
      if (hovered.target.key !== this.pendingKey) {
        this.pendingKey = hovered.target.key;
        this.pendingSince = now;
      }
      // A video's bar fades with its info card, which has its own delay.
      const delay = hovered.opacity !== undefined ? 0 : SHOW_DELAY_MS;
      if (now - this.pendingSince >= delay && this.current?.key !== hovered.target.key) {
        this.show(hovered.target);
        this.lastActive = now;
      }
    } else if (!hovered) {
      this.pendingKey = null;
    }

    if (!this.current) {
      this.setClickable(false, now);
      return;
    }
    const frame = resolve(this.current.key);
    if (!frame) {
      this.hide();
      return;
    }
    if (overBar || hovered?.target.key === this.current.key) {
      this.lastActive = now;
    }
    const idle = now - this.lastActive;
    const followed = frame.opacity !== undefined;
    if (followed ? frame.opacity === 0 && !overBar && hovered?.target.key !== this.current.key : idle > HIDE_DELAY_MS + FADE_MS) {
      this.hide();
      return;
    }

    this.place(frame);
    const rect = this.rect!;
    const covered = covers.length > 0 && intersects(rect, covers);
    this.el.style.visibility = covered ? 'hidden' : 'visible';
    if (followed) {
      this.el.style.opacity = String(frame.opacity);
    } else {
      this.el.style.opacity = '';
      this.el.classList.toggle('shown', idle <= HIDE_DELAY_MS && !covered);
    }
    // Not while (nearly) faded out: a click there would land on an invisible bar.
    this.setClickable(overBar && !covered && (!followed || frame.opacity! > 0.3), now);
    this.refresh(arrowTarget);
  }

  private place(frame: IBarFrame) {
    const w = this.el.offsetWidth, h = this.el.offsetHeight;
    if (frame.quad) {
      const q = frame.quad(w, h);
      if (q) {
        this.el.style.transform = quadTransform(w, h, q);
        // Pointer tests use the transformed box.
        this.rect = this.el.getBoundingClientRect();
        return;
      }
    }
    let x = frame.below ? frame.x - w / 2 : frame.x, y = frame.below ? frame.y : frame.y - h / 2;
    x = Math.max(4, Math.min(window.innerWidth - w - 4, x));
    y = Math.max(4, Math.min(window.innerHeight - h - 4, y));
    this.el.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
    this.rect = new DOMRect(Math.round(x), Math.round(y), w, h);
  }

  private show(target: IBarTarget) {
    this.current = target;
    this.rect = null;
    this.el.textContent = '';
    this.trackButton = null;
    this.slider = null;
    this.el.style.transition = target.kind === 'video' ? 'none' : '';

    if (target.kind === 'video') {
      // Only the volume for now (mute stays in the marker's settings).
      const icon = document.createElement('span');
      icon.className = 'icon';
      icon.innerHTML = svg('sound');
      this.el.appendChild(icon);
      this.slider = document.createElement('input');
      this.slider.type = 'range';
      this.slider.min = '0';
      this.slider.max = '100';
      this.slider.title = 'Volume (just for you)';
      this.slider.addEventListener('input', () => this.volumeInput());
      this.slider.addEventListener('pointerdown', () => { this.dragging = true; });
      this.slider.addEventListener('change', () => this.volumeInput(true));
      this.el.appendChild(this.slider);
      this.showBar();
      return;
    }
    // Tracking first, then (apart) the buttons that make the marker go away.
    this.trackButton = this.button('track', 'Point the arrow at this marker', () => this.toggleTrack());
    const gap = document.createElement('span');
    gap.className = 'gap';
    this.el.appendChild(gap);
    this.button('hide', 'Hide this marker', () => this.set(MarkerActivePath(...ids(target)), false, true));
    this.button('hidePack', 'Hide the whole pack: ' + target.packName, () => this.set(PackActivePath(ids(target)[0]), false, true));
    if (target.kind === 'position' && target.packAutoHide) {
      this.button('done', 'Mark done: hide until it reappears (the pack\'s auto-hide)',
        () => this.set(MarkerDoneAtPath(...ids(target)), Date.now(), true));
    }
    this.showBar();
  }

  private showBar() {
    this.el.style.display = 'flex';
    this.el.style.visibility = 'visible';
    // Placed before the first fade-in frame, not at the corner.
    this.el.classList.remove('shown');
    void this.el.offsetWidth;
  }

  private button(icon: keyof typeof ICONS, title: string, onClick: () => void) {
    const b = document.createElement('button');
    b.type = 'button';
    b.title = title;
    b.innerHTML = svg(icon);
    b.addEventListener('click', onClick);
    this.el.appendChild(b);
    return b;
  }

  private set(path: string[], value: unknown, hideBar = false) {
    send(IPC.Settings.Update, { path, value });
    // The marker disappears with the next render data; do not leave the bar hanging meanwhile.
    if (hideBar) this.hide();
  }

  private lastArrowTarget: IArrowTarget | null | undefined;

  private toggleTrack() {
    const t = this.current;
    if (!t) return;
    if (this.isTracked(t, this.lastArrowTarget)) {
      this.set(['render', 'arrowTarget'], null);
    } else {
      this.set(['render', 'arrowTarget'], { packId: t.packId, markerId: t.markerId });
      this.set(['render', 'showArrow'], true);
    }
  }

  private isTracked(t: IBarTarget, target: IArrowTarget | null | undefined) {
    return !!target && target.packId === t.packId && (target.markerId ?? null) === t.markerId;
  }

  // The slider moved: applies at once, and is saved at most every SAVE_VOLUME_MS (and at the end).
  private volumeInput(final = false) {
    const t = this.current;
    if (!t || !this.slider) return;
    const volume = Math.round(+this.slider.value) / 100;
    const a = this.audio.get(t.key);
    // Moving the slider up from muted is wanting to hear it.
    const muted = volume > 0 ? false : a.muted;
    this.audio.set(t.key, volume, muted);
    const save = () => {
      this.volumeTimer = 0;
      this.set(MarkerVolumePath(...ids(t)), volume);
      if (a.muted && !muted) this.set(MarkerMutedPath(...ids(t)), false);
    };
    if (final) {
      window.clearTimeout(this.volumeTimer);
      save();
    } else if (!this.volumeTimer) {
      this.volumeTimer = window.setTimeout(save, SAVE_VOLUME_MS);
    }
  }

  // State shown on the buttons.
  private refresh(arrowTarget: IArrowTarget | null | undefined) {
    const t = this.current;
    if (!t) return;
    this.lastArrowTarget = arrowTarget;
    if (this.trackButton) {
      const on = this.isTracked(t, arrowTarget);
      this.trackButton.classList.toggle('on', on);
      this.trackButton.title = on ? 'The arrow points at this marker. Click to hide the arrow' : 'Point the arrow at this marker';
    }
    if (this.slider) {
      const a = this.audio.get(t.key);
      if (!this.dragging && +this.slider.value !== Math.round(a.volume * 100)) {
        this.slider.value = String(Math.round(a.volume * 100));
      }
    }
  }

  hide() {
    if (!this.current && !this.clickable) return;
    this.current = null;
    this.rect = null;
    this.pendingKey = null;
    this.dragging = false;
    this.el.style.display = 'none';
    this.el.style.opacity = '';
    this.el.classList.remove('shown');
    this.setClickable(false, performance.now());
  }

  private setClickable(clickable: boolean, now: number) {
    if (clickable === this.clickable && !(clickable && now - this.clickableSent > CLICKABLE_REFRESH_MS)) return;
    this.clickable = clickable;
    this.clickableSent = now;
    send(IPC.OverlaySetClickable, clickable);
  }
}
