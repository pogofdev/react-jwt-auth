import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter} from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
