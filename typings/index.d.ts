// NOTE: do not re-add `/// <reference path="globals/three/index.d.ts" />`. That vendored
// copy declares a global THREE namespace plus `declare module "three"`, which conflicts
// with @types/three and made MathUtils / SpriteMaterial.sizeAttenuation / Raycaster.layers
// appear missing. three is typed from node_modules/@types/three now.

interface ElectacoIPC {
    send(channel: string, ...args: unknown[]): void;
    on(channel: string, callback: (...args: unknown[]) => void): (() => void) | undefined;
    removeAllListeners(channel: string): void;
    invoke(channel: string, ...args: unknown[]): Promise<unknown>;
}

interface ElectacoConfig {
    send(channel: string, ...args: unknown[]): void;
    on(channel: string, callback: (...args: unknown[]) => void): (() => void) | undefined;
    removeAllListeners(channel: string): void;
}

interface ElectacoAPI {
    ipc: ElectacoIPC;
    config: ElectacoConfig;
}

interface Window {
    electaco: ElectacoAPI;
    // Bridged by public/electron/preload.js for pages that expect a global ipcRenderer
    // (the legacy public/errorhandler.js). Prefer window.electaco.ipc in new code.
    ipcRenderer?: ElectacoIPC;
}
