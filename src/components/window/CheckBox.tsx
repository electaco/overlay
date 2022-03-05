import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IProps {
    iconChecked?: IconProp;
    iconUnchecked?: IconProp;
    toggleCheck: any;
    children?: any;
    popup?: any;
    checked: boolean;
    name?: string;
}

function IconCheckbox(props: IProps) {
    let checkedIcon = props.iconChecked ? props.iconChecked : faCheckSquare;
    let unCheckedIcon = props.iconUnchecked ? props.iconUnchecked : faSquare;
    let icon = props.checked ? checkedIcon : unCheckedIcon;

    return (
        <span className="button" onClick={() => props.toggleCheck(!props.checked)} title={props.popup}>
            <FontAwesomeIcon icon={icon} className="mr-2" style={{width: "1em"}}/>
            {props.name}
            {props.children}
        </span>
    );
}

export default IconCheckbox;