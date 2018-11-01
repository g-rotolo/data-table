import React from "react";
import CSVCreator from "../CSVCreator/CSVCreator";
import TopButton from "./topButton/TopButton";
import "./TopButtons.css";

const TopButtons = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="top-btn-wrapper">
      <CSVCreator cols={props.cols} rows={props.rows} />
      <TopButton
        title="Add a row"
        onClick={props.handleAddNewRow}
        className="rect-btn big yellow"
        icon="plus"
        text="Row"
      />
      <TopButton
        title="Add a column"
        onClick={() => props.handleAddNewColumn()}
        className="rect-btn big yellow"
        icon="plus"
        text="Col"
      />
    </div>
  );
};

export default TopButtons;
