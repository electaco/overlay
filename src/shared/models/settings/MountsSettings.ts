// Mount radial menu: which mounts exist, and which key chord spawns each one.
//
// The keys are the VIRTUAL KEY CODES sent to the game via the position service
// ("sendkeys" -> SetForegroundWindow + simulated chord). The defaults are exactly the
// values the old hardcoded buttons used: Shift+Ctrl+F1 .. F8 ([16, 17, 112..119]).
//
// Codes are Windows virtual-key codes; the C# side casts them straight to WindowsInput
// KeyCode, so 16 = Shift, 17 = Ctrl, 18 = Alt, 112 = F1.

export interface IMountSettings {
    /** Stable id, used as the settings path segment. */
    id: string;
    /** Display name shown in the radial menu. */
    name: string;
    /** Virtual key codes, sent as a chord, e.g. [16, 17, 112]. */
    keys: number[];
    /** Hidden mounts are still configurable but not drawn. */
    enabled: boolean;
    /** Icon file under public/icons/mounts/. Optional: falls back to the initial letter. */
    icon?: string;
}

export interface IMountsSettings {
    mounts: IMountSettings[];
    /**
     * Where the player left the menu's hub, in absolute screen coordinates (DIP). Saved when a
     * drag ends; absent means the primary display's centre.
     */
    position?: { x: number; y: number };
    /**
     * Whether the player left the menu showing, so it reopens on start. Set when they open or
     * close it (Electaco menu or the menu's own close button); quitting the app does not change it.
     */
    open?: boolean;
}

// Icons come from the "GW2 Mounts" Stream Deck icon pack (MIT, images by ArenaNet);
// the pack's license.txt ships alongside them in public/icons/mounts/.
//
// Turtle (Siege Turtle, End of Dragons) is included but unbound by default: it has no
// equivalent in the old hardcoded list, so it starts disabled until the user binds a key.
export function DefaultMountsSettings(): IMountsSettings {
    const mk = (id: string, name: string, icon: string, fkey: number | null): IMountSettings => ({
        id,
        name,
        icon,
        keys: fkey === null ? [] : [16, 17, fkey],
        enabled: fkey !== null,
    });
    return {
        mounts: [
            mk('raptor', 'Raptor', 'Raptor.png', 112),                // F1
            mk('springer', 'Springer', 'Springer.png', 113),          // F2
            mk('skimmer', 'Skimmer', 'Skimmer.png', 114),             // F3
            mk('jackal', 'Jackal', 'jackal.png', 115),                // F4
            mk('rollerbeetle', 'Roller Beetle', 'rollerbettle.png', 116), // F5
            mk('griffon', 'Griffon', 'Griffon.png', 117),             // F6
            mk('skyscale', 'Skyscale', 'Skyscale.png', 118),          // F7
            mk('warclaw', 'Warclaw', 'warclaw.png', 119),             // F8
            mk('turtle', 'Siege Turtle', 'Turtle.png', null),         // unbound
        ],
    };
}

/**
 * Fill in fields added after a settings file was written, so an older settings2.json
 * (mounts without icons, or no mounts at all) still renders correctly.
 */
export function NormalizeMountsSettings(current: IMountsSettings | undefined): IMountsSettings {
    const defaults = DefaultMountsSettings();
    if (!current || !Array.isArray(current.mounts) || current.mounts.length === 0) {
        return defaults;
    }
    const byId: { [id: string]: IMountSettings } = {};
    for (const m of current.mounts) { byId[m.id] = m; }

    // Keep the user's keys/enabled state, but adopt the default icon and add any mount
    // introduced after their settings were saved.
    const merged = defaults.mounts.map((d) => {
        const existing = byId[d.id];
        if (!existing) { return d; }
        return {
            ...d,
            keys: Array.isArray(existing.keys) ? existing.keys : d.keys,
            enabled: typeof existing.enabled === 'boolean' ? existing.enabled : d.enabled,
            name: existing.name || d.name,
        };
    });

    // Preserve anything custom the user added that we do not know about.
    for (const m of current.mounts) {
        if (!defaults.mounts.some((d) => d.id === m.id)) {
            merged.push(m);
        }
    }

    const result: IMountsSettings = { mounts: merged };
    const p = current.position;
    if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) {
        result.position = { x: p.x, y: p.y };
    }
    if (typeof current.open === 'boolean') {
        result.open = current.open;
    }
    return result;
}

/** Icon URL for a mount, or null when it has none (caller falls back to a letter). */
export function MountIconUrl(mount: IMountSettings): string | null {
    if (!mount.icon) { return null; }
    // The page is loaded from build/index.html via file://, and react-scripts copies
    // public/* (including the icons) to the build root, so a path relative to the document
    // resolves in both the packaged app and the dev server. Not process.env.PUBLIC_URL:
    // the renderer is sandboxed and has no `process`.
    return 'icons/mounts/' + mount.icon;
}

/** "16,17,112" -> "Ctrl+Alt+F1", for display. */
export function DescribeKeys(keys: number[]): string {
    if (!keys || keys.length === 0) { return ''; }
    const names: { [code: number]: string } = {
        16: 'Shift', 17: 'Ctrl', 18: 'Alt',
        32: 'Space', 0x09: 'Tab', 0x0d: 'Enter', 0x1b: 'Esc',
    };
    return keys.map((k) => {
        if (names[k]) { return names[k]; }
        if (k >= 112 && k <= 123) { return 'F' + (k - 111); }
        if (k >= 65 && k <= 90) { return String.fromCharCode(k); }
        if (k >= 48 && k <= 57) { return String.fromCharCode(k); }
        return '#' + k;
    }).join('+');
}
