import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Configuration from './components/Configuration';
import Markers from './components/Markers';
import Mounts from './components/Mounts';
import SearchMarkers from './components/SearchMarkers';
import App from './App';

export default function BasicExample() {
  return (
    <Router>
        <Switch>
          <Route exact path="/test">
            <App />
          </Route>
          <Route path="/config">
            <Configuration />
          </Route>
          <Route path="/marks">
            <Markers />
          </Route>
          <Route path="/mounts">
            <Mounts />
          </Route>
          <Route path="/get_markers">
            <SearchMarkers />
          </Route>           
        </Switch>
    </Router>
  );
}
