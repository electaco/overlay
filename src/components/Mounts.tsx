import React from 'react';
import EventButton from './window/EventButton';
import Section from './window/section';
import Window from './window/window';


function App() {
  return (
    <Window title="Mounts" path="mounts">
          <EventButton event="sendkeys" value="16,17,112">Raptor</EventButton>
          <EventButton event="sendkeys" value="16,17,113">Springer</EventButton>
          <EventButton event="sendkeys" value="16,17,114">Skimmer</EventButton>
          <EventButton event="sendkeys" value="16,17,115">Jackal</EventButton>

          <EventButton event="sendkeys" value="16,17,116">Roller Beetle</EventButton>
          <EventButton event="sendkeys" value="16,17,117">Griffon</EventButton>
          <EventButton event="sendkeys" value="16,17,118">Skyscale</EventButton>
          <EventButton event="sendkeys" value="16,17,119">Warclaw</EventButton>
          <Section title="Setup" visible={false}>
              <ul>
                  <li>Go to GW2 Options</li>
                  <li>Go to Control Options tab</li>
                  <li>For each mount:</li>
                  <li>Double click on second (or first) key binding colomn</li>
                  <li>When asked to bind mount key, click the mount button above</li>
                  <li>If you don't have one of the mounts, just ignore the button</li>
              </ul>
          </Section>
    </Window>
  );
}

export default App;
