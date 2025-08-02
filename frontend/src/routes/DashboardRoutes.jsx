// src/routes/DashboardRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ROLES } from '../utils/constants';

// Import các trang chung của dashboard
import UserProfilePage from '../pages/common/UserProfilePage'; // Chung cho mọi user đã login
import DashboardHomePage from '../pages/dashboard/DashboardHomePage'; // Trang dashboard chính tùy theo role
import NotFoundPage from '../pages/NotFoundPage'; // Trang 404

// Import các trang của Registered User
import RegisteredUserDashboardPage from '../pages/dashboard/registeredUser/RegisteredUserDashboardPage';
import RegisteredUserCourseEnrollmentPage from '../pages/dashboard/registeredUser/RegisteredUserCourseEnrollmentPage';
import RegisteredUserPlacementTestPage from '../pages/dashboard/registeredUser/RegisteredUserPlacementTestPage';

// Import các trang của Học viên
import StudentDashboardPage from '../pages/dashboard/student/StudentDashboardPage';
// import StudentSchedulePage from '../pages/dashboard/student/StudentSchedulePage'; // Uncomment when page is ready

// ... (các imports bị comment khác)

const DashboardRoutes = () => {
  return (
    <Routes>
      {/* Protected Route cho mọi người dùng đã đăng nhập */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.HOC_VIEN, ROLES.GIANG_VIEN, ROLES.QUAN_LY_HOC_VU, ROLES.KE_TOAN, ROLES.QUAN_TRI_HE_THONG, ROLES.REGISTERED_USER]} />}>
        {/* Main dashboard entry point, this acts as the default for "/" */}
        {/* The first route for "/" should be direct or use the Layout as an element */}
        <Route path="/" element={<DashboardLayout />}>
            {/* This index route renders DashboardHomePage when path is exactly "/" */}
            <Route index element={<DashboardHomePage />} />
            <Route path="profile" element={<UserProfilePage />} /> {/* Profile is also under DashboardLayout */}

            {/* Routes cho Registered User - NESTED */}
            {/* Note: The parent route has "/*" indicating it can have child routes. */}
            <Route path="registered" element={<ProtectedRoute allowedRoles={[ROLES.REGISTERED_USER]} />}>
                {/* Use 'index' for the default route under /registered */}
                <Route index element={<RegisteredUserDashboardPage />} />
                <Route path="enroll" element={<RegisteredUserCourseEnrollmentPage />} />
                <Route path="placement-test" element={<RegisteredUserPlacementTestPage />} />
            </Route>

            {/* Routes cho Học viên - NESTED */}
            <Route path="student" element={<ProtectedRoute allowedRoles={[ROLES.HOC_VIEN]} />}>
                {/* Use 'index' for the default route under /student */}
                <Route index element={<StudentDashboardPage />} />
                {/* <Route path="schedule" element={<StudentSchedulePage />} /> */}
            </Route>
            {/* ... other roles' routes ... */}

            {/* If you want a catch-all for paths under DashboardLayout that aren't defined */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* Fallback for any protected route not caught above that shouldn't be accessible
            or a global 404 for paths not matched by any <Route> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;