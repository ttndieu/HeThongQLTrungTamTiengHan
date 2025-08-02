// src/routes/AuthRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import { useAuth } from '../contexts/AuthContext';

// Import các trang Auth
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ApplyAsTeacherPage from '../pages/auth/ApplyAsTeacherPage';
// import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
// import ResetPasswordPage from '../pages/auth/ResetPasswordPage';

const AuthRoutes = () => {
  const { isAuthenticated } = useAuth();

  // Nếu đã đăng nhập, chuyển hướng khỏi trang đăng nhập/đăng ký
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route path="login" element={<AuthLayout title="Đăng nhập"><LoginPage /></AuthLayout>} />
      <Route path="register" element={<AuthLayout title="Đăng ký tài khoản"><RegisterPage /></AuthLayout>} />
      <Route path="apply-as-teacher" element={<AuthLayout title="Đăng ký làm giảng viên"><ApplyAsTeacherPage /></AuthLayout>} />
      {/* <Route path="forgot-password" element={<AuthLayout title="Quên mật khẩu"><ForgotPasswordPage /></AuthLayout>} />
      <Route path="reset-password" element={<AuthLayout title="Đặt lại mật khẩu"><ResetPasswordPage /></AuthLayout>} /> */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} /> {/* Redirect mọi path không khớp trong /auth về login */}
    </Routes>
  );
};

export default AuthRoutes;