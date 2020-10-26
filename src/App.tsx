import React, {useEffect} from "react";
import {
  HashRouter as Router,
} from "react-router-dom";
import Routes from './routes'
import GlobalStyle from "./style/globalStyle";
import Animation from "./style/animation";
import MoneyRecordStore from "./store/moneyRecordStore";
import CategoryStore from "./store/categoryStore";

function App() {
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
      <MoneyRecordStore>
        <CategoryStore>
          <Router>
            <Routes />
          </Router>
        </CategoryStore>
      </MoneyRecordStore>
    </React.Fragment>
  );
}

export default App;
