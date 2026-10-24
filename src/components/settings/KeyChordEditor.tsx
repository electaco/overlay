import React, { useEffect, useRef, useState } from 'react';
import { IPC } from '../../shared/ipc';
import { send } from '../../shared/electron_ipc';
import { DescribeKeys } from '../../shared/models/settings/MountsSettings';
import './KeyChordEditor.css';

// Translates a browser KeyboardEvent into Windows virtual-key codes, which is what the
// position service feeds to WindowsInput (ControlClient.SendKeys casts them to KeyCode).
// Chords are stored in a stable order (Ctrl, Shift, Alt, then the main key) so the saved
// value does not depend on which modifier the user pressed first.
const MODIFIER_VK: { [code: string]: number } = {
    ControlLeft: 17, ControlRight: 17,
    ShiftLeft: 16, ShiftRight: 16,
    AltLeft: 18, AltRight: 18,
};

// React's synthetic KeyboardEvent does not type `code`, but it is present at runtime and is
// what we need (physical key, independent of layout). Read it through the native event.
interface IKeyLike {
    code: string;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
}

function nativeKey(e: React.KeyboardEvent): IKeyLike {
    const native = (e.nativeEvent ?? e) as unknown as IKeyLike;
    return {
        code: native.code ?? '',
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
    };
}

function mainKeyVk(e: IKeyLike): number | null {
    const code = e.code;
    if (code.startsWith('Key')) { return code.charCodeAt(3); }        // KeyA -> 65
    if (code.startsWith('Digit')) { return code.charCodeAt(5); }      // Digit1 -> 49
    if (code.startsWith('Numpad')) {
        const rest = code.slice(6);
        if (rest.length === 1 && rest >= '0' && rest <= '9') { return 96 + Number(rest); }
        const ops: { [k: string]: number } = {
            Multiply: 106, Add: 107, Subtract: 109, Decimal: 110, Divide: 111, Enter: 13,
        };
        return ops[rest] ?? null;
    }
    const special: { [k: string]: number } = {
        Space: 32, Tab: 9, Enter: 13, Escape: 27, Backspace: 8,
        ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40,
        Insert: 45, Delete: 46, Home: 36, End: 35, PageUp: 33, PageDown: 34,
        Semicolon: 186, Equal: 187, Comma: 188, Minus: 189, Period: 190,
        Slash: 191, Backquote: 192, BracketLeft: 219, Backslash: 220,
        BracketRight: 221, Quote: 222,
    };
    if (special[code] !== undefined) { return special[code]; }

    const f = /^F(\d{1,2})$/.exec(code);
    if (f) {
        const n = Number(f[1]);
        if (n >= 1 && n <= 24) { return 111 + n; }                    // F1 -> 112
    }
    return null;
}

export function eventToChord(e: React.KeyboardEvent): number[] | null {
    const key = nativeKey(e);
    const mods = new Set<number>();
    if (key.ctrlKey) { mods.add(17); }
    if (key.shiftKey) { mods.add(16); }
    if (key.altKey) { mods.add(18); }

    // A bare modifier press is not a complete chord; wait for the main key.
    if (MODIFIER_VK[key.code] !== undefined) { return null; }

    const main = mainKeyVk(key);
    if (main === null) { return null; }

    const order = [17, 16, 18];                                       // Ctrl, Shift, Alt
    const chord = order.filter((m) => mods.has(m));
    chord.push(main);
    return chord;
}

interface IProps {
    /** Settings path to the mount's `keys` array. */
    path: string;
    value: number[];
}

export function KeyChordEditor(props: IProps) {
    const [capturing, setCapturing] = useState(false);
    const [value, setValue] = useState<number[]>(props.value ?? []);
    const boxRef = useRef<HTMLButtonElement>(null);

    useEffect(() => { setValue(props.value ?? []); }, [props.value]);

    useEffect(() => {
        if (capturing) { boxRef.current?.focus(); }
    }, [capturing]);

    function onKeyDown(e: React.KeyboardEvent) {
        if (!capturing) { return; }
        e.preventDefault();
        e.stopPropagation();

        const code = nativeKey(e).code;
        if (code === 'Escape') { setCapturing(false); return; }
        if (code === 'Backspace' || code === 'Delete') {
            setValue([]);
            send(IPC.Settings.Update, { path: props.path, value: [] });
            setCapturing(false);
            return;
        }


        const chord = eventToChord(e);
        if (chord === null) { return; }               // modifier-only, keep waiting
        setValue(chord);
        send(IPC.Settings.Update, { path: props.path, value: chord });
        setCapturing(false);
    }

    return (
        <button
            ref={boxRef}
            type="button"
            className={"keyChordEditor" + (capturing ? " capturing" : "")}
            onClick={() => setCapturing((c) => !c)}
            onKeyDown={onKeyDown}
            onBlur={() => setCapturing(false)}
            title={capturing
                ? "Press the key combination (Esc to cancel, Backspace to clear)"
                : "Click, then press the key combination"}
        >
            {capturing
                ? "Press keys\u2026"
                : (value.length > 0 ? DescribeKeys(value) : "Unbound")}
        </button>
    );
}

export default KeyChordEditor;
