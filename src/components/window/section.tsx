import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import './section.css';

interface IProps {
    expanded?: boolean;
    title: React.ReactNode;
    rightside?: React.ReactNode;
    children?: React.ReactNode;
    plusOnRightSide?: boolean;
}

function Section(props:IProps) {
    let start = props.expanded !== undefined ? props.expanded : true;
    const [visible, setVisible] = useState(start);
    let icon = visible ? faMinus : faPlus;
    return  <div className="section">
            <div className="sectionTitle d-flex align-items-center">
                {!props.plusOnRightSide && <FontAwesomeIcon icon={icon} className="button" onClick={() => setVisible(!visible)} />}
                <div className="flex-grow-1 title">
                    {props.title}
                </div>
                <div className="rightside">
                    {props.rightside}
                    {props.plusOnRightSide && <FontAwesomeIcon icon={icon} className="button" onClick={() => setVisible(!visible)} />}
                </div>
            </div>
            {visible && <div className="sectionContent">
                {props.children}
            </div>}
    </div>;
}

export default Section;