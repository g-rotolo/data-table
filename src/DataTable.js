import React, { Component } from "react";
import "./DataTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class DataTable extends Component {
  constructor(props) {
    super(props);
  }

  renderColumns = () => {
    return this.props.cols.map((col, index) => (
      <div key={`column_${index}`} className="header-cell">
        {col.displayName}
      </div>
    ));
  };

  //   this.state.rows.map(row => (
  //   <tr>{row.map(cell => (
  //     <td>{cell}</td>
  //    ))}
  //   </tr>
  // ))

  renderRows = () => {
    return this.props.rows.map((row, index) => (
      <div key={`row_${index}`} className="data-table-row">
        {this.props.cols.map(col => (
          <div key={`row_${col.name}`} className="data-table-row-cell">
            {row[col.name]}
          </div>
        ))}
        <div className="data-table-row-cell">
          <button title="Edit" className="action-btn">
            <FontAwesomeIcon icon="pen" />
          </button>
          <button title="Delete" className="action-btn">
            <FontAwesomeIcon icon="trash" />
          </button>
        </div>
      </div>
    ));
  };

  handleRowChange = () => {};

  render() {
    console.log("PROPS", this.props);
    return (
      <div className="data-table-wrapper">
        <div className="data-table-header">
          {this.renderColumns()}
          <div className="header-cell">Actions</div>
        </div>
        <div className="data-table-body">{this.renderRows()}</div>
        <div className="data-table-footer">Footer Wannabe!</div>
      </div>
    );
  }
}
export default DataTable;
