import React, { Component } from "react";
import "./DataTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableInput from "./components/input/TableInput";
import EditDialog from "./components/dialog/EditDialog";

class DataTable extends Component {
  state = {
    cols: [],
    rows: [],
    selectedRow: {},
    newCol: {},
    newRow: {},
    showEditModal: false,
    showAddRowModal: false,
    showAddColumnModal: false
  };

  componentDidMount() {
    this.setState({
      cols: this.props.cols,
      rows: this.props.rows
    });
  }

  showEditModal = row => {
    this.setState({ selectedRow: row, showEditModal: true });
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
        showEditModal: false
      });
    }
  };

  hideAddModals = () => {
    this.setState({
      newRow: {},
      newCol: {},
      showAddColumnModal: false,
      showAddRowModal: false
    });
  };

  renderColumns = () => {
    return this.state.cols.map((col, index) => (
      <div key={`column_${index}`} className="header-cell">
        {col.displayName}
      </div>
    ));
  };

  renderRows = () => {
    const rows = [...this.state.rows];
    if (rows.length === 0) {
      return (
        <div className="data-table-row no-rows">
          There are no rows to display
        </div>
      );
    }
    return this.state.rows.map((row, index) => (
      <div key={`row_${index}`} className="data-table-row">
        {this.state.cols.map(col => (
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
        showEditModal: false
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
    this.setState({ newCol: {}, cols, showAddColumnModal: false });
  };

  handleAddNewRow = () => {
    const newRow = { ...this.state.newRow };
    const rows = [...this.state.rows];
    newRow.id = rows.length + 1;
    rows.push(newRow);
    this.setState({ newRow: {}, rows, showAddRowModal: false });
  };

  render() {
    return (
      <div className="data-table-wrapper">
        <div className="top-btn-wrapper">
          <button
            style={{ marginRight: "10px" }}
            title="Add a row"
            onClick={() => this.setState({ showAddRowModal: true })}
            className="rect-btn big yellow right"
          >
            <FontAwesomeIcon icon="plus" />
            <span style={{ marginLeft: "5px" }}>Add row</span>
          </button>
          <button
            title="Add a column"
            onClick={() => this.setState({ showAddColumnModal: true })}
            className="rect-btn big yellow right"
          >
            <FontAwesomeIcon icon="plus" />
            <span style={{ marginLeft: "5px" }}>Add column</span>
          </button>
        </div>
        <div className="data-table-header">
          {this.renderColumns()}
          <div className="header-cell">Actions</div>
        </div>
        <div className="data-table-body">{this.renderRows()}</div>
        <div className="data-table-footer">Footer Wannabe!</div>
        <EditDialog
          title="Edit row"
          show={this.state.showEditModal}
          handleClose={this.hideEditModal}
          handleConfirm={this.handleConfirm}
        >
          {this.renderModalContent()}
        </EditDialog>
        <EditDialog
          title="Add a new row"
          show={this.state.showAddRowModal}
          handleClose={this.hideAddModals}
          handleConfirm={this.handleAddNewRow}
        >
          {this.state.cols.map(col => (
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
        </EditDialog>
        <EditDialog
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
        </EditDialog>
      </div>
    );
  }
}

export default DataTable;
