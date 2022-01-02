import React from 'react';
import { MarkerType } from '../../shared/interfaces/render/marker';
import { ISettings } from '../../shared/interfaces/settings';
import { IMarkerSettings } from '../../shared/interfaces/settings/IMarkerSettings';
import MarkerPosition from './markerPosition';
import MarkerVideo from './markerVideo';

interface IProps {
    settings: ISettings;
    path: string;
    marker: IMarkerSettings;
    mapId: string;
    index: number;
    markergroupindex: number;
}

export function Marker(props: IProps) {
    return (
        <div className={"marker " + (props.marker.active ? "active": "inactive")}>
            {props.marker.type === MarkerType.PositionMarker && <MarkerPosition {...props} />}
            {props.marker.type === MarkerType.VideoMarker && <MarkerVideo {...props} />}
        </div>
    )
}