import React from 'react';
import Window from './window/window';
import { IGw2MumbleLinkData } from '../shared/interfaces/datatransfer/IGw2MumbleLinkData';

const { ipcRenderer } = window.require('electron')

interface IProps {}

interface IState {
    gw2data_ipc: IGw2MumbleLinkData | null;
    gw2data_ws: IGw2MumbleLinkData | null;
}

const WS_CLIENT = "ws://localhost:19939/position";

class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
        gw2data_ipc: null,
        gw2data_ws: null
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
        }
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
        </Window>
    );
  }
}

export default App;