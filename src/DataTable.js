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
    showEditModal: false
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

  renderColumns = () => {
    return this.state.cols.map((col, index) => (
      <div key={`column_${index}`} className="header-cell">
        {col.displayName}
      </div>
    ));
  };

  renderRows = () => {
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
          <button title="Delete" className="action-btn">
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
        <div style={{ fontWeight: "bold" }}>{col.displayName}</div>
        <div>
          <TableInput
            name={col.name}
            className="form-input"
            type="text"
            value={selectedRow[col.name]}
            onChange={e => this.handleEditRowField(e, col.name)}
            placeholder="Set a value"
            disabled={!col.editable}
          />
        </div>
      </div>
    ));
  };

  handleEditRowField = (e, colName) => {
    console.log("EDITING", colName, e.target.value);
    const selectedRow = { ...this.state.selectedRow };
    selectedRow[colName] = e.target.value;
    this.setState({
      selectedRow
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

  render() {
    console.log("STATE", this.state);
    return (
      <div className="data-table-wrapper">
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
      </div>
    );
  }
}

export default DataTable;
