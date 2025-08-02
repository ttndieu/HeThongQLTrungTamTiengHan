// src/components/common/Alert.jsx
import React, { useState, useEffect } from 'react';

const Alert = ({ message, type = 'info', duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const baseClasses = "p-4 rounded-md shadow-md flex items-center justify-between";
  let typeClasses = "";
  let icon = "";

  switch (type) {
    case 'success':
      typeClasses = "bg-green-100 border border-green-400 text-green-700";
      icon = "✅";
      break;
    case 'error':
      typeClasses = "bg-red-100 border border-red-400 text-red-700";
      icon = "❌";
      break;
    case 'warning':
      typeClasses = "bg-yellow-100 border border-yellow-400 text-yellow-700";
      icon = "⚠️";
      break;
    case 'info':
    default:
      typeClasses = "bg-blue-100 border border-blue-400 text-blue-700";
      icon = "ℹ️";
      break;
  }

  return (
    <div className={`${baseClasses} ${typeClasses}`} role="alert">
      <div className="flex items-center">
        {icon && <span className="mr-2 text-xl">{icon}</span>}
        <span className="text-sm font-medium">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={() => { setIsVisible(false); onClose(); }}
          className="ml-4 text-lg font-bold"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;