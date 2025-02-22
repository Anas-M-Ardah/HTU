// components/Modal/Modal.jsx
import React from 'react';
import './Modal.css';

const Modal = ({ show, type, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className={`modal-header ${type}`}>
          <span className="modal-icon">
            {type === 'success' ? '✓' : '⚠'}
          </span>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;