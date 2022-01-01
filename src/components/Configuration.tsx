import React from 'react';
import Window from './window/window';
import Section from './window/section';
import Checkbox from './settings/IconCheckbox';

import getSetting from './helpers/getSetting';
import EventButton from './window/EventButton';

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
    ipcRenderer.on('setsettings', this.settingsListener);
    ipcRenderer.send('getsettings', true);
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('setsettings');
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
          <Section title="Development" expanded={false}>
            <Section title="Dev tools">
                <EventButton text="Renderer" event="debugrenderer" value="true"/>
                <EventButton text="Configuration" event="debug-window" value="config" />
                <EventButton text="Markers" event="debug-window" value="marks"/>
              </Section>
              <Section title="Experimental" expanded={false}>
                <EventButton text="Reload renderer" event="reloadRender" value="true"/>
                <EventButton text="Restart overlay" event="restart" value="true"/>
              </Section>
          </Section>
        </Window>
    );
  }
}

export default App;