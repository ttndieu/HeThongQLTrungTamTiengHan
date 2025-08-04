// src/components/layout/AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import NotificationToast from '../common/NotificationToast';
import logo from '../../assets/logo.png'

const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <Link to="/" className="flex justify-center">
            <img
              className="mx-auto h-16 w-auto"
              src={logo}
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