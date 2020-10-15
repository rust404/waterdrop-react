import React, {useEffect, useReducer} from "react";
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
  useEffect(() => {
    // 禁止橡皮筋效应
    const bodyTouchMoveHandler = (e: TouchEvent) => {
      e.preventDefault()
    }
    document.body.addEventListener('touchmove', bodyTouchMoveHandler, {passive: false})
    // 解决微信端伪类active无效的问题
    document.body.addEventListener('touchstart', () => {})
  }, [])
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
