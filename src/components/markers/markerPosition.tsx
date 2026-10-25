import React from 'react';
import Checkbox from '../settings/IconCheckbox';
import EditableText from '../settings/editableText';
import { IMarkerRemovalInfo } from '../../shared/interfaces/datatransfer/IMarkerRemovalInfo';
import { faEye, faEyeSlash, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { ISettings } from '../../shared/interfaces/settings';
import { IMarkerSettings } from '../../shared/interfaces/settings/IMarkerSettings';
import { IMarkerGroupSettings } from '../../shared/interfaces/settings/IMarkerGroupSettings';
import { DoneUntil, IsMarkerActive, MarkerActivePath, MarkerDoneAtPath } from '../../shared/models/settings/MarkerPrefs';
import Button from '../window/Button';
import Section from '../window/section';
import PositionEditor from '../settings/PositionEditor';
import IconPicker from '../settings/IconPicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IMarkerTypeChange from '../../shared/interfaces/datatransfer/IMarkerTypeChange';
import { IPC } from '../../shared/ipc';
import { send } from '../../shared/electron_ipc';

interface IProps {
    settings: ISettings;
    pack: IMarkerGroupSettings;
    path: string;
    marker: IMarkerSettings;
    mapId: string;
    index: number;
    markergroupindex: number;
}

function MarkerPosition(props: IProps) {
    function removeMarker() {
        const markerInfo: IMarkerRemovalInfo = {
            index: props.index,
            map: props.mapId,
            markerpack: props.markergroupindex
        }
        send(IPC.Marker.Remove, markerInfo);
    }

    function toVideoMarker() {
        const markerInfo: IMarkerTypeChange =  {
            type: 1,
            id: props.index,
            map: props.mapId,
            markergroup: props.markergroupindex
        }
        send(IPC.Marker.ChangeType, markerInfo);
    }
    const doneUntil = DoneUntil(props.settings.markerPrefs, props.pack, props.marker, Date.now());
    function showAgain() {
        send(IPC.Settings.Update, { path: MarkerDoneAtPath(props.pack, props.marker), value: null });
    }

    return (
        <div className="marker d-flex">
            <Section title={
                <div className='flex-grow-1'>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" style={{ width: "1em" }} />
                    <EditableText path={props.path + "name"} value={props.marker.name} />
                </div>} 
                expanded={false} 
                plusOnRightSide={true} 
                rightside={
                    <Checkbox
                        setting={{ path: MarkerActivePath(props.pack, props.marker), value: IsMarkerActive(props.settings.markerPrefs, props.pack, props.marker) }}
                        iconChecked={faEye}
                        iconUnchecked={faEyeSlash}
                    />
                }>
                {doneUntil !== null && (
                    <div className="markerdone">
                        Done, hidden {isFinite(doneUntil) ? "until " + new Date(doneUntil).toLocaleString() : "until shown again"}{" "}
                        <Button onClick={showAgain}>Show again</Button>
                    </div>
                )}
                <Button onClick={removeMarker}>Remove marker</Button>
                <Button onClick={toVideoMarker}>To Video marker</Button>
                <div>
                    <PositionEditor title="Position" position={props.marker.position} path={props.path + "position"} />
                </div>
                <div className="d-flex align-items-center">
                    Icon:
                    <IconPicker popup="Icon for this marker (Pack: use the pack's icon)" path={props.path + "icon"}
                        value={props.marker.icon} allowDefault defaultIcon={props.pack.icon} />
                </div>
                <div>
                    <EditableText path={props.path + "description"} value={props.marker.description} defaultValue="No description"/>
                </div>
            </Section>
        </div>
    );
}

export default MarkerPosition;