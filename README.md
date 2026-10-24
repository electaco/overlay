# Electaco Overlay

Electron-based overlay for Guild Wars 2. Displays markers (including video markers) and a radial
mount menu on top of the game.

More information: <https://electaco.github.io/>

This is the main component of Electaco — the user interface and the marker display. It uses the
position service from <https://github.com/electaco/positionservice> for the parts Electron cannot do
(or does poorly); a binary build of that service ships in the `gw2data/` folder.

## Requirements

- **Windows** — the app relies on Windows virtual-key codes and a WinForms/WPF position service.
- **Node.js 16+** and **Yarn** (`yarn.lock` is the maintained lockfile; there is no
  `package-lock.json`).
- Running it against the game needs Guild Wars 2 installed; without it the overlay still starts and
  the UI works.

## Getting started

```bash
yarn install
yarn run          # build everything, then start
```

`yarn run` is `yarn build-all && yarn start`.

## Commands

| Command | What it does |
| --- | --- |
| `yarn run` | Build all, then launch |
| `yarn start` | Launch only (requires a prior build) |
| `yarn build-all` | Alias for `react-build` |
| `yarn react-build` | `craco build`, then the Electron main process |
| `yarn electron-build` | Compile the Electron main process only |
| `yarn react-start` | React dev server (UI windows only, not the overlay) |
| `yarn watch` | Watch mode for the main process |
| `yarn build` | Package an installer without publishing |
| `yarn deploy` | Package and publish to GitHub releases |
| `yarn test` | Not configured |

Build output goes to `build/`; packaged installers go to `out/`.

> `react-build` runs `craco build` **then** `electron-build` on purpose. `craco build` empties
> `build/`, which would otherwise delete the compiled main process.

## Project layout

```
src/              React UI (configuration, markers, mount menu)
  shared/         Types, models and IPC names used by both processes
ts_static/        Electron main process + the overlay renderer + three.js rendering
public/           HTML templates, icons, bundled game data
scripts/          Build helpers (copy-preload.js)
docs/             Architecture and feature documentation
gw2data/          Bundled position service binary
```

The build is split in two — `src/` is bundled by webpack (CRACO), `ts_static/` is compiled by `tsc`
with a separate config, because one is browser code and the other is Node code.

## Documentation

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — process model, the dual build, IPC and the
  preload allowlists, position service, map service, settings storage, windows, rendering.
- **[docs/mount-menu.md](docs/mount-menu.md)** — the radial mount menu: layout, window sizing and
  placement, dragging, click-through, settings and icons.

## Where data lives

- Settings: `%APPDATA%\electaco\settings2.json` (plus a `.bak`).
- Cached GW2 map table: `%APPDATA%\electaco\gw2_maps.json` (+ `.meta.json`).
- Logs: the app's log folder, written by `ts_static/electron_main_parts/logging.ts`.

## Related repositories

| Repo | Purpose |
| --- | --- |
| [positionservice](https://github.com/electaco/positionservice) | Reads GW2 position/camera data, serves it over a local WebSocket |
| [electaco.github.io](https://github.com/electaco/electaco.github.io) | Marker authoring docs and the website |
