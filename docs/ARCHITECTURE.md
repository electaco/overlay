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

The scene is rendered only from `requestAnimationFrame`, once per display frame; position messages
never trigger a render (that used to present frames off vsync and made markers jitter).
`CameraPositionManager.SetPosition()` stores each MumbleLink sample in a short ring buffer, timed by
the service's `sampleTime` stamp (when it saw the game frame) mapped to local time by the smallest
arrival-minus-stamp seen, else by arrival. `Advance(now)` (first thing in each rendered frame)
computes that frame's camera at render time `now + lead × interval` (interval: moving average of
the time between samples, ignoring gaps over 100 ms): blended between the two samples around it,
or, past the newest, continued from the last two samples for at most `maxPredictMs` (none once
samples have stopped). A camera jump over 20 m (teleport, map change) drops older samples so
nothing is blended across it. `CameraTuning` at the top of the file holds `lead` (default 0.25),
`maxPredictMs`, `velocitySpan` (samples back that prediction measures motion over) and `enabled`; the overlay page exposes it as `window.cameraTuning` for tuning live through the
remote debugging port. `GetPosition()` returns the same
per-frame state to markers, the video manager, the arrow HUD and hover.

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

The one clickable thing on the overlay is the marker action bar, below.

### Marker interaction (hover action bar)

GW2 turns the camera with either mouse button, so the overlay never catches clicks except on its own
small bar (`ts_static/render/MarkerActions.ts`, DOM, styled like the arrow label). It appears once
the cursor has rested ~400 ms on a drawn position marker's icon (`renderer.ts` `handleMouseMove`
raycast; on the open map, `MapLayer.HitTest()` against the icons drawn that frame), next to the icon
(`MarkerBarAnchor()` projects it; `MapLayer.Spot()` on the map). It follows the marker each frame,
stays while the cursor is on the marker or the bar, and fades ~500 ms after it leaves both. One bar
at a time. It is hidden while the scene is (loading screen, minimized), when it would sit under a
cover rect (the same intersection test as the arrow label), and when its marker is gone from the
render data.

A video screen (`MovieManager.IsHovered()`) instead gets only a volume slider, hung centred under
the screen and drawn in the screen's plane (`MovieManager.BarQuad()`, mapped onto the DOM bar with
a CSS `matrix3d`), so it tilts with the video. It has no delay or fade of its own: its opacity is
the info card's (`InfoOpacity()`), and the cursor on the slider counts as hovering the video, so the
card stays up (a short grace keeps the card's show delay from restarting while crossing the gap).

- **Buttons** (tooltips are `title`), track first and, after a gap, the ones that hide: hide marker (`markerPrefs.<pack>.markers.<id>.active = false`),
  point the arrow at it (`render.arrowTarget` + `render.showArrow`, the same as
  `ArrowTargetButton`; highlighted, and clears the target, when it already is the target), hide
  pack (`markerPrefs.<pack>.active = false`), and, in packs with auto-hide, mark done
  (`markerPrefs...doneAt = Date.now()`, what `marker_progress.ts` stores). All go through
  `send(IPC.Settings.Update, { path, value })` with array paths from `MarkerPrefs.ts`; main applies
  them and resends the render data.
- **Identity.** Render markers carry `packId`, `markerId`, `markerName`, `packName` and
  `packAutoHide` (`Settings.createRenderData()`), and `IRenderData.arrowTarget` says what the arrow
  follows. The older index-based `markerMouseoverData` is unused by the bar. The scene objects are
  rebuilt with every render data refresh, so the bar keeps only the `packId|markerId` key and looks
  the marker up again each frame.
- **Clicks.** `IPC.OverlaySetClickable` (main: `setIgnoreMouseEvents(!clickable, { forward: true })`
  on the overlay window, like `IPC.Mounts.SetClickable`). The bar asks for `true` only while the
  cursor is inside its rectangle (+3 px), tested against the forwarded `mousemove` position, not
  with `mouseenter`/`mouseleave` (see Cursor input). `true` is repeated every second so a lost
  message cannot leave the window swallowing the game's clicks; main also returns to click-through
  on page (re)load, a renderer crash, the map opening, a loading screen and minimizing. While
  clickable, `mouseleave` on the document is real and clears the cursor. The overlay window is
  created `focusable: false` (`WS_EX_NOACTIVATE`), so clicking the bar does not take focus from GW2.
- **Video volume.** `markerPrefs.<pack>.markers.<id>.volume` (0..1, default 1) and `.muted` are a
  player's own preference (`MarkerVolumePath`, `MarkerMutedPath`, `MarkerVolume()`,
  `IsMarkerMuted()`); the render data carries the effective values on the video marker. Playback
  volume = volume x (muted ? 0 : 1) x the distance fade. The slider applies at once
  (`MovieManager.SetLocalAudio()`, preferred over render data for 2 s) and saves at most every
  250 ms and on release. The settings UI (marker details) shows the same two values. Track works for
  a video marker only as an explicit marker target (pack-wide arrows still pick position markers).

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

### Game covered by another window

Other programs' windows over the game look as if they are in front of the overlay: the overlay draws
normally and the parts under those windows are then cleared to transparent. The position service
(`GameWindowCover.cs`) checks every 50 ms which windows sit above the game window (found by the
process id in MumbleLink's context) and intersects each one's frame (DWM extended frame bounds)
with the game's client area. Not counted: our own windows (the service's parent process,
`electron.exe`, `Electaco.exe`), invisible or cloaked windows, minimized windows, click-through
layered windows and non-activating tool windows (Blish HUD, Discord/Nvidia overlays), and shell
chrome (taskbar, desktop). Overlaps under 2x2 px are dropped; beyond 32 rectangles the smallest are
merged into their bounding box. The service is per-monitor DPI aware so all of this is in physical pixels.

Whenever the result changes (and once after each connect) it sends, with no debounce so a dragged
window is followed closely,
`{"Type":"gamecover","Data":"{\"w\":1920,\"h\":1080,\"minimized\":false,\"rects\":[[x,y,w,h],...]}"}`
(`Data` is a JSON string; rects are relative to the client's top-left). `renderer.ts` assumes the
overlay canvas covers exactly the game client, scales the rects to CSS pixels (rescaled on resize)
and, after each `renderer.render()`, clears them with the scissor test (the scissor test is turned off
again so the next frame's autoClear covers the whole canvas). The arrow HUD label (DOM) is hidden
while its box touches a rect. A minimized game hides the scene like a loading screen but, unlike one,
leaves videos playing so they are still heard. The rects are relayed to main as `IPC.GameCover`
(`IGameCover`, screen DIP) when they change; the mount menu hides when minimized, and is otherwise cut
to its parts outside the rects (`setShape`, see mount-menu.md). The ElecTaco bar at the top does the
same, recut as it expands and collapses on hover, and also hides only when minimized or wholly
covered (it stays up for the map and loading screens). Marker auto-hide timing ignores all this (the
player is still standing there). Older services never send it. A lost connection to the service clears
the cover, since nothing would update it and the bar holds the only Exit button.

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
  `source.maxHeight` (marker editor: "Max height", same units as the ratio, 0 = no limit) caps the
  height: a taller screen shrinks as a whole, keeping its aspect, so tall clips don't fill the view.
- **Black bars:** letterbox / pillarbox bars baked into the video (a 2:1 film in 16:9, say) are
  made transparent. `render/BlackBars.ts` samples a 160 px wide copy of the playing frame once a
  second and measures the near-black run from each edge. A sample only counts for an axis when
  both edges agree (real letterboxing is symmetric), so a subtitle in the bottom bar or a dark sky
  along the top doesn't change it, and frames too dark to judge are skipped. Bars are hidden once
  five counted samples agree. The screen's shader then luma-keys only those bands: near-black
  becomes transparent, so the bars vanish while burned-in subtitles drawn in them stay visible.
  Changes fade rather than snap: a detected bar fades out over 1 s (`uBarOut`) and one that went
  away fades back in over 0.3 s (`uBarIn`). A change detected during a fade waits for it to end. The
  picture area itself is never keyed. The info card and status icon are placed inside the
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

### Map layer

While the in-game map is open the 3D scene is thrown away (the camera is meaningless), and
`MapLayer` (`ts_static/render/MapLayer.ts`) draws the markers on a 2D canvas instead.

- **Data flow.** `Settings.createRenderData` adds `continent: {x, y}` and `mapLabel` to every
  position and video marker it emits (`MarkerToContinent` in `src/shared/mapProjection.ts`, using
  `map_rect` / `continent_rect` of the current map from the active map table). The renderer keeps
  `renderData` while the map is open and reads it directly; it also keeps the latest MumbleLink
  `context` (UiState MapOpen, `MapCenterX/Y`, `MapScale`, which change as the player pans and zooms).
  `renderScene` calls `mapLayer.Update` each frame; with the map closed it clears once and stops.
- **World to continent.** Stored positions have MumbleLink X and Z swapped, so `mapX_m = Z`,
  `mapY_m = X`. In inches (`* 39.3701`), `contX = cx0 + (inX - x0) / (x1 - x0) * (cx1 - cx0)` and
  `contY = cy0 + (y1 - inY) / (y1 - y0) * (cy1 - cy0)` (y flipped). Checked against MumbleLink's
  `MapPlayerX/Y` on map 1622. The rects are those of the canonical (translated) map id.
- **Continent to screen.** `screen = viewport centre + (cont - MapCenter) / MapScale * k / devicePixelRatio`
  in CSS pixels; the overlay is assumed to cover the game client exactly. `k` is
  `devicePixelRatio` when GW2's "Use DPI scaling" option is on (the game then scales its map by
  Windows' display scale; checked in game at 150%), else 1. Main reads the option from
  `%APPDATA%\Guild Wars 2\GFXSettings.Gw2-64.exe.xml` (`gw2_settings.ts`) and sends it as
  `gameDpiScaling` in the render data.
- **Tunables.** `window.mapTuning.k` (overrides the automatic `k`; null by default) and `window.mapTuning.playerDot` (red dot at `MapPlayerX/Y`
  through the same transform, to compare with the game's own player arrow).
- Names are drawn only at `MapScale <= 2`. Cover rects are cleared on this canvas like on the
  WebGL one; nothing is drawn while loading or minimized.

## 9. Marker packs

Marker packs are `.etmp` files, associated with the app and openable via the `etmp://` scheme
(`LoadMarkerPacksFromCommandLine()` in `settings.ts`). Packs can declare an `updateurl` for
self-update; `MarkerGroupSettings.SecureUpdateUrl()` enforces **https only** (localhost is
exempt) before any fetch. An `http://` link, in the pack or in its update file, is tried as
`https://` rather than refused; a host without https just fails the fetch and gets no update.

Pack/settings lookups go through `object-path` (`getSetting.tsx`).

**Marker icons.** The built-in icons are listed in `src/shared/markerIcons.ts`: the original pin
(`public/marker1.webp`) plus shapes in `public/icons/markers/`, generated by
`scripts/make_marker_icons.py`. They are light grey with a dark outline because the overlay
multiplies them by the pack colour. A pack's `icon` is chosen with the picker next to its colour;
a marker's own `icon` (pack data, set in the marker's details) overrides it, empty meaning the
pack's.

**Auto-hide** (pack option `autoHide`, part of the pack data): a position marker the player
stays within `distance` metres of for `seconds` is marked done (`markerPrefs ... doneAt`) and left
out of the render data until it reappears: `manual` (only via "Show again"), `after`
`afterMinutes`, `daily` (00:00 UTC) or `weekly` (Monday 07:30 UTC). The main process checks this
every 500 ms (`marker_progress.ts`) against the last relayed position, which stays valid while
the player stands still; the overlay forwards the position service's loading screen events
(`IPC.LoadingScreen`) so a stale position during loading never counts. The same loop notices
reappear times passing and resends render data. `VisibleMarkers()` in `MarkerPrefs.ts` is the one
place deciding which of a pack's markers are drawn.

**Sequential packs** (pack option `sequential`): per map only the first marker in pack order that
is neither hidden nor done is drawn, so hiding it (eye toggle or auto-hide) reveals the next.
"Start over" clears the pack's marker preferences. Markers are listed in pack order in the settings
(drag a marker's grip to move it; `IPC.Marker.Move` → `Settings.moveMarker()`), and auto-hide only counts the marker currently drawn.

**Marker arrow** (`render.showArrow`, Configuration): a small shaded 3D arrow
(`ts_static/render/ArrowHud.ts`) at the character's feet, drawn over the character, pointing
straight at the nearest candidate marker (up and down included). A DOM label
under it gives the name, distance, pack and a ▲/▼ hint when the marker is 5 m or more above or
below. The scene's two lights only affect the arrow; everything else is unlit. Main puts the candidates in the render data
(`Settings.arrowCandidates()`) from `render.arrowTarget` (the crosshair button on a pack or in a
marker's details): that pack's drawn markers (the current one of a sequential pack) or that one
marker. With no target there are no candidates and no arrow. Hidden while the map is
open and during loading screens.

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
