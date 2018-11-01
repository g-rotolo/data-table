import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../TopButtons.css";

const TopButton = props => (
  <button
    title={props.title}
    onClick={() => props.onClick()}
    className={props.className}
  >
    <FontAwesomeIcon icon={props.icon} />
    <span style={{ marginLeft: "5px" }}>{props.text}</span>
  </button>
);

export default TopButton;
