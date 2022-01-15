import React from 'react';
import Window from './window/window';
import Section from './window/section';
import Checkbox from './settings/IconCheckbox';

import getSetting from './helpers/getSetting';
import EventButton from './window/EventButton';
import { IPC } from '../shared/ipc';

const { ipcRenderer } = window.require('electron')

interface IProps {

}

interface IState {
  settings: any;
}

class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      settings: {
        getSetting: function() {}
      }
    };
    this.settingsListener = this.settingsListener.bind(this);
    ipcRenderer.on(IPC.Settings.Set, this.settingsListener);
    ipcRenderer.send(IPC.Settings.Get, true);
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(IPC.Settings.Set);
  }

  settingsListener(event: any, data: any) {
    this.setState({settings: data});
  }

  render () {
    return (
        <Window title="Configuration" path="config">
          <Section title="Rendering">
            <Checkbox setting={getSetting(this.state.settings, 'Show debug boxes', "render.debugBoxes", false)}/>
            <Checkbox setting={getSetting(this.state.settings, 'Show marker names', "render.showMarkerNames", false)}/>
        </Section>
        <Section title="Overlay">
          <Checkbox setting={getSetting(this.state.settings, 'Check for new versions', "overlaySettings.checkForUpdates", true)} />
          <Checkbox setting={getSetting(this.state.settings, 'Automatically update to new versions', "overlaySettings.autoUpdate", true)}/>
          </Section>
          <Section title="Development" expanded={false}>
            <Section title="Dev tools">
                <EventButton text="Renderer" event={IPC.Debug.DebugWindowRender} value="true"/>
                <EventButton text="Configuration" event={IPC.Debug.DebugWindow} value="config" />
                <EventButton text="Markers" event={IPC.Debug.DebugWindow} value="marks"/>
              </Section>
              <Section title="Experimental" expanded={false}>
                <EventButton text="Reload renderer" event={IPC.Debug.ReloadRender} value="true"/>
                <EventButton text="Restart overlay" event={IPC.Restart} value="true"/>
              </Section>
          </Section>
        </Window>
    );
  }
}

export default App;