# Mount menu

A radial menu that spawns GW2 mounts by simulating key chords. Opened from the Electaco menu
as the **Mounts** window.

Main code:

- `src/components/mounts/Mounts.tsx` — the component, click-through hit test, grip press/release
- `src/components/mounts/radialLayout.ts` — pure geometry
- `src/components/mounts/mounts.css` — appearance
- `ts_static/electron_main_parts/windows.ts` — window creation, placement messages, grip drag
- `src/shared/mounts.ts` — sizes and the `IMountPlacement` message, shared by both processes
- `src/shared/models/settings/MountsSettings.ts` — settings model and defaults

## Behaviour

- Collapsed, it is a single round button showing a mount icon.
- Clicking the hub expands it into a fan of every **enabled** mount.
- Clicking a mount sends its key chord via `IPC.SendKeys`. Main forwards it over the service's
  `/control` socket as `{ Type: "keys", Data: "<codes>" }`, and the position service focuses GW2
  and synthesises the keystrokes. The overlay itself never touches the input APIs.
- Clicking the hub again collapses it.
- The **✕** button (lower-left of the hub, fan open only) closes the window entirely; reopen it
  from the Electaco menu. The hub position is remembered for the rest of the app run.
- The **✥** grip (upper-right of the hub, fan open only) drags the window.
- It hides while the in-game map is open, during loading screens and while another program's window
  covers the game (at least 1% of it, see ARCHITECTURE.md), and comes back afterwards.
  The overlay relays all three (`IPC.MapOpen`, `IPC.LoadingScreen`, `IPC.GameCovered`); `windows.ts` hides and re-shows
  the window (`showInactive`, no focus change) without touching the saved open state, and a menu
  opened meanwhile starts hidden.

## The window

The design rules that keep this simple:

- **The window is a fixed `MOUNT_WINDOW_SIZE` square and is never resized.** Opening and closing
  the fan is purely a rendering change in the page.
- **The hub position (`mountsHub` in `windows.ts`) is the source of truth;** the window is derived
  from it by one function, `mountsLayout()`. The window is centred on the hub, then clamped to lie
  **fully on one display**. Near an edge that leaves the hub off-centre in the window, which the
  page is told via `hubInWindow`.
- **Only main moves the window** (`placeMounts()`), and every move sends the page a fresh placement.
  There is no `move` listener and nothing to suppress.

Why each rule exists:

- An earlier version resized and re-offset the window on every open, close and drag. It needed a
  flag to ignore its own `move` events and clamping on several paths, and produced a long series of
  bugs (a hub that "walked" a little on every open, half-cropped hubs, clipped glows). Don't
  reintroduce resizing.
- A window that **spans two displays with different scale factors** gets rescaled by Windows: between
  a 150% and a 100% monitor the window grew 1.5×, and the grip moved out from under the cursor.
  So the window must never hang off one display onto another.

The hub is kept at least `MOUNT_EDGE_INSET` (57) from every display edge, so the grip and close
button on its diagonals, and the end buttons of a half / quarter arc (level with the hub), stay on
screen.

`MOUNT_WINDOW_SIZE` (690) is derived, not chosen: the worst case is a corner, where the hub can be up
to a half arc's reach from both edges and the quarter arc then reaches its own (larger) distance
inwards. Change the radius or spacing constants and it follows.

## Placement and layout

Main sends an `IMountPlacement` on `GetPosition` and whenever it moves the window:

```ts
{ hub: { x, y },                 // hub centre relative to ITS display's top-left
  display: { width, height },    // that display's full bounds
  hubInWindow: { x, y } }        // where to draw the hub: the centre, except near an edge
```

- **Display-relative, not absolute.** Absolute coordinates made every hub on a second monitor
  look like it was at the right edge.
- **Full `bounds`, not `workArea`.** GW2 runs fullscreen, so the taskbar reservation is not a real
  limit; players put the button down by the game's own UI bar.

The renderer draws nothing until the first placement arrives and lays out from it alone (not from
`window.innerWidth`), so it never renders against a stale size.

`radialLayout.ts` is pure and has no DOM access:

1. `mountFanRadius(count, sweep)` (in `src/shared/mounts.ts`) is the radius at which the buttons
   are `MOUNT_BUTTON_SPACING` apart, never below the normal 150. Narrower arcs need more radius:
   with 9 mounts about 150 / 190 / 377 for a full / half / quarter circle. Above
   `MOUNT_FAN_SIZED_FOR` (9) buttons the radius stops growing, so the window size still holds.
2. `availableArc(hub, display, count)` picks the arc, escalating: a full circle if its reach fits
   on every side; else a half circle away from the edge in the way, **if the half circle's own,
   wider reach fits**; else a quarter away from the nearest corner. Checking each arc with its own
   reach is what stops a widened half circle running off a side edge.
3. `layoutRadial(count, hubOnDisplay, display, hubInWindow)` places icons evenly on that arc at
   that radius, relative to the window.

A **full circle divides by `count`**, a partial arc by `count - 1`. Dividing a full circle by
`count - 1` puts the first and last icon on the same spot (0° and 360°).

## Drag

The grip does **not** use `-webkit-app-region: drag`. An OS drag region hides mouse events from the
page, which broke the click-through hit test more than once (the window stayed click-through over
the grip, so the drag could never start). There is no app-region anywhere in this window.

Instead:

1. `pointerdown` on the grip: the page captures the pointer, forces the window clickable, and sends
   `IPC.Mounts.DragStart`.
2. Main records the cursor's offset from the hub and, every 16 ms while the cursor moves, calls
   `placeMounts()` with the cursor minus that offset. That clamps the hub onto the display under it,
   places the window, and sends the placement, so the fan re-aims while you drag. It uses
   `setBounds` with the fixed size, because `setPosition` can change the size by a pixel on scaled
   displays.
3. `pointerup` / `lostpointercapture` / window blur / collapsing the fan / unmount: the page sends
   `IPC.Mounts.DragEnd` and main stops the timer (also on window close). As a safety net, any
   `mousemove` during a drag with the left button up also ends it, so a missed release can never
   leave the window glued to the cursor.

Moving the window from main is smooth; driving `setPosition` from renderer `mousemove` over IPC was
visibly laggy. Everything is in DIP (`getCursorScreenPoint`, display bounds, `setBounds`), which
stays consistent across mixed-scale monitors even where Electron's physical-pixel mapping does not.

## Focus

The window is created with `focusable: false` (`WS_EX_NOACTIVATE`): clicking it **never takes
focus from the game**. When it could take focus:

- a mount click activated the overlay, and the position service then had to pull GW2 back to the
  foreground before sending the chord. Windows' foreground lock can refuse that for a background
  process, so the first mount click after startup did nothing;
- the focus change blurred the page, which (at the time) turned click-through on, so a button under
  a still cursor ignored clicks until the mouse moved.

With no focus there is also no keyboard input, so the menu has no keyboard shortcuts (an Escape
handler used to exist and only worked when the window happened to be focused).

The game can still be behind something else when a mount is clicked: typically an Electaco window
the player just used (e.g. the Electaco button that opened this menu). The position service then has
to bring GW2 to the front itself (`ControlClient.SendKeys` in `PositionService`), and Windows'
foreground lock refuses `SetForegroundWindow` from a background process right after the player used
another window. That refusal was the "first mount click does nothing" bug; later clicks only worked
because the first chord counted as input. The service now:

1. tries `SetForegroundWindow`; if refused, taps **F24** (a key no keyboard has; it goes to the
   window in front, not the game), which makes the service the last input source and lifts the
   lock, then tries again; `AttachThreadInput` is the last resort;
2. waits until GW2 really is in front (the switch is asynchronous), then 150 ms more, because a
   fullscreen game resets its keyboard state on activation;
3. sends the chord, and logs how the switch went (`[PositionServer] Game brought to front ...`).

A zero-distance mouse move does **not** lift the lock, and `GetForegroundWindow()` straight after
`SetForegroundWindow` does not reflect the switch yet; both were tried and measured.

## Click-through

The window covers part of the game, so it only captures the mouse over real controls. Main starts
it with `setIgnoreMouseEvents(true, { forward: true })`; `forward: true` keeps `mousemove` flowing
to the page while ignoring.

One hit test in `Mounts.tsx` handles everything: on every `mousemove` the page checks whether the
target is inside an element with **`data-interactive`** and calls `IPC.Mounts.SetClickable`
accordingly (deduplicated). Leaving the window turns capture off. Focus changes do **not** touch
it: click-through follows the cursor only. During a drag capture stays on so the release reaches the
grip.

To add a control, give it `data-interactive`. Nothing else: no per-button `onMouseEnter`
handlers, no selector list to keep in sync (a missing entry in such a list once made the ✕
unclickable).

The toggle is an async IPC round trip. Because it happens on mouse *move*, capture is on well
before the click lands; only a click within a few milliseconds of moving onto or off a control
could go to the wrong place.

Testing note: `forward: true` relies on a low-level mouse hook, which sees real and `SendInput` /
`mouse_event` input but **not** `SetCursorPos`. An automated test that moves the cursor with
`SetCursorPos` gets no events in the page and wrongly looks like click-through is broken.

## Settings

`MountsSettings.ts`:

```ts
interface IMountSettings {
    id: string;
    name: string;
    keys: number[];   // Windows virtual-key codes, e.g. [16, 17, 112] = Shift+Ctrl+F1
    enabled: boolean;
    icon?: string;    // file name under public/icons/mounts/
}
```

- `DefaultMountsSettings()` binds the eight standard mounts to `Shift+Ctrl+F1..F8` (the values the
  old hardcoded buttons used); the turtle is present but unbound and disabled.
- `NormalizeMountsSettings()` repairs old or partial settings and is called from `Migrate()`.
- `DescribeKeys()` renders a chord for tooltips and hover labels.
- `MountIconUrl()` resolves the icon path.
- Keys are **virtual-key codes**, not characters. `KeyChordEditor.tsx` captures them from
  `event.nativeEvent.code` and orders modifiers as `[Ctrl, Shift, Alt, main]`.

## Icons

`public/icons/mounts/*.png`, from the Corsair/Elgato `com.gw2.mounts` icon pack (MIT licence,
`license.txt` alongside; the artwork is ArenaNet's).

The source art is ~72×73 with dark square corners, so each icon is scaled to `1.18` and clipped by
`border-radius`, and a radial-gradient `::after` vignette fades the artwork into the button edge.
Without the vignette the square corners show.

## Known constraints

- The fan's arc is limited by the screen. Near an edge it is a half circle, in a corner a quarter,
  with a larger radius so the buttons do not overlap. A corner quarter with 9 mounts is a wide arc
  (radius ~377).
- More than 9 enabled mounts (custom ones) can overlap on half / quarter arcs: the radius is capped
  at the 9-mount value so the fan still fits the window.
- The hub cannot get closer than `MOUNT_EDGE_INSET` (57 DIP) to a display edge.
- The hub position is kept in memory only; it resets to the primary display's centre when the app
  restarts.
