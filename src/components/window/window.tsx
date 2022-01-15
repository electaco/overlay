import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import './window.css';
import { IPC } from '../../shared/ipc';
const { ipcRenderer } = window.require('electron')


interface IProps {
    path: string,
    title: string,
    titleextra?: any,
    children: React.ReactNode
}

function Window(props: IProps) {
    function closeWindow() {
        ipcRenderer.send(IPC.Window.Open, {path:props.path, show: false});
    }
    return  <div id="app" className="vh-100 pb-4">
            <div id="title">
                <div id="titlebar" className="button pl-2">
                    <span className="button">{props.title}</span>
                </div>
                <div>
                    {props.titleextra}
                </div>
                <div id="closer" className="button pr-2 pl-1" onClick={closeWindow}>
                    <FontAwesomeIcon icon={faWindowClose} title="Close Window"/>
                </div>
            </div>
            <div id="content" className="overflow-auto h-100">
                {props.children}
            </div>
    </div>;
}

export default Window;