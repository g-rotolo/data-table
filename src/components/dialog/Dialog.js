import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dialog.css";

const Dialog = ({ handleClose, show, title, handleConfirm, children }) => {
  const showHideClassName = show
    ? "modal display-block modal-fade-in"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <header className="modal-header">
          <h3>{title}</h3>
        </header>
        <main>{children}</main>
        <footer>
          <button title="Close" onClick={handleClose} className="rect-btn">
            <FontAwesomeIcon icon="times" />
            <span style={{ marginLeft: "5px" }}>Close</span>
          </button>
          <button title="Save" onClick={handleConfirm} className="rect-btn">
            <FontAwesomeIcon icon="save" />
            <span style={{ marginLeft: "5px" }}>Save</span>
          </button>
        </footer>
      </section>
    </div>
  );
};

export default Dialog;
