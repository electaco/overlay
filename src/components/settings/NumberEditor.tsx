import React, { useState } from 'react';
import { IPC } from '../../shared/ipc';
import { send } from '../../shared/electron_ipc';

export function NumberEditor(props: {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    path: string;
}) {
    const [value, setValue] = useState(props.value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        if (isNaN(newValue)) {
            return;
        }
        setValue(newValue);
        send(IPC.Settings.Update, { path: props.path, value: newValue });
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