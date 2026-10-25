import React, { useEffect, useRef, useState } from 'react';
import { IPC } from '../../shared/ipc';
import { send } from '../../shared/electron_ipc';
import { MARKER_ICONS } from '../../shared/markerIcons';
import './IconPicker.css';

interface IProps {
  popup: string;
  path: string;
  // The chosen icon; empty for "use the default" when allowDefault is set.
  value?: string | null;
  // Offer a "pack default" choice (for markers, which can override the pack's icon).
  allowDefault?: boolean;
  // What "default" currently resolves to, for the preview.
  defaultIcon?: string;
}

// A small button showing the current marker icon; clicking it opens a grid of the built-in icons.
function IconPicker(props: IProps) {
  const [open, setOpen] = useState(false);
  // The menu opens towards the middle of the window so it is not cut off at the edge.
  const [alignLeft, setAlignLeft] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = props.value || props.defaultIcon || MARKER_ICONS[0].file;

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  function choose(file: string | null) {
    send(IPC.Settings.Update, { path: props.path, value: file });
    setOpen(false);
  }

  return (
    <div className="iconpicker" ref={root} title={props.popup}>
      <button type="button" className="iconpicker-current" onClick={() => {
        const box = root.current?.getBoundingClientRect();
        setAlignLeft(!!box && box.left + box.width / 2 < window.innerWidth / 2);
        setOpen(!open);
      }}>
        <img src={current} alt="" />
      </button>
      {open && (
        <div className={"iconpicker-menu" + (alignLeft ? " alignleft" : "")}>
          {props.allowDefault && (
            <button type="button" className={"iconpicker-option default" + (!props.value ? " selected" : "")}
              onClick={() => choose(null)} title="Use the pack's icon">
              Pack
            </button>
          )}
          {MARKER_ICONS.map((icon) => (
            <button type="button" key={icon.file} title={icon.name}
              className={"iconpicker-option" + (props.value === icon.file ? " selected" : "")}
              onClick={() => choose(icon.file)}>
              <img src={icon.file} alt={icon.name} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default IconPicker;
