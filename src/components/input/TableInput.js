import React from "react";
import "./TableInput.css";

const TableInput = props => {
  return (
    <input
      className={props.className}
      id={props.name}
      name={props.name}
      type={props.type}
      value={props.value}
      disabled={props.disabled}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
};

export default TableInput;
