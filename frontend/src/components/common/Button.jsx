// src/components/common/Button.jsx
import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
  let baseStyles = 'px-4 py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
    case 'outline':
      variantStyles = 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500';
      break;
    case 'ghost':
      variantStyles = 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-200';
      break;
    case 'link':
      variantStyles = 'bg-transparent text-blue-600 hover:underline px-0 py-0 focus:ring-transparent';
      break;
    default:
      variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;