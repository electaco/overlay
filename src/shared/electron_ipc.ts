import { IPC } from './ipc';

// Shape of the preload bridge (public/electron/preload.js). Declared here rather than
// relying on typings/index.d.ts: that file also references the bundled three.js globals,
// which conflict with @types/three when this module is compiled by tsconfig-electron.
export interface IElectacoIpc {
    send(channel: string, ...args: unknown[]): void;
    on(channel: string, callback: (...args: unknown[]) => void): (() => void) | undefined;
    removeAllListeners(channel: string): void;
    invoke(channel: string, args: unknown[]): Promise<unknown>;
}

export interface IElectacoConfig {
    send(channel: string, ...args: unknown[]): void;
    on(channel: string, callback: (...args: unknown[]) => void): (() => void) | undefined;
    removeAllListeners(channel: string): void;
}

interface IElectacoBridge {
    ipc?: IElectacoIpc;
    config?: IElectacoConfig;
}

const electron: IElectacoBridge = (window as unknown as { electaco?: IElectacoBridge }).electaco ?? {};

export function send(channel: string, ...args: unknown[]): void {
    electron.ipc?.send(channel, ...args);
}

export function on(channel: string, callback: (...args: unknown[]) => void): (() => void) | undefined {
    // The preload bridge strips the IPC event object and passes only the payload, so every
    // callback in this codebase takes a single argument: on(chan, (data) => ...).
    return electron.ipc?.on(channel, callback);
}

export function removeAllListeners(channel: string): void {
    electron.ipc?.removeAllListeners(channel);
}

export function invoke(channel: string, ...args: unknown[]): Promise<unknown> {
    return electron.ipc?.invoke(channel, args) || Promise.resolve(undefined);
}

export function configSend(channel: string, ...args: unknown[]): void {
    electron.config?.send(channel, ...args);
}

export function configOn(channel: string, callback: (...args: unknown[]) => void): (() => void) | undefined {
    return electron.config?.on(channel, callback);
}

export function configRemoveAllListeners(channel: string): void {
    electron.config?.removeAllListeners(channel);
}
