import React, { Component } from "react";
import "./DataTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class DataTable extends Component {
  render() {
    return (
      <div className="data-table-wrapper">
        <div className="data-table-header">
          <div className="header-cell">Header A</div>
          <div className="header-cell">Header B</div>
          <div className="header-cell">Header C</div>
          <div className="header-cell">Actions</div>
        </div>
        <div className="data-table-body">
          <div className="data-table-row">
            <div className="data-table-row-cell">Body A-1</div>
            <div className="data-table-row-cell">Body A-2</div>
            <div className="data-table-row-cell">Body A-3</div>
            <div className="data-table-row-cell">
              <button title="Edit" className="action-btn">
                <FontAwesomeIcon icon="pen" />
              </button>
              <button title="Delete" className="action-btn">
                <FontAwesomeIcon icon="trash-alt" />
              </button>
            </div>
          </div>
          <div className="data-table-row">
            <div className="data-table-row-cell">Body A-1</div>
            <div className="data-table-row-cell">Body A-2</div>
            <div className="data-table-row-cell">Body A-3</div>
            <div className="data-table-row-cell">
              <button title="Edit" className="action-btn">
                <FontAwesomeIcon icon="pen" />
              </button>
              <button title="Delete" className="action-btn">
                <FontAwesomeIcon icon="trash-alt" />
              </button>
            </div>
          </div>
          <div className="data-table-row">
            <div className="data-table-row-cell">Body A-1</div>
            <div className="data-table-row-cell">Body A-2</div>
            <div className="data-table-row-cell">Body A-3</div>
            <div className="data-table-row-cell">
              <button title="Edit" className="action-btn">
                <FontAwesomeIcon icon="pen" />
              </button>
              <button title="Delete" className="action-btn">
                <FontAwesomeIcon icon="trash-alt" />
              </button>
            </div>
          </div>
          <div className="data-table-row">
            <div className="data-table-row-cell">Body A-1</div>
            <div className="data-table-row-cell">Body A-2</div>
            <div className="data-table-row-cell">Body A-3</div>
            <div className="data-table-row-cell">
              <button title="Edit" className="action-btn">
                <FontAwesomeIcon icon="pen" />
              </button>
              <button title="Delete" className="action-btn">
                <FontAwesomeIcon icon="trash-alt" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DataTable;
