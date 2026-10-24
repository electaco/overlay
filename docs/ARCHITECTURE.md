# Electaco Overlay — Architecture

Technical overview of how the overlay is built and how its pieces fit together. For setup and
day-to-day commands see [../README.md](../README.md); for the mount menu specifically see
[mount-menu.md](mount-menu.md).

## 1. Process model

Electron, so three kinds of JavaScript:

| Process | Location | Runs | Node access |
| --- | --- | --- | --- |
| **Main** | `ts_static/electron_main.ts` + `ts_static/electron_main_parts/` | Window management, settings on disk, background service, GW2 API | Yes (full) |
| **Preload** | `ts_static/preload.js` | Bridge between the two, per window | Yes (limited) |
| **Renderer — UI** | `src/` (React) | Configuration windows | **No** — sandboxed |
| **Renderer — overlay** | `ts_static/renderer.ts`, bundled as `src/overlay.tsx` | three.js marker rendering over the game | **No** — sandboxed |

Both renderers are locked down: `nodeIntegration: false`, `contextIsolation: true`,
`sandbox: true`. All privileged work happens in main and is reached through IPC.

## 2. Dual build

There are two TypeScript configs and two outputs, which is the single most confusing thing
about the repo:

```
tsconfig.json           src/  → React UI      (ES modules, JSX, DOM)
tsconfig-electron.json  ts_static/ → main     (CommonJS, Node)
```

```
npm run react-build    craco build  → build/         (index.html + renderer.html + bundles)
                                    → then tsc -p tsconfig-electron.json → build/electron/
npm run electron-build tsc -p tsconfig-electron.json → build/electron/
                                    → scripts/copy-preload.js → build/electron/preload.js
```

**Order matters.** `craco build` empties `build/`, so it would delete the compiled main
process. `react-build` therefore runs `electron-build` *after* `craco build`. This is why
`react-build` is the build command to use, and why there is no separate "electron then react"
order anywhere.

### Why CRACO

The overlay was historically loaded as CommonJS from `renderer.html` via
`require('./electron/ts_static/renderer')`, which forced `nodeIntegration: true`. It is now a
normal webpack bundle, so the overlay window can be sandboxed.

`craco.config.js` teaches the standard react-scripts build to emit a **second page**:

1. Add a `renderer` webpack entry (`src/overlay.tsx`) without renaming `main` — CRA's
   asset-manifest generator hardcodes `entrypoints.main`.
2. Add a second `HtmlWebpackPlugin` for `public/renderer.html`, scoped with `chunks` so the two
   pages do not inject each other's bundles or CSS.
3. Widen `ModuleScopePlugin` (registered under `resolve.plugins`, *not* `plugins`) and the app
   `babel-loader` rule so they also cover `ts_static/`, which the overlay entry imports from
   outside `src/`.

`src/overlay.tsx` deliberately does **not** import `./index` — that mounts React into `#root`,
which `renderer.html` does not have, and React would abort before the overlay started.

## 3. IPC

Every channel name lives in `src/shared/ipc.ts` (`IPC.*`). Never hard-code strings.

The preload (`ts_static/preload.js`) exposes two globals:

- `window.electaco.ipc` — `send` / `on` / `invoke` / `removeAllListeners`
- `window.electaco.config` — same, for the config-button window

Both are **allowlisted**. A channel not in the preload's `send`/`on` lists is silently dropped —
this has caused real bugs (a removed `gw2data` entry made all markers vanish). When adding a
channel, update the allowlist in `preload.js` *and* `IPC` in `ipc.ts`.

`src/shared/electron_ipc.ts` is the typed wrapper everything imports. Note its contract:

> `on(channel, cb)` passes **one argument** — the payload. The preload strips the IPC event
> object. Every listener is `(data) => ...`, never `(event, data)`.

Channel groups:

| Group | Purpose |
| --- | --- |
| `IPC.Settings` | get / set / update settings |
| `IPC.Marker`, `IPC.Marker.*` | marker add/remove/update, groups, packs |
| `IPC.Window` | open/close secondary windows, resize |
| `IPC.Maps` | GW2 map table push (`maps-updated`) and pull (`getmaps`) |
| `IPC.Mounts` | mount radial window placement, click-through, grip drag |
| `IPC.Render*`, `IPC.Video` | overlay render data, video markers |
| `IPC.Gw2Data`, `IPC.MouseMove` | GW2 state relay, overlay mouse passthrough |
| `IPC.SendKeys` | synthesize a key chord (used by the mount menu) |
| `IPC.AutoUpdate.*` | updater events |
| `IPC.Debug.*` | devtools / reload |

## 4. Position service

Electron cannot read GW2's position reliably, so an external .NET service does it and the
overlay connects to it.

- Binary in `gw2data/` (`WebSocketServerNetFramework.exe`), started by
  `electron_main_parts/background_service.ts`.
- It listens on **`localhost:19939`** with two sockets plus an HTTP echo page:
  - `ws://localhost:19939/position` — game position/camera; the **overlay renderer connects to this
    one directly**, not through main, and renders markers from the stream.
  - `ws://localhost:19939/control` — used by main (`background_service.ts`) to drive the service.
- The overlay renderer also relays a **throttled `gw2data` message** to main (~500 ms) so main knows
  the current map without duplicating the position socket.

## 5. Map service

`electron_main_parts/service_map.ts` keeps the GW2 map table fresh without hammering the API.

- Sources: `https://api.guildwars2.com/v2/build` (tiny) and
  `https://api.guildwars2.com/v2/maps?ids=all` (~580 KB, ~1100 maps).
- The API sends `Cache-Control: max-age=3600` and **no ETag**, so freshness is decided locally:
  check hourly, retry with backoff, allow at most a couple of refreshes.
- An **unknown map id** seen in the position stream is treated as strong evidence the table is
  stale and triggers a refresh — debounced, and rate-limited so a map ArenaNet genuinely removed
  cannot cause a request storm.
- Cached to `%APPDATA%\electaco\gw2_maps.json` (+ a `.meta.json`). Main pushes the table to
  renderers on connect and on change; `src/components/helpers/constants.ts` keeps an id→name
  index.
- The API returns a **raw array**; `MapService.ToMapTable()` normalises either shape (API array or
  cached object) into the `{ [id]: map }` table the rest of the code expects. Skipping that
  produced blank map names.

## 6. Settings

`src/shared/models/settings/` — `Settings.ts` is the entry point.

- Stored as `settings2.json` under the app's userData folder (`%APPDATA%\electaco\`), resolved by
  `GetStoragePathFor()`. The cached map table lives in the same folder.
- **Atomic writes**: write `.tmp`, then rename over the real file.
- A `.bak` copy is kept, and loading falls back to it if the main file is unreadable.
- `Migrate()` upgrades old shapes; each new setting group should get an `ISettings` change plus a
  migration entry, and defaults in `Default*Settings()`.

Known groups: markers, render, nameplates, overlay (`overlaySettings`, containing mount settings).

## 7. Windows

`electron_main_parts/windows.ts` owns all of them:

| Window | Page | Notes |
| --- | --- | --- |
| Overlay | `build/renderer.html` | Fullscreen, transparent, always-on-top, **click-through** by default |
| Config button | `build/index.html` (no route) | Small launcher |
| Configuration | `#/config` | Settings UI |
| Marker packs | `#/marks` | Marker pack management |
| Marker search | `#/get_markers` | Search and add markers |
| Mounts | `#/mounts` | Radial mount menu — see [mount-menu.md](mount-menu.md) |
| Test | `#/test` | Scratch page |

Only `mounts` gets special sizing in `createWindow()`; every other secondary window is 600×400.
They are opened and closed with `IPC.Window.Open` (`{ path, show }`) — `show: false` closes. Any new
window needs a route in `src/routes.tsx`, and a branch in `createWindow()` if it needs unusual
sizing or behaviour.

The overlay window is transparent and `setIgnoreMouseEvents(true, { forward: true })` so clicks
reach the game; it re-enables capture while the cursor is over interactive UI.

## 8. Rendering

three.js, driven by `ts_static/renderer.ts`:

- `render/CameraPositionManager.ts` — camera math from GW2 camera data
- `render/PositionMarker.ts`, `render/MarkerIcon.ts` — world-space markers
- `render/VideoMarker.ts` — video playback (video.js / hls.js) for video marker packs
- `render/textsprite.ts` — troika-three-text labels

`typings/index.d.ts` deliberately does not pull in the old vendored three.js globals — it carries a
comment saying so. Those declare both a global `THREE` namespace and `declare module "three"`,
which conflicts with `@types/three`; three is typed from `@types/three` now.

## 9. Marker packs

Marker packs are `.etmp` files, associated with the app and openable via the `etmp://` scheme
(`LoadMarkerPacksFromCommandLine()` in `settings.ts`). Packs can declare an `updateurl` for
self-update; `MarkerGroupSettings.IsUpdateUrlAllowed()` enforces **https only** (localhost is
exempt) before any fetch.

Pack/settings lookups go through `object-path` (`getSetting.tsx`).

> Note: `js-yaml` and `video.js` are still declared in `package.json` but are no longer imported
> anywhere in the source. Video playback is handled by `hls.js` in
> `ts_static/render/VideoMarker.ts`. Do not assume a declared dependency is in use — grep first.

## 10. Auto-update

`electron-updater` against GitHub releases (`npm run deploy`). Events are surfaced to the UI via
`IPC.AutoUpdate.*`. Only active in packaged builds — `skipCheckForUpdatesAndNotify` fires in dev.

## 11. Debugging

- `IPC.Debug.DebugWindowRender` / `IPC.Debug.DebugWindow` open detached devtools;
  `IPC.Debug.ReloadRender` reloads the overlay.
- `--remote-debugging-port=<port>` exposes the CDP endpoint at `http://127.0.0.1:<port>/json`,
  which is the practical way to inspect window sizes and DOM state at runtime.
- If Electron is launched from an npm script under a harness that sets `ELECTRON_RUN_AS_NODE`,
  clear it first (`cmd /c "set ELECTRON_RUN_AS_NODE=&& ..."`), or Electron starts as plain Node.
- Logs go to the app's log folder via `electron_main_parts/logging.ts`.

## 12. Gotchas that have bitten before

- Building `ts_static` without letting the CRACO babel rule cover it → `Unexpected token` on
  TypeScript syntax in the webpack bundle. The app rule's `include` must be widened to
  `ts_static`.
- Two `HtmlWebpackPlugin` pages emitting different `index.html` content → both need explicit
  `chunks`, and both `userOptions.chunks` and `options.chunks` must be set (html-webpack-plugin
  snapshots options at construction).
- Importing `./index` from `overlay.tsx` → React error #200.
- Adding an `IPC` channel without updating the preload allowlist → silent no-op.
- Listening as `(event, data)` → `data` is always `undefined`.
- `package-lock.json` is not used; `yarn.lock` is the maintained lockfile.
