// src/pages/dashboard/DashboardHomePage.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ROLES } from '../../utils/constants'; // Import ROLES
import { Link } from 'react-router-dom';

// Import các trang Dashboard cụ thể cho từng vai trò
import StudentDashboardPage from './student/StudentDashboardPage';
import TeacherDashboardPage from './teacher/TeacherDashboardPage';
// import AcademicDashboardPage from './academic/AcademicDashboardPage';
// import AccountingDashboardPage from './accounting/AccountingDashboardPage';
import AdminDashboardPage from './admin/AdminDashboardPage';
import RegisteredUserDashboardPage from './registeredUser/RegisteredUserDashboardPage';

const DashboardHomePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold text-gray-800">Đang tải bảng điều khiển...</h1>
        <p className="text-gray-600">Nếu trang không tải, vui lòng thử đăng nhập lại.</p>
      </div>
    );
  }

  // Render Dashboard Page cụ thể dựa trên vai trò của người dùng
  switch (user.role) {
    case ROLES.HOC_VIEN:
      return <StudentDashboardPage />;
    case ROLES.GIANG_VIEN:
      return <TeacherDashboardPage />;
    case ROLES.QUAN_LY_HOC_VU:
      return <AcademicDashboardPage />;
    case ROLES.KE_TOAN:
      return <AccountingDashboardPage />;
    case ROLES.QUAN_TRI_HE_THONG:
      return <AdminDashboardPage />;
    case ROLES.REGISTERED_USER:
        return <RegisteredUserDashboardPage />;
    default:
      return (
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Chào mừng đến với bảng điều khiển!</h1>
          <p className="text-lg text-gray-700">Vai trò của bạn: <span className="font-semibold text-blue-600">{user.role}</span></p>
          <p className="text-gray-600 mt-4">Vui lòng chọn một mục từ menu bên trái để bắt đầu.</p>
        </div>
      );
  }
};

export default DashboardHomePage;