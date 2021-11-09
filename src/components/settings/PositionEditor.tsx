import React, { useState } from 'react';
import { IPosition } from '../../shared/interfaces/common';
import './PositionEditor.css'
const { ipcRenderer } = window.require('electron')


function PositionEditor(props: {
  position: IPosition;
  path: string;
  title: string;
}) {
  const [x, setX] = useState(props.position.X);
  const [y, setY] = useState(props.position.Y);
  const [z, setZ] = useState(props.position.Z);

  const onChangeX = (e: React.ChangeEvent<HTMLInputElement>) => {
    setX(parseFloat(e.target.value));
    onchange({ X: parseFloat(e.target.value), Y: y, Z: z });
  };

  const onChangeY = (e: React.ChangeEvent<HTMLInputElement>) => {
    setY(parseFloat(e.target.value));
    onchange({ X: x, Y: parseFloat(e.target.value), Z: z });
  };

  const onChangeZ = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZ(parseFloat(e.target.value));
    onchange({X: x, Y: y, Z: parseFloat(e.target.value)});
  };

  const onchange = (position: IPosition) => {
    ipcRenderer.send("updateconfig", { path: props.path, value: position });
    };

  return (
    <span className="position-editor">
      <span className="position-editor-title">{props.title}</span>
        <span className="position-editor__label">X</span>
        <input className="position-editor__input" type="number" value={x} onChange={onChangeX} />
        <span className="position-editor__label">Y</span>
        <input className="position-editor__input" type="number" value={y} onChange={onChangeY} />
        <span className="position-editor__label">Z</span>
        <input className="position-editor__input" type="number" value={z} onChange={onChangeZ} />
    </span>
  );

}

export default PositionEditor;