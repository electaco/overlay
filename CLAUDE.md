# CLAUDE.md

Guidance for working in this repository. For depth, read
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/mount-menu.md](docs/mount-menu.md); this file
is the short version plus the traps.

## Project overview

Electaco is an Electron overlay for Guild Wars 2: markers (including video), nameplates, and a
radial mount menu, drawn on top of the game. React 16 UI, three.js rendering, WinForms position
service in `gw2data/`.

## Architecture in one minute

- **Dual build.** `src/` → webpack (CRACO). `ts_static/` → `tsc -p tsconfig-electron.json`
  (CommonJS). Two configs, two output styles.
- **Both renderers are sandboxed** (`nodeIntegration: false`, `contextIsolation: true`,
  `sandbox: true`). Privileged work is in main; renderers reach it only through the preload bridge.
- **IPC channels** are centralised in `src/shared/ipc.ts`; `src/shared/electron_ipc.ts` is the
  typed wrapper.
- **Overlay window** loads `build/renderer.html` (bundled from `src/overlay.tsx` → `ts_static/`)
  and connects straight to the position service WebSocket at `ws://localhost:19939/position`.
- **Secondary windows** load `build/index.html#/<route>` and are opened/closed via
  `IPC.Window.Open`.
- **Settings** live at `%APPDATA%\electaco\settings2.json`, written atomically with a `.bak`.

## Commands

```bash
yarn install
yarn run            # build all, then launch
yarn start          # launch only (needs a prior build)
yarn build-all      # alias for react-build
yarn react-build    # craco build, THEN electron-build
yarn electron-build # tsc for the main process + copy preload
yarn react-start    # UI dev server (not the overlay)
yarn watch          # watch mode for the main process
yarn build          # package installer, no publish
yarn deploy         # package + publish to GitHub releases
```

`react-build` must run `electron-build` **after** `craco build` — `craco build` empties `build/` and
would delete the compiled main process.

`yarn.lock` is the maintained lockfile. There is no `package-lock.json`.

## Conventions

- Channel names: add to `IPC` in `src/shared/ipc.ts`, **and** to the allowlist in
  `ts_static/preload.js`. An unlisted channel is silently dropped.
- IPC listeners take **one** argument (the payload): `on(chan, (data) => ...)`. The preload strips
  the event object. `(event, data)` makes `data` undefined.
- New settings groups need: an interface in `src/shared/interfaces/settings/`, a model with
  `Default*Settings()` and `Normalize*Settings()` in `src/shared/models/settings/`, a call from
  `Migrate()` in `Settings.ts`, and a UI section in `Configuration.tsx`.
- New windows need: a branch in `createWindow()` in `ts_static/electron_main_parts/windows.ts` and a
  route in `src/routes.tsx`.
- Constants and message shapes used by both processes go in `src/shared/` (e.g. mount menu
  sizes and `IMountPlacement` in `src/shared/mounts.ts`), not copied into each side.

## Traps

- `src/overlay.tsx` must **not** import `./index` — that mounts React into `#root`, which
  `renderer.html` lacks, and React aborts (error #200).
- The CRACO babel `include` must be widened to `ts_static`, or webpack chokes on TypeScript syntax
  in the overlay bundle.
- `ModuleScopePlugin` lives under `resolve.plugins`, **not** `plugins`. It must allow `ts_static`.
- Two `HtmlWebpackPlugin` pages need explicit `chunks`, and html-webpack-plugin snapshots options at
  construction, so set **both** `userOptions.chunks` and `options.chunks`.
- `typings/index.d.ts` must not reference three.js globals — it would shadow `@types/three`.
- The GW2 maps API returns a raw **array**; `ToMapTable()` normalises it to `{ [id]: map }`.
- Marker pack `updateurl` must be **https** (localhost exempt) — see `IsUpdateUrlAllowed()`.

## GW2 integration

- External position service (`gw2data/`), started by `background_service.ts`, serving
  `ws://localhost:19939/position` plus an HTTP echo page on the same port.
- The overlay renderer reads the position socket directly and relays a throttled `gw2data` message
  to main so main knows the current map.
- Map table refreshed from the GW2 API by `service_map.ts`: hourly, with backoff, plus an
  unknown-map trigger that is debounced and rate-limited.
- `.etmp` marker packs; `etmp://` URL scheme; `.etmp` file association.
- Mount menu spawns mounts by synthesising key chords (Windows virtual-key codes).

## Build output

- `build/` — `index.html`, `renderer.html`, bundles, and `build/electron/` (main + preload). Gitignored.
- `out/` — packaged installers. Gitignored.

## Testing

No test suite is configured (`yarn test` exits 1). Verify changes by building and running, and via
the CDP endpoint if you pass `--remote-debugging-port=<port>`.
