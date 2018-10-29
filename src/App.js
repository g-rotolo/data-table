import React, { Component } from "react";
import "./App.css";
import "./DataTable.css";
import DataTable from "./DataTable";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faTrash,
  faPen,
  faTimes,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import { columsMock, rowsMock } from "./mocks";

library.add(faPlus, faTrash, faPen, faTimes, faSave);

class App extends Component {
  render() {
    return (
      <div id="app-container" className="App">
        <DataTable cols={columsMock} rows={rowsMock} />
      </div>
    );
  }
}

export default App;
