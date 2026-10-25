import React from 'react';
import { IPC } from '../../shared/ipc';
import Checkbox from '../../components/window/CheckBox';
import { send } from '../../shared/electron_ipc';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IProps {
    // An array path for keys that may contain "." (marker preferences keyed by id).
    setting: { path: string | string[]; value: boolean; name?: string };
    popup?: string;
    iconChecked?: IconProp;
    iconUnchecked?: IconProp;
    children?: React.ReactNode;
}

function IconCheckbox(props: IProps) {
    function toggleCheck(value: boolean) {
        send(IPC.Settings.Update, {path: props.setting.path, value: value})
    }
    return (
        <Checkbox checked={props.setting.value} toggleCheck={toggleCheck} popup={props.popup} name={props.setting.name} iconChecked={props.iconChecked} iconUnchecked={props.iconUnchecked}>
            {props.children}
        </Checkbox>
    );
}

export default IconCheckbox;