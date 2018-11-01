import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CSVCreator from "../CSVCreator/CSVCreator";
import "./TopButtons.css";

const TopButtons = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="top-btn-wrapper">
      <CSVCreator csvData={props.csvData} />
      <button
        style={{ marginRight: "10px" }}
        title="Add a row"
        disabled={props.disabledAddCol}
        onClick={() => props.handleAddNewRow()}
        className="rect-btn big yellow right"
      >
        <FontAwesomeIcon icon="plus" />
        <span style={{ marginLeft: "5px" }}>Row</span>
      </button>
      <button
        title="Add a column"
        onClick={() => props.handleAddNewColumn()}
        className="rect-btn big yellow right"
      >
        <FontAwesomeIcon icon="plus" />
        <span style={{ marginLeft: "5px" }}>Col</span>
      </button>
    </div>
  );
};

export default TopButtons;
