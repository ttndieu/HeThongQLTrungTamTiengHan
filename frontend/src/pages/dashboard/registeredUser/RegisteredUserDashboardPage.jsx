// src/pages/dashboard/registeredUser/RegisteredUserDashboardPage.jsx
import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpenIcon, PencilSquareIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const RegisteredUserDashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Chào mừng, {user?.fullName || user?.username}!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Bạn đang là một người dùng đã đăng ký của EduCenter. Hãy khám phá các tính năng dành cho bạn.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/dashboard/registered/enroll" className="block bg-blue-50 hover:bg-blue-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          <BookOpenIcon className="h-10 w-10 text-blue-600 mb-3" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Đăng ký khóa học</h2>
          <p className="text-gray-600">Tìm kiếm và đăng ký các khóa học tiếng Hàn phù hợp với bạn.</p>
        </Link>
        <Link to="/dashboard/registered/placement-test" className="block bg-green-50 hover:bg-green-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          <PencilSquareIcon className="h-10 w-10 text-green-600 mb-3" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Kiểm tra trình độ</h2>
          <p className="text-gray-600">Đăng ký kiểm tra trình độ để được xếp lớp phù hợp.</p>
        </Link>
        <Link to="/dashboard/profile" className="block bg-purple-50 hover:bg-purple-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          <UserCircleIcon className="h-10 w-10 text-purple-600 mb-3" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Cập nhật hồ sơ</h2>
          <p className="text-gray-600">Xem và chỉnh sửa thông tin cá nhân của bạn.</p>
        </Link>
        {/* Thêm các tính năng khác */}
      </div>

      <div className="mt-10 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Lưu ý:</h3>
        <p className="text-gray-600 text-sm">
          Sau khi đăng ký khóa học, vai trò của bạn có thể được cập nhật thành **"Học viên"** và bạn sẽ có quyền truy cập vào các tính năng đầy đủ của học viên.
        </p>
      </div>
    </div>
  );
};

export default RegisteredUserDashboardPage;