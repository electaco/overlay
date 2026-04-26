/// <reference path="globals/three/index.d.ts" />

interface ElectacoIPC {
    send(channel: string, args?: unknown[]): void;
    on(channel: string, callback: (...args: unknown[]) => void): (() => void) | undefined;
    removeAllListeners(channel: string): void;
    invoke(channel: string, args?: unknown[]): Promise<unknown>;
}

interface ElectacoConfig {
    send(channel: string, args?: unknown[]): void;
    on(channel: string, callback: (...args: unknown[]) => void): (() => void) | undefined;
    removeAllListeners(channel: string): void;
}

interface ElectacoAPI {
    ipc: ElectacoIPC;
    config: ElectacoConfig;
}

interface Window {
    electaco: ElectacoAPI;
}
