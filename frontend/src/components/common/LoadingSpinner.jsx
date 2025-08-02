// src/components/common/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  let spinnerSize;
  let borderSize;

  switch (size) {
    case 'sm':
      spinnerSize = 'h-5 w-5';
      borderSize = 'border-2';
      break;
    case 'md':
      spinnerSize = 'h-8 w-8';
      borderSize = 'border-4';
      break;
    case 'lg':
      spinnerSize = 'h-12 w-12';
      borderSize = 'border-4';
      break;
    default:
      spinnerSize = 'h-8 w-8';
      borderSize = 'border-4';
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`
          ${spinnerSize} ${borderSize} border-t-transparent border-blue-500 rounded-full animate-spin
        `}
        role="status"
      >
        <span className="sr-only">Đang tải...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;