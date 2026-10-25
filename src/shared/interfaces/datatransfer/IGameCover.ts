// Overlay renderer -> main: the parts of the game covered by other programs' windows, in screen DIP
// coordinates (the same space as BrowserWindow.getBounds()).
export interface IGameCover {
    minimized: boolean;
    rects: { x: number; y: number; width: number; height: number }[];
}
