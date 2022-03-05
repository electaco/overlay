import React from 'react';
import { IPC } from '../../shared/ipc';
import Checkbox from '../../components/window/CheckBox';

const { ipcRenderer } = window.require('electron')


function IconCheckbox(props) {
    function toggleCheck(value) {
        ipcRenderer.send(IPC.Settings.Update, {path: props.setting.path, value: value})
    }
    return (
        <Checkbox checked={props.setting.value} toggleCheck={toggleCheck} popup={props.popup} name={props.setting.name}>
            {props.children}
        </Checkbox>
    );
}

export default IconCheckbox;