import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Tags from 'views/tags';
import Record from 'views/record';
import Statistics from 'views/statistics';
import Notfound from 'views/notfound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/tags">
          <Tags />
        </Route>
        <Route path="/record">
          <Record />
        </Route>
        <Route path="/statistics">
          <Statistics />
        </Route>
        <Redirect from="/" exact to="/record" />
        <Route path="*">
          <Notfound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
