import React from 'react';
import Window from './window/window';
import Section from './window/section';
import Checkbox from './settings/IconCheckbox';

import getSetting from './helpers/getSetting';
import EventButton from './window/EventButton';
import { KeyChordEditor } from './settings/KeyChordEditor';
import { IPC } from '../shared/ipc';
import { Settings } from '../shared/models/settings/Settings';
import { send, on, removeAllListeners } from '../shared/electron_ipc';

interface IProps {

}

interface IState {
  settings: Settings | null;
}

class App extends React.Component<IProps, IState> {
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

  settingsListener(data: unknown) {
    this.setState({settings: data as Settings});
  }

  render() {
    if (!this.state.settings) {
      return <div>Loading...</div>;
    }
    return (
        <Window title="Configuration" path="config">
          <Section title="Rendering">
            <Checkbox setting={getSetting(this.state.settings, 'Show debug boxes', "render.debugBoxes", false)}/>
            <Checkbox setting={getSetting(this.state.settings, 'Show marker names', "render.showMarkerNames", false)}/>
          </Section>
          <Section title="Overlay">
            <Checkbox setting={getSetting(this.state.settings, 'Check for new versions', "overlaySettings.checkForUpdates", true)} />
            <Checkbox setting={getSetting(this.state.settings, 'Automatically update to new versions', "overlaySettings.autoUpdate", true)} />
            <Checkbox setting={getSetting(this.state.settings, 'Automatically update markers to new versions on start', "overlaySettings.checkForMarkerUpdates", true)}/>
          </Section>
          <Section title="Mount keys" expanded={false}>
            <p className="small mb-2">
              These are the keys the overlay presses to summon each mount. They must match
              the mount key bindings in Guild Wars 2 (Options &rarr; Control Options).
              Click a key, then press the combination you bound in game.
            </p>
            <table className="table table-sm text-white mb-0">
              <tbody>
                {(this.state.settings.overlaySettings?.mounts?.mounts ?? []).map((mount, index) => (
                  <tr key={mount.id}>
                    <td className="align-middle">{mount.name}</td>
                    <td className="align-middle text-right">
                      <KeyChordEditor
                        path={"overlaySettings.mounts.mounts." + index + ".keys"}
                        value={mount.keys}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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