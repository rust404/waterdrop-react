import React, {useEffect, useRef, useReducer} from "react";
import {
  HashRouter as Router,
} from "react-router-dom";
import categoryReducer, {loadCategory} from "store/categoryReducer";
import {CategoryContext, RecordContext} from "store";
import moneyRecordReducer, {loadRecords} from "store/moneyRecordReducer";
import Routes from './routes'
import GlobalStyle from "./style/globalStyle";
import Animation from "./style/animation";

function App() {
  const [category, dispatchCategory] = useReducer(
    categoryReducer,
    null,
    loadCategory
  );
  const [records, dispatchRecord] = useReducer(
    moneyRecordReducer,
    null,
    loadRecords
  );
  const refCategory = useRef(category);
  const refRecords = useRef(records);
  refCategory.current = category;
  refRecords.current = records;
  useEffect(() => {
    // 不要beforeunload，照顾safari
    window.addEventListener("pagehide", () => {
      window.localStorage.setItem(
        "category",
        JSON.stringify(refCategory.current)
      );
      window.localStorage.setItem(
        "records",
        JSON.stringify(refRecords.current)
      );
    });
  }, []);
  return (
    <React.Fragment>
      <GlobalStyle/>
      <Animation/>
      <RecordContext.Provider
        value={{state: records, dispatch: dispatchRecord}}
      >
        <CategoryContext.Provider
          value={{state: category, dispatch: dispatchCategory}}
        >
          <Router>
            <Routes />
          </Router>
        </CategoryContext.Provider>
      </RecordContext.Provider>
    </React.Fragment>
  );
}

export default App;
