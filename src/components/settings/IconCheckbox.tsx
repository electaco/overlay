import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
const { ipcRenderer } = window.require('electron')

function IconCheckbox(props) {
    let checkedIcon = props.iconChecked ? props.iconChecked : faCheckSquare;
    let unCheckedIcon = props.iconUnchecked ? props.iconUnchecked : faSquare;
    let icon = props.setting.value ? checkedIcon : unCheckedIcon;

    function toggleCheck() {
        ipcRenderer.send("updateconfig", {path: props.setting.path, value: !props.setting.value})
    }

    return (
        <span className="button" onClick={toggleCheck} title={props.popup}>
            <FontAwesomeIcon icon={icon} className="mr-2" style={{width: "1em"}}/>
            {props.setting.name}
            {props.children}
        </span>
    );
}

export default IconCheckbox;