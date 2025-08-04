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

// Import các trang của Admin
import AdminDashboardPage from '../pages/dashboard/admin/AdminDashboardPage';
import AdminUserManagementPage from '../pages/dashboard/admin/AdminUserManagementPage';
import AdminReportsPage from '../pages/dashboard/admin/AdminReportsPage';
import AdminSystemSettingsPage from '../pages/dashboard/admin/AdminSystemSettingsPage';
// import AdminWebsiteContentPage from '../pages/dashboard/admin/AdminWebsiteContentPage';
import AdminFeedbackAnalysisPage from '../pages/dashboard/admin/AdminFeedbackAnalysisPage';

const DashboardRoutes = () => {
    return (
        <Routes>
            {/* Protected Route cho mọi người dùng đã đăng nhập */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.HOC_VIEN, ROLES.GIANG_VIEN, ROLES.QUAN_LY_HOC_VU, ROLES.KE_TOAN, ROLES.QUAN_TRI_HE_THONG, ROLES.REGISTERED_USER]} />}>
                {/* Main dashboard entry point */}
                <Route path="/" element={<DashboardLayout />}>
                    {/* This index route renders DashboardHomePage when path is exactly "/" */}
                    <Route index element={<DashboardHomePage />} />
                    <Route path="profile" element={<UserProfilePage />} /> {/* Profile is also under DashboardLayout */}

                    {/* Routes cho Registered User - NESTED */}
                    <Route path="registered" element={<ProtectedRoute allowedRoles={[ROLES.REGISTERED_USER]} />}>
                        <Route index element={<RegisteredUserDashboardPage />} />
                        <Route path="enroll" element={<RegisteredUserCourseEnrollmentPage />} />
                        <Route path="placement-test" element={<RegisteredUserPlacementTestPage />} />
                    </Route>

                    {/* Routes cho Học viên - NESTED */}
                    <Route path="student" element={<ProtectedRoute allowedRoles={[ROLES.HOC_VIEN]} />}>
                        <Route index element={<StudentDashboardPage />} />
                        {/* <Route path="schedule" element={<StudentSchedulePage />} /> */}
                    </Route>

                    {/* Routes cho Admin - NESTED */}
                    <Route path="admin" element={<ProtectedRoute allowedRoles={[ROLES.QUAN_TRI_HE_THONG]} />}>
                        {/* The index route for /admin to render AdminDashboardPage */}
                        <Route index element={<AdminDashboardPage />} />
                        <Route path="users" element={<AdminUserManagementPage />} />
                        <Route path="reports" element={<AdminReportsPage />} />
                        <Route path="settings" element={<AdminSystemSettingsPage />} />
                        {/* <Route path="website-content" element={<AdminWebsiteContentPage />} /> */}
                        <Route path="feedback-analysis" element={<AdminFeedbackAnalysisPage />} />
                    </Route>

                    {/* If you want a catch-all for paths under DashboardLayout that aren't defined */}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>

                {/* Fallback for any protected route not caught above that shouldn't be accessible
                    or a global 404 for paths not matched by any <Route> */}
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default DashboardRoutes;
