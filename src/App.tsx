import React from 'react';
import './App.css';
import Section from './components/window/section';
import Window from './components/window/window';
//import MouseDebug from './components/mouse';

function App() {
  return (
    <Window title="Test window" path="test">
      <Section title="Overlay Performance Tips" expanded={false}>
          <ul>
            <li>Turn on Frame Limiter in Guild Wars 2, under Graphics Options</li>
            <li>Turn on Vsync in Guild Wars 2, under Graphics Options</li>
            <li>Keep focus on overlay instead of game when playing video</li>
            <li>Tune down graphics options in Guild Wars 2</li>
            <li>Turn off Game Mode in Windows</li>
          </ul>
          <Section title="Explanation" expanded={false}>

          
          <i>The overlay use very little resources, 
            but with game mode on the game in focus 
            will have very high priority on resources, 
            and if GW2 uses 100% of for example GPU the overlay will be resource starved. 
            The ways around it are to either reduce resource use of GW2 so there is some overhead, 
            move focus from the GW2 app to the overlay (good for movies), or turn off Game Mode.</i>
            </Section>
        </Section>
    </Window>
  );
}

export default App;
