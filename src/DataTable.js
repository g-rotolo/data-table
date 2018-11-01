import React, { Component } from "react";
import "./DataTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableInput from "./components/input/TableInput";
import TopButtons from "./components/topButtons/TopButtons";

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
      rows: []
    };
  }

  componentDidMount() {
    this.setState({
      cols: columsMock,
      rows: rowsMock
    });
  }

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
            <button title="Delete column" onClick={() => this.removeCol(index)}>
              <FontAwesomeIcon icon="times" />
            </button>
            <TableInput
              className="table-body-input yellow"
              id={`col_data_${col.name}`}
              name={`col_data_${col.name}`}
              type={"text"}
              placeholder="Insert a value"
              onChange={e => this.handleEditColField(e, col.name, index)}
              value={col.displayName || ""}
            />
          </th>
        ))}
        <th className="data-table-actions" />
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
        {cols.map((col, colIndex) => (
          <td key={`row_data_${index}${colIndex}`}>
            <TableInput
              className="table-body-input"
              id={`row_data_${col.name}`}
              name={`row_data_${col.name}`}
              type={"text"}
              disabled={typeof col.name === "undefined"}
              placeholder="Insert a value"
              onChange={e => this.handleEditRowField(e, col.name, index)}
              value={row[col.name] || ""}
            />
          </td>
        ))}
        <td className="data-table-actions">
          <button
            title="Delete row"
            onClick={() => this.handleDeleteRow(index)}
            className="action-btn"
          >
            <FontAwesomeIcon icon="trash" />
          </button>
        </td>
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

  handleEditColField = (e, originalColName, index) => {
    const cols = [...this.state.cols];
    const rows = [...this.state.rows];
    const col = cols[index];
    col.name = e.target.value;
    col.displayName = e.target.value;
    rows.forEach(row => {
      row[e.target.value] = row[originalColName];
      delete row[originalColName];
    });
    this.setState({
      cols,
      rows
    });
  };

  handleAddNewColumn = () => {
    const cols = [...this.state.cols];
    const newCol = {};
    cols.push(newCol);
    this.setState({ cols });
  };

  handleAddNewRow = () => {
    const rows = [...this.state.rows];
    const newRow = {};
    newRow.id = rows.length + 1;
    rows.push(newRow);
    this.setState({ rows });
  };

  render() {
    return (
      <div className="main-wrapper">
        <div id="data-table-wrapper" className="data-table-wrapper">
          <TopButtons
            show={true}
            disabledAddCol={this.state.cols.length === 0}
            cols={this.state.cols}
            rows={this.state.rows}
            handleAddNewRow={this.handleAddNewRow}
            handleAddNewColumn={this.handleAddNewColumn}
          />
          <table>
            <thead>{this.renderColumns()}</thead>
            <tbody>{this.renderRows()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DataTable;
