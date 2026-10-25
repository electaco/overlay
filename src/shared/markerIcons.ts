// Built-in marker icons. Paths are relative to the page (build/index.html and build/renderer.html
// sit side by side), and the icons are light grey so the pack colour tints them.
// Regenerate the generated ones with scripts/make_marker_icons.py.

export interface IMarkerIconChoice {
  file: string;
  name: string;
}

export const DEFAULT_MARKER_ICON = "marker1.webp";

export const MARKER_ICONS: IMarkerIconChoice[] = [
  { file: DEFAULT_MARKER_ICON, name: "Pin" },
  { file: "icons/markers/circle.webp", name: "Circle" },
  { file: "icons/markers/diamond.webp", name: "Diamond" },
  { file: "icons/markers/star.webp", name: "Star" },
  { file: "icons/markers/flag.webp", name: "Flag" },
  { file: "icons/markers/exclamation.webp", name: "Exclamation" },
  { file: "icons/markers/question.webp", name: "Question" },
  { file: "icons/markers/arrow.webp", name: "Arrow" },
  { file: "icons/markers/cross.webp", name: "Cross" },
];
