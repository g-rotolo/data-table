import React from "react";
import "./EditDialog.css";

const EditDialog = ({ handleClose, show, title, handleConfirm, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <header className="modal-header">
          <h3>{title}</h3>
        </header>
        <main>{children}</main>
        <button onClick={handleClose}>close</button>
        <button onClick={handleConfirm}>confirm</button>
      </section>
    </div>
  );
};

export default EditDialog;
