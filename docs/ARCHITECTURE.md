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
| `IPC.Gw2Data` | GW2 state relay |
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

three.js, driven by `ts_static/renderer.ts`. The WebGL canvas renders at the display's real
resolution (`setPixelRatio(devicePixelRatio)`); without it, the canvas was drawn in CSS pixels
and stretched by the display scale (1.5× at 150%), blurring all text and markers.

- `render/CameraPositionManager.ts` — camera math from GW2 camera data
- `render/PositionMarker.ts`, `render/MarkerIcon.ts` — world-space markers
- `render/VideoMarker.ts` — video markers (hls.js, or the native `<video>` for non-HLS URLs); see below
- `render/BlackBars.ts` — detects letterbox / pillarbox bars in the playing video
- `render/textsprite.ts` — troika-three-text labels

`typings/index.d.ts` deliberately does not pull in the old vendored three.js globals — it carries a
comment saying so. Those declare both a global `THREE` namespace and `declare module "three"`,
which conflicts with `@types/three`; three is typed from `@types/three` now.

### Cursor input

The overlay window is click-through with `setIgnoreMouseEvents(true, { forward: true })`, so the
page still receives real DOM `mousemove` events (in page pixels, any DPI) while GW2 has focus,
but never clicks. `renderer.ts` keeps the latest cursor position in normalized device coordinates
and acts on it every rendered frame, so hover follows the camera while the cursor rests: position-marker hover (raycast on layer 2) and the video
screen's info panel. **Do not use `mouseleave`:** such a window never holds the mouse, so
Chromium sends `mouseout`/`mouseleave` right after *every* forwarded move, at a position still
inside the window. Clearing the cursor on it made hover flash for one frame. Instead, while
something is hovered, the renderer asks main (`IPC.CursorInOverlay`: `screen.getCursorScreenPoint()`
against the overlay's bounds) twice a second whether the cursor has really left. This replaced a 300 ms `screen.getCursorScreenPoint()` poll in main
(`mouse_movement.ts`, `IPC.MouseMove`), which was slow and only mapped the primary display.

Clickable controls on the overlay (for example a volume control on the video screen) would need
the mount menu's pattern from [mount-menu.md](mount-menu.md): hit-test on `mousemove`, and switch
`setIgnoreMouseEvents(false)` only while the cursor is over the control. The window would also
have to be non-focusable so a click does not take focus from GW2.

### Map changes and the open map

`renderer.ts` treats render data as belonging to one map. When the MumbleLink map id changes it
drops the current markers at once and asks main for the new map's (`gw2data` sent immediately,
then `getrender`), instead of waiting for the throttled relay; main only resends on its own when
the *translated* map id changes. While the in-game map is open (`UiState.MapOpen`) the scene is
empty, and render data that arrives meanwhile is stored and only shown when the map closes.
The overlay also requests render data on its first position, so a reloaded overlay page gets its
markers without waiting for a map change.

### Loading screens

MumbleLink has no loading-screen flag (unlike `IsMapOpen`); GW2 just stops updating it, so the
last position (often right next to a video marker) stays until the next map has loaded. The
position service watches MumbleLink's `uiTick`, which advances every game frame otherwise, and
when it stands still for 750 ms sends `{"Type":"loadingscreen","Data":"True"}` on the position
socket, then `"False"` once it moves again. Position messages are still only sent when the data
changes. `renderer.ts` hides the whole scene (all markers) and passes the event to
`MovieManager.SetSuspended()`: the video is paused, but the stream stays loaded, and normal marker selection takes over again when
the loading screen ends. Older services never send the event, so nothing is suspended with them.

### Video markers

There is one `<video>` element (`#player` in `renderer.html`), one stream and one screen mesh,
so one video marker plays at a time. `MovieManager.Update()` runs every rendered frame and
reconciles that player with what *should* be active; nothing else starts, stops or shows it.

- **Which marker:** the nearest one within its `visibleDistance` (default 65) of the **player**
  position. The active one is kept up to 2 units beyond its range, and another must be 5 units
  nearer to take over, so standing on an edge or between two markers does not flap.
- **Identity:** a marker is its source URL plus position. Settings changes resend all markers;
  if the active one is still in the list it keeps playing and only rotation/scale/distances are
  re-applied. Markers sharing a URL share the stream (no reload when switching between them).
- **Deactivating** (out of range, teleport, map change, map opened, marker hidden) hides the
  screen and fully unloads the source: `hls.destroy()`, pause, clear `src`. No audio or
  network keeps running in the background, and coming back loads the stream fresh.
- **Live delay:** hls.js runs with `lowLatencyMode: false` and starts `source.liveDelay` seconds
  behind the live edge (marker editor: "Live delay"), or 30 s when unset. It can't sit further
  back than the playlist's window holds (a 3 × 5 s window allows about 15 s), so the stream
  server should keep a long window: the home stream's nginx-rtmp keeps 180 s
  (`hls_playlist_length`). Everything up to the live edge is already published, so a 30 s
  delay downloads in seconds: playback starts almost at once with a large buffer, and only an
  encoder hiccup longer than the delay can stall it.
- **Buffering:** the player starts and resumes playback itself (autoplay is off). Playback starts only once
  the stream's *buffer target* is buffered ahead. It also starts with less if a video (not live)
  has everything up to its end buffered, or if nothing new has arrived for 20 s. When playback
  runs dry it pauses and waits for the target again, so a slow stream pauses cleanly instead of
  playing frame by frame as each segment lands. A dark stand-in shows until the first frame is
  decoded.
- **Status icon** (lower-left corner of the screen, hidden while playing): a spinning arc while
  loading, a spinning arc whose length fills towards the buffer target, with a percentage, while buffering, and a red
  ring with "!" while the source is offline and being retried.
- **Adaptive buffer target:** steps 8 → 15 → 30 → 60 → 90 s. Video markers are mostly used for
  films, so delay is preferred over interruptions.
  - Each time playback runs dry the target goes up one step, reaching the 90 s cap after four
    stalls. Waiting longer also drifts playback further behind live, which is what actually
    enlarges the buffer; there is no seeking and no hls.js reconfiguration.
  - After 10 min of playing without running dry it goes down one step.
  - Delay that has built up is never deliberately won back (no faster playback). A lower target
    only shortens the wait at the next stall.
  - The learned target is kept per source URL, in seconds, and survives restarts (the overlay
    page's `localStorage` key `electaco.videoBufferTargets`, stored in Electaco's user data
    folder; the older `electaco.videoBufferSteps` index store is still read). A stream that
    needed 30 s starts at 30 s next time instead of relearning it through stalls.
  - Every change is logged as `buffer target Ns ...`.
  - The first fill of a **live** stream (after loading the source) waits for at least 15 s, or
    the learned target if larger. With a short playlist window that avoids playing a few seconds
    and stalling at once; with a long window (see Live delay) it fills in a moment. Films start
    at the learned target, since they fill at download speed.
  - hls.js is configured to buffer up to 120 s / 150 MB ahead (defaults 30 s / 60 MB, which would
    make the higher targets unreachable for films) and keeps only 30 s behind the playhead.
  - This helps streams that publish unevenly. A stream that is slower than real time *on
    average* still pauses, just less often and for longer.
- **Reloads:** a reload happens only when the stream is actually stuck. That means playback not
  advancing for 8 s although data is buffered (decoder stuck), or no new data for 30 s while
  buffering (stream died without an error). A live stream that publishes segments late or
  unevenly is waited for, not reloaded. Fatal hls.js network errors (stream offline) retry after
  5 s; fatal media errors use `recoverMediaError()`. Each source gets a new `Hls` instance, and
  errors from replaced instances are ignored. An external pause is undone. Videos loop.
- **Size and aspect:** the width comes from `source.ratio[0] × scale`; the height follows the
  video's own `videoWidth/videoHeight` once metadata has loaded, and again on the `resize` event
  when the stream changes resolution. `source.ratio[1]` is used only until the dimensions are known.
- **Black bars:** letterbox / pillarbox bars baked into the video (a 2:1 film in 16:9, say) are
  made transparent. `render/BlackBars.ts` samples a 160 px wide copy of the playing frame once a
  second and measures the near-black run from each edge. A sample only counts for an axis when
  both edges agree (real letterboxing is symmetric), so a subtitle in the bottom bar or a dark sky
  along the top doesn't change it, and frames too dark to judge are skipped. Bars are hidden once
  five counted samples agree. The screen's shader then luma-keys only those bands: near-black
  becomes transparent, so the bars vanish while burned-in subtitles drawn in them stay visible.
  The picture area itself is never keyed. The info card and status icon are placed inside the
  picture, and changes are logged as `Black bars: N% top/bottom, N% left/right`.
- **Info on hover:** once the cursor has rested on the active screen for 350 ms, a compact card
  fades in (200 ms; out in 250 ms when it leaves) in its top-left corner (a third of the screen's width) shows the state with a coloured dot and a LIVE / FILM
  tag, a bar of buffered seconds against the target (white tick), how far behind live (or the
  position in a film), the stream's resolution and stalls this session. When offline it shows
  the retry countdown and the source host instead. It and the status icon are `CanvasTexture`
  planes in the screen's rig, just in front of the video, so they move, turn, scale and fade with
  it; the textures are mipmapped with anisotropic filtering so text stays legible at a distance
  and at an angle. The card is
  redrawn every 250 ms while shown, the icon every 50 ms while visible.
  `MovieManager.ScreenPointAt()` gives the cursor's position on the screen as 0..1 from the
  top-left corner, which is what on-screen controls can hit-test against.
- **Fade:** between `fadeInDistance` (default 50) and `visibleDistance`, opacity and volume go
  from 1 to 0 (screen, stand-in, status icon and info card alike).
- **A slow source cannot be fixed by the player.** If the encoder or uplink publishes media slower
  than real time (one stream was measured publishing about 5.5 s of video every 9.5 s), any buffer
  drains and playback pauses for the difference. The buffering policy makes those pauses clean
  and visible. It cannot remove them.

## 9. Marker packs

Marker packs are `.etmp` files, associated with the app and openable via the `etmp://` scheme
(`LoadMarkerPacksFromCommandLine()` in `settings.ts`). Packs can declare an `updateurl` for
self-update; `MarkerGroupSettings.IsUpdateUrlAllowed()` enforces **https only** (localhost is
exempt) before any fetch.

Pack/settings lookups go through `object-path` (`getSetting.tsx`).

**Pack data vs personal preferences.** A pack update (or re-import of the same pack id) replaces
the whole pack in `marks`, so nothing the player chooses is stored there. Preferences live in
`markerPrefs` (`src/shared/models/settings/MarkerPrefs.ts`), keyed by pack id and marker id:
currently shown/hidden for packs and markers. A pack's own `active` values are its defaults;
`IsPackActive()` / `IsMarkerActive()` give the effective value (preference, else pack default),
and the render data, list sorting and eye toggles all use them. The toggles write array paths
(`["markerPrefs", packId, "markers", markerId, "active"]`) so ids are never split on `.`.
Removing a pack or marker removes its preferences; replacing it keeps them. Files from before
this have hidden packs/markers moved into `markerPrefs` by `Migrate()`.

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
