import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faCog } from '@fortawesome/free-solid-svg-icons'
import './section.css';

interface IProps {
    expanded?: boolean;
    title: React.ReactNode;
    rightside?: React.ReactNode;
    children?: React.ReactNode;
    // A settings cogwheel on the right instead of the plus/minus on the left.
    cogOnRightSide?: boolean;
    // Shown under the title whether or not the section is expanded.
    panel?: React.ReactNode;
}

function Section(props:IProps) {
    let start = props.expanded !== undefined ? props.expanded : true;
    const [visible, setVisible] = useState(start);
    let icon = visible ? faMinus : faPlus;
    return  <div className="section">
            <div className="sectionTitle d-flex align-items-center">
                {!props.cogOnRightSide && <FontAwesomeIcon icon={icon} className="button" onClick={() => setVisible(!visible)} />}
                <div className="flex-grow-1 title">
                    {props.title}
                </div>
                <div className="rightside">
                    {props.rightside}
                    {props.cogOnRightSide && <FontAwesomeIcon icon={faCog} className={"button sectioncog" + (visible ? " active" : "")}
                        title="Settings" onClick={() => setVisible(!visible)} />}
                </div>
            </div>
            {props.panel}
            {visible && <div className="sectionContent">
                {props.children}
            </div>}
    </div>;
}

export default Section;