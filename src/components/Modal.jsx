import React from "react";
import styles from "./style"; // Импортируем стили

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : 'closed'}`} onClick={handleClickOutside}>
      <div className="modalContent">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;