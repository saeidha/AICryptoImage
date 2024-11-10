import React from 'react';
import './Modal.css'; // Ensure you have the CSS file for styling
import closeIcon from '../images/close.svg'; // Adjust the path as necessary

interface ModalProps {
  isOpen: boolean; // Control the visibility of the modal
  onClose: () => void; // Function to close the modal
  children: React.ReactNode; // Content to display inside the modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <img 
      className="close-icon"
      src={closeIcon} // Replace with your close image path
      style={{ cursor: 'pointer', width: '30px', height: '30px', position: 'absolute', top: '10px', right: '10px', fill: 'white' }} // Adjust size and position as needed
      onClick={onClose} // Call the onClose function when clicked
    />
        {children}
      </div>
    </div>
  );
};

export default Modal;