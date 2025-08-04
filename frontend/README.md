src/
├── assets/                 # Các tài nguyên tĩnh (hình ảnh, fonts, styles global)
│   ├── images/             # Ảnh sản phẩm, banners, logos, background images
│   │   ├── logo.png
│   │   ├── hero-banner.jpg
│   │   └── course-placeholder.jpg
│   │   └── default-avatar.png
│   ├── fonts/              # Custom fonts (e.g., NotoSansKR-Regular.ttf)
│   ├── styles/             # Global styles và Tailwind directives
│   │   └── index.css       # File CSS chính: Chứa @tailwind directives và custom global CSS.
│   │                       #  /* @tailwind base; @tailwind components; @tailwind utilities; */
│   └── icons/              # SVG icons, icon fonts (e.g., home.svg, user.svg)
│
├── components/             # Các thành phần UI có thể tái sử dụng
│   ├── common/             # Thành phần dùng chung cho cả Public và Dashboard
│   │   ├── Button.jsx      # Nút bấm đa năng
│   │   ├── Modal.jsx       # Popup modal
│   │   ├── Table.jsx       # Bảng dữ liệu cơ bản
│   │   ├── LoadingSpinner.jsx # Hiệu ứng tải
│   │   ├── FormField.jsx   # Bao gồm Input, Select, Textarea, Checkbox, Radio
│   │   ├── Alert.jsx       # Thông báo (success, error, warning)
│   │   ├── Pagination.jsx  # Phân trang
│   │   └── Card.jsx        # Thành phần card đa năng
│   │
│   ├── layout/             # Các layout khung sườn cho trang/phần
│   │   ├── PublicLayout.jsx   # Header, Footer cho trang công khai
│   │   ├── DashboardLayout.jsx # Sidebar, Header cho Dashboard nội bộ
│   │   ├── Sidebar.jsx     # Component sidebar riêng cho Dashboard
│   │   ├── DashboardHeader.jsx # Component header riêng cho Dashboard
│   │   └── AuthLayout.jsx  # Layout cho trang đăng nhập/đăng ký
│   │
│   ├── public/             # Thành phần riêng cho phần Website công khai
│   │   ├── HeroSection.jsx
│   │   ├── CourseCard.jsx
│   │   ├── TestimonialSlider.jsx
│   │   ├── ContactForm.jsx
│   │   ├── CourseFilter.jsx
│   │   └── TeacherCard.jsx
│   │
│   └── dashboard/          # Thành phần riêng cho phần Hệ thống quản lý nội bộ
│       ├── UserProfileForm.jsx   # Form chỉnh sửa profile chung
│       ├── StudentCourseCard.jsx # Card khóa học trong dashboard học viên
│       ├── AttendanceRecordTable.jsx # Bảng điểm danh
│       ├── ExamResultChart.jsx   # Biểu đồ kết quả thi
│       ├── ClassScheduleTable.jsx # Bảng thời khóa biểu
│       ├── AdminUserTable.jsx    # Bảng quản lý user cho admin
│       ├── PlacementTestRegistrationCard.jsx # Card cho yêu cầu test trình độ
│       └── PaymentHistoryTable.jsx # Bảng lịch sử thanh toán
│
├── contexts/               # React Context API để quản lý trạng thái global
│   ├── AuthContext.jsx     # Quản lý trạng thái đăng nhập, thông tin người dùng, token
│   ├── NotificationContext.jsx # Để hiển thị thông báo toast/snackbar toàn cục
│   └── ThemeContext.jsx    # Quản lý giao diện sáng/tối
│
├── hooks/                  # Các custom hooks có thể tái sử dụng
│   ├── useAuth.js          # Hook để truy cập AuthContext và kiểm tra xác thực
│   ├── useForm.js          # Hook để quản lý trạng thái form và validation
│   ├── useDebounce.js
│   ├── usePermissions.js   # Hook để kiểm tra quyền hạn của người dùng
│   ├── useApi.js           # Hook chung để gọi các API services
│   └── useLocalStorage.js  # Hook để làm việc với localStorage
│
├── mockData/               # Chứa tất cả dữ liệu giả lập
│   └── mockdata.js         # File chứa các interfaces, dữ liệu mock và các hàm mô phỏng API
│
├── pages/                  # Các trang (views) chính của ứng dụng
│   ├── public/             # Các trang cho phần Website công khai (truy cập bởi Guest/Logged-in users)
│   │   ├── HomePage.jsx
│   │   ├── CoursesPage.jsx
│   │   ├── CourseDetailPage.jsx
│   │   ├── TeachersPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── RegisterPage.jsx    # Trang Đăng ký tài khoản (tạo role 'registeredUser')
│   │   ├── LoginPage.jsx       # Trang Đăng nhập (cho mọi user)
│   │   ├── ApplyAsTeacherPage.jsx # Trang Đăng ký làm Giảng viên (tạo role 'giangVien' pendingApproval)
│   │   ├── PrivacyPolicyPage.jsx
│   │   └── TermsOfServicePage.jsx
│   │
│   ├── dashboard/          # Các trang cho phần Hệ thống quản lý nội bộ (yêu cầu đăng nhập & phân quyền)
│   │   ├── registeredUser/ # Trang cho người dùng đã đăng ký nhưng chưa là học viên/giảng viên chính thức
│   │   │   ├── RegisteredUserDashboardPage.jsx       # Trang chào mừng, giới thiệu các tùy chọn đăng ký
│   │   │   ├── RegisteredUserCourseEnrollmentPage.jsx # Form đăng ký & thanh toán khóa học
│   │   │   └── RegisteredUserPlacementTestPage.jsx    # Form đăng ký kiểm tra trình độ
│   │   │
│   │   ├── student/        # Các trang của Học viên (role 'hocVien')
│   │   │   ├── StudentProfilePage.jsx
│   │   │   ├── StudentSchedulePage.jsx
│   │   │   ├── StudentGradesPage.jsx
│   │   │   ├── StudentMaterialsPage.jsx
│   │   │   ├── StudentAssignmentsPage.jsx
│   │   │   ├── StudentPaymentHistoryPage.jsx
│   │   │   └── StudentFeedbackPage.jsx
│   │   │
│   │   ├── teacher/        # Các trang của Giảng viên (role 'giangVien')
│   │   │   ├── TeacherClassesPage.jsx
│   │   │   ├── TeacherSchedulePage.jsx
│   │   │   ├── TeacherAttendancePage.jsx
│   │   │   ├── TeacherGradeEntryPage.jsx
│   │   │   ├── TeacherAssignmentManagementPage.jsx
│   │   │   └── TeacherSalaryPage.jsx
│   │   │
│   │   ├── academic/       # Các trang của Quản lý học vụ (role 'quanLyHocVu')
│   │   │   ├── AcademicStudentManagementPage.jsx
│   │   │   ├── AcademicTeacherManagementPage.jsx
│   │   │   ├── AcademicCourseManagementPage.jsx
│   │   │   ├── AcademicClassManagementPage.jsx
│   │   │   ├── AcademicScheduleManagementPage.jsx
│   │   │   ├── AcademicNotificationPage.jsx
│   │   │   └── AcademicPlacementTestManagementPage.jsx # Quản lý & xử lý yêu cầu test trình độ
│   │   │
│   │   ├── accounting/     # Các trang của Kế toán (role 'keToan')
│   │   │   ├── AccountingTuitionManagementPage.jsx
│   │   │   ├── AccountingPayrollManagementPage.jsx
│   │   │   └── AccountingReportsPage.jsx
│   │   │
│   │   └── admin/          # Các trang của Quản trị hệ thống (role 'quanTriHeThong')
│   │       ├── AdminUserManagementPage.jsx
│   │       ├── AdminOverallReportsPage.jsx
│   │       ├── AdminSystemSettingsPage.jsx
│   │       ├── AdminWebsiteContentManagementPage.jsx
│   │       └── AdminFeedbackAnalysisPage.jsx
│   │
│   ├── common/             # Các trang dùng chung cho cả public và dashboard (ví dụ: Trang Profile chung)
│   │   └── UserProfilePage.jsx # Trang profile cá nhân cho mọi người dùng đã đăng nhập
│   │
│   └── NotFoundPage.jsx    # Trang 404
│
├── services/               # Các hàm tương tác với API backend (hiện tại gọi mock data từ mockdata.js)
│   ├── authService.js      # Đăng nhập, đăng ký tài khoản, đăng xuất, cập nhật profile
│   ├── publicService.js    # Lấy thông tin khóa học, giảng viên cho web công khai, gửi liên hệ
│   ├── studentService.js   # Các nghiệp vụ của học viên (đăng ký khóa học, test trình độ, xem lịch, điểm)
│   ├── teacherService.js   # Các nghiệp vụ của giảng viên (quản lý lớp, điểm danh, nhập điểm)
│   ├── academicService.js  # Các nghiệp vụ của quản lý học vụ (duyệt GV, quản lý KH/Lớp, xử lý test trình độ)
│   ├── accountingService.js # Các nghiệp vụ của kế toán (quản lý học phí, lương)
│   └── adminService.js     # Các nghiệp vụ của quản trị hệ thống (quản lý user, báo cáo tổng thể, nội dung web)
│
├── types/                  # Định nghĩa các kiểu dữ liệu dùng chung (interfaces/types)
│   └── index.js            # Chứa tất cả các interfaces đã định nghĩa trong mockdata.js (User, Course, Class, etc.)
│
├── utils/                  # Các hàm tiện ích chung
│   ├── constants.js        # Các hằng số: ROLES (['hocVien', 'giangVien', ...]), API_ENDPOINTS (tương lai), MESSAGES
│   ├── helpers.js          # Các hàm xử lý chung: format date, currency, string manipulation, generate unique IDs
│   ├── validation.js       # Các hàm kiểm tra dữ liệu đầu vào (email, password, phone, v.v.)
│   └── permissions.js      # Logic kiểm tra quyền hạn người dùng dựa trên vai trò (ví dụ: `canViewPage(userRole, pageRoute)`)
│
├── routes/                 # Định nghĩa các tuyến đường (routes) của ứng dụng
│   ├── PublicRoutes.jsx    # Các route không yêu cầu xác thực (/, /courses, /login, /register)
│   ├── AuthRoutes.jsx      # Các route liên quan đến xác thực (login, register, apply-as-teacher)
│   ├── DashboardRoutes.jsx # Các route yêu cầu xác thực và phân quyền cho dashboard
│   └── ProtectedRoute.jsx  # Component/HOC để bảo vệ các route yêu cầu đăng nhập và/hoặc quyền cụ thể
│
├── App.jsx                 # Component gốc của ứng dụng, chứa Router và các Context Providers
├── index.jsx               # Điểm vào ứng dụng (render App.jsx)
├── reportWebVitals.js      # (Optional) Theo dõi hiệu suất ứng dụng
├── setupTests.js           # (Optional) File setup cho unit tests
├── tailwind.config.js      # File cấu hình Tailwind CSS
└── postcss.config.js       # File cấu hình PostCSS (cần cho Tailwind)
Giải thích Luồng Đăng ký & Vai trò
1. Khách truy cập (Guest)
Trạng thái: Chưa đăng nhập.

Truy cập: Các trang public/ (Home, Courses, Teachers, Contact, Login, Register, ApplyAsTeacher).

Hành động: Gửi tin nhắn liên hệ, xem thông tin khóa học, đăng ký tài khoản mới.

2. Người dùng đã Đăng ký (registeredUser)
Trạng thái: Đã có tài khoản, đã đăng nhập, nhưng chưa phải là học viên chính thức (chưa đăng ký khóa học nào, hoặc đang chờ xếp lớp).

Truy cập: /dashboard/registered/*, /dashboard/profile, và các trang public/.

Hành động chính:

Đăng ký khóa học trực tiếp: Chọn khóa học, điền form, mô phỏng thanh toán. Nếu thành công, vai trò của họ chuyển thành hocVien. (Sử dụng mockEnrollCourseDirectly).

Đăng ký kiểm tra trình độ: Điền form đăng ký kiểm tra. Tài khoản của họ sẽ được đánh dấu status: 'pendingAssessment'. (Sử dụng mockRegisterForPlacementTest).

3. Học viên (hocVien)
Trạng thái: Đã đăng ký và thanh toán ít nhất một khóa học, hoặc đã được admin xếp lớp sau kiểm tra trình độ.

Truy cập: /dashboard/student/*, /dashboard/profile, và các trang public/.

Hành động chính: Xem lịch học, điểm danh, kết quả thi, tài liệu học tập, lịch sử thanh toán, gửi phản hồi. Có thể đăng ký thêm các khóa học khác.

4. Giảng viên (giangVien)
Trạng thái: Đã được admin duyệt (status: 'approved').

Truy cập: /dashboard/teacher/*, /dashboard/profile.

Hành động chính: Quản lý lớp học, điểm danh, nhập điểm, quản lý bài tập, xem lịch dạy, xem bảng lương.

5. Quản lý Học vụ (quanLyHocVu)
Trạng thái: Đã được cấp quyền.

Truy cập: /dashboard/academic/*, /dashboard/profile.

Hành động chính: Quản lý học viên, giảng viên, khóa học, lớp học, thời khóa biểu, duyệt yêu cầu giảng viên mới, xử lý và xếp lớp sau kiểm tra trình độ.

6. Kế toán (keToan)
Trạng thái: Đã được cấp quyền.

Truy cập: /dashboard/accounting/*, /dashboard/profile.

Hành động chính: Quản lý học phí, quản lý lương giảng viên, tạo báo cáo tài chính.

7. Quản trị Hệ thống (quanTriHeThong)
Trạng thái: Quyền hạn cao nhất.

Truy cập: /dashboard/admin/*, /dashboard/profile.

Hành động chính: Quản lý toàn bộ người dùng, xem báo cáo tổng thể, cấu hình hệ thống, quản lý nội dung website.




npm install react-router-dom 
npm install @headlessui/react
npm install react-toastify
npm install react-icons
npm install react-chartjs-2 chart.js

3. Xây dựng các thành phần cốt lõi
3.1. Tạo Context API (src/contexts/)
src/contexts/AuthContext.jsx
src/contexts/NotificationContext.jsx
src/contexts/ThemeContext.jsx

3.2. Viết các Custom Hooks (src/hooks/)
src/hooks/useForm.js
src/hooks/useDebounce.js
src/hooks/usePermissions.js
src/hooks/useApi.js
src/hooks/useLocalStorage.js

3.3. Định nghĩa kiểu dữ liệu (src/types/)
src/types/index.js

3.4. Tạo các tiện ích chung (src/utils/)
src/utils/constants.js
src/utils/helpers.js
src/utils/validation.js
src/utils/permissions.js

3.5. Xây dựng các Component dùng chung (src/components/common/)

src/components/common/Button.jsx
src/components/common/Modal.jsx
src/components/common/Table.jsx
src/components/common/LoadingSpinner.jsx
src/components/common/FormField.jsx
src/components/common/Alert.jsx
src/components/common/Pagination.jsx
src/components/common/Card.jsx

3.6. Thiết kế Layout (src/components/layout/)
src/components/layout/PublicLayout.jsx
src/components/layout/DashboardLayout.jsx
src/components/layout/Sidebar.jsx
src/components/layout/DashboardHeader.jsx
src/components/layout/AuthLayout.jsx


4. Phát triển Logic API (tạm thời với Mock Data).
src/mockData/mockdata.js
4.2. Xây dựng các Service Layer (src/services/)
src/services/authService.js
src/services/publicService.js
src/services/studentService.js
src/services/teacherService.js
src/services/academicService.js
src/services/accountingService.js
src/services/adminService.js

5. Định nghĩa và triển khai Routes
Cài đặt React Router DOM
npm install react-router-dom
src/routes/ProtectedRoute.jsx
src/routes/PublicRoutes.jsx
src/routes/AuthRoutes.jsx
src/routes/DashboardRoutes.jsx

6. Xây dựng các Trang (Pages) và Component

6.2. Triển khai các Component (từ src/components/)
6.2.1. Component UI cơ bản (src/components/common/)
src/components/common/Button.jsx
src/components/common/Input.jsx
src/components/common/Select.jsx
src/components/common/TextArea.jsx
src/components/common/LoadingSpinner.jsx
src/components/common/NotificationToast.jsx

npm install @heroicons/react

src/components/common/Modal.jsx

Quan trọng: Thêm <div id="modal-root"></div> vào file public/index.html của bạn, ngay trước thẻ </body>.

6.2.2. Component Layout (src/components/layout/)
src/components/layout/Navbar.jsx (Dành cho Public và một phần Dashboard)
src/components/layout/Footer.jsx

Lưu ý:** Để hiển thị các icon mạng xã hội, bạn có thể sử dụng Font Awesome:
    * Thêm vào `public/index.html`: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />`
    * Hoặc cài đặt qua npm: `npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons`

6.2.3. Các component riêng lẻ khác

src/components/public/CourseCard.jsx

6.3. Triển khai các Trang (Pages)
6.3.1. Các trang công khai (src/pages/public/)
src/pages/public/HomePage.jsx
src/pages/public/CoursesPage.jsx
src/pages/public/CourseDetailPage.jsx
src/pages/public/TeachersPage.jsx
src/pages/public/ContactPage.jsx
src/pages/public/AboutUsPage.jsx 
src/pages/public/PrivacyPolicyPage.jsx 
src/pages/public/TermsOfServicePage.jsx

6.3.2. Các trang xác thực (src/pages/auth/)
src/pages/auth/LoginPage.jsx
src/pages/auth/RegisterPage.jsx
src/pages/auth/ApplyAsTeacherPage.jsx

6.3.3. Các trang chung Dashboard (src/pages/common/ và src/pages/dashboard/)
src/pages/common/UserProfilePage.jsx
src/pages/dashboard/DashboardHomePage.jsx
src/pages/NotFoundPage.jsx

6.3.4. Trang Dashboard theo vai trò
tạo các trang cụ thể cho từng vai trò đã được định nghĩa trong src/routes/DashboardRoutes.jsx.
src/pages/dashboard/registeredUser/RegisteredUserDashboardPage.jsx
src/pages/dashboard/registeredUser/RegisteredUserCourseEnrollmentPage.jsx
src/pages/dashboard/registeredUser/RegisteredUserPlacementTestPage.jsx

src/pages/dashboard/student/StudentDashboardPage.jsx









DashboardRoutes:
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
// import StudentSchedulePage from '../pages/dashboard/student/StudentSchedulePage';
// import StudentGradesPage from '../pages/dashboard/student/StudentGradesPage';
// import StudentMaterialsPage from '../pages/dashboard/student/StudentMaterialsPage';
// import StudentPaymentsPage from '../pages/dashboard/student/StudentPaymentsPage';
// import StudentFeedbackPage from '../pages/dashboard/student/StudentFeedbackPage';

// Import các trang của Giảng viên
import TeacherDashboardPage from '../pages/dashboard/teacher/TeacherDashboardPage';
import TeacherClassesPage from '../pages/dashboard/teacher/TeacherClassesPage';
import TeacherSchedulePage from '../pages/dashboard/teacher/TeacherSchedulePage';
import TeacherAttendancePage from '../pages/dashboard/teacher/TeacherAttendancePage';
import TeacherGradeEntryPage from '../pages/dashboard/teacher/TeacherGradeEntryPage';
import TeacherAssignmentsPage from '../pages/dashboard/teacher/TeacherAssignmentsPage';
import TeacherSalaryPage from '../pages/dashboard/teacher/TeacherSalaryPage';

// Import các trang của Quản lý Học vụ
import AcademicDashboardPage from '../pages/dashboard/academic/AcademicDashboardPage';
import AcademicStudentManagementPage from '../pages/dashboard/academic/AcademicStudentManagementPage';
import AcademicTeacherManagementPage from '../pages/dashboard/academic/AcademicTeacherManagementPage';
import AcademicCourseManagementPage from '../pages/dashboard/academic/AcademicCourseManagementPage';
import AcademicClassManagementPage from '../pages/dashboard/academic/AcademicClassManagementPage';
import AcademicScheduleManagementPage from '../pages/dashboard/academic/AcademicScheduleManagementPage';
import AcademicNotificationsPage from '../pages/dashboard/academic/AcademicNotificationsPage';
import AcademicPlacementTestManagementPage from '../pages/dashboard/academic/AcademicPlacementTestManagementPage';

// Import các trang của Kế toán
import AccountingDashboardPage from '../pages/dashboard/accounting/AccountingDashboardPage';
import AccountingTuitionManagementPage from '../pages/dashboard/accounting/AccountingTuitionManagementPage';
import AccountingPayrollManagementPage from '../pages/dashboard/accounting/AccountingPayrollManagementPage';
import AccountingReportsPage from '../pages/dashboard/accounting/AccountingReportsPage';

// Import các trang của Admin
import AdminDashboardPage from '../pages/dashboard/admin/AdminDashboardPage';
import AdminUserManagementPage from '../pages/dashboard/admin/AdminUserManagementPage';
import AdminReportsPage from '../pages/dashboard/admin/AdminReportsPage';
import AdminSettingsPage from '../pages/dashboard/admin/AdminSettingsPage';
import AdminWebsiteContentPage from '../pages/dashboard/admin/AdminWebsiteContentPage';
import AdminFeedbackAnalysisPage from '../pages/dashboard/admin/AdminFeedbackAnalysisPage';


const DashboardRoutes = () => {
  return (
    <Routes>
      {/* Protected Route cho mọi người dùng đã đăng nhập */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.HOC_VIEN, ROLES.GIANG_VIEN, ROLES.QUAN_LY_HOC_VU, ROLES.KE_TOAN, ROLES.QUAN_TRI_HE_THONG, ROLES.REGISTERED_USER]} />}>
        <Route path="/" element={<DashboardLayout><DashboardHomePage /></DashboardLayout>} />
        <Route path="profile" element={<DashboardLayout><UserProfilePage /></DashboardLayout>} />

        {/* Routes cho Registered User */}
        <Route path="registered/*" element={<ProtectedRoute allowedRoles={[ROLES.REGISTERED_USER]} />}>
          <Route path="/" element={<DashboardLayout><RegisteredUserDashboardPage /></DashboardLayout>} />
          <Route path="enroll" element={<DashboardLayout><RegisteredUserCourseEnrollmentPage /></DashboardLayout>} />
          <Route path="placement-test" element={<DashboardLayout><RegisteredUserPlacementTestPage /></DashboardLayout>} />
        </Route>

        {/* Routes cho Học viên */}
        <Route path="student/*" element={<ProtectedRoute allowedRoles={[ROLES.HOC_VIEN]} />}>
          <Route path="/" element={<DashboardLayout><StudentDashboardPage /></DashboardLayout>} />
          <Route path="schedule" element={<DashboardLayout><StudentSchedulePage /></DashboardLayout>} />
          <Route path="grades" element={<DashboardLayout><StudentGradesPage /></DashboardLayout>} />
          <Route path="materials" element={<DashboardLayout><StudentMaterialsPage /></DashboardLayout>} />
          <Route path="payments" element={<DashboardLayout><StudentPaymentsPage /></DashboardLayout>} />
          <Route path="feedback" element={<DashboardLayout><StudentFeedbackPage /></DashboardLayout>} />
        </Route>

        {/* Routes cho Giảng viên */}
        <Route path="teacher/*" element={<ProtectedRoute allowedRoles={[ROLES.GIANG_VIEN]} />}>
          <Route path="/" element={<DashboardLayout><TeacherDashboardPage /></DashboardLayout>} />
          <Route path="classes" element={<DashboardLayout><TeacherClassesPage /></DashboardLayout>} />
          <Route path="schedule" element={<DashboardLayout><TeacherSchedulePage /></DashboardLayout>} />
          <Route path="attendance" element={<DashboardLayout><TeacherAttendancePage /></DashboardLayout>} />
          <Route path="grade-entry" element={<DashboardLayout><TeacherGradeEntryPage /></DashboardLayout>} />
          <Route path="assignments" element={<DashboardLayout><TeacherAssignmentsPage /></DashboardLayout>} />
          <Route path="salary" element={<DashboardLayout><TeacherSalaryPage /></DashboardLayout>} />
        </Route>

        {/* Routes cho Quản lý Học vụ */}
        <Route path="academic/*" element={<ProtectedRoute allowedRoles={[ROLES.QUAN_LY_HOC_VU]} />}>
          <Route path="/" element={<DashboardLayout><AcademicDashboardPage /></DashboardLayout>} />
          <Route path="students" element={<DashboardLayout><AcademicStudentManagementPage /></DashboardLayout>} />
          <Route path="teachers" element={<DashboardLayout><AcademicTeacherManagementPage /></DashboardLayout>} />
          <Route path="courses" element={<DashboardLayout><AcademicCourseManagementPage /></DashboardLayout>} />
          <Route path="classes" element={<DashboardLayout><AcademicClassManagementPage /></DashboardLayout>} />
          <Route path="schedule" element={<DashboardLayout><AcademicScheduleManagementPage /></DashboardLayout>} />
          <Route path="notifications" element={<DashboardLayout><AcademicNotificationsPage /></DashboardLayout>} />
          <Route path="placement-tests" element={<DashboardLayout><AcademicPlacementTestManagementPage /></DashboardLayout>} />
        </Route>

        {/* Routes cho Kế toán */}
        <Route path="accounting/*" element={<ProtectedRoute allowedRoles={[ROLES.KE_TOAN]} />}>
          <Route path="/" element={<DashboardLayout><AccountingDashboardPage /></DashboardLayout>} />
          <Route path="tuition" element={<DashboardLayout><AccountingTuitionManagementPage /></DashboardLayout>} />
          <Route path="payroll" element={<DashboardLayout><AccountingPayrollManagementPage /></DashboardLayout>} />
          <Route path="reports" element={<DashboardLayout><AccountingReportsPage /></DashboardLayout>} />
        </Route>

        {/* Routes cho Admin */}
        <Route path="admin/*" element={<ProtectedRoute allowedRoles={[ROLES.QUAN_TRI_HE_THONG]} />}>
          <Route path="/" element={<DashboardLayout><AdminDashboardPage /></DashboardLayout>} />
          <Route path="users" element={<DashboardLayout><AdminUserManagementPage /></DashboardLayout>} />
          <Route path="reports" element={<DashboardLayout><AdminReportsPage /></DashboardLayout>} />
          <Route path="settings" element={<DashboardLayout><AdminSettingsPage /></DashboardLayout>} />
          <Route path="website-content" element={<DashboardLayout><AdminWebsiteContentPage /></DashboardLayout>} />
          <Route path="feedback-analysis" element={<DashboardLayout><AdminFeedbackAnalysisPage /></DashboardLayout>} />
        </Route>

        {/* Redirect các path dashboard không xác định về dashboard chính của user */}
        <Route path="*" element={<Navigate to="/" replace />} /> {/* Hoặc trang 404 riêng cho dashboard */}

      </Route>
      {/* Fallback for any protected route not caught above that shouldn't be accessible */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default DashboardRoutes;