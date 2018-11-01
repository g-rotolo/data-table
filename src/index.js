import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./style/main.css";
import DataTable from "./DataTable";
import * as serviceWorker from "./serviceWorker";
// Mock data, remove and use props when linked with API
import { columsMock, rowsMock } from "./mocks";

ReactDOM.render(
  <DataTable cols={columsMock} rows={rowsMock} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
