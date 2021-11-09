import React from 'react';
import './Button.css'

interface IProps {
    text?: React.ReactNode;
    title?: string;
    children?: React.ReactNode;
    onClick?: (event: any) => void;
}

function Button(props: IProps) {
    return (
        <div className="button windowButton px-2 mx-2" onClick={props.onClick} title={props.title}>
                { props.text }{props.children}
        </div>
    );
}

export default Button;