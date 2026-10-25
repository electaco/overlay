import React, { useEffect, useState } from 'react';
import { IPC } from '../../shared/ipc';
import { send } from '../../shared/electron_ipc';

export function NumberEditor(props: {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    // An array path for keys that may contain ".".
    path: string | string[];
    // The shown number is the stored one times this (a 0..1 setting shown as a percentage).
    factor?: number;
}) {
    const [value, setValue] = useState(props.value);
    // Follows changes made elsewhere (e.g. the overlay's hover bar).
    useEffect(() => setValue(props.value), [props.value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        if (isNaN(newValue)) {
            return;
        }
        setValue(newValue);
        send(IPC.Settings.Update, { path: props.path, value: newValue / (props.factor ?? 1) });
    };

    return (
        <input
            type="number"
            value={value}
            onChange={handleChange}
            min={props.min}
            max={props.max}
            step={props.step}
        />
    );
}