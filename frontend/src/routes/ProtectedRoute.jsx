// src/routes/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react'; // Import useState
import { Navigate, Outlet, useLocation } from 'react-router-dom'; // Import useLocation
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { ROLES } from '../utils/constants';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const { showNotification } = useNotification();
  const location = useLocation();

  const [notificationShown, setNotificationShown] = useState(false);

  // ✅ Luôn gọi useEffect trước return
  useEffect(() => {
    if (!isAuthenticated && !notificationShown) {
      showNotification('Vui lòng đăng nhập để truy cập trang này.', 'warning');
      setNotificationShown(true);
    } else if (isAuthenticated && allowedRoles.length > 0) {
      if (!user || !allowedRoles.includes(user.role)) {
        if (!notificationShown) {
          showNotification('Bạn không có quyền truy cập trang này.', 'error');
          setNotificationShown(true);
        }
      }
    }
  }, [isAuthenticated, user, allowedRoles, showNotification, notificationShown]);

  // ⚠️ return sau tất cả hook
  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Đang tải...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && (!user || !allowedRoles.includes(user.role))) {
    let redirectPath = '/';
    if (user && user.role) {
      switch (user.role) {
        case ROLES.HOC_VIEN: redirectPath = '/dashboard/student'; break;
        case ROLES.GIANG_VIEN: redirectPath = '/dashboard/teacher'; break;
        case ROLES.QUAN_LY_HOC_VU: redirectPath = '/dashboard/academic'; break;
        case ROLES.KE_TOAN: redirectPath = '/dashboard/accounting'; break;
        case ROLES.QUAN_TRI_HE_THONG: redirectPath = '/dashboard/admin'; break;
        case ROLES.REGISTERED_USER: redirectPath = '/dashboard/registered'; break;
        default: redirectPath = '/';
      }
    } else {
      redirectPath = '/auth/login';
    }
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};


export default ProtectedRoute;