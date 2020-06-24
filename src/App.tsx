import React, {useEffect, useRef, useReducer} from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CatagoryManage from "views/catagory/CatagoryManage";
import RecordAdd from "views/record/RecordAdd";
import Statistics from "views/Statistics";
import Notfound from "views/Notfound";
import Test from "views/Test";
import catagoryReducer, {loadCatagory} from "store/catagoryReducer";
import {CatagoryContext, RecordContext} from "store";
import CatagoryEdit from "views/catagory/CatagoryEdit";
import CatagoryAdd from "views/catagory/CatagoryAdd";
import moneyRecordReducer, {loadRecords} from "store/moneyRecordReducer";
import RecordDetail from "views/record/RecordDetail";
import "datejs";

function App() {
  const [catagory, dispatchCatagory] = useReducer(
    catagoryReducer,
    null,
    loadCatagory
  );
  const [records, dispatchRecord] = useReducer(
    moneyRecordReducer,
    null,
    loadRecords
  );
  const refCatagory = useRef(catagory);
  const refRecords = useRef(records);
  refCatagory.current = catagory;
  refRecords.current = records;
  useEffect(() => {
    // 不要beforeunload，照顾safari
    window.addEventListener("pagehide", () => {
      window.localStorage.setItem(
        "catagory",
        JSON.stringify(refCatagory.current)
      );
      window.localStorage.setItem(
        "records",
        JSON.stringify(refRecords.current)
      );
    });
  }, []);
  return (
    <RecordContext.Provider
      value={{state: records, dispatch: dispatchRecord}}
    >
      <CatagoryContext.Provider
        value={{state: catagory, dispatch: dispatchCatagory}}
      >
        <Router>
          <Switch>
            <Route path="/catagory/manage" component={CatagoryManage} />
            <Route path="/catagory/edit/:id" component={CatagoryEdit} />
            <Route path="/catagory/add" component={CatagoryAdd} />
            <Route path="/record/detail" component={RecordDetail} />
            <Route path="/record/add" component={RecordAdd} />
            <Route path="/test" component={Test} />
            <Route path="/statistics" component={Statistics} />
            <Redirect from="/" exact to="/record/add" />
            <Route path="*" component={Notfound} />
          </Switch>
        </Router>
      </CatagoryContext.Provider>
    </RecordContext.Provider>
  );
}

export default App;
