import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'index.scss'

// 解决微信端伪类active无效的问题
document.body.addEventListener('touchstart', () => {})
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.register();
