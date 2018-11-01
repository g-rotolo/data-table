import React, { Component } from "react";
import "./DataTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableInput from "./components/input/TableInput";
import CSVCreator from "./components/CSVCreator/CSVCreator";

// Mock data, remove and use props when linked with API
import { columsMock, rowsMock } from "./mocks";

import "./style/main.css";
import "./DataTable.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faTrash,
  faPen,
  faTimes,
  faSave,
  faFileCsv
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faTrash, faPen, faTimes, faSave, faFileCsv);

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      selectedRow: {},
      newCol: {},
      newRow: {}
    };
  }

  componentDidMount() {
    this.setState({
      cols: columsMock,
      rows: rowsMock
    });
  }

  generateCSVData = () => {
    const cols = [...this.state.cols];
    const rows = [...this.state.rows];
    const csvData = [];
    rows.forEach(row => {
      let obj = {};
      cols.forEach(col => {
        obj[col.name] = row[col.name];
      });
      csvData.push(obj);
    });
    return csvData;
  };

  removeCol = index => {
    const cols = [...this.state.cols];
    cols.splice(index, 1);
    if (cols.length === 0) {
      this.setState({
        cols,
        rows: []
      });
    } else {
      this.setState({
        cols
      });
    }
  };

  renderColumns = () => {
    if (this.state.cols.length === 0) {
      return (
        <tr className="data-table-row no-rows">
          <td>There are no columns to display, try adding a new one!</td>
        </tr>
      );
    }
    return (
      <tr>
        {this.state.cols.map((col, index) => (
          <th key={`col_${index}`}>
            {col.displayName}
            <button title="Delete column" onClick={() => this.removeCol(index)}>
              <FontAwesomeIcon icon="times" />
            </button>
          </th>
        ))}
      </tr>
    );
  };

  renderRows = () => {
    const rows = [...this.state.rows];
    const cols = [...this.state.cols];
    if (rows.length === 0 || cols.length === 0) {
      return (
        <tr className="data-table-row no-rows">
          <td>There are no rows to display</td>
        </tr>
      );
    }
    return rows.map((row, index) => (
      <tr key={`row_${index}`}>
        {cols.map(col => (
          <td key={`row_data_${col.name}`}>
            <TableInput
              className="table-body-input"
              id={`row_data_${col.name}`}
              name={`row_data_${col.name}`}
              type={"text"}
              placeholder="Insert a value"
              onChange={e => this.handleEditRowField(e, col.name, index)}
              value={row[col.name] || ""}
            />
          </td>
        ))}
      </tr>
    ));
  };

  handleDeleteRow = index => {
    const rows = [...this.state.rows];
    rows.splice(index, 1);
    this.setState({ rows });
  };

  handleEditRowField = (e, prop, index) => {
    const rows = [...this.state.rows];
    const row = rows.find(oldRow => oldRow.id === rows[index].id);
    row[prop] = e.target.value;
    this.setState({
      rows
    });
  };

  handleNewColumnInput = e => {
    const newCol = {};
    newCol.displayName = e.target.value;
    newCol.name = e.target.value;
    newCol.editable = true;
    this.setState({ newCol });
  };

  handleAddNewColumn = () => {
    const cols = [...this.state.cols];
    cols.push(this.state.newCol);
    this.setState({ newCol: {}, cols, showAddColumnModal: false, blur: false });
  };

  handleAddNewRow = () => {
    const rows = [...this.state.rows];
    const newRow = {};
    newRow.id = rows.length + 1;
    rows.push(newRow);
    this.setState({ rows });
  };

  render() {
    const csvData = this.generateCSVData();
    const cols = [...this.state.cols];
    return (
      <div className="main-wrapper">
        <div id="data-table-wrapper" className="data-table-wrapper">
          <div className="top-btn-wrapper">
            <CSVCreator csvData={csvData} />
            <button
              style={{ marginRight: "10px" }}
              title="Add a row"
              disabled={cols.length === 0}
              onClick={() => this.handleAddNewRow()}
              className="rect-btn big yellow right"
            >
              <FontAwesomeIcon icon="plus" />
              <span style={{ marginLeft: "5px" }}>Add row</span>
            </button>
            <button
              title="Add a column"
              onClick={() =>
                this.setState({ showAddColumnModal: true, blur: true })
              }
              className="rect-btn big yellow right"
            >
              <FontAwesomeIcon icon="plus" />
              <span style={{ marginLeft: "5px" }}>Add column</span>
            </button>
          </div>
          <table>
            <thead>{this.renderColumns()}</thead>
            <tbody>{this.renderRows()}</tbody>
            <tfoot>
              <tr>
                <td>Sum</td>
                <td>$180</td>
                <td>$180</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

export default DataTable;
