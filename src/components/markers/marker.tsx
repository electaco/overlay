import React from 'react';
import { MarkerType } from '../../shared/interfaces/render/marker';
import { ISettings } from '../../shared/interfaces/settings';
import { IMarkerSettings } from '../../shared/interfaces/settings/IMarkerSettings';
import { IMarkerGroupSettings } from '../../shared/interfaces/settings/IMarkerGroupSettings';
import MarkerPosition from './markerPosition';
import MarkerVideo from './markerVideo';

interface IProps {
    settings: ISettings;
    pack: IMarkerGroupSettings;
    // Whether the overlay draws it now (shown, not done, and current in a sequential pack).
    drawn: boolean;
    path: string;
    marker: IMarkerSettings;
    mapId: string;
    index: number;
    markergroupindex: number;
}

export function Marker(props: IProps) {
    return (
        <div className={"marker " + (props.drawn ? "active": "inactive")}>
            {props.marker.type === MarkerType.PositionMarker && <MarkerPosition {...props} />}
            {props.marker.type === MarkerType.VideoMarker && <MarkerVideo {...props} />}
        </div>
    )
}