import { IRenderData } from '../../src/shared/interfaces/render/renderdata';
import { IGenericMarker, IPositionMarker, MarkerType } from '../../src/shared/interfaces/render/marker';
import { IGw2Context } from '../../src/shared/interfaces/datatransfer/IGw2MumbleLinkData';
import { CoverRect } from './ArrowHud';

// For calibrating live through the remote debugging port (window.mapTuning).
export const MapTuning = {
  // Physical screen pixels per continent unit at MapScale 1; null: automatic. Measured in game:
  // the display scale (devicePixelRatio) with GW2's "Use DPI scaling" on, else 1.
  k: null as number | null,
  // Draw a red dot at the player's own continent position, to compare with the game's arrow.
  playerDot: false,
};

const ICON_SIZE = 28;
// MapScale grows as the map is zoomed out; names are only drawn when zoomed in this far, or
// they would pile up on each other.
const LABEL_MAX_SCALE = 2;

// A 2D canvas over the game that draws the markers on the in-game map (the 3D scene is not shown
// while the map is open).
export class MapLayer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private drawn = false;
  // Icon images and their tinted copies, loaded once.
  private images: Record<string, HTMLImageElement> = {};
  private tinted: Record<string, HTMLCanvasElement> = {};

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    (window as any).mapTuning = MapTuning;
  }

  private resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.round(window.innerWidth * dpr);
    this.canvas.height = Math.round(window.innerHeight * dpr);
  }

  // Called every frame. context is null when the map is closed or nothing should be drawn.
  Update(context: IGw2Context | null, renderData: IRenderData | null, covers: CoverRect[]) {
    const ctx = this.ctx;
    if (!context) {
      if (this.drawn) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawn = false;
      }
      return;
    }
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
    this.drawn = true;

    const w = window.innerWidth, h = window.innerHeight;
    const scale = context.MapScale || 1;
    const k = MapTuning.k ?? (renderData?.gameDpiScaling === false ? 1 : dpr);
    const toScreen = (cx: number, cy: number) => ({
      x: w / 2 + (cx - context.MapCenterX) / scale * k / dpr,
      y: h / 2 + (cy - context.MapCenterY) / scale * k / dpr,
    });

    for (const marker of renderData?.markers ?? []) {
      if (!marker.continent) continue;
      const p = toScreen(marker.continent.x, marker.continent.y);
      if (p.x < -ICON_SIZE || p.y < -ICON_SIZE || p.x > w + ICON_SIZE || p.y > h + ICON_SIZE) continue;
      this.drawMarker(marker, p.x, p.y, scale);
    }

    if (MapTuning.playerDot) {
      const p = toScreen(context.MapPlayerX, context.MapPlayerY);
      ctx.fillStyle = '#ff2020';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Parts under other windows go back to transparent, as on the 3D canvas.
    for (const r of covers) ctx.clearRect(r.x, r.y, r.w, r.h);
  }

  private drawMarker(marker: IGenericMarker, x: number, y: number, mapScale: number) {
    const ctx = this.ctx;
    const half = ICON_SIZE / 2;
    if (marker.type === MarkerType.VideoMarker) {
      // Play-triangle badge: video markers have no icon.
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.beginPath();
      ctx.arc(x, y, half * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(x - 4, y - 6);
      ctx.lineTo(x - 4, y + 6);
      ctx.lineTo(x + 7, y);
      ctx.closePath();
      ctx.fill();
    } else {
      const icon = (marker as IPositionMarker).icon;
      const img = icon ? this.tintedIcon(icon.icon, icon.color) : null;
      if (img) {
        // The pin's tip is its position, as with the 3D sprite (anchored at the bottom).
        ctx.drawImage(img, x - half, y - ICON_SIZE, ICON_SIZE, ICON_SIZE);
      } else {
        // Not loaded yet (or no icon): a plain dot so the position is still shown.
        ctx.fillStyle = icon?.color ?? '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (marker.mapLabel && mapScale <= LABEL_MAX_SCALE) {
      // Below the pin's tip, or below the centred video badge.
      const labelY = y + (marker.type === MarkerType.VideoMarker ? half * 0.7 + 2 : 2);
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(0,0,0,0.85)';
      ctx.strokeText(marker.mapLabel, x, labelY);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(marker.mapLabel, x, labelY);
    }
  }

  // The icon multiplied by the colour, which is how the 3D sprite material tints it. Null until loaded.
  private tintedIcon(src: string, color: string): HTMLCanvasElement | null {
    let img = this.images[src];
    if (!img) {
      img = this.images[src] = new Image();
      img.src = src;
    }
    if (!img.complete || img.naturalWidth === 0) return null;
    const key = color + '|' + src;
    if (!this.tinted[key]) {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const g = c.getContext('2d')!;
      g.drawImage(img, 0, 0);
      g.globalCompositeOperation = 'multiply';
      g.fillStyle = color;
      g.fillRect(0, 0, c.width, c.height);
      g.globalCompositeOperation = 'destination-in'; // multiply also painted the transparent parts
      g.drawImage(img, 0, 0);
      this.tinted[key] = c;
    }
    return this.tinted[key];
  }
}
