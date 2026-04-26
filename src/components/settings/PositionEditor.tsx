import React, { useState, useRef } from 'react';
import { IPosition } from '../../shared/interfaces/common';
import { IPC } from '../../shared/ipc';
import './PositionEditor.css'
import { send } from '../../shared/electron_ipc';


function PositionEditor(props: {
  position: IPosition;
  path: string;
  title: string;
  step?: number;
}) {
  const [x, setX] = useState(props.position.X);
  const [y, setY] = useState(props.position.Y);
  const [z, setZ] = useState(props.position.Z);
  const valuesRef = useRef({ x, y, z });

  const onchange = (position: IPosition) => {
    send(IPC.Settings.Update, { path: props.path, value: position });
  };

  const onChangeX = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newX = parseFloat(e.target.value);
    setX(newX);
    valuesRef.current.x = newX;
    onchange({ X: newX, Y: valuesRef.current.y, Z: valuesRef.current.z });
  };

  const onChangeY = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newY = parseFloat(e.target.value);
    setY(newY);
    valuesRef.current.y = newY;
    onchange({ X: valuesRef.current.x, Y: newY, Z: valuesRef.current.z });
  };

  const onChangeZ = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZ = parseFloat(e.target.value);
    setZ(newZ);
    valuesRef.current.z = newZ;
    onchange({ X: valuesRef.current.x, Y: valuesRef.current.y, Z: newZ });
  };

  return (
    <span className="position-editor">
      <span className="position-editor-title">{props.title}</span>
        <span className="position-editor__label">X</span>
        <input className="position-editor__input" type="number" value={x} onChange={onChangeX} step={props.step}/>
        <span className="position-editor__label">Y</span>
        <input className="position-editor__input" type="number" value={y} onChange={onChangeY} step={props.step}/>
        <span className="position-editor__label">Z</span>
        <input className="position-editor__input" type="number" value={z} onChange={onChangeZ} step={props.step}/>
    </span>
  );

}

export default PositionEditor;