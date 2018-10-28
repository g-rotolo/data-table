import React from "react";
import "./TableInput.css";

const TableInput = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <input
        className="form-input"
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default TableInput;
