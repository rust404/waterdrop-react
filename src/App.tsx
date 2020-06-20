import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CatagoryManage from "views/CatagoryManage";
import Record from "views/record";
import Statistics from "views/Statistics";
import Notfound from "views/Notfound";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/catagorymanage">
          <CatagoryManage />
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
