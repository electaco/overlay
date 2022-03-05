import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEye, faEyeSlash, faFileExport } from '@fortawesome/free-solid-svg-icons'

import Button from '../window/Button';
import Checkbox from '../settings/IconCheckbox';
import getSetting from '../helpers/getSetting';
import Section from '../window/section';
import Colorpicker from '../settings/colorpicker';
import EditableText from '../settings/editableText';
import { maps } from '../helpers/constants';
import { IMarkerGroupSettings } from "../../shared/interfaces/settings/IMarkerGroupSettings";
import { Marker } from './marker';
import "./markerpack.css";
import { IMarkerSettings } from '../../shared/interfaces/settings/IMarkerSettings';
import { SortArray, ByActive, ByActiveMap } from '../helpers/sorting';
import { ISettings } from '../../shared/interfaces/settings';
import { IPC } from '../../shared/ipc';

const { ipcRenderer } = window.require('electron')

interface IProps {
    pack: IMarkerGroupSettings,
    path: string,
    settings: ISettings,
    index: number
}

function Markerpack(props: IProps) {
    function addMarker() {
        ipcRenderer.send(IPC.Marker.Add, props.index);
    }

    function removeMarkerGroup() {
        ipcRenderer.send(IPC.Marker.RemoveGroup, props.index);
    }

    function exportMarkerGroup() {
        ipcRenderer.send(IPC.Marker.SaveGroup, props.index);
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

    return (
        <div className={"markerpack " + (props.pack.active ? "active " : "inactive ") + (props.pack.markers[props.settings.runtimeData?.map || ""] && props.pack.active ? "activemap": "")}>
            <Section
                expanded={false}
                title={
                    <EditableText path={props.path + "name"} value={props.pack.name} />
                }
                rightside={
                    <div className="d-flex justify-content-center">
                        <Checkbox setting={getSetting(props.settings, "", props.path + "active")}
                            iconChecked={faEye}
                            popup="Set marker group visible or not"
                            iconUnchecked={faEyeSlash} />

                        <div className="button">
                            <FontAwesomeIcon icon={faPlusCircle} onClick={addMarker} title="Add a marker on current position" />
                        </div>

                        <Colorpicker
                            setting={getSetting(props.settings, "Marker color", props.path + "color")}
                            popup="Set color of markers" />
                        <Button onClick={removeMarkerGroup} title="Delete marker group">X</Button>
                    </div>
                }
                key={props.pack.id}>

                <div className="float-right">
                    <span className="button" onClick={exportMarkerGroup}>
                        <FontAwesomeIcon icon={faFileExport} title="Save Marker Group to file" />
                    </span>
                </div>

                <EditableText path={props.path + "description"} value={props.pack.description} defaultValue="No description" />
                <div className="markerpack" >
                    {SortArray(Object.keys(props.pack.markers), ByActiveMap(props.settings.runtimeData?.map ?? ""))?.map((markerMap) =>
                        <div className={"map " + (props.settings.runtimeData?.map === markerMap ? "active": "")}>
                            <Section title={maps[markerMap]?.map_name ?? "<Map " + markerMap + ">"}
                                expanded={markerMap === props.settings.runtimeData?.map}
                            >
                                {SortArray(props.pack.markers[markerMap], ByActive).map((marker) =>
                                    <Marker
                                        settings={props.settings}
                                        path={props.path + "markers." + markerMap + "." + indexOf(markerMap, marker) + "."}
                                        key={marker.id}
                                        marker={marker}
                                        index={indexOf(markerMap, marker)}
                                        mapId={markerMap}
                                        markergroupindex={props.index}
                                    />
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