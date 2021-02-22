import { hot } from 'react-hot-loader';
import * as React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './Pages/Home/index'
import Algos from './Pages/Algos/index'

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/algos">
            <Home />
          </Route>
          <Route path="/">
            <Algos />
            {/* <Home /> */}
          </Route>
        </Switch>
    </Router>
  );
}

export default hot(module)(App);