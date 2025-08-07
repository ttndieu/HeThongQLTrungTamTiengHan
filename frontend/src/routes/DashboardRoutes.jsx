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
import StudentSchedulePage from '../pages/dashboard/student/StudentSchedulePage';
import StudentGradesPage from '../pages/dashboard/student/StudentGradesPage';
import StudentMaterialsPage from '../pages/dashboard/student/StudentMaterialsPage';
import StudentAssignmentsPage from '../pages/dashboard/student/StudentAssignmentsPage';
import StudentPaymentsPage from '../pages/dashboard/student/StudentPaymentsPage';
import StudentFeedbackPage from '../pages/dashboard/student/StudentFeedbackPage';
// Import các trang của Giảng viên
import TeacherDashboardPage from '../pages/dashboard/teacher/TeacherDashboardPage';
import TeacherClassesPage from '../pages/dashboard/teacher/TeacherClassesPage';
import TeacherClassStudentsPage from '../pages/dashboard/teacher/TeacherClassStudentsPage';
import TeacherSchedulePage from '../pages/dashboard/teacher/TeacherSchedulePage';
import TeacherAttendancePage from '../pages/dashboard/teacher/TeacherAttendancePage';
import TeacherGradeEntryPage from '../pages/dashboard/teacher/TeacherGradeEntryPage';
import TeacherAssignmentManagementPage from '../pages/dashboard/teacher/TeacherAssignmentManagementPage';
import TeacherSalaryPage from '../pages/dashboard/teacher/TeacherSalaryPage';
import TeacherNotificationsPage from '../pages/dashboard/teacher/TeacherNotificationsPage';
// Import các trang của Admin
import AdminDashboardPage from '../pages/dashboard/admin/AdminDashboardPage';
import AdminUserManagementPage from '../pages/dashboard/admin/AdminUserManagementPage';
import AdminReportsPage from '../pages/dashboard/admin/AdminReportsPage';
import AdminSystemSettingsPage from '../pages/dashboard/admin/AdminSystemSettingsPage';
import AdminWebsiteContentPage from '../pages/dashboard//admin/AdminWebsiteContentManagementPage';
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

          {/* Routes cho Registered User */}
          <Route path="registered" element={<ProtectedRoute allowedRoles={[ROLES.REGISTERED_USER]} />}>
            <Route index element={<RegisteredUserDashboardPage />} />
            <Route path="enroll" element={<RegisteredUserCourseEnrollmentPage />} />
            <Route path="placement-test" element={<RegisteredUserPlacementTestPage />} />
          </Route>

          {/* Routes cho Học viên */}
          <Route path="student" element={<ProtectedRoute allowedRoles={[ROLES.HOC_VIEN]} />}>
              <Route index element={<StudentDashboardPage />} />
              <Route path="schedule" element={<StudentSchedulePage />} /> 
              <Route path="grades" element={<StudentGradesPage />} /> 
              <Route path="materials" element={<StudentMaterialsPage />} /> 
              <Route path="assignments" element={<StudentAssignmentsPage />} /> 
              <Route path="payments" element={<StudentPaymentsPage />} /> 
              <Route path="feedback" element={<StudentFeedbackPage />} /> 
          </Route>

           {/* Routes cho Giảng viên */}
          <Route path="teacher" element={<ProtectedRoute allowedRoles={[ROLES.GIANG_VIEN]} />}>
             <Route index element={<TeacherDashboardPage />} />
             <Route path="classes" element={<TeacherClassesPage />} />  {/* Tính năng 12 */}
            <Route path="classes/:classId/students" element={<TeacherClassStudentsPage />} />
             <Route path="schedule" element={<TeacherSchedulePage />} />  {/* Tính năng 15 */}
            <Route path="attendance" element={<TeacherAttendancePage />} />  {/* Tính năng 30 */}
             <Route path="grades" element={<TeacherGradeEntryPage />} /> {/* Tính năng 27 */}
            <Route path="assignments" element={<TeacherAssignmentManagementPage />} /> {/* Tính năng 32, 33 */}
            <Route path="salary" element={<TeacherSalaryPage />} /> {/* Tính năng 40 */}
            <Route path="notifications" element={<TeacherNotificationsPage />} /> {/* Tính năng 17, 18 */}
          </Route>
          {/* Routes cho Admin */}
        <Route path="admin/*" element={<ProtectedRoute allowedRoles={[ROLES.QUAN_TRI_HE_THONG]} />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUserManagementPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="settings" element={<AdminSystemSettingsPage />} />
          <Route path="website-content" element={<AdminWebsiteContentPage />} />
          <Route path="feedback-analysis" element={<AdminFeedbackAnalysisPage />} />
        </Route>

          {/* Catch-all for paths under DashboardLayout */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* Global 404 for unmatched protected routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
