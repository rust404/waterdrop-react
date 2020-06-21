import React, {useEffect, useRef} from "react";
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
import Test from "views/Test";
import useCatagoryReducer from "store/useCatagoryReducer";
import Context from "store";

function App() {
  const [state, dispatch] = useCatagoryReducer();
  const refState = useRef(state)
  refState.current = state
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      window.localStorage.setItem('catagory', JSON.stringify(refState.current))
    })
  }, [])
  return (
    <Context.Provider value={{state, dispatch}}>
      <Router>
        <Switch>
          <Route path="/catagorymanage">
            <CatagoryManage />
          </Route>
          <Route path="/test">
            <Test />
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
    </Context.Provider>
  );
}

export default App;
