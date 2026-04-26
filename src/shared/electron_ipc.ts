import { IPC } from './ipc';

const electron = window.electaco || {};

export function send(channel: string, ...args: unknown[]): void {
    electron.ipc?.send(channel, args);
}

export function on(channel: string, callback: (...args: unknown[]) => void): (() => void) | undefined {
    return electron.ipc?.on(channel, callback);
}

export function removeAllListeners(channel: string): void {
    electron.ipc?.removeAllListeners(channel);
}

export function invoke(channel: string, ...args: unknown[]): Promise<unknown> {
    return electron.ipc?.invoke(channel, args.length > 0 ? args : undefined) || Promise.reject('IPC not available');
}

export function configSend(channel: string, ...args: unknown[]): void {
    electron.config?.send(channel, args);
}

export function configOn(channel: string, callback: (...args: unknown[]) => void): (() => void) | undefined {
    return electron.config?.on(channel, callback);
}

export function configRemoveAllListeners(channel: string): void {
    electron.config?.removeAllListeners(channel);
}
