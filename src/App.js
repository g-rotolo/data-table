import React, { Component } from "react";
import "./App.css";
import "./DataTable.css";
import DataTable from "./DataTable";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { columsMock, rowsMock } from "./mocks";

library.add(faTrash, faPen);

class App extends Component {
  render() {
    return (
      <div className="App">
        <DataTable cols={columsMock} rows={rowsMock} />
      </div>
    );
  }
}

export default App;
