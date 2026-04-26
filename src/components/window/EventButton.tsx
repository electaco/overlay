import React from 'react';
import Button from './Button';
import { send } from '../../shared/electron_ipc';

interface IProps {
    text?: React.ReactNode;
    event: string;
    value: unknown;
    children?: React.ReactNode;
}

function EventButton(props: IProps) { // TODO: Update references with IPC
    function click() {
        send(props.event, props.value);
    }
    return (
        <Button text={props.text} onClick={click}>
            {props.children}
        </Button>
    );
}

export default EventButton;