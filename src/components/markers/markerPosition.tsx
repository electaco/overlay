import React from 'react';
import Checkbox from '../settings/IconCheckbox';
import EditableText from '../settings/editableText';
import getSetting from '../helpers/getSetting';
import { IMarkerRemovalInfo } from '../../shared/interfaces/datatransfer/IMarkerRemovalInfo';
import { faEye, faEyeSlash, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { ISettings } from '../../shared/interfaces/settings';
import { IMarkerSettings } from '../../shared/interfaces/settings/IMarkerSettings';
import Button from '../window/Button';
import Section from '../window/section';
import PositionEditor from '../settings/PositionEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { ipcRenderer } = window.require('electron')

interface IProps {
    settings: ISettings;
    path: string;
    marker: IMarkerSettings;
    mapId: string;
    index: number;
    markergroupindex: number;
}

function MarkerPosition(props: IProps) {
    function removeMarker() {
        let markerInfo: IMarkerRemovalInfo = {
            index: props.index,
            map: props.mapId,
            markerpack: props.markergroupindex
        }
        ipcRenderer.send("removeMarker", markerInfo);
    }
    return (
        <div className="marker d-flex">
            <Section title={
                <div className='flex-grow-1'>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" style={{ width: "1em" }} />
                    <EditableText path={props.path + "name"} value={props.marker.name} />
                </div>} 
                visible={false} 
                plusOnRightSide={true} 
                rightside={
                    <Checkbox
                        setting={getSetting(props.settings, "", props.path + "active")}
                        iconChecked={faEye}
                        iconUnchecked={faEyeSlash}
                    />
                }>
                <Button onClick={removeMarker}>Remove marker</Button>
                <div>
                    <PositionEditor title="Position" position={props.marker.position} path={props.path + "position"} />
                </div>
                <div>
                    <EditableText path={props.path + "description"} value={props.marker.description} />
                </div>
            </Section>
        </div>
    );
}

export default MarkerPosition;