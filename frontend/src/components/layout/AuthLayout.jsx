// src/components/layout/AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import NotificationToast from '../common/NotificationToast';

const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <Link to="/" className="flex justify-center">
            <img
              className="mx-auto h-12 w-auto"
              src="/logo.png" // Thay thế bằng đường dẫn logo của bạn
              alt="Workflow"
            />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        </div>
        {children}
      </div>
      <NotificationToast />
    </div>
  );
};

export default AuthLayout;