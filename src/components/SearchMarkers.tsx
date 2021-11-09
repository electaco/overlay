import React, { useState } from 'react';
import EventButton from './window/EventButton';
import Section from './window/section';
import Window from './window/window';
import { IMarkerSearchResult } from '../shared/interfaces/datatransfer/IMarkerSearchResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
const { ipcRenderer } = window.require('electron')

const ROOT = "https://elec.k.thelazy.net/";
const QURL = ROOT + "markers/search?q=";
const FETCH_URL = ROOT + "markers/get/"

interface markerProps {
    marker: IMarkerSearchResult;
}

function SearchMarkerResult(props: markerProps) {
    function loadMarkerGroup() {
        fetch(FETCH_URL + props.marker.id, {cache: "no-cache"})
        .then(res => res.json())
        .then(
          (result) => {
            ipcRenderer.send("loadmarkergroup_json", result);
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

function App() {
    const [results, setResults] = useState<IMarkerSearchResult[]>([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchString, setSearchString] = useState("");

    function search(query: string) {
        setIsSearching(true);
        fetch(QURL + query, {cache: "no-cache"})
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setResults(result.result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
    function handleKeyPress(event: any) {
        if(event.key === 'Enter'){
            search(searchString);
        }
    }
    function handleSelect(evt) {
        setSearchString(evt.target.value);
    }

    return (
        <Window title="Find Markerpacks" path="get_markers">
            <div className="d-flex">
                <input className="form-control" onChange={handleSelect} value={searchString} onKeyPress={handleKeyPress}/>
                <button className="btn btn-secondary" onClick={()=>search(searchString)}>Search</button>
            </div>
            {isSearching && !isLoaded && <div>Searching..</div>}
            {error && <div>Error: {error}</div>}
            {isLoaded && <div>
                {results && <div>
                    <table className="table text-white">
                    {results.map((result) => 
                        <SearchMarkerResult marker={result} key={result.id} />
                    )}
                    </table>
                </div>}
                {!results && <div>
                    No results
                </div>}
            </div>}
        </Window>
    );
}

export default App;
