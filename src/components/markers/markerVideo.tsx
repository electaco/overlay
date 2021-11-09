import React from 'react';
import Checkbox from '../settings/IconCheckbox';
import EditableText from '../settings/editableText';
import getSetting from '../helpers/getSetting';
import { IMarkerRemovalInfo } from '../../shared/interfaces/datatransfer/IMarkerRemovalInfo';
import { faEye, faEyeSlash, faFilm } from '@fortawesome/free-solid-svg-icons'
import { ISettings } from '../../shared/interfaces/settings';
import { IMarkerSettings } from '../../shared/interfaces/settings/IMarkerSettings';
import Button from '../window/Button';
import Section from '../window/section';
import PositionEditor from '../settings/PositionEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumberEditor } from '../settings/NumberEditor';

const { ipcRenderer } = window.require('electron')

interface IProps {
    settings: ISettings;
    path: string;
    marker: IMarkerSettings;
    mapId: string;
    index: number;
    markergroupindex: number;
}

function MarkerVideo(props: IProps) {
    function removeMarker() {
        let markerInfo: IMarkerRemovalInfo = {
            index: props.index,
            map: props.mapId,
            markerpack: props.markergroupindex
        }
        ipcRenderer.send("removeMarker", markerInfo);
    }

    return (
        <div className="marker videoMarker d-flex">
            <Section title={
                <div className='flex-grow-1'>
                    <FontAwesomeIcon icon={faFilm} className="mr-2" style={{ width: "1em" }} />
                    <EditableText path={props.path + "name"} value={props.marker.name} />
                </div>
            } 
            visible={false}
            plusOnRightSide={true}
            rightside={
                <Checkbox
                    setting={getSetting(props.settings, "", props.path + "active")}
                    iconChecked={faEye}
                    iconUnchecked={faEyeSlash}
                />
            }
            >
                <Button onClick={removeMarker}>Remove marker</Button>
                <div>
                    <PositionEditor title="Position" position={props.marker.position} path={props.path + "position"} />
                </div>
                {props.marker.extraData?.rotation && 
                    <div>
                        <PositionEditor title="Rotation" position={props.marker.extraData?.rotation} path={props.path + "extraData.rotation"} />
                    </div>
                }
                {props.marker.extraData?.scale && 
                    <div>
                        Scale: <NumberEditor
                            path={props.path + "extraData.scale"}
                            value={props.marker.extraData.scale}
                            step={0.1}
                            min={0.1}
                            max={10}
                        />
                    </div>
                }

                {props.marker.extraData?.source.url && 
                    <div>
                        URL: <EditableText path={props.path + "extraData.source.url"} value={props.marker.extraData.source.url} />
                    </div>                    
                }
                {props.marker.extraData?.source.type && 
                    <div>
                        Type: <EditableText path={props.path + "extraData.source.type"} value={props.marker.extraData.source.type} />
                    </div>
                }
                {props.marker.extraData?.source.ratio && 
                <div>
                    Ratio: <NumberEditor
                        path={props.path + "extraData.source.ratio.0"}
                        value={props.marker.extraData.source.ratio[0]}
                        step={1}
                        min={1}
                        max={20}
                    /> / 
                    <NumberEditor
                        path={props.path + "extraData.source.ratio.1"}
                        value={props.marker.extraData.source.ratio[1]}
                        step={1}
                        min={1}
                        max={20}
                    />
                </div>
                }
            </Section>

        </div>
    );
}

export default MarkerVideo;