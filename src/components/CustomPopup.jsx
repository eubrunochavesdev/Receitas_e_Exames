import React from "react";

const CustomPopup = ({ show, message, onClose }) => {
  return (
    <div className={`popup-overlay ${show ? "show" : ""}`}>
      <div className="popup-content">
        <p>{message}</p>
        <button className="btn btn-primary" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default CustomPopup;
