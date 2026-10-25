import React, { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEye, faEyeSlash, faFileExport, faCog, faGripVertical } from '@fortawesome/free-solid-svg-icons'

import Button from '../window/Button';
import Checkbox from '../settings/IconCheckbox';
import getSetting from '../helpers/getSetting';
import Section from '../window/section';
import Colorpicker from '../settings/colorpicker';
import IconPicker from '../settings/IconPicker';
import EditableText from '../settings/editableText';
import { GetMapName } from '../helpers/constants';
import { IMarkerGroupSettings } from "../../shared/interfaces/settings/IMarkerGroupSettings";
import { Marker } from './marker';
import "./markerpack.css";
import { IMarkerSettings } from '../../shared/interfaces/settings/IMarkerSettings';
import { SortArray, ByActiveMap } from '../helpers/sorting';
import { IsPackActive, PackActivePath, VisibleMarkerIds } from '../../shared/models/settings/MarkerPrefs';
import PackOptions from './PackOptions';
import ArrowTargetButton from './ArrowTargetButton';
import { ISettings } from '../../shared/interfaces/settings';
import { IPC } from '../../shared/ipc';
import { send } from '../../shared/electron_ipc';
import { IMarkerMoveInfo } from '../../shared/interfaces/datatransfer/IMarkerMoveInfo';

interface IProps {
    pack: IMarkerGroupSettings,
    path: string,
    settings: ISettings,
    index: number
}

function Markerpack(props: IProps) {
    const [showSettings, setShowSettings] = useState(false);
    // Marker being dragged by its grip, and the row it is over. Plain pointer events rather than
    // HTML drag and drop, which didn't start or drop reliably in the Electron window.
    const [drag, setDrag] = useState<{ map: string; from: number; over: number } | null>(null);
    const dragRef = useRef(drag);
    dragRef.current = drag;
    useEffect(() => {
        if (!drag) return;
        const move = (e: PointerEvent) => {
            const d = dragRef.current;
            const row = document.elementFromPoint(e.clientX, e.clientY)?.closest('.markerrow') as HTMLElement | null;
            if (!d || !row || row.dataset.map !== d.map || row.dataset.pack !== String(props.index)) return;
            const over = Number(row.dataset.index);
            if (over !== d.over) setDrag({ ...d, over });
        };
        const up = () => {
            const d = dragRef.current;
            if (d && d.from !== d.over) {
                const info: IMarkerMoveInfo = { markerpack: props.index, map: d.map, from: d.from, to: d.over };
                send(IPC.Marker.Move, info);
            }
            setDrag(null);
        };
        const cancel = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrag(null); };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        window.addEventListener('keydown', cancel);
        return () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('keydown', cancel);
        };
        // Listeners only while a drag is on; they read the latest state through dragRef.
    }, [drag !== null, props.index]);
    function addMarker() {
        send(IPC.Marker.Add, props.index);
    }

    function removeMarkerGroup() {
        send(IPC.Marker.RemoveGroup, props.index);
    }

    function exportMarkerGroup() {
        send(IPC.Marker.SaveGroup, props.index);
    }



    function indexOf(markerMap: string, marker: IMarkerSettings) {
        var elementIndex = -1;
        props.pack.markers[markerMap].forEach((element, index) => {
            if (element.id === marker.id) {
                elementIndex = index;
            }
        });
        return elementIndex;
    }

    const packActive = IsPackActive(props.settings.markerPrefs, props.pack);
    const now = Date.now();
    const drawnOn = (map: string) => new Set(VisibleMarkerIds(props.settings.markerPrefs, props.pack, map, now));

    return (
        <div className={"markerpack " + (packActive ? "active " : "inactive ") + (props.pack.markers[props.settings.runtimeData?.map || ""] && packActive ? "activemap": "")}>
            <Section
                expanded={false}
                title={
                    <EditableText path={props.path + "name"} value={props.pack.name} />
                }
                rightside={
                    <div className="d-flex justify-content-center">
                        <Checkbox setting={{ path: PackActivePath(props.pack), value: packActive }}
                            iconChecked={faEye}
                            popup="Set marker group visible or not"
                            iconUnchecked={faEyeSlash} />

                        <ArrowTargetButton settings={props.settings} packId={props.pack.id} />

                        <span className={"button packsettingsbutton" + (showSettings ? " active" : "")}
                            onClick={() => setShowSettings(!showSettings)} title="Pack settings: icon, color, order and auto-hide">
                            <FontAwesomeIcon icon={faCog} />
                        </span>
                        <Button onClick={removeMarkerGroup} title="Delete marker group">X</Button>
                    </div>
                }
                panel={showSettings && (
                    <div className="packsettings">
                        <div className="d-flex align-items-center packsettingsrow">
                            <span className="packsettingslabel">Icon</span>
                            <IconPicker popup="Marker icon" path={props.path + "icon"} value={props.pack.icon} />
                            <span className="packsettingslabel ml-3">Color</span>
                            <Colorpicker
                                setting={getSetting(props.settings, "Marker color", props.path + "color")}
                                popup="Set color of markers" />
                        </div>
                        <PackOptions pack={props.pack} path={props.path} />
                    </div>
                )}
                key={props.pack.id}>

                <div className="float-right">
                    <span className="button addmarker" onClick={addMarker}>
                        <FontAwesomeIcon icon={faPlusCircle} title="Add a marker on current position" />
                    </span>
                    <span className="button" onClick={exportMarkerGroup}>
                        <FontAwesomeIcon icon={faFileExport} title="Save Marker Group to file" />
                    </span>
                </div>

                <EditableText path={props.path + "description"} value={props.pack.description} defaultValue="No description" />
                <div className="markerpack" >
                    {SortArray(Object.keys(props.pack.markers), ByActiveMap(props.settings.runtimeData?.map ?? ""))?.map((markerMap) =>
                        <div className={"map " + (props.settings.runtimeData?.map === markerMap ? "active": "")}>
                            <Section title={GetMapName(markerMap) ?? "<Map " + markerMap + ">"}
                                expanded={markerMap === props.settings.runtimeData?.map}
                            >
                                {/* Listed in the pack's order, which a sequential pack goes through; drag a
                                    marker's grip to move it. */}
                                {props.pack.markers[markerMap].map((marker, index) =>
                                    <div key={marker.id}
                                        data-pack={props.index} data-map={markerMap} data-index={index}
                                        className={"markerrow d-flex" + (drag && drag.map === markerMap && drag.from === index ? " dragging" : "")
                                            + (drag && drag.map === markerMap && drag.over === index && drag.from !== index
                                            ? (drag.from < index ? " dropafter" : " dropbefore") : "")}>
                                        <span className="markergrip" title="Drag to reorder"
                                            onPointerDown={(e) => {
                                                if (e.button !== 0) return;
                                                // No text selection while dragging.
                                                e.preventDefault();
                                                setDrag({ map: markerMap, from: index, over: index });
                                            }}>
                                            <FontAwesomeIcon icon={faGripVertical} />
                                        </span>
                                        <div className="flex-grow-1">
                                    <Marker
                                        settings={props.settings}
                                        pack={props.pack}
                                        drawn={drawnOn(markerMap).has(marker.id)}
                                        path={props.path + "markers." + markerMap + "." + indexOf(markerMap, marker) + "."}
                                        key={marker.id}
                                        marker={marker}
                                        index={indexOf(markerMap, marker)}
                                        mapId={markerMap}
                                        markergroupindex={props.index}
                                    />
                                        </div>
                                    </div>
                                )}
                            </Section>
                        </div>
                    )}
                </div>
            </Section>
        </div>
    );
}

export default Markerpack;