import React, { Component } from "react";
import "./App.css";
import "./DataTable.css";
import DataTable from "./DataTable";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faPen } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt, faPen);

class App extends Component {
  render() {
    return (
      <div className="App">
        <DataTable />
      </div>
    );
  }
}

export default App;
