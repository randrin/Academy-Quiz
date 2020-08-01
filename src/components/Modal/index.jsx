import React from "react";

const Modal = ({ openModal, closeModal, children }) => {
  return (
    openModal && (
      <div className="modalBackground" onClick={closeModal}>
        <div className="modalContainer">{children}</div>
      </div>
    )
  );
};

export default Modal;
