import { generateUniqueId } from '../utils/helpers';
import { ROLES } from '../utils/constants';

// Thêm nhiều người dùng với các vai trò khác nhau
let users = [
    { id: 'user-1', username: 'student1', email: 'student1@example.com', fullName: 'Nguyễn Văn A', role: ROLES.HOC_VIEN, token: 'fake-student-token-123', phone: '0901111111', address: '123 Đường Học Viên', password: '123' },
    { id: 'user-2', username: 'teacher1', email: 'teacher1@example.com', fullName: 'Lê Thị B', role: ROLES.GIANG_VIEN, token: 'fake-teacher-token-456', phone: '0902222222', address: '456 Đường Giảng Viên', status: 'approved', password: '123' },
    { id: 'user-3', username: 'academic_manager', email: 'academic@example.com', fullName: 'Phạm Văn C', role: ROLES.QUAN_LY_HOC_VU, token: 'fake-academic-token-789', phone: '0903333333', address: '789 Đường Quản Lý', password: '123' },
    { id: 'user-4', username: 'accountant', email: 'accountant@example.com', fullName: 'Trần Thị D', role: ROLES.KE_TOAN, token: 'fake-accountant-token-101', phone: '0904444444', address: '101 Đường Kế Toán', password: '123' },
    { id: 'user-5', username: 'admin', email: 'admin@example.com', fullName: 'Hoàng Văn E', role: ROLES.QUAN_TRI_HE_THONG, token: 'fake-admin-token-112', phone: '0905555555', address: '112 Đường Quản Trị', password: '123' },
    { id: 'user-6', username: 'newuser', email: 'newuser@example.com', fullName: 'Đặng Đình F', role: ROLES.REGISTERED_USER, token: 'fake-registered-token-131', phone: '0906666666', address: '131 Đường Đăng Ký Mới', password: '123' },
    { id: 'user-7', username: 'student2', email: 'student2@example.com', fullName: 'Phan Thị G', role: ROLES.HOC_VIEN, token: 'fake-student-token-124', phone: '0907777777', address: '202 Đường Học Viên', password: '123' },
    { id: 'user-8', username: 'student3', email: 'student3@example.com', fullName: 'Lý Văn H', role: ROLES.HOC_VIEN, token: 'fake-student-token-125', phone: '0908888888', address: '303 Đường Học Viên', password: '123' },
    { id: 'user-9', username: 'teacher2', email: 'teacher2@example.com', fullName: 'Đỗ Thúy K', role: ROLES.GIANG_VIEN, token: 'fake-teacher-token-457', phone: '0909999999', address: '505 Đường Giảng Viên', status: 'approved', password: '123' },
    { id: 'user-10', username: 'student4', email: 'student4@example.com', fullName: 'Võ Thanh I', role: ROLES.HOC_VIEN, token: 'fake-student-token-126', phone: '0910101010', address: '404 Đường Học Viên', password: '123' },
    { id: 'user-11', username: 'student5', email: 'student5@example.com', fullName: 'Trần Văn J', role: ROLES.HOC_VIEN, token: 'fake-student-token-127', phone: '0911111111', address: '505 Đường Học Viên', password: '123' },
    { id: 'user-12', username: 'student6', email: 'student6@example.com', fullName: 'Ngô Thị L', role: ROLES.HOC_VIEN, token: 'fake-student-token-128', phone: '0912222222', address: '606 Đường Học Viên', password: '123' },
    { id: 'user-13', username: 'student7', email: 'student7@example.com', fullName: 'Vũ Mạnh M', role: ROLES.HOC_VIEN, token: 'fake-student-token-129', phone: '0913333333', address: '707 Đường Học Viên', password: '123' },
    { id: 'user-14', username: 'student8', email: 'student8@example.com', fullName: 'Ngô Thị N', role: ROLES.HOC_VIEN, token: 'fake-student-token-130', phone: '0914444444', address: '808 Đường Học Viên', password: '123' },
    { id: 'user-15', username: 'student9', email: 'student9@example.com', fullName: 'Trần Minh O', role: ROLES.HOC_VIEN, token: 'fake-student-token-131', phone: '0915555555', address: '909 Đường Học Viên', password: '123' },
    { id: 'user-16', username: 'teacher3', email: 'teacher3@example.com', fullName: 'Bùi Thị P', role: ROLES.GIANG_VIEN, token: 'fake-teacher-token-458', phone: '0916666666', address: '606 Đường Giảng Viên', status: 'approved', password: '123' },
    { id: 'user-17', username: 'teacher4', email: 'teacher4@example.com', fullName: 'Vũ Văn Q', role: ROLES.GIANG_VIEN, token: 'fake-teacher-token-459', phone: '0917777777', address: '707 Đường Giảng Viên', status: 'approved', password: '123' },
    { id: 'user-18', username: 'student10', email: 'student10@example.com', fullName: 'Hoàng Minh R', role: ROLES.HOC_VIEN, token: 'fake-student-token-132', phone: '0918888888', address: '1010 Đường Học Viên', password: '123' },
];

// Thêm nhiều khóa học đa dạng hơn
let courses = [
    { id: 'course-1', name: 'Tiếng Hàn Sơ Cấp 1', description: 'Khóa học dành cho người mới bắt đầu, tập trung vào bảng chữ cái và giao tiếp cơ bản.', price: 2500000, level: 'Sơ cấp', durationWeeks: 10, imageUrl: '/assets/images/course-placeholder.jpg', requirements: 'Không yêu cầu kiến thức trước' },
    { id: 'course-2', name: 'Tiếng Hàn Sơ Cấp 2', description: 'Tiếp nối Sơ cấp 1, mở rộng từ vựng và ngữ pháp cơ bản.', price: 2700000, level: 'Sơ cấp', durationWeeks: 10, imageUrl: '/assets/images/course-placeholder.jpg', requirements: 'Đã hoàn thành Sơ cấp 1' },
    { id: 'course-3', name: 'Tiếng Hàn Trung Cấp 1', description: 'Nâng cao kỹ năng nghe, nói, đọc, viết. Mở rộng từ vựng và ngữ pháp.', price: 3000000, level: 'Trung cấp', durationWeeks: 12, imageUrl: '/assets/images/course-placeholder.jpg', requirements: 'Đã hoàn thành Sơ cấp 2' },
    { id: 'course-4', name: 'Tiếng Hàn Trung Cấp 2', description: 'Tiếp nối Trung cấp 1, tập trung vào các cấu trúc ngữ pháp phức tạp và văn hóa.', price: 3200000, level: 'Trung cấp', durationWeeks: 12, imageUrl: '/assets/images/course-placeholder.jpg', requirements: 'Đã hoàn thành Trung cấp 1' },
    { id: 'course-5', name: 'Luyện thi TOPIK II', description: 'Ôn luyện chuyên sâu cho kỳ thi TOPIK cấp 3-6. Luyện đề và chiến thuật làm bài.', price: 4000000, level: 'TOPIK', durationWeeks: 8, imageUrl: '/assets/images/course-placeholder.jpg', requirements: 'Trình độ Trung cấp trở lên' },
    { id: 'course-6', name: 'Tiếng Hàn Giao Tiếp', description: 'Tập trung vào kỹ năng nói và phản xạ trong các tình huống hàng ngày.', price: 2800000, level: 'Sơ cấp', durationWeeks: 10, imageUrl: '/assets/images/course-placeholder.jpg', requirements: 'Đã biết bảng chữ cái' },
    { id: 'course-7', name: 'Ngữ Pháp Tiếng Hàn Nâng Cao', description: 'Chuyên sâu về các cấu trúc ngữ pháp phức tạp và nâng cao.', price: 3500000, level: 'Trung cấp', durationWeeks: 8, imageUrl: '/assets/images/course-placeholder.jpg', requirements: 'Trình độ Trung cấp 1' },
    { id: 'course-8', name: 'Văn hóa và Xã hội Hàn Quốc', description: 'Tìm hiểu về văn hóa, xã hội và phong tục của người Hàn Quốc.', price: 1500000, level: 'Tất cả', durationWeeks: 6, imageUrl: '/assets/images/course-placeholder.jpg', requirements: 'Không yêu cầu kiến thức trước' },
    { id: 'course-9', name: 'Tiếng Hàn Kinh Doanh', description: 'Dành cho người đi làm, học các thuật ngữ và cách giao tiếp trong môi trường công sở Hàn Quốc.', price: 3800000, level: 'Trung cấp', durationWeeks: 10, imageUrl: '/assets/images/course-placeholder.jpg', requirements: 'Trình độ Trung cấp 1' },
    { id: 'course-10', name: 'Luyện thi TOPIK I', description: 'Ôn luyện chuyên sâu cho kỳ thi TOPIK cấp 1-2.', price: 3000000, level: 'Sơ cấp', durationWeeks: 8, imageUrl: '/assets/images/course-placeholder.jpg', requirements: 'Đã hoàn thành Sơ cấp 2' },
];

// Thêm nhiều lớp học cho các khóa học và giáo viên khác nhau
let classes = [
    { id: 'class-1', courseId: 'course-1', teacherId: 'user-2', className: 'SC1-A2025', schedule: 'T2-T4-T6, 18:00-20:00', startDate: new Date('2025-08-01'), endDate: new Date('2025-10-10'), room: 'A101', status: 'inProgress', maxStudents: 20, currentStudents: 5 },
    { id: 'class-2', courseId: 'course-2', teacherId: 'user-2', className: 'SC2-B2025', schedule: 'T3-T5-T7, 19:00-21:00', startDate: new Date('2025-09-01'), endDate: new Date('2025-12-01'), room: 'B203', status: 'open', maxStudents: 18, currentStudents: 0 },
    { id: 'class-3', courseId: 'course-6', teacherId: 'user-9', className: 'GT-C2025', schedule: 'T7-CN, 09:00-11:00', startDate: new Date('2025-08-20'), endDate: new Date('2025-11-20'), room: 'C302', status: 'inProgress', maxStudents: 25, currentStudents: 15 },
    { id: 'class-4', courseId: 'course-5', teacherId: 'user-2', className: 'TOPIKII-D2025', schedule: 'T2-T4, 19:00-21:00', startDate: new Date('2025-10-01'), endDate: new Date('2025-11-25'), room: 'A102', status: 'open', maxStudents: 15, currentStudents: 2 },
    { id: 'class-5', courseId: 'course-1', teacherId: 'user-9', className: 'SC1-B2025', schedule: 'T3-T5-T7, 18:00-20:00', startDate: new Date('2025-07-01'), endDate: new Date('2025-09-10'), room: 'A101', status: 'completed', maxStudents: 20, currentStudents: 20 },
    { id: 'class-6', courseId: 'course-3', teacherId: 'user-9', className: 'TC1-E2025', schedule: 'T2-T5, 18:30-20:30', startDate: new Date('2025-08-15'), endDate: new Date('2025-11-15'), room: 'B201', status: 'inProgress', maxStudents: 22, currentStudents: 10 },
    { id: 'class-7', courseId: 'course-4', teacherId: 'user-16', className: 'TC2-F2025', schedule: 'T4-T6, 19:00-21:00', startDate: new Date('2025-09-10'), endDate: new Date('2025-12-10'), room: 'C301', status: 'open', maxStudents: 20, currentStudents: 0 },
    { id: 'class-8', courseId: 'course-10', teacherId: 'user-17', className: 'TOPIKI-G2025', schedule: 'T7-CN, 14:00-16:00', startDate: new Date('2025-09-05'), endDate: new Date('2025-11-05'), room: 'A103', status: 'inProgress', maxStudents: 15, currentStudents: 12 },
    { id: 'class-9', courseId: 'course-1', teacherId: 'user-16', className: 'SC1-C2025', schedule: 'T3-T5-T7, 18:00-20:00', startDate: new Date('2025-09-15'), endDate: new Date('2025-11-15'), room: 'B202', status: 'open', maxStudents: 20, currentStudents: 0 },
    { id: 'class-10', courseId: 'course-6', teacherId: 'user-17', className: 'GT-D2025', schedule: 'T2-T4, 18:00-20:00', startDate: new Date('2025-09-20'), endDate: new Date('2025-11-20'), room: 'C302', status: 'open', maxStudents: 25, currentStudents: 0 },
];

// Thêm nhiều đăng ký học
let enrollments = [
    { id: 'enroll-1', studentId: 'user-1', classId: 'class-1', enrollmentDate: new Date('2025-07-25'), status: 'active', paymentStatus: 'paid' },
    { id: 'enroll-2', studentId: 'user-7', classId: 'class-3', enrollmentDate: new Date('2025-08-18'), status: 'active', paymentStatus: 'paid' },
    { id: 'enroll-3', studentId: 'user-8', classId: 'class-1', enrollmentDate: new Date('2025-07-28'), status: 'active', paymentStatus: 'pending' },
    { id: 'enroll-4', studentId: 'user-10', classId: 'class-4', enrollmentDate: new Date('2025-09-25'), status: 'active', paymentStatus: 'paid' },
    { id: 'enroll-5', studentId: 'user-11', classId: 'class-6', enrollmentDate: new Date('2025-08-10'), status: 'active', paymentStatus: 'paid' },
    { id: 'enroll-6', studentId: 'user-12', classId: 'class-8', enrollmentDate: new Date('2025-09-01'), status: 'active', paymentStatus: 'paid' },
    { id: 'enroll-7', studentId: 'user-13', classId: 'class-8', enrollmentDate: new Date('2025-09-02'), status: 'active', paymentStatus: 'paid' },
    { id: 'enroll-8', studentId: 'user-14', classId: 'class-3', enrollmentDate: new Date('2025-08-19'), status: 'active', paymentStatus: 'pending' },
    { id: 'enroll-9', studentId: 'user-15', classId: 'class-6', enrollmentDate: new Date('2025-08-12'), status: 'active', paymentStatus: 'paid' },
    { id: 'enroll-10', studentId: 'user-18', classId: 'class-1', enrollmentDate: new Date('2025-07-30'), status: 'active', paymentStatus: 'paid' },
];

// Thêm nhiều bài tập
let assignments = [
    { id: 'assign-1', classId: 'class-1', title: 'Bài tập về nhà tuần 1', description: 'Viết đoạn văn giới thiệu bản thân.', dueDate: new Date('2025-08-08'), materialUrl: 'https://docs.google.com/document/d/1' },
    { id: 'assign-2', classId: 'class-3', title: 'Bài tập về nhà tuần 2', description: 'Chuẩn bị hội thoại về chủ đề du lịch.', dueDate: new Date('2025-08-28'), materialUrl: 'https://docs.google.com/document/d/2' },
    { id: 'assign-3', classId: 'class-1', title: 'Bài tập về nhà tuần 2', description: 'Luyện tập phát âm các phụ âm đôi.', dueDate: new Date('2025-08-15'), materialUrl: 'https://docs.google.com/document/d/3' },
    { id: 'assign-4', classId: 'class-6', title: 'Đọc hiểu bài 1', description: 'Đọc và trả lời câu hỏi.', dueDate: new Date('2025-08-25'), materialUrl: 'https://docs.google.com/document/d/4' },
    { id: 'assign-5', classId: 'class-8', title: 'Luyện đề nghe TOPIK', description: 'Làm bài luyện nghe số 1.', dueDate: new Date('2025-09-12'), materialUrl: 'https://docs.google.com/document/d/5' },
    { id: 'assign-6', classId: 'class-1', title: 'Bài tập ngữ pháp tuần 3', description: 'Sử dụng cấu trúc -아/어/여야 하다.', dueDate: new Date('2025-08-22'), materialUrl: 'https://docs.google.com/document/d/6' },
];

// Thêm nhiều bài nộp của học viên
let studentSubmissions = [
    { id: 'submission-1', assignmentId: 'assign-1', studentId: 'user-1', submissionUrl: 'https://docs.google.com/document/d/7', submittedAt: new Date('2025-08-07'), status: 'graded', score: 90, teacherComment: 'Làm tốt, chú ý chính tả một vài từ.' },
    { id: 'submission-2', assignmentId: 'assign-2', studentId: 'user-7', submissionUrl: 'https://docs.google.com/document/d/8', submittedAt: new Date('2025-08-27'), status: 'pending' },
    { id: 'submission-3', assignmentId: 'assign-3', studentId: 'user-1', submissionUrl: 'https://docs.google.com/document/d/9', submittedAt: new Date('2025-08-14'), status: 'pending' },
    { id: 'submission-4', assignmentId: 'assign-4', studentId: 'user-11', submissionUrl: 'https://docs.google.com/document/d/10', submittedAt: new Date('2025-08-24'), status: 'graded', score: 85, teacherComment: 'Cần chú ý hơn đến ngữ pháp.' },
    { id: 'submission-5', assignmentId: 'assign-5', studentId: 'user-12', submissionUrl: 'https://docs.google.com/document/d/11', submittedAt: new Date('2025-09-11'), status: 'graded', score: 75, teacherComment: 'Nghe còn yếu, cần luyện tập thêm.' },
    { id: 'submission-6', assignmentId: 'assign-5', studentId: 'user-13', submissionUrl: 'https://docs.google.com/document/d/12', submittedAt: new Date('2025-09-11'), status: 'graded', score: 88, teacherComment: 'Làm bài khá tốt.' },
    { id: 'submission-7', assignmentId: 'assign-1', studentId: 'user-18', submissionUrl: 'https://docs.google.com/document/d/13', submittedAt: new Date('2025-08-06'), status: 'graded', score: 95, teacherComment: 'Bài viết rất hay, không có lỗi sai.' },
];

// Thêm nhiều bản ghi điểm danh
let attendances = [
    { id: 'attend-1', studentId: 'user-1', classId: 'class-1', date: new Date('2025-08-01'), isPresent: true },
    { id: 'attend-2', studentId: 'user-1', classId: 'class-1', date: new Date('2025-08-04'), isPresent: false },
    { id: 'attend-3', studentId: 'user-7', classId: 'class-3', date: new Date('2025-08-20'), isPresent: true },
    { id: 'attend-4', studentId: 'user-7', classId: 'class-3', date: new Date('2025-08-22'), isPresent: true },
    { id: 'attend-5', studentId: 'user-8', classId: 'class-1', date: new Date('2025-08-01'), isPresent: true },
    { id: 'attend-6', studentId: 'user-11', classId: 'class-6', date: new Date('2025-08-15'), isPresent: true },
    { id: 'attend-7', studentId: 'user-12', classId: 'class-8', date: new Date('2025-09-05'), isPresent: true },
    { id: 'attend-8', studentId: 'user-13', classId: 'class-8', date: new Date('2025-09-05'), isPresent: true },
    { id: 'attend-9', studentId: 'user-14', classId: 'class-3', date: new Date('2025-08-20'), isPresent: false },
    { id: 'attend-10', studentId: 'user-18', classId: 'class-1', date: new Date('2025-08-01'), isPresent: true },
    { id: 'attend-11', studentId: 'user-18', classId: 'class-1', date: new Date('2025-08-04'), isPresent: true },
];

// Thêm nhiều kết quả thi
let examResults = [
    { id: 'exam-1', studentId: 'user-1', classId: 'class-1', examName: 'Kiểm tra giữa kỳ', score: 85, teacherComment: 'Làm tốt, cần cải thiện phát âm.', examDate: new Date('2025-09-15') },
    { id: 'exam-2', studentId: 'user-7', classId: 'class-3', examName: 'Bài kiểm tra số 1', score: 92, teacherComment: 'Phản xạ nhanh, ngữ pháp chắc chắn.', examDate: new Date('2025-09-01') },
    { id: 'exam-3', studentId: 'user-11', classId: 'class-6', examName: 'Kiểm tra từ vựng', score: 78, teacherComment: 'Cần ôn tập từ vựng thường xuyên.', examDate: new Date('2025-10-01') },
    { id: 'exam-4', studentId: 'user-12', classId: 'class-8', examName: 'Thi thử TOPIK I', score: 145, teacherComment: 'Đạt cấp 2. Cần cải thiện kỹ năng nghe.', examDate: new Date('2025-10-20') },
    { id: 'exam-5', studentId: 'user-13', classId: 'class-8', examName: 'Thi thử TOPIK I', score: 160, teacherComment: 'Đạt cấp 2. Kỹ năng đọc tốt.', examDate: new Date('2025-10-20') },
];


// Thêm nhiều giao dịch thanh toán
let payments = [
    { id: 'payment-1', userId: 'user-1', description: 'Học phí Tiếng Hàn Sơ Cấp 1', amount: 2500000, paymentDate: new Date('2025-07-20'), type: 'tuition', status: 'completed', classId: 'class-1' },
    { id: 'payment-2', userId: 'user-2', description: 'Lương tháng 7/2025', amount: 8000000, paymentDate: new Date('2025-08-01'), type: 'salary', status: 'completed', payrollPeriod: '07/2025' },
    { id: 'payment-3', userId: 'user-7', description: 'Học phí Tiếng Hàn Giao Tiếp', amount: 2800000, paymentDate: new Date('2025-08-18'), type: 'tuition', status: 'completed', classId: 'class-3' },
    { id: 'payment-4', userId: 'user-9', description: 'Lương tháng 8/2025', amount: 7500000, paymentDate: new Date('2025-09-01'), type: 'salary', status: 'pending', payrollPeriod: '08/2025' },
    { id: 'payment-5', userId: 'user-11', description: 'Học phí Tiếng Hàn Trung Cấp 1', amount: 3000000, paymentDate: new Date('2025-08-10'), type: 'tuition', status: 'completed', classId: 'class-6' },
    { id: 'payment-6', userId: 'user-12', description: 'Học phí Luyện thi TOPIK I', amount: 3000000, paymentDate: new Date('2025-09-01'), type: 'tuition', status: 'completed', classId: 'class-8' },
    { id: 'payment-7', userId: 'user-13', description: 'Học phí Luyện thi TOPIK I', amount: 3000000, paymentDate: new Date('2025-09-02'), type: 'tuition', status: 'completed', classId: 'class-8' },
    { id: 'payment-8', userId: 'user-18', description: 'Học phí Tiếng Hàn Sơ Cấp 1', amount: 2500000, paymentDate: new Date('2025-07-29'), type: 'tuition', status: 'completed', classId: 'class-1' },
    { id: 'payment-9', userId: 'user-14', description: 'Học phí Tiếng Hàn Giao Tiếp', amount: 2800000, paymentDate: new Date('2025-08-25'), type: 'tuition', status: 'pending', classId: 'class-3' },
    { id: 'payment-10', userId: 'user-10', description: 'Học phí Luyện thi TOPIK II', amount: 4000000, paymentDate: new Date('2025-09-24'), type: 'tuition', status: 'completed', classId: 'class-4' },
];

// Thêm nhiều phản hồi
let feedback = [
    { id: 'feedback-1', studentId: 'user-1', classId: 'class-1', content: 'Giảng viên nhiệt tình, bài giảng dễ hiểu.', rating: 5, createdAt: new Date('2025-10-15') },
    { id: 'feedback-2', studentId: 'user-7', classId: 'class-3', content: 'Khóa học giao tiếp rất hữu ích, đã tự tin hơn nhiều.', rating: 5, createdAt: new Date('2025-11-01') },
    { id: 'feedback-3', studentId: 'user-1', classId: 'class-1', content: 'Bài tập về nhà hơi nhiều, mong giáo viên cân nhắc lại.', rating: 4, createdAt: new Date('2025-10-20') },
    { id: 'feedback-4', studentId: 'user-11', classId: 'class-6', content: 'Cần thêm nhiều ví dụ thực tế hơn.', rating: 3, createdAt: new Date('2025-11-10') },
    { id: 'feedback-5', studentId: 'user-12', classId: 'class-8', content: 'Giáo viên hướng dẫn nhiệt tình, tài liệu rất chất lượng.', rating: 5, createdAt: new Date('2025-11-05') },
];

// Thêm nhiều thông báo
let notifications = [
  { id: 'notif-1', title: 'Thông báo nghỉ lễ', content: 'Trung tâm nghỉ lễ 02/09. Các lớp học sẽ được bù vào tuần tiếp theo.', createdAt: new Date('2025-08-20'), recipients: ['all'], teacherId: null },
  { id: 'notif-2', title: 'Nhắc nhở nộp học phí', content: 'Học phí khóa học TC1 đến hạn nộp. Vui lòng thanh toán trước ngày 10/09.', createdAt: new Date('2025-07-28'), recipients: ['user-8'] },
    { id: 'notif-3', title: 'Lịch thi TOPIK', content: 'Đăng ký thi TOPIK đợt tháng 11 đã mở. Vui lòng đăng ký sớm để được hỗ trợ.', createdAt: new Date('2025-09-10'), recipients: ['all'] },
    { id: 'notif-4', title: 'Lớp SC1-A2025 có lịch học bù', content: 'Lớp SC1-A2025 sẽ học bù vào thứ 7 tuần này.', createdAt: new Date('2025-08-25'), recipients: ['user-1', 'user-8', 'user-18'], teacherId: 'user-2' },
  { id: 'notif-3', title: 'Lịch thi mới', content: 'Lớp SC1-A2025 có lịch thi giữa kỳ.', createdAt: new Date('2025-08-25'), recipients: ['class-1'], teacherId: 'user-2' },
];

// Thêm nhiều người đăng ký kiểm tra trình độ
let placementTestRegistrations = [
    { id: 'ptr-1', userId: 'user-6', preferredDate: new Date('2025-08-15'), preferredTime: '10:00', status: 'pending', notes: 'Muốn kiểm tra sớm.' },
    { id: 'ptr-2', userId: 'user-8', preferredDate: new Date('2025-08-20'), preferredTime: '14:00', status: 'completed', notes: 'Đã hoàn thành kiểm tra và được xếp vào lớp SC1.' },
    { id: 'ptr-3', userId: 'user-10', preferredDate: new Date('2025-09-20'), preferredTime: '09:00', status: 'approved', notes: 'Đã đăng ký lớp TOPIK II.' },
    { id: 'ptr-4', userId: 'user-13', preferredDate: new Date('2025-09-01'), preferredTime: '11:00', status: 'completed', notes: 'Đã hoàn thành kiểm tra và được xếp vào lớp TOPIK I.' },
    { id: 'ptr-5', userId: 'user-18', preferredDate: new Date('2025-07-28'), preferredTime: '15:00', status: 'completed', notes: 'Đã hoàn thành kiểm tra, trình độ Sơ cấp 1.' },
];
let systemSettings = {
    maintenanceMode: false,
    emailNotifications: true,
    defaultCurrency: 'VND',
};


// --- Hàm mô phỏng API ---

export const mockLogin = async (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 1. Đảm bảo 'username' từ input là một chuỗi hợp lệ và chuyển về chữ thường để so sánh không phân biệt hoa/thường
            const inputUsername = String(username || '').trim().toLowerCase();
            // 2. Đảm bảo 'password' từ input là một chuỗi hợp lệ và giữ nguyên case
            const inputPassword = String(password || '').trim();

            // --- DEBUG LOGS: Bắt đầu ---
            console.log('--- ĐANG KIỂM TRA ĐĂNG NHẬP ---');
            console.log('Tên đăng nhập (đã xử lý):', inputUsername);
            console.log('Mật khẩu (đã xử lý):', inputPassword);
            // console.log('Tất cả người dùng trong mock data:', users); // Bỏ comment nếu muốn xem toàn bộ dữ liệu users
            // --- DEBUG LOGS: Kết thúc ---

            const user = users.find(
                (u) => {
                    const userUsername = String(u.username || '').trim().toLowerCase();
                    const userPassword = String(u.password || '').trim();
                    return userUsername === inputUsername && userPassword === inputPassword;
                }
            );

            if (user) {
                console.log('Đăng nhập thành công cho người dùng:', user.username);
                resolve({ ...user });
            } else {
                console.log('Đăng nhập thất bại: Không tìm thấy người dùng khớp.');
                reject(new Error('Tên đăng nhập hoặc mật khẩu không đúng.')); // Dòng 107
            }
        }, 500);
    });
};

export const mockRegister = async (userData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (users.some((u) => u.username === userData.username || u.email === userData.email)) {
                return reject(new Error('Tên đăng nhập hoặc Email đã tồn tại.'));
            }
            const newUser = {
                id: generateUniqueId('user-'),
                ...userData,
                role: userData.role || ROLES.REGISTERED_USER,
                token: `fake-token-${generateUniqueId()}`,
                status: 'active',
        password: userData.password || '123', // Mặc định password nếu không cung cấp
            };
            users.push(newUser);
            resolve(newUser);
        }, 500);
    });
};

export const mockUpdateProfile = async (userId, updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = users.findIndex((u) => u.id === userId);
      if (index > -1) {
        users[index] = { ...users[index], ...updatedData };
        resolve({ ...users[index] });
      } else {
        reject(new Error('Người dùng không tìm thấy.'));
      }
    }, 500);
  });
};

// Public Data
export const mockFetchCourses = async () => {
    return new Promise(resolve => {
        setTimeout(() => resolve([...courses]), 300);
    });
};

export const mockFetchCourseById = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const course = courses.find(c => c.id === id);
            if (course) resolve({ ...course });
            else reject(new Error('Khóa học không tồn tại.'));
        }, 300);
    });
};

export const mockFetchTeachers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teachers = users.filter((u) => u.role === ROLES.GIANG_VIEN && u.status === 'approved');
      resolve(teachers.map((t) => ({ id: t.id, fullName: t.fullName, email: t.email, phone: t.phone })));
    }, 300);
  });
};

export const mockContactUs = async (contactData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Contact form submitted:', contactData);
      resolve({ success: true, message: 'Tin nhắn của bạn đã được gửi thành công!' });
    }, 500);
  });
};

export const mockApplyAsTeacher = async (applicationData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = users.find((u) => u.email === applicationData.email);
      if (existingUser) {
        if (existingUser.role === ROLES.GIANG_VIEN && existingUser.status === 'approved') {
          return reject(new Error('Bạn đã là giảng viên.'));
        }
        if (existingUser.role === ROLES.GIANG_VIEN && existingUser.status === 'pendingApproval') {
          return reject(new Error('Đơn đăng ký của bạn đang được xem xét.'));
        }
        existingUser.role = ROLES.GIANG_VIEN;
        existingUser.status = 'pendingApproval';
        resolve({ success: true, message: 'Đơn đăng ký làm giảng viên đã được gửi. Chúng tôi sẽ liên hệ với bạn sớm.' });
      } else {
        const newTeacherApplicant = {
          id: generateUniqueId('user-'),
          username: applicationData.email.split('@')[0],
          ...applicationData,
          role: ROLES.GIANG_VIEN,
          status: 'pendingApproval',
          token: `fake-teacher-applicant-token-${generateUniqueId()}`,
          password: '123', // Mặc định password
        };
        users.push(newTeacherApplicant);
        resolve({ success: true, message: 'Đơn đăng ký làm giảng viên đã được gửi. Vui lòng đăng nhập để theo dõi trạng thái.' });
      }
    }, 500);
  });
};
// Ví dụ thêm vào cuối file mockdata.js
export const mockSubmitGrades = async ({ classId, studentId, grades, note }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!classId || !studentId || !grades) {
        return reject(new Error('Class ID, student ID, and grades are required'));
      }
      const newResult = {
        id: generateUniqueId('exam-'),
        studentId,
        classId,
        examName: 'Điểm tổng hợp',
        score: parseFloat(grades.final) || 0,
        teacherComment: note || '',
        examDate: new Date(),
      };
      examResults.push(newResult);
      if (note) {
        studentNotes = [
          ...studentNotes.filter((n) => !(n.studentId === studentId && n.classId === classId)),
          { studentId, classId, note, updatedAt: new Date() },
        ];
      }
      console.log('Saved grades:', newResult);
      console.log('Saved note:', note);
      resolve({ success: true, message: 'Gửi điểm và ghi chú thành công!' });
    }, 500);
  });
};
export const mockFetchStudentNotes = async (classId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(studentNotes.filter((n) => n.classId === classId));
    }, 500);
  });
};
export const mockSaveStudentNote = async (studentId, classId, note) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      studentNotes = [
        ...studentNotes.filter((n) => !(n.studentId === studentId && n.classId === classId)),
        { studentId, classId, note, updatedAt: new Date() },
      ];
      resolve({ success: true, message: 'Ghi chú đã được lưu' });
    }, 500);
  });
};

export const mockSubmitComment = async (assignmentId, comment) => {
  console.log('Gửi bình luận:', assignmentId, comment);
  return { success: true };
};

export const mockFetchAssignments = async (teacherId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teacherClasses = classes.filter((cls) => cls.teacherId === teacherId);
      const classIds = teacherClasses.map((cls) => cls.id);
      const teacherAssignments = assignments.filter((assign) => classIds.includes(assign.classId));
      resolve(teacherAssignments.map((assign) => ({
        id: assign.id,
        title: assign.title,
        description: assign.description,
        dueDate: assign.dueDate.toISOString().split('T')[0],
        classId: assign.classId,
        className: classes.find((cls) => cls.id === assign.classId)?.className,
      })));
    }, 500);
  });
};



// Registered User specific
export const mockEnrollCourseDirectly = async (userId, courseId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((u) => u.id === userId);
      const course = courses.find((c) => c.id === courseId);
      if (!user || !course) {
        return reject(new Error('Người dùng hoặc khóa học không tồn tại.'));
      }
      if (enrollments.some((e) => e.studentId === userId && e.classId === 'class-1')) {
        return reject(new Error('Bạn đã đăng ký khóa học này rồi.'));
      }

      let targetClass = classes.find((cls) => cls.courseId === courseId && cls.status === 'open');
      if (!targetClass) {
        targetClass = {
          id: generateUniqueId('class-'),
          courseId: course.id,
          teacherId: 'user-2',
          className: `${course.name.replace(/\s/g, '')}-${new Date().getFullYear()}`,
          schedule: 'T2-T4-T6, 18:00-20:00',
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + course.durationWeeks / 4)),
          room: 'Online',
          status: 'inProgress',
          maxStudents: 20,
          currentStudents: 0,
        };
        classes.push(targetClass);
      }

      targetClass.currentStudents++;
      const newEnrollment = {
        id: generateUniqueId('enroll-'),
        studentId: userId,
        classId: targetClass.id,
        enrollmentDate: new Date(),
        status: 'active',
        paymentStatus: 'pending',
      };
      enrollments.push(newEnrollment);

      if (user.role === ROLES.REGISTERED_USER) {
        user.role = ROLES.HOC_VIEN;
        user.token = `fake-student-token-${generateUniqueId()}`;
      }

      resolve({ success: true, enrollment: newEnrollment, userRoleUpdated: true, newRole: ROLES.HOC_VIEN });
    }, 1000);
  });
};

export const mockRegisterForPlacementTest = async (userId, testData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((u) => u.id === userId);
      if (!user) {
        return reject(new Error('Người dùng không tồn tại.'));
      }
      if (placementTestRegistrations.some((ptr) => ptr.userId === userId && ptr.status === 'pending')) {
        return reject(new Error('Bạn đã có đơn đăng ký kiểm tra trình độ đang chờ xử lý.'));
      }

      const newRegistration = {
        id: generateUniqueId('ptr-'),
        userId: userId,
        ...testData,
        status: 'pending',
      };
      placementTestRegistrations.push(newRegistration);
      resolve({ success: true, registration: newRegistration });
    }, 500);
  });
};

// Student specific
export const mockFetchStudentSchedule = async (studentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const studentEnrollments = enrollments.filter((e) => e.studentId === studentId && e.status === 'active');
      const studentClasses = classes.filter((cls) => studentEnrollments.some((e) => e.classId === cls.id));
      resolve(studentClasses);
    }, 500);
  });
};

export const mockFetchStudentGrades = async (studentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const studentExams = examResults.filter((r) => r.studentId === studentId);
      const studentSubmissionsWithGrades = studentSubmissions.filter((s) => s.studentId === studentId && s.status === 'graded');
      resolve({ exams: studentExams, assignments: studentSubmissionsWithGrades });
    }, 500);
  });
};

export const mockFetchStudentMaterials = async (studentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const studentClassIds = enrollments.filter((e) => e.studentId === studentId).map((e) => e.classId);
      const materials = assignments.filter((a) => studentClassIds.includes(a.classId));
      resolve(materials);
    }, 500);
  });
};

export const mockFetchStudentAssignments = async (studentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const studentClassIds = enrollments.filter((e) => e.studentId === studentId).map((e) => e.classId);
      const classAssignments = assignments.filter((a) => studentClassIds.includes(a.classId));
      const studentSubs = studentSubmissions.filter((s) => s.studentId === studentId);

      const combinedAssignments = classAssignments.map((assign) => {
        const submission = studentSubs.find((sub) => sub.assignmentId === assign.id);
        return {
          ...assign,
          submission: submission ? { ...submission } : null,
          status: submission ? submission.status : 'pending',
        };
      });
      resolve(combinedAssignments);
    }, 500);
  });
};

export const mockSubmitAssignment = async (assignmentId, studentId, submissionUrl) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingSubmissionIndex = studentSubmissions.findIndex((s) => s.assignmentId === assignmentId && s.studentId === studentId);
      if (existingSubmissionIndex > -1) {
        studentSubmissions[existingSubmissionIndex] = {
          ...studentSubmissions[existingSubmissionIndex],
          submissionUrl,
          submittedAt: new Date(),
          status: 'submitted',
        };
        resolve({ success: true, submission: studentSubmissions[existingSubmissionIndex] });
      } else {
        const newSubmission = {
          id: generateUniqueId('submission-'),
          assignmentId,
          studentId,
          submissionUrl,
          submittedAt: new Date(),
          status: 'submitted',
        };
        studentSubmissions.push(newSubmission);
        resolve({ success: true, submission: newSubmission });
      }
    }, 500);
  });
};

export const mockFetchStudentPayments = async (studentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const studentPayments = payments.filter((p) => p.userId === studentId && p.type === 'tuition');
      resolve(studentPayments);
    }, 500);
  });
};

export const mockSubmitFeedback = async (feedbackData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newFeedback = {
        id: generateUniqueId('feedback-'),
        ...feedbackData,
        createdAt: new Date(),
      };
      feedback.push(newFeedback);
      resolve({ success: true, feedback: newFeedback });
    }, 500);
  });
};

// Teacher specific
export const mockFetchTeacherClasses = async (teacherId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teacherClasses = classes.filter((cls) => cls.teacherId === teacherId);
      const classesWithCourseInfo = teacherClasses.map((cls) => ({
        ...cls,
        courseName: courses.find((c) => c.id === cls.courseId)?.name,
      }));
      resolve(classesWithCourseInfo);
    }, 500);
  });
};

export const mockFetchClassStudents = async (classId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const enrolledStudentIds = enrollments.filter((e) => e.classId === classId).map((e) => e.studentId);
      console.log('Enrolled student IDs:', enrolledStudentIds); // Debug
      const studentsInClass = users.filter((u) => enrolledStudentIds.includes(u.id));
      console.log('Students in class:', studentsInClass); // Debug
      resolve({
        students: studentsInClass.map((s) => ({
          id: s.id,
          fullName: s.fullName,
          username: s.username,
          email: s.email,
          phone: s.phone,
          address: s.address
        })),
        count: studentsInClass.length
      });
    }, 500);
  });
};


export const mockFetchAttendanceByClassAndDate = async (classId, date) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredAttendance = attendances.filter((a) => a.classId === classId && a.date.toDateString() === new Date(date).toDateString());
      resolve(filteredAttendance);
    }, 500);
  });
};

export const mockUpdateAttendance = async (attendanceRecords) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      attendanceRecords.forEach((record) => {
        const index = attendances.findIndex((a) => a.id === record.id);
        if (index > -1) {
          attendances[index] = record;
        } else {
          attendances.push({ ...record, id: generateUniqueId('attend-') });
        }
      });
      resolve({ success: true, updatedRecords: attendanceRecords });
    }, 500);
  });
};

export const mockEnterExamResult = async (resultData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingIndex = examResults.findIndex(
        (e) => e.studentId === resultData.studentId && e.classId === resultData.classId && e.examName === resultData.examName
      );
      if (existingIndex > -1) {
        examResults[existingIndex] = { ...examResults[existingIndex], ...resultData, examDate: new Date() };
        resolve({ success: true, result: examResults[existingIndex] });
      } else {
        const newResult = { id: generateUniqueId('exam-'), ...resultData, examDate: new Date() };
        examResults.push(newResult);
        resolve({ success: true, result: newResult });
      }
    }, 500);
  });
};

export const mockFetchSubmissionsForAssignment = async (assignmentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const submissions = studentSubmissions.filter((s) => s.assignmentId === assignmentId);
      const submissionsWithStudentInfo = submissions.map((s) => ({
        ...s,
        studentName: users.find((u) => u.id === s.studentId)?.fullName,
      }));
      resolve(submissionsWithStudentInfo);
    }, 500);
  });
};

export const mockGradeSubmission = async (submissionId, grade, teacherComment) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = studentSubmissions.findIndex((s) => s.id === submissionId);
      if (index > -1) {
        studentSubmissions[index].grade = grade;
        studentSubmissions[index].teacherComment = teacherComment;
        studentSubmissions[index].status = 'graded';
        resolve({ success: true, submission: studentSubmissions[index] });
      } else {
        reject(new Error('Bài nộp không tìm thấy.'));
      }
    }, 500);
  });
};

export const mockFetchTeacherSchedule = async (teacherId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teacherSchedule = schedules.filter((sch) => sch.teacherId === teacherId);
      resolve(teacherSchedule);
    }, 500);
  });
};

export const mockUploadMaterial = async (classId, material) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAssignment = {
        id: generateUniqueId('assign-'),
        classId,
        title: material.title || 'Tài liệu mới',
        description: material.description || 'Tài liệu học tập',
        dueDate: material.dueDate || null,
        materialUrl: material.url || 'https://docs.google.com/document/d/fake',
      };
      assignments.push(newAssignment);
      resolve({ success: true, assignment: newAssignment });
    }, 500);
  });
};

export const mockFetchTeacherSalary = async (teacherId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teacherSalary = payments.filter((p) => p.userId === teacherId && p.type === 'salary');
      resolve(teacherSalary);
    }, 500);
  });
};

export const mockSendNotification = async (notificationData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newNotification = {
        id: generateUniqueId('notif-'),
        ...notificationData,
        createdAt: new Date(),
      };
      notifications.push(newNotification);
      resolve({ success: true, notification: newNotification });
    }, 500);
  });
};

export const mockFetchNotifications = async (teacherId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teacherNotifications = notifications.filter((n) => n.teacherId === teacherId || n.recipients.includes('all') || n.recipients.includes(`class-${classes.find((c) => c.teacherId === teacherId)?.id}`));
      resolve(teacherNotifications);
    }, 500);
  });
};

// Academic specific
export const mockFetchAllUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...users]), 500);
  });
};

// Tạo người dùng mới 
export const mockCreateUser = async (userData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Kiểm tra trùng username/email
            if (users.some(u => u.username === userData.username || u.email === userData.email)) {
                return reject(new Error('Tên đăng nhập hoặc Email đã tồn tại.'));
            }

            const newUser = {
                id: generateUniqueId('user-'),
                ...userData,
                password: userData.password || '123', // default password
                token: `fake-token-${generateUniqueId()}`,
                status: userData.role === ROLES.GIANG_VIEN ? 'pending' : 'approved',
            };

            users.push(newUser);
            console.log('User created:', newUser);
            resolve(newUser);
        }, 500);
    });
};


export const mockUpdateUser = async (userId, updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = users.findIndex((u) => u.id === userId);
      if (index > -1) {
        users[index] = { ...users[index], ...updatedData };
        resolve(users[index]);
      } else {
        reject(new Error('Người dùng không tìm thấy.'));
      }
    }, 500);
  });
};

export const mockDeleteUser = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = users.length;
      users = users.filter((u) => u.id !== userId);
      if (users.length < initialLength) {
        resolve({ success: true });
      } else {
        reject(new Error('Không tìm thấy người dùng để xóa.'));
      }
    }, 500);
  });
};

export const mockCreateCourse = async (courseData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCourse = { id: generateUniqueId('course-'), ...courseData, imageUrl: courseData.imageUrl || '/assets/images/course-placeholder.jpg' };
      courses.push(newCourse);
      resolve(newCourse);
    }, 500);
  });
};

export const mockUpdateCourse = async (courseId, updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = courses.findIndex((c) => c.id === courseId);
      if (index > -1) {
        courses[index] = { ...courses[index], ...updatedData };
        resolve(courses[index]);
      } else {
        reject(new Error('Khóa học không tìm thấy.'));
      }
    }, 500);
  });
};

export const mockDeleteCourse = async (courseId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = courses.length;
      courses = courses.filter((c) => c.id !== courseId);
      if (courses.length < initialLength) {
        resolve({ success: true });
      } else {
        reject(new Error('Không tìm thấy khóa học để xóa.'));
      }
    }, 500);
  });
};

export const mockCreateClass = async (classData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newClass = { id: generateUniqueId('class-'), ...classData, currentStudents: 0, status: 'open' };
      classes.push(newClass);
      resolve(newClass);
    }, 500);
  });
};

export const mockUpdateClass = async (classId, updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = classes.findIndex((c) => c.id === classId);
      if (index > -1) {
        classes[index] = { ...classes[index], ...updatedData };
        resolve(classes[index]);
      } else {
        reject(new Error('Lớp học không tìm thấy.'));
      }
    }, 500);
  });
};

export const mockDeleteClass = async (classId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = classes.length;
      classes = classes.filter((c) => c.id !== classId);
      if (classes.length < initialLength) {
        resolve({ success: true });
      } else {
        reject(new Error('Không tìm thấy lớp học để xóa.'));
      }
    }, 500);
  });
};

export const mockFetchPlacementTestRegistrations = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const registrationsWithUserInfo = placementTestRegistrations.map((reg) => ({
        ...reg,
        userName: users.find((u) => u.id === reg.userId)?.fullName,
        userEmail: users.find((u) => u.id === reg.userId)?.email,
      }));
      resolve(registrationsWithUserInfo);
    }, 500);
  });
};

export const mockUpdatePlacementTestStatus = async (regId, newStatus, assignedClassId = null) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = placementTestRegistrations.findIndex((r) => r.id === regId);
      if (index > -1) {
        placementTestRegistrations[index].status = newStatus;
        if (assignedClassId) {
          placementTestRegistrations[index].assignedClassId = assignedClassId;
          const user = users.find((u) => u.id === placementTestRegistrations[index].userId);
          if (user && user.role === ROLES.REGISTERED_USER) {
            user.role = ROLES.HOC_VIEN;
            user.token = `fake-student-token-${generateUniqueId()}`;
            const newEnrollment = {
              id: generateUniqueId('enroll-'),
              studentId: user.id,
              classId: assignedClassId,
              enrollmentDate: new Date(),
              status: 'active',
              paymentStatus: 'pending',
            };
            enrollments.push(newEnrollment);
          }
        }
        resolve({ success: true, registration: placementTestRegistrations[index] });
      } else {
        reject(new Error('Đăng ký kiểm tra không tìm thấy.'));
      }
    }, 500);
  });
};

// Accounting specific
export const mockFetchAllPayments = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...payments]), 500);
  });
};

export const mockUpdatePaymentStatus = async (paymentId, newStatus) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = payments.findIndex((p) => p.id === paymentId);
      if (index > -1) {
        payments[index].status = newStatus;
        resolve({ success: true, payment: payments[index] });
      } else {
        reject(new Error('Thanh toán không tìm thấy.'));
      }
    }, 500);
  });
};

export const mockGenerateInvoice = async (paymentId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const payment = payments.find((p) => p.id === paymentId);
      if (payment) {
        resolve({ success: true, invoiceUrl: `fake-invoice-${paymentId}.pdf` });
      } else {
        reject(new Error('Không tìm thấy thanh toán để tạo hóa đơn.'));
      }
    }, 500);
  });
};

export const mockCalculatePayroll = async (period) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teachers = users.filter((u) => u.role === ROLES.GIANG_VIEN);
      const payrollData = teachers.map((teacher) => {
        const baseSalary = 8000000;
        const bonus = 0;
        const penalty = 0;
        const total = baseSalary + bonus - penalty;
        return {
          teacherId: teacher.id,
          teacherName: teacher.fullName,
          period,
          baseSalary,
          bonus,
          penalty,
          netSalary: total,
          status: 'calculated',
        };
      });
      resolve(payrollData);
    }, 500);
  });
};

export const mockRecordPayment = async (paymentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPayment = { id: generateUniqueId('payment-'), ...paymentData, paymentDate: new Date(), status: 'completed' };
      payments.push(newPayment);
      resolve(newPayment);
    }, 500);
  });
};

export const mockGenerateFinancialReport = async (month, year) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const revenues = payments.filter((p) => p.type === 'tuition' && p.paymentDate.getMonth() + 1 === month && p.paymentDate.getFullYear() === year).reduce((sum, p) => sum + p.amount, 0);
      const expenses = payments.filter((p) => p.type === 'salary' && p.paymentDate.getMonth() + 1 === month && p.paymentDate.getFullYear() === year).reduce((sum, p) => sum + p.amount, 0);
      resolve({ month, year, totalRevenue: revenues, totalExpenses: expenses, netProfit: revenues - expenses });
    }, 500);
  });
};

// --- API functions for Admin Panel ---

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockFetchDashboardStats = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                totalStudents: users.filter(u => u.role === ROLES.HOC_VIEN).length,
                totalTeachers: users.filter(u => u.role === ROLES.GIANG_VIEN && u.status === 'approved').length,
                totalCourses: courses.length,
                totalClasses: classes.length,
                activeClasses: classes.filter(c => c.status === 'inProgress').length,
                pendingTeacherApplications: users.filter(u => u.role === ROLES.GIANG_VIEN && u.status === 'pendingApproval').length,
                totalRevenueLastMonth: payments.filter(p => p.type === 'tuition' && p.paymentDate.getMonth() === (new Date().getMonth() -1 )).reduce((sum, p) => sum + p.amount, 0),
            });
        }, 500);
    });
};

export const mockFetchAllClasses = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allClasses = classes.map((cls) => ({
        ...cls,
        courseName: courses.find((c) => c.id === cls.courseId)?.name,
        teacherName: users.find((u) => u.id === cls.teacherId)?.fullName,
      }));
      resolve(allClasses);
    }, 500);
  });
    await delay(500);
    return [...courses];
};

// Hàm mock cho Phản hồi và Phân tích
export const mockFetchAllFeedbacks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const feedbacksWithUserInfo = feedback.map((f) => ({
        ...f,
        studentName: users.find((u) => u.id === f.studentId)?.fullName,
        className: f.classId ? classes.find((c) => c.id === f.classId)?.className : 'N/A',
      }));
      resolve(feedbacksWithUserInfo);
    }, 500);
  });
};

export const mockAnalyzeFeedbackWithAI = async (feedbackText) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let sentiment = 'neutral';
      if (feedbackText.toLowerCase().includes('tuyệt vời') || feedbackText.toLowerCase().includes('hài lòng') || feedbackText.toLowerCase().includes('tốt')) {
        sentiment = 'positive';
      } else if (feedbackText.toLowerCase().includes('kém') || feedbackText.toLowerCase().includes('không hài lòng') || feedbackText.toLowerCase().includes('tệ')) {
        sentiment = 'negative';
      }
      const keywords = feedbackText.toLowerCase().split(' ').filter((word) => word.length > 3 && !['là', 'một', 'không', 'rất', 'cần'].includes(word)).slice(0, 3);
      resolve({
        sentiment: sentiment,
        keywords: keywords,
        summary: `Phân tích AI: Phản hồi có xu hướng ${sentiment} với các từ khóa chính: ${keywords.join(', ')}.`,
      });
    }, 1000);
  });
};

export const mockSendGlobalNotification = async (notificationData) => {
    await delay(500);
    const newNotification = { id: `noti-${generateUniqueId()}`, ...notificationData, date: new Date().toISOString() };
    notifications.push(newNotification);
    return newNotification;
};

export const mockFetchAllNotifications = async () => {
    await delay(500);
    return [...notifications];
};

// Hàm mock cho Quản lý nội dung trang web
export const mockUpdateWebsiteContent = async (section, content) => {
    await delay(500);
    if (websiteContent.hasOwnProperty(section)) {
        websiteContent[section] = content;
        return { success: true, message: `Nội dung phần '${section}' đã được cập nhật.` };
    }
    throw new Error('Section not found');
};

// Hàm mock cho Báo cáo
export const mockGetOverallReports = async () => {
    await delay(500);
    return {
        totalStudents: 420,
        totalRevenue: 75000000,
        activeCourses: 12,
        enrollmentData: [
            { name: 'Tiếng Hàn sơ cấp 1', students: 80 },
            { name: 'Tiếng Hàn sơ cấp 2', students: 75 },
            { name: 'Tiếng Hàn trung cấp 1', students: 60 },
            { name: 'TOPIK luyện đề', students: 50 },
            { name: 'Tiếng Hàn giao tiếp', students: 45 },
        ],
        revenueData: [
            { month: 'Tháng 1', revenue: 10000000 },
            { month: 'Tháng 2', revenue: 12000000 },
            { month: 'Tháng 3', revenue: 13000000 },
            { month: 'Tháng 4', revenue: 11000000 },
            { month: 'Tháng 5', revenue: 14000000 },
            { month: 'Tháng 6', revenue: 15000000 },
        ],
    };
};

// // Hàm mock cho Cài đặt hệ thống
// export const mockGetSystemSettings = async () => {
//     await delay(500);
//     return { ...systemSettings };
// };

// export const mockUpdateSystemSettings = async (settingsData) => {
//     await delay(500);
//     systemSettings = { ...systemSettings, ...settingsData };
//     return { success: true, settings: systemSettings };
// };

// Hàm mock cho Cài đặt hệ thống
export const mockGetSystemSettings = async () => {
    // Giả lập độ trễ mạng
    await new Promise(resolve => setTimeout(resolve, 500));
    // Trả về một bản sao của cài đặt hiện tại để tránh thay đổi trực tiếp
    return { ...systemSettings };
};

export const mockUpdateSystemSettings = async (settingsData) => {
    // Giả lập độ trễ mạng
    await new Promise(resolve => setTimeout(resolve, 500));
    // Cập nhật cài đặt hệ thống với dữ liệu mới
    systemSettings = { ...systemSettings, ...settingsData };
    return { success: true, settings: systemSettings };
};

export const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export {
  enrollments, // Thêm dòng nà

};



