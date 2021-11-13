import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEye, faEyeSlash, faFileExport } from '@fortawesome/free-solid-svg-icons'

import Button from '../window/Button';
import Checkbox from '../settings/IconCheckbox';
import getSetting from '../helpers/getSetting';
import MarkerPosition from './markerPosition'
import Section from '../window/section';
import Colorpicker from '../settings/colorpicker';
import EditableText from '../settings/editableText';
import { maps } from '../helpers/constants';
import { IMarkerGroupSettings } from "../../shared/interfaces/settings/IMarkerGroupSettings";
import { MarkerType } from "../../shared/interfaces/render/marker";
import MarkerVideo from './markerVideo';
import { Marker } from './marker';

const { ipcRenderer } = window.require('electron')

interface IProps {
    pack: IMarkerGroupSettings,
    path: string,
    settings: any,
    index: number
}

function Markerpack(props: IProps) {
    function addMarker() {
        ipcRenderer.send("addMarker", props.index);
    }

    function removeMarkerGroup() {
        ipcRenderer.send("removeMarkerGroup", props.index);
    }

    function exportMarkerGroup() {
        ipcRenderer.send("savemarkergroup", props.index);
    }

    return (
        <Section
            visible={false}
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
            Description: <EditableText path={props.path + "description"} value={props.pack.description} defaultValue="No description"/>
            <div className="markerpack" >
                {Object.keys(props.pack.markers)?.map((markerMap) =>
                    <Section title={maps[markerMap]?.map_name ?? "<Map " + markerMap + ">"}
                        visible={false}
                    >
                        {props.pack.markers[markerMap].map((marker, index) => 
                            <Marker
                                settings={props.settings}
                                path={props.path + "markers." + markerMap + "." + index + "."}
                                key={marker.id}
                                marker={marker}
                                index={index}
                                mapId={markerMap}
                                markergroupindex={props.index}
                            />
                        )}
                    </Section>
                )}
            </div>
        </Section>
    );
}

export default Markerpack;