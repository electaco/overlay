import React, { useEffect, useRef, useState } from 'react';
import { IPC } from '../../shared/ipc';
import { send, on, removeAllListeners } from '../../shared/electron_ipc';
import { ISettings } from '../../shared/interfaces/settings';
import { IMountSettings, DescribeKeys, MountIconUrl } from '../../shared/models/settings/MountsSettings';
import { IMountPlacement, MOUNT_GRIP_SIZE, MOUNT_HUB_SIZE, MOUNT_SATELLITE_OFFSET } from '../../shared/mounts';
import { layoutRadial, IPoint } from './radialLayout';
import './mounts.css';

// True when the element under the cursor is a control that must receive the mouse itself.
// Everything else in the window is click-through to the game.
function isInteractive(target: EventTarget | null): boolean {
    const el = target as Element | null;
    return !!el?.closest?.('[data-interactive]');
}

function Mounts() {
    const [settings, setSettings] = useState<ISettings | null>(null);
    const [placement, setPlacement] = useState<IMountPlacement | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    // The hub opens and closes the fan. Collapsed by default: a small icon on screen until
    // the player wants the menu. Purely visual: the window does not change.
    const [open, setOpen] = useState(false);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        const cleanupSettings = on(IPC.Settings.Set, (data: unknown) => {
            setSettings(data as ISettings);
        });
        send(IPC.Settings.Get, true);

        // Main sends this on request and whenever it moves the window.
        const cleanupPosition = on(IPC.Mounts.Position, (data: unknown) => {
            setPlacement((data as IMountPlacement) ?? null);
        });
        send(IPC.Mounts.GetPosition, true);

        return () => {
            cleanupSettings?.();
            cleanupPosition?.();
            removeAllListeners(IPC.Settings.Set);
            removeAllListeners(IPC.Mounts.Position);
        };
    }, []);

    // Click-through.
    //
    // The window covers part of the game, so it captures the mouse only while the cursor is
    // over a control marked data-interactive; everywhere else clicks go to Guild Wars 2. An
    // ignoring window still receives mousemove (forward: true), so this one hit test on every
    // move is all it takes, for every control, open or collapsed. During a drag the window
    // stays capturing so the release reaches the grip.
    const clickableRef = useRef<boolean | null>(null);
    const draggingRef = useRef(false);

    function setClickable(clickable: boolean) {
        if (clickableRef.current === clickable) { return; }
        clickableRef.current = clickable;
        send(IPC.Mounts.SetClickable, clickable);
    }

    function endDrag() {
        if (!draggingRef.current) { return; }
        draggingRef.current = false;
        setDragging(false);
        send(IPC.Mounts.DragEnd, true);
    }

    function startDrag(e: React.PointerEvent<HTMLDivElement>) {
        if (e.button !== 0) { return; }
        // Capture keeps the release coming to the grip even if the cursor outruns the window.
        e.currentTarget.setPointerCapture(e.pointerId);
        draggingRef.current = true;
        setDragging(true);
        setClickable(true);
        send(IPC.Mounts.DragStart, true);
    }

    useEffect(() => {
        function onMove(e: MouseEvent) {
            // Safety net: a move with the left button up means the release was missed, and
            // main would otherwise keep the window glued to the cursor.
            if (draggingRef.current && (e.buttons & 1) === 0) { endDrag(); }
            setClickable(draggingRef.current || isInteractive(e.target));
        }
        function onLeave() {
            if (!draggingRef.current) { setClickable(false); }
        }
        function onBlur() {
            // Only the drag. Click-through follows the cursor, not focus: turning it on here
            // made a button under a still cursor ignore clicks until the mouse moved.
            endDrag();
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseleave', onLeave);
        window.addEventListener('blur', onBlur);
        setClickable(false);

        return () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            window.removeEventListener('blur', onBlur);
            endDrag();
        };
        // Registered once; everything it reads goes through refs.
    }, []);

    // Collapsing removes the grip; never leave main dragging without it.
    useEffect(() => {
        if (!open) { endDrag(); }
    }, [open]);

    function spawn(mount: IMountSettings) {
        // Keys are a chord of virtual-key codes; the position service focuses GW2 and
        // simulates them (see ControlClient.SendKeys).
        if (!mount.keys || mount.keys.length === 0) { return; }
        send(IPC.SendKeys, mount.keys.join(','));
    }

    // Remove the mount button from the screen. Uses the same window-open/close channel as
    // every other secondary window (see components/window/window.tsx).
    function closeWindow() {
        send(IPC.Window.Open, { path: 'mounts', show: false });
    }

    // Nothing to draw until main has said where the window is.
    if (!placement) { return null; }

    const allMounts: IMountSettings[] = settings?.overlaySettings?.mounts?.mounts ?? [];
    const mounts: IMountSettings[] = open ? allMounts.filter((m) => m.enabled) : [];

    const hub: IPoint = placement.hubInWindow;
    const positions = layoutRadial(mounts.length, placement.hub, placement.display, hub);

    const satellite = (dx: number, dy: number) => ({
        left: hub.x + dx * MOUNT_SATELLITE_OFFSET,
        top: hub.y + dy * MOUNT_SATELLITE_OFFSET,
        width: MOUNT_GRIP_SIZE,
        height: MOUNT_GRIP_SIZE,
        // Centre the button on its point.
        marginLeft: -MOUNT_GRIP_SIZE / 2,
        marginTop: -MOUNT_GRIP_SIZE / 2,
    });

    const hoveredMount = mounts.find((m) => m.id === hovered) ?? null;

    return (
        <div className={"mountRadial" + (open ? " open" : " closed")} onMouseLeave={() => setHovered(null)}>
            {/* Drag handle, upper-right of the hub, fan open only. */}
            {open && (
                <div
                    className={"mountGrip" + (dragging ? " dragging" : "")}
                    data-interactive
                    style={satellite(1, -1)}
                    title="Drag to move the mount menu"
                    onPointerDown={startDrag}
                    onPointerUp={endDrag}
                    onLostPointerCapture={endDrag}
                >
                    {/* Four-way move arrows. */}
                    <span className="mountGripArrows" aria-hidden="true">&#x2725;</span>
                </div>
            )}

            {/* Close the mount window entirely (removes the button from the screen), lower-left
                of the hub, mirroring the grip. */}
            {open && (
                <button
                    className="mountClose"
                    data-interactive
                    style={satellite(-1, 1)}
                    title="Close the mount menu"
                    onClick={closeWindow}
                >
                    &#x2715;
                </button>
            )}

            {/* Hub: the "main icon" the menu fans out from. Click toggles the fan. */}
            <button
                className={"mountHub" + (open ? " mountHubOpen" : "")}
                data-interactive
                style={{ left: hub.x, top: hub.y, width: MOUNT_HUB_SIZE, height: MOUNT_HUB_SIZE }}
                title={open ? "Close mount menu" : "Open mount menu"}
                onClick={() => setOpen((o) => !o)}
            >
                {open
                    ? <span className="mountHubLabel">{hoveredMount ? hoveredMount.name : "Mounts"}</span>
                    : <img className="mountHubIcon" src="icons/mounts/Raptor.png" alt="Mounts" draggable={false} />}
            </button>

            {mounts.map((mount, i) => {
                const pos = positions[i];
                const iconUrl = MountIconUrl(mount);
                const unbound = !mount.keys || mount.keys.length === 0;
                return (
                    <button
                        key={mount.id}
                        className={"mountIcon" + (hovered === mount.id ? " hovered" : "") + (unbound ? " unbound" : "")}
                        data-interactive
                        style={{
                            left: pos.x,
                            top: pos.y,
                            width: MOUNT_HUB_SIZE,
                            height: MOUNT_HUB_SIZE,
                            // Stagger the fan so it visibly expands from the hub.
                            animationDelay: (i * 18) + "ms",
                        }}
                        title={mount.name + (unbound ? " (no key bound)" : " (" + DescribeKeys(mount.keys) + ")")}
                        onMouseEnter={() => setHovered(mount.id)}
                        onFocus={() => setHovered(mount.id)}
                        onClick={() => spawn(mount)}
                    >
                        {iconUrl
                            ? <img className="mountIconImage" src={iconUrl} alt={mount.name} draggable={false} />
                            : <span className="mountIconGlyph">{mount.name.charAt(0)}</span>}
                    </button>
                );
            })}

            {open && allMounts.length === 0 && (
                <div className="mountEmpty">No mounts configured &mdash; see Config</div>
            )}
        </div>
    );
}

export default Mounts;
