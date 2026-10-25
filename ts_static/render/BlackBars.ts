// Finds letterbox / pillarbox bars baked into a video (e.g. a 2:1 film encoded as 16:9), so the
// screen can make them transparent. See docs/ARCHITECTURE.md (video markers).
//
// A downscaled copy of the current frame is checked for rows (and columns) along the edges in
// which no pixel is brighter than near-black. Real letterboxing is symmetric, so a sample only
// counts for an axis when both edges agree: a burned-in subtitle in the bottom bar, or a dark sky
// along the top only, makes that sample skip the axis and the previous result stands. Only what
// was bar in every recent counted sample is hidden, and frames too dark to judge (night scenes,
// fades) are skipped altogether.

export interface IBars {
  // Fraction of the frame's height covered by each of the top and bottom bars.
  vertical: number;
  // Fraction of the frame's width covered by each of the left and right bars.
  horizontal: number;
}

export const NO_BARS: IBars = { vertical: 0, horizontal: 0 };

const SAMPLE_W = 160;
// A row or column is bar if nothing in it is brighter than this (0-255 luma). Video black
// decodes to ~0; this leaves room for compression noise.
const DARK_LUMA = 26;
// Frames with nothing brighter than this can't tell bars from a dark picture.
const CONTENT_LUMA = 70;
// Bars must have been seen in this many counted samples before they are hidden.
const HISTORY = 5;
// Opposite edges agree if their bars differ by at most this many sample rows / columns.
const SYMMETRY_TOLERANCE = 2;
// Ignore slivers (encoder edge noise) and never treat more than this much of a side as bar.
const MIN_BAR = 0.012;
const MAX_BAR = 0.3;

export class BlackBarDetector {
  bars: IBars = { ...NO_BARS };
  private history: { [axis in keyof IBars]: number[] } = { vertical: [], horizontal: [] };
  private canvas = document.createElement('canvas');
  private ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;

  reset() {
    this.history = { vertical: [], horizontal: [] };
    this.bars = { ...NO_BARS };
  }

  // Looks at the video's current frame. Returns true when the detected bars changed.
  sample(video: HTMLVideoElement): boolean {
    if (!video.videoWidth || !video.videoHeight || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      return false;
    }
    const w = SAMPLE_W;
    const h = Math.max(8, Math.round(SAMPLE_W * video.videoHeight / video.videoWidth));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    let data: Uint8ClampedArray;
    try {
      this.ctx.drawImage(video, 0, 0, w, h);
      data = this.ctx.getImageData(0, 0, w, h).data;
    } catch {
      return false; // e.g. a cross-origin source without CORS
    }

    const rowMax = new Float32Array(h);
    const colMax = new Float32Array(w);
    let frameMax = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        if (luma > rowMax[y]) rowMax[y] = luma;
        if (luma > colMax[x]) colMax[x] = luma;
        if (luma > frameMax) frameMax = luma;
      }
    }
    if (frameMax < CONTENT_LUMA) {
      return false;
    }

    // Length of the near-black run from one edge, in sample rows / columns.
    const run = (max: Float32Array, fromEnd: boolean) => {
      const limit = Math.floor(max.length * MAX_BAR);
      let n = 0;
      while (n < limit && max[fromEnd ? max.length - 1 - n : n] < DARK_LUMA) n++;
      return n;
    };

    let changed = false;
    const update = (axis: keyof IBars, max: Float32Array) => {
      const a = run(max, false), b = run(max, true);
      if (Math.abs(a - b) > SYMMETRY_TOLERANCE) return; // not a letterbox in this frame
      const history = this.history[axis];
      history.push(Math.min(a, b) / max.length);
      if (history.length > HISTORY) history.shift();
      if (history.length < HISTORY) return;
      let next = Math.min(...history);
      if (next < MIN_BAR) next = 0;
      if (Math.abs(next - this.bars[axis]) * max.length >= 1) {
        this.bars[axis] = next;
        changed = true;
      }
    };
    update('vertical', rowMax);
    update('horizontal', colMax);
    return changed;
  }
}
