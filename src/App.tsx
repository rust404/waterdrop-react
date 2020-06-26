import React, {useEffect, useRef, useReducer} from "react";
import {
  HashRouter as Router,
} from "react-router-dom";
import catagoryReducer, {loadCatagory} from "store/catagoryReducer";
import {CatagoryContext, RecordContext} from "store";
import moneyRecordReducer, {loadRecords} from "store/moneyRecordReducer";
import "datejs";
import Routes from './routes'

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
          <Routes />
        </Router>
      </CatagoryContext.Provider>
    </RecordContext.Provider>
  );
}

export default App;
