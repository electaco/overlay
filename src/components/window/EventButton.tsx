import React from 'react';
import Button from './Button';
const { ipcRenderer } = window.require('electron')

interface IProps {
    text?: React.ReactNode;
    event: string;
    value: any;
    children?: React.ReactNode;
}

function EventButton(props: IProps) { // TODO: Update references with IPC
    function click() {
        ipcRenderer.send(props.event, props.value);
    }
    return (
        <Button text={props.text} onClick={click}>
            {props.children}
        </Button>
    );
}

export default EventButton;