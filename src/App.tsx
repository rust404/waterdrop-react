import React, {useEffect, useRef, useReducer} from "react";
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
import catagoryReducer, {loadCatagory} from "store/catagoryReducer";
import Context, {RecordContext} from "store";
import CatagoryEdit from "views/CatagoryEdit";
import CatagoryAdd from "views/CatagoryAdd";
import moneyRecordReducer, {loadRecords} from "store/moneyRecordReducer";
import RecordDetail from "views/RecordDetail";

function App() {
  const [state, dispatch] = useReducer(catagoryReducer, null, loadCatagory);
  const [records, dispatchRecord] = useReducer(
    moneyRecordReducer,
    null,
    loadRecords
  );
  const refState = useRef(state);
  refState.current = state;
  useEffect(() => {
    // 不要beforeunload，照顾safari
    window.addEventListener("pagehide", () => {
      window.localStorage.setItem("catagory", JSON.stringify(refState.current));
    });
  }, []);
  return (
    <RecordContext.Provider
      value={{state: records, dispatch: dispatchRecord}}
    >
      <Context.Provider value={{state, dispatch}}>
        <Router>
          <Switch>
            <Route path="/catagorymanage">
              <CatagoryManage />
            </Route>
            <Route path="/catagoryedit/:id">
              <CatagoryEdit />
            </Route>
            <Route path="/recorddetail">
              <RecordDetail />
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
            <Route path="/catagoryadd">
              <CatagoryAdd />
            </Route>
            <Redirect from="/" exact to="/record" />
            <Route path="*">
              <Notfound />
            </Route>
          </Switch>
        </Router>
      </Context.Provider>
    </RecordContext.Provider>
  );
}

export default App;
