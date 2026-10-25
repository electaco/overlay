import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEye, faEyeSlash, faFileExport } from '@fortawesome/free-solid-svg-icons'

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
import { SortArray, ByActiveUsing, ByActiveMap } from '../helpers/sorting';
import { IsMarkerActive, IsPackActive, PackActivePath } from '../../shared/models/settings/MarkerPrefs';
import { ISettings } from '../../shared/interfaces/settings';
import { IPC } from '../../shared/ipc';
import { send } from '../../shared/electron_ipc';

interface IProps {
    pack: IMarkerGroupSettings,
    path: string,
    settings: ISettings,
    index: number
}

function Markerpack(props: IProps) {
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
    const markerActive = (marker: IMarkerSettings) => IsMarkerActive(props.settings.markerPrefs, props.pack, marker);

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

                        <div className="button">
                            <FontAwesomeIcon icon={faPlusCircle} onClick={addMarker} title="Add a marker on current position" />
                        </div>

                        <IconPicker popup="Marker icon" path={props.path + "icon"} value={props.pack.icon} />

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
                            <Section title={GetMapName(markerMap) ?? "<Map " + markerMap + ">"}
                                expanded={markerMap === props.settings.runtimeData?.map}
                            >
                                {SortArray(props.pack.markers[markerMap], ByActiveUsing(markerActive)).map((marker) =>
                                    <Marker
                                        settings={props.settings}
                                        pack={props.pack}
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