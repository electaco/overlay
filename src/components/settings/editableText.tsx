import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './EditableText.css'

const { ipcRenderer } = window.require('electron')

interface IProps {
    value: string,
    path: string,
    defaultValue?: string,
}
interface IState {
    value: string,
    editing: boolean
}

class EditableText extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { 
            value: props.value,
            editing: false };

        this.saveState = this.saveState.bind(this);
        this.setEdit = this.setEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.stopHandling = this.stopHandling.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    stopHandling(e: any) {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
    }

    handleChange(event: any) {
        this.setState({ value: event.target.value });
    }

    setEdit(state: boolean) {
        this.setState({editing: state, value: this.props.value});
    }

    handleKeyPress(event: any) {
        if(event.key === 'Enter'){
            this.stopHandling(event);
            this.saveState();
        }
        if (event.keyCode === 27) {
            this.stopHandling(event);
            this.setEdit(false);
        }
    }

    saveState() {
        ipcRenderer.send("updateconfig", { path: this.props.path, value: this.state.value });
        this.setState({editing: false});
    }
    render() {
        if (this.state.editing) {
            return (<span>
                    <input className="editableInput w-auto" 
                        value={this.state.value} 
                        onChange={this.handleChange} 
                        onKeyPress={this.handleKeyPress}
                        onClick={this.stopHandling}
                        autoFocus />
                    <span className="button" onClick= { (e) => {this.stopHandling(e);this.saveState()}}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className="button" onClick={(e)=>{this.stopHandling(e);this.setEdit(false)}}>
                        <FontAwesomeIcon icon={faTimesCircle}/>
                    </span>
                </span>);
        }
        return <span className="editText">
                <span className="editableText">
                { this.props.value || <span className="notext">{ this.props.defaultValue || "No text.."}</span>}
                </span>
                <span className="button editTextClick pl-2" onClick={(e)=>{this.stopHandling(e);this.setEdit(true)}}>
                    <FontAwesomeIcon icon={faEdit} />
                </span>
            </span>;
    }
}

export default EditableText;