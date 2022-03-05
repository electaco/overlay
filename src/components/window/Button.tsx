import React from 'react';
import './Button.css'

interface IProps {
    text?: React.ReactNode;
    title?: string;
    children?: React.ReactNode;
    onClick?: (event: any) => void;
    type?: string;
}

function Button(props: IProps) {
    let buttonType = props.type ? props.type : "btn-secondary";
    return (
        <div className={"button windowButton px-2 mx-2 btn "+ buttonType} onClick={props.onClick} title={props.title}>
                { props.text }{props.children}
        </div>
    );
}

export default Button;