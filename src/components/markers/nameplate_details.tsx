import React from 'react';
import { INamePlateSetting } from '../../shared/interfaces/settings/INamePlateSetting';

interface IProps {
    nameplate: INamePlateSetting;
    callback: (nameplate: INamePlateSetting) => void;
}

export function NamePlateSettings(props: IProps) {

    return (
        <div>
            <h3>Name plate settings</h3>
            <div>
                Ground distance:
                <input type="number" value="2" min="0" max="5" step="0.1"/>

            </div>

        </div>
    );
}