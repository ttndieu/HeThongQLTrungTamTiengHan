// src/pages/dashboard/student/StudentDashboardPage.jsx
import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, CalendarDaysIcon, ChartBarIcon, ClipboardDocumentListIcon, WalletIcon } from '@heroicons/react/24/outline';

const StudentDashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Chào mừng Học viên, {user?.fullName || user?.username}!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Đây là bảng điều khiển của bạn. Bạn có thể nhanh chóng truy cập các thông tin và công cụ quan trọng.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/dashboard/student/schedule" className="block bg-blue-50 hover:bg-blue-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          <CalendarDaysIcon className="h-10 w-10 text-blue-600 mb-3" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Lịch học của tôi</h2>
          <p className="text-gray-600">Xem thời gian biểu các lớp học của bạn.</p>
        </Link>
        <Link to="/dashboard/student/grades" className="block bg-green-50 hover:bg-green-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          <ChartBarIcon className="h-10 w-10 text-green-600 mb-3" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Điểm số</h2>
          <p className="text-gray-600">Kiểm tra kết quả bài kiểm tra và bài tập của bạn.</p>
        </Link>
        <Link to="/dashboard/student/assignments" className="block bg-purple-50 hover:bg-purple-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          <ClipboardDocumentListIcon className="h-10 w-10 text-purple-600 mb-3" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Bài tập</h2>
          <p className="text-gray-600">Quản lý và nộp các bài tập được giao.</p>
        </Link>
        <Link to="/dashboard/student/materials" className="block bg-red-50 hover:bg-red-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          <AcademicCapIcon className="h-10 w-10 text-red-600 mb-3" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Tài liệu học tập</h2>
          <p className="text-gray-600">Truy cập tài liệu, slide bài giảng cho các khóa học của bạn.</p>
        </Link>
        <Link to="/dashboard/student/payments" className="block bg-yellow-50 hover:bg-yellow-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          <WalletIcon className="h-10 w-10 text-yellow-600 mb-3" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Thanh toán</h2>
          <p className="text-gray-600">Xem lịch sử thanh toán và quản lý học phí.</p>
        </Link>
        {/* Thêm các thẻ khác cho feedback, thông báo, v.v. */}
      </div>

      <div className="mt-10 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Thông báo quan trọng</h3>
        <p className="text-gray-600 text-sm">
          Kiểm tra thông báo thường xuyên để không bỏ lỡ thông tin quan trọng từ trung tâm và giáo viên của bạn.
        </p>
        {/* Có thể thêm danh sách các thông báo gần đây tại đây */}
      </div>
    </div>
  );
};

export default StudentDashboardPage;