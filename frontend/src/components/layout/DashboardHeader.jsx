// src/components/layout/DashboardHeader.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getGreetingMessage } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.jpg'; // Import ảnh avatar mặc định

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center z-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          {getGreetingMessage()}, {user?.fullName || user?.username}! 👋
        </h1>
        <p className="text-gray-500 text-sm">Chào mừng bạn đến với hệ thống quản lý.</p>
      </div>
      <div className="flex items-center space-x-4">
        {/* Có thể thêm các biểu tượng thông báo, cài đặt ở đây */}
        <Link to="/dashboard/profile" className="flex items-center space-x-2">
          <img
            src={user?.avatarUrl || avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
          />
          <span className="font-medium text-gray-700 hidden md:block">
            {user?.fullName || user?.username}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;