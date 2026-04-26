import React from 'react';
import Window from './window/window';
import Markerpack from './markers/markerpack';
import { ISettings } from '../shared/interfaces/settings';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faFileImport, faSearchLocation } from '@fortawesome/free-solid-svg-icons'
import { SortArray, ByActive, CompoundSort, MarkerPackHasMap } from './helpers/sorting';
import { IMarkerGroupSettings } from '../shared/interfaces/settings/IMarkerGroupSettings';
import { IPC } from '../shared/ipc';
import { send, on, removeAllListeners } from '../shared/electron_ipc';

function log(data: string) {
  send(IPC.Log, "Markers", data);
}

interface IProps { }
interface IState { settings: ISettings | null }

class App extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      settings: null
    };
    this.settingsListener = this.settingsListener.bind(this);
    const cleanup = on(IPC.Settings.Set, this.settingsListener);
    send(IPC.Settings.Get, true);
    this._cleanup = cleanup;
  }

  private _cleanup?: () => void;

  componentWillUnmount() {
    this._cleanup?.();
    removeAllListeners(IPC.Settings.Set);
  }

  settingsListener(_event: unknown, data: unknown) {
    this.setState({ settings: data as ISettings });
  }

  newMarkerGroup() {
    send(IPC.Marker.NewGroup, true);
  }

  loadMarkerGroup() {
    send(IPC.Marker.LoadGroup, true);
  }

  openSearchPage() {
    send(IPC.Window.Open, {path: "get_markers", show:true});
  }

  getSettings(): ISettings {
    if (!this.state.settings) {
      throw new Error("Settings not loaded");
    }
    return this.state.settings;
  }

  indexOf(markerpack: IMarkerGroupSettings) {
    var elementIndex = -1;
    this.state.settings?.marks.forEach((element, index) => {
      if (element.id === markerpack.id) {
        elementIndex = index;
      }
    });
    return elementIndex;
  }

  render() {
    return (
      <Window title="Markers" path="marks" titleextra={
        <div className="pr-2 pl-1 pt-1">
          <span className="button pr-1" onClick={this.openSearchPage}>
            <FontAwesomeIcon icon={faSearchLocation} title="Search for marker group" />
          </span>
          <span className="button pr-1" onClick={this.newMarkerGroup}>
            <FontAwesomeIcon icon={faFolderPlus} title="New marker group" />
          </span>
          <span className="button" onClick={this.loadMarkerGroup}>
            <FontAwesomeIcon icon={faFileImport} title="Load Marker Group from file" />
          </span>
        </div>
      }>
        
        {this.state.settings
          && SortArray(this.state.settings.marks,
            CompoundSort([ByActive, MarkerPackHasMap(this.getSettings().runtimeData?.map || "")]))
            .map((markerpack) =>
          <Markerpack pack={markerpack} path={"marks." + this.indexOf(markerpack) + "."} settings={this.getSettings()} index={this.indexOf(markerpack)} />
        )}
      </Window>
    );
  }
}

export default App;