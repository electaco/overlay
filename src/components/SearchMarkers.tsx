import React from 'react';
import Window from './window/window';
import { IMarkerSearchResult } from '../shared/interfaces/datatransfer/IMarkerSearchResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport } from '@fortawesome/free-solid-svg-icons'
import { IPC } from '../shared/ipc';
import IconCheckbox from './window/CheckBox';
import { ISettings } from '../shared/interfaces/settings';
const { ipcRenderer } = window.require('electron')

const ROOT = "https://elec.k.thelazy.net/";
const QURL = ROOT + "markers/search?";
const FETCH_URL = ROOT + "markers/get/"

interface IProps {

}

interface IState {
    results: IMarkerSearchResult[],
    error: any,
    isLoaded: boolean,
    isSearching: boolean,
    searchText: string,
    searchMap: boolean,
    settings: ISettings | null
}

interface markerProps {
    marker: IMarkerSearchResult;
}

function SearchMarkerResult(props: markerProps) {
    function loadMarkerGroup() {
        fetch(FETCH_URL + props.marker.id, {cache: "no-cache"})
        .then(res => res.json())
        .then(
          (result) => {
            ipcRenderer.send(IPC.Marker.LoadJson, result);
          },
          (error) => {
          }
        )
    }
    return (<tr>
        <td>
        <span className="button" onClick={loadMarkerGroup}>
            <FontAwesomeIcon icon={faFileImport} title="Install marker pack" />
        </span>        
        </td>
        <td>
            {props.marker.title}
        </td>
        <td>
            {props.marker.category}
        </td>
    </tr>);
}

class App extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            settings: null,
            results: [],
            error: null,
            isLoaded: false,
            isSearching: false,
            searchText: "",
            searchMap: false
        };
        this.settingsListener = this.settingsListener.bind(this);
        this.search = this.search.bind(this);
        ipcRenderer.on(IPC.Settings.Set, this.settingsListener);
        ipcRenderer.send(IPC.Settings.Get, true);
      }
    
      componentWillUnmount() {
        ipcRenderer.removeAllListeners(IPC.Settings.Set);
      }
    
      settingsListener(event: any, data: any) {
        this.setState({settings: data});
      }

    search() {
        let mapid = "";
        if (this.state.searchMap && this.state.settings) {
            mapid = this.state.settings.runtimeData?.map || "";
        }
        let qs = `q=${this.state.searchText}&map=${mapid}`;
        this.setState({isSearching: true});
        fetch(QURL + qs, {cache: "no-cache"})
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    results: result.result
                });
          },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
          }
        )
    }
    handleKeyPress(event: any) {
        if(event.key === 'Enter'){
            this.search();
        }
    }
    handleSelect(evt) {
        this.setState({searchText: evt.target.value});
    }
    render() {
        return (
            <Window title="Find Markerpacks" path="get_markers">
                <div className="d-flex">
                    <input className="form-control" onChange={this.handleSelect} value={this.state.searchText} onKeyPress={this.handleKeyPress} />
                    <button className="btn btn-secondary" onClick={() => this.search()}>Search</button>
                </div>
                <IconCheckbox toggleCheck={(e)=> {this.setState({searchMap: e})}} checked={this.state.searchMap}>Only results with markes on current map</IconCheckbox>
                {this.state.isSearching && !this.state.isLoaded && <div>Searching..</div>}
                {this.state.error && <div>Error: {this.state.error}</div>}
                {this.state.isLoaded && <div>
                    {this.state.results && <div>
                        <table className="table text-white">
                            {this.state.results.map((result) =>
                                <SearchMarkerResult marker={result} key={result.id} />
                            )}
                        </table>
                    </div>}
                    {!this.state.results && <div>
                        No results
                    </div>}
                </div>}
            </Window>
        );
    }
}

export default App;
