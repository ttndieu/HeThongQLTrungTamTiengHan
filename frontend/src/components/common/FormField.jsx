// src/components/common/FormField.jsx
import React from 'react';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  options = [], // Dùng cho select
  rows = 3, // Dùng cho textarea
  checked, // Dùng cho checkbox/radio
  className = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  ...props
}) => {
  const baseInputClasses = 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm';
  const errorInputClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseInputClasses} ${errorInputClasses} ${inputClassName}`}
            {...props}
          />
        );
      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`${baseInputClasses} ${errorInputClasses} ${inputClassName}`}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
      case 'radio':
        return (
          <input
            id={name}
            name={name}
            type={type}
            checked={checked}
            onChange={onChange}
            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${inputClassName}`}
            {...props}
          />
        );
      default:
        return (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseInputClasses} ${errorInputClasses} ${inputClassName}`}
            {...props}
          />
        );
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      {type !== 'checkbox' && type !== 'radio' && label && (
        <label htmlFor={name} className={`block text-sm font-medium text-gray-700 ${labelClassName}`}>
          {label}
        </label>
      )}
      {type === 'checkbox' || type === 'radio' ? (
        <div className="flex items-center">
          {renderInput()}
          {label && (
            <label htmlFor={name} className={`ml-2 text-sm text-gray-700 ${labelClassName}`}>
              {label}
            </label>
          )}
        </div>
      ) : (
        renderInput()
      )}
      {error && (
        <p className={`mt-2 text-sm text-red-600 ${errorClassName}`}>{error}</p>
      )}
    </div>
  );
};

export default FormField;