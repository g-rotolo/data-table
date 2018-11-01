import React, { Component } from "react";
import "./DataTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableInput from "./components/input/TableInput";
import Dialog from "./components/dialog/Dialog";
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
      newRow: {},
      showEditModal: false,
      showAddRowModal: false,
      showAddColumnModal: false,
      blur: false
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

  showEditModal = row => {
    this.setState({ selectedRow: row, showEditModal: true, blur: true });
  };

  hideEditModal = () => {
    let selectedRow = { ...this.state.selectedRow };
    const rows = [...this.state.rows];
    const index = rows.findIndex(
      originalRow => originalRow.id === selectedRow.id
    );
    selectedRow = rows[index];

    if (index !== -1) {
      this.setState({
        selectedRow,
        showEditModal: false,
        blur: false
      });
    }
  };

  hideAddModals = () => {
    this.setState({
      newRow: {},
      newCol: {},
      showAddColumnModal: false,
      showAddRowModal: false,
      blur: false
    });
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
      return <div>There are no columns to display, try adding a new one!</div>;
    }
    return this.state.cols.map((col, index) => (
      <div key={`column_${index}`} className="header-cell">
        {col.displayName}
        <button title="Delete column" onClick={() => this.removeCol(index)}>
          <FontAwesomeIcon icon="times" />
        </button>
      </div>
    ));
  };

  renderRows = () => {
    const rows = [...this.state.rows];
    const cols = [...this.state.cols];
    if (rows.length === 0 || cols.length === 0) {
      return (
        <div className="data-table-row no-rows">
          There are no rows to display
        </div>
      );
    }
    return rows.map((row, index) => (
      <div key={`row_${index}`} className="data-table-row">
        {cols.map(col => (
          <div key={`row_${col.name}`} className="data-table-row-cell">
            {row[col.name]}
          </div>
        ))}
        <div className="data-table-row-cell">
          <button
            title="Edit"
            onClick={() => this.showEditModal(row)}
            className="action-btn"
          >
            <FontAwesomeIcon icon="pen" />
          </button>
          <button
            title="Delete"
            onClick={() => this.handleDeleteRow(index)}
            className="action-btn"
          >
            <FontAwesomeIcon icon="trash" />
          </button>
        </div>
      </div>
    ));
  };

  renderModalContent = () => {
    const selectedRow = { ...this.state.selectedRow };
    return this.state.cols.map(col => (
      <div className="modal-row" key={`fieldRow_${col.name}`}>
        <div style={{ flexBasis: "25%", fontWeight: "bold" }}>
          {col.displayName}
        </div>
        <div>
          <TableInput
            name={col.name}
            className="form-input"
            type="text"
            value={selectedRow[col.name] || ""}
            onChange={e => this.handleEditRowField(e, col.name)}
            placeholder="Set a value"
            disabled={!col.editable}
          />
        </div>
      </div>
    ));
  };

  handleDeleteRow = index => {
    const rows = [...this.state.rows];
    rows.splice(index, 1);
    this.setState({ rows });
  };

  handleEditRowField = (e, colName) => {
    const selectedRow = { ...this.state.selectedRow };
    selectedRow[colName] = e.target.value;
    this.setState({
      selectedRow
    });
  };

  handleEditNewRowField = (e, colName) => {
    const newRow = { ...this.state.newRow };
    newRow[colName] = e.target.value;
    this.setState({
      newRow
    });
  };

  handleConfirm = () => {
    const selectedRow = { ...this.state.selectedRow };
    const rows = [...this.state.rows];
    const index = rows.findIndex(
      originalRow => originalRow.id === selectedRow.id
    );
    rows[index] = selectedRow;

    if (index !== -1) {
      this.setState({
        rows,
        showEditModal: false,
        blur: false
      });
    }
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
    const newRow = { ...this.state.newRow };
    const rows = [...this.state.rows];
    newRow.id = rows.length + 1;
    rows.push(newRow);
    this.setState({ newRow: {}, rows, showAddRowModal: false, blur: false });
  };

  render() {
    const csvData = this.generateCSVData();
    const blurTable = this.state.blur
      ? "data-table-wrapper blur"
      : "data-table-wrapper";
    const cols = [...this.state.cols];
    return (
      <div className="main-wrapper">
        <div id="data-table-wrapper" className={blurTable}>
          <div className="top-btn-wrapper">
            <CSVCreator csvData={csvData} />
            <button
              style={{ marginRight: "10px" }}
              title="Add a row"
              disabled={cols.length === 0}
              onClick={() =>
                this.setState({ showAddRowModal: true, blur: true })
              }
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
          <div className="data-table-header">
            {this.renderColumns()}
            {this.state.rows.length > 0 && (
              <div className="header-cell">Actions</div>
            )}
          </div>
          <div className="data-table-body">{this.renderRows()}</div>
          <div className="data-table-footer" />
        </div>
        <Dialog
          title="Edit row"
          show={this.state.showEditModal}
          handleClose={this.hideEditModal}
          handleConfirm={this.handleConfirm}
        >
          {this.renderModalContent()}
        </Dialog>
        <Dialog
          title="Add a new row"
          show={this.state.showAddRowModal}
          handleClose={this.hideAddModals}
          handleConfirm={this.handleAddNewRow}
        >
          {cols.map(col => (
            <div className="modal-row" key={`fieldRow_${col.name}`}>
              <div style={{ flexBasis: "25%", fontWeight: "bold" }}>
                {col.displayName}
              </div>
              <div>
                <TableInput
                  name={col.name}
                  className="form-input"
                  type="text"
                  value={this.state.newRow[col.name] || ""}
                  onChange={e => this.handleEditNewRowField(e, col.name)}
                  placeholder="Set a value"
                />
              </div>
            </div>
          ))}
        </Dialog>
        <Dialog
          title="Add a new column"
          show={this.state.showAddColumnModal}
          handleClose={this.hideAddModals}
          handleConfirm={this.handleAddNewColumn}
        >
          <div className="modal-row">
            <div style={{ flexBasis: "30%", fontWeight: "bold" }}>
              New column name
            </div>
            <div>
              <TableInput
                name="new_column"
                className="form-input"
                type="text"
                value={this.state.newCol.displayName || ""}
                onChange={e => this.handleNewColumnInput(e)}
                placeholder="Set a value"
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default DataTable;
