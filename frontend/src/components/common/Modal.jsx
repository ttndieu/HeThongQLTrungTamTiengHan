// src/components/common/Modal.jsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  // Ensure that the modal root element exists in public/index.html
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error("Modal root element with id 'modal-root' not found. Please add <div id='modal-root'></div> to your public/index.html.");
    return null;
  }

  let maxWidthClass;
  switch (size) {
    case 'sm':
      maxWidthClass = 'max-w-sm';
      break;
    case 'md':
      maxWidthClass = 'max-w-md';
      break;
    case 'lg':
      maxWidthClass = 'max-w-lg';
      break;
    case 'xl':
      maxWidthClass = 'max-w-xl';
      break;
    case '2xl':
      maxWidthClass = 'max-w-2xl';
      break;
    default:
      maxWidthClass = 'max-w-md';
  }

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 py-6">
      <div
        className={`
          bg-white rounded-lg shadow-xl p-6 relative w-full
          ${maxWidthClass}
          transform transition-all ease-out duration-300 scale-100 opacity-100
        `}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            aria-label="Đóng"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto pr-2 -mr-2"> {/* Added overflow-y-auto */}
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;