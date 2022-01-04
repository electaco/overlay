import React from 'react';
import Window from './window/window';
import { IGw2MumbleLinkData } from '../shared/interfaces/datatransfer/IGw2MumbleLinkData';

const { ipcRenderer } = window.require('electron')

interface IProps {}

interface IState {
    gw2data_ipc: IGw2MumbleLinkData | null;
    gw2data_ws: IGw2MumbleLinkData | null;
    now_position: any;
    now_timestamp: any;
    last_position: any;
    last_timestamp: any;
    speed: any;
}

const WS_CLIENT = "ws://localhost:19939/position";

class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
        gw2data_ipc: null,
        gw2data_ws: null,

        now_position: {x:0,y:0,z:0}, 
        now_timestamp: 0,

        last_position: {x:0,y:0,z:0},
        last_timestamp: 0,

        speed: 0,
    };
    this.gw2DataListener = this.gw2DataListener.bind(this);
      ipcRenderer.on('gw2data', this.gw2DataListener);      
  }

    componentDidMount() {
        let self = this;
        let webSocket = new WebSocket(WS_CLIENT);
        webSocket.onmessage = function (event) {
            var data = JSON.parse(event.data);
            self.setState({gw2data_ws: data});
            if (self.state.last_timestamp + 10 < new Date().getTime()) {
              // limit the calculation every 500 ms
              self.calculateSpeed()
            }
        }
        
  }
    
  calculateSpeed() {
    
    this.setState({now_position: this.state.gw2data_ws?.coordinates.playerPosition})
    this.setState({now_timestamp: new Date().getTime()})
    if (JSON.stringify(this.state.last_position) == JSON.stringify(this.state.now_position)) {
      return
    }


    var a = this.state.last_position.X - this.state.now_position.X;
    var b = this.state.last_position.Y - this.state.now_position.Y;
    var c = this.state.last_position.Z - this.state.now_position.Z;

    var distance = Math.sqrt(a * a + b * b + c * c);
    var time = this.state.now_timestamp - this.state.last_timestamp

    let speed = (distance * 39.3700787) / 0.01 ;
    speed = Math.round((speed*100/10000)*99/72)

    this.setState({speed: speed}) 
    this.setState({last_position: this.state.now_position})
    this.setState({last_timestamp: this.state.now_timestamp})
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('gw2data');
  }

  gw2DataListener(event: any, data: IGw2MumbleLinkData ) {
    this.setState({gw2data_ipc: data});
  }

  render () {
    return (
        <Window title="Speedometer" path="speedometer">
            <div>
            Coordinates (IPC): {this.state.gw2data_ipc?.coordinates.playerPosition.X} {this.state.gw2data_ipc?.coordinates.playerPosition.Y} {this.state.gw2data_ipc?.coordinates.playerPosition.Z}
            </div>
            <div>
            Coordinates (WS): {this.state.gw2data_ws?.coordinates.playerPosition.X} {this.state.gw2data_ws?.coordinates.playerPosition.Y} {this.state.gw2data_ws?.coordinates.playerPosition.Z}
            </div>
            <div>
            speed: {this.state.speed}
            </div>
        </Window>
    );
  }
}

export default App;