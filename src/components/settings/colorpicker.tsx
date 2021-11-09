import React from 'react';
import './colorpicker.css';
const { ipcRenderer } = window.require('electron')

interface IProps {
  popup: string,
  setting: any
}

class Colorbox extends React.Component<IProps> {
    constructor(props:IProps) {
        super(props);    
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    
      handleInputChange(event: any) {
        const target = event.target;
        ipcRenderer.send("updateconfig", {path: this.props.setting.path, value: target.value})
      }
      render() {
        return <div title={this.props.popup}>
          <input className="colorpicker mt-2" 
            type="color" 
            value={this.props.setting.value} 
            onChange={this.handleInputChange} 
            id={this.props.setting.path}/>
        </div>
      }
}

export default Colorbox;