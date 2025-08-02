// src/mockData/mockdata.js
import { generateUniqueId } from '../utils/helpers'; // Import hàm tạo ID
import { ROLES } from '../utils/constants'; // Import các vai trò

// Giả lập cơ sở dữ liệu (trong thực tế là tương tác với backend)
let users = [
  { id: 'user-1', username: 'student1', email: 'student1@example.com', fullName: 'Nguyễn Văn A', role: ROLES.HOC_VIEN, token: 'fake-student-token-123', phone: '0901111111', address: '123 Đường Học Viên', password: '123' }, // Thêm password ở đây
  { id: 'user-2', username: 'teacher1', email: 'teacher1@example.com', fullName: 'Lê Thị B', role: ROLES.GIANG_VIEN, token: 'fake-teacher-token-456', phone: '0902222222', address: '456 Đường Giảng Viên', status: 'approved', password: '123' }, // Thêm password
  { id: 'user-3', username: 'academic_manager', email: 'academic@example.com', fullName: 'Phạm Văn C', role: ROLES.QUAN_LY_HOC_VU, token: 'fake-academic-token-789', phone: '0903333333', address: '789 Đường Quản Lý', password: '123' }, // Thêm password
  { id: 'user-4', username: 'accountant', email: 'accountant@example.com', fullName: 'Trần Thị D', role: ROLES.KE_TOAN, token: 'fake-accountant-token-101', phone: '0904444444', address: '101 Đường Kế Toán', password: '123' }, // Thêm password
  { id: 'user-5', username: 'admin', email: 'admin@example.com', fullName: 'Hoàng Văn E', role: ROLES.QUAN_TRI_HE_THONG, token: 'fake-admin-token-112', phone: '0905555555', address: '112 Đường Quản Trị', password: '123' }, // Thêm password
  { id: 'user-6', username: 'newuser', email: 'newuser@example.com', fullName: 'Đặng Đình F', role: ROLES.REGISTERED_USER, token: 'fake-registered-token-131', phone: '0906666666', address: '131 Đường Đăng Ký Mới', password: '123' }, // Thêm password
];

let courses = [
  { id: 'course-1', name: 'Tiếng Hàn Sơ Cấp 1', description: 'Khóa học dành cho người mới bắt đầu.', price: 2500000, level: 'Sơ cấp', durationWeeks: 10, imageUrl: '/assets/images/course-placeholder.jpg' },
  { id: 'course-2', name: 'Tiếng Hàn Trung Cấp 1', description: 'Nâng cao kỹ năng nghe, nói, đọc, viết.', price: 3000000, level: 'Trung cấp', durationWeeks: 12, imageUrl: '/assets/images/course-placeholder.jpg' },
  { id: 'course-3', name: 'Luyện thi TOPIK II', description: 'Ôn luyện chuyên sâu cho kỳ thi TOPIK cấp 3-6.', price: 4000000, level: 'TOPIK', durationWeeks: 8, imageUrl: '/assets/images/course-placeholder.jpg' },
];

let classes = [
  { id: 'class-1', courseId: 'course-1', teacherId: 'user-2', className: 'SC1-A2025', schedule: 'T2-T4-T6, 18:00-20:00', startDate: new Date('2025-08-01'), endDate: new Date('2025-10-10'), room: 'A101', status: 'inProgress', maxStudents: 20, currentStudents: 5 },
  { id: 'class-2', courseId: 'course-2', teacherId: 'user-2', className: 'TC1-B2025', schedule: 'T3-T5-T7, 19:00-21:00', startDate: new Date('2025-09-01'), endDate: new Date('2025-12-01'), room: 'B203', status: 'open', maxStudents: 18, currentStudents: 0 },
];

let enrollments = [
    { id: 'enroll-1', studentId: 'user-1', classId: 'class-1', enrollmentDate: new Date('2025-07-25'), status: 'active', paymentStatus: 'paid' }
];

let assignments = [
    { id: 'assign-1', classId: 'class-1', title: 'Bài tập về nhà tuần 1', description: 'Viết đoạn văn giới thiệu bản thân.', dueDate: new Date('2025-08-08'), materialUrl: 'https://docs.google.com/document/d/1' },
];

let studentSubmissions = [
    { id: 'submission-1', assignmentId: 'assign-1', studentId: 'user-1', submissionUrl: 'https://docs.google.com/document/d/2', submittedAt: new Date('2025-08-07'), status: 'pending' }
];

let attendances = [
    { id: 'attend-1', studentId: 'user-1', classId: 'class-1', date: new Date('2025-08-01'), isPresent: true },
    { id: 'attend-2', studentId: 'user-1', classId: 'class-1', date: new Date('2025-08-04'), isPresent: false },
];

let examResults = [
    { id: 'exam-1', studentId: 'user-1', classId: 'class-1', examName: 'Kiểm tra giữa kỳ', score: 85, teacherComment: 'Làm tốt, cần cải thiện phát âm.', examDate: new Date('2025-09-15') }
];

let payments = [
    { id: 'payment-1', userId: 'user-1', description: 'Học phí Tiếng Hàn Sơ Cấp 1', amount: 2500000, paymentDate: new Date('2025-07-20'), type: 'tuition', status: 'completed', classId: 'class-1' },
    { id: 'payment-2', userId: 'user-2', description: 'Lương tháng 7/2025', amount: 8000000, paymentDate: new Date('2025-08-01'), type: 'salary', status: 'completed', payrollPeriod: '07/2025' },
];

let feedback = [
    { id: 'feedback-1', studentId: 'user-1', classId: 'class-1', content: 'Giảng viên nhiệt tình, bài giảng dễ hiểu.', rating: 5, createdAt: new Date('2025-10-15') },
];

let notifications = [
    { id: 'notif-1', title: 'Thông báo nghỉ lễ', content: 'Trung tâm nghỉ lễ 02/09.', createdAt: new Date('2025-08-20'), recipients: ['all'] },
    { id: 'notif-2', title: 'Nhắc nhở nộp học phí', content: 'Học phí khóa học TC1 đến hạn.', createdAt: new Date('2025-07-28'), recipients: ['user-1'] },
];

let placementTestRegistrations = [
    // Người dùng đã đăng ký kiểm tra trình độ
    { id: 'ptr-1', userId: 'user-6', preferredDate: new Date('2025-08-15'), preferredTime: '10:00', status: 'pending', notes: 'Muốn kiểm tra sớm.' }
];

// --- Hàm mô phỏng API ---

// Auth & User
// export const mockLogin = async (username, password) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const user = users.find(u => u.username === username);
//       if (user && user.password === password)

//       // ĐẢM BẢO NHẬP MẬT KHẨU LÀ '123' KHI ĐĂNG NHẬP
//     //   if (user && password === '123')
//          { 
//         resolve({ ...user });
//       } else {
//         // console.log("Đăng nhập thất bại. Username:", username, "Password:", password); // Để debug thêm
//         reject(new Error('Tên đăng nhập hoặc mật khẩu không đúng.'));
//       }
//     }, 500);
//   });
// };

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

          // --- DEBUG LOGS: Kiểm tra từng người dùng ---
          // console.log(`  Đang so sánh với người dùng: ${u.username}`);
          // console.log(`    Username người dùng (đã xử lý): ${userUsername}`);
          // console.log(`    Password người dùng (đã xử lý): ${userPassword}`);
          // console.log(`    Khớp Username: ${userUsername === inputUsername}`);
          // console.log(`    Khớp Password: ${userPassword === inputPassword}`);
          // console.log(`    Tổng thể khớp cho ${u.username}: ${userUsername === inputUsername && userPassword === inputPassword}`);
          // --- DEBUG LOGS: Kết thúc kiểm tra từng người dùng ---

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
      if (users.some(u => u.username === userData.username || u.email === userData.email)) {
        return reject(new Error('Tên đăng nhập hoặc Email đã tồn tại.'));
      }
      const newUser = {
        id: generateUniqueId('user-'),
        ...userData,
        role: userData.role || ROLES.REGISTERED_USER, // Mặc định là registeredUser
        token: `fake-token-${generateUniqueId()}`,
        status: 'active' // Hoặc 'pendingApproval' nếu cần duyệt
      };
      users.push(newUser);
      resolve(newUser);
    }, 500);
  });
};

export const mockUpdateProfile = async (userId, updatedData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = users.findIndex(u => u.id === userId);
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
    return new Promise(resolve => {
        setTimeout(() => {
            const teachers = users.filter(u => u.role === ROLES.GIANG_VIEN && u.status === 'approved');
            resolve(teachers.map(t => ({ id: t.id, fullName: t.fullName, email: t.email, phone: t.phone }))); // Chỉ trả về thông tin cần thiết
        }, 300);
    });
};

export const mockContactUs = async (contactData) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Contact form submitted:", contactData);
            resolve({ success: true, message: "Tin nhắn của bạn đã được gửi thành công!" });
        }, 500);
    });
};

export const mockApplyAsTeacher = async (applicationData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Giả lập tạo một user mới với role 'giangVien' nhưng status 'pendingApproval'
            const existingUser = users.find(u => u.email === applicationData.email);
            if (existingUser) {
                if (existingUser.role === ROLES.GIANG_VIEN && existingUser.status === 'approved') {
                    return reject(new Error('Bạn đã là giảng viên.'));
                }
                if (existingUser.role === ROLES.GIANG_VIEN && existingUser.status === 'pendingApproval') {
                    return reject(new Error('Đơn đăng ký của bạn đang được xem xét.'));
                }
                // Cập nhật vai trò và trạng thái nếu là user thường
                existingUser.role = ROLES.GIANG_VIEN;
                existingUser.status = 'pendingApproval';
                resolve({ success: true, message: 'Đơn đăng ký làm giảng viên đã được gửi. Chúng tôi sẽ liên hệ với bạn sớm.' });
            } else {
                const newTeacherApplicant = {
                    id: generateUniqueId('user-'),
                    username: applicationData.email.split('@')[0], // Lấy phần đầu email làm username
                    ...applicationData,
                    role: ROLES.GIANG_VIEN,
                    status: 'pendingApproval',
                    token: `fake-teacher-applicant-token-${generateUniqueId()}`
                };
                users.push(newTeacherApplicant);
                resolve({ success: true, message: 'Đơn đăng ký làm giảng viên đã được gửi. Vui lòng đăng nhập để theo dõi trạng thái.' });
            }
        }, 500);
    });
};


// Registered User specific
export const mockEnrollCourseDirectly = async (userId, courseId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.id === userId);
            const course = courses.find(c => c.id === courseId);
            if (!user || !course) {
                return reject(new Error('Người dùng hoặc khóa học không tồn tại.'));
            }
            if (enrollments.some(e => e.studentId === userId && e.classId === 'class-1')) { // Giả lập chỉ có 1 lớp cho course-1
                return reject(new Error('Bạn đã đăng ký khóa học này rồi.'));
            }

            // Giả lập tìm lớp phù hợp hoặc tạo lớp mới nếu chưa có
            let targetClass = classes.find(cls => cls.courseId === courseId && cls.status === 'open');
            if (!targetClass) {
                // Nếu không có lớp mở, giả lập tạo một lớp mới
                targetClass = {
                    id: generateUniqueId('class-'),
                    courseId: course.id,
                    teacherId: 'user-2', // Giả lập giảng viên mặc định
                    className: `${course.name.replace(/\s/g, '')}-${new Date().getFullYear()}`,
                    schedule: 'T2-T4-T6, 18:00-20:00', // Lịch giả lập
                    startDate: new Date(),
                    endDate: new Date(new Date().setMonth(new Date().getMonth() + course.durationWeeks / 4)),
                    room: 'Online',
                    status: 'inProgress', // Mặc định lớp bắt đầu ngay
                    maxStudents: 20,
                    currentStudents: 0
                };
                classes.push(targetClass);
            }

            // Thêm người dùng vào danh sách học viên của lớp
            targetClass.currentStudents++;

            const newEnrollment = {
                id: generateUniqueId('enroll-'),
                studentId: userId,
                classId: targetClass.id,
                enrollmentDate: new Date(),
                status: 'active',
                paymentStatus: 'pending' // Ban đầu là pending, sau đó sẽ được kế toán cập nhật
            };
            enrollments.push(newEnrollment);

            // Chuyển đổi vai trò của người dùng thành hocVien nếu họ chỉ là registeredUser
            if (user.role === ROLES.REGISTERED_USER) {
                user.role = ROLES.HOC_VIEN;
                user.token = `fake-student-token-${generateUniqueId()}`; // Cập nhật token nếu thay đổi vai trò
            }

            resolve({ success: true, enrollment: newEnrollment, userRoleUpdated: true, newRole: ROLES.HOC_VIEN });
        }, 1000); // Giả lập thời gian xử lý thanh toán
    });
};


export const mockRegisterForPlacementTest = async (userId, testData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.id === userId);
            if (!user) {
                return reject(new Error('Người dùng không tồn tại.'));
            }
            if (placementTestRegistrations.some(ptr => ptr.userId === userId && ptr.status === 'pending')) {
                return reject(new Error('Bạn đã có đơn đăng ký kiểm tra trình độ đang chờ xử lý.'));
            }

            const newRegistration = {
                id: generateUniqueId('ptr-'),
                userId: userId,
                ...testData,
                status: 'pending'
            };
            placementTestRegistrations.push(newRegistration);
            resolve({ success: true, registration: newRegistration });
        }, 500);
    });
};


// Student specific
export const mockFetchStudentSchedule = async (studentId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const studentEnrollments = enrollments.filter(e => e.studentId === studentId && e.status === 'active');
            const studentClasses = classes.filter(cls => studentEnrollments.some(e => e.classId === cls.id));
            resolve(studentClasses);
        }, 500);
    });
};

export const mockFetchStudentGrades = async (studentId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const studentExams = examResults.filter(r => r.studentId === studentId);
            const studentSubmissionsWithGrades = studentSubmissions.filter(s => s.studentId === studentId && s.status === 'graded');
            resolve({ exams: studentExams, assignments: studentSubmissionsWithGrades });
        }, 500);
    });
};

export const mockFetchStudentMaterials = async (studentId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const studentClassIds = enrollments.filter(e => e.studentId === studentId).map(e => e.classId);
            const materials = assignments.filter(a => studentClassIds.includes(a.classId));
            resolve(materials);
        }, 500);
    });
};

export const mockFetchStudentAssignments = async (studentId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const studentClassIds = enrollments.filter(e => e.studentId === studentId).map(e => e.classId);
            const classAssignments = assignments.filter(a => studentClassIds.includes(a.classId));
            const studentSubs = studentSubmissions.filter(s => s.studentId === studentId);

            const combinedAssignments = classAssignments.map(assign => {
                const submission = studentSubs.find(sub => sub.assignmentId === assign.id);
                return {
                    ...assign,
                    submission: submission ? { ...submission } : null,
                    status: submission ? submission.status : 'pending' // Hoặc 'notSubmitted'
                };
            });
            resolve(combinedAssignments);
        }, 500);
    });
};

export const mockSubmitAssignment = async (assignmentId, studentId, submissionUrl) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const existingSubmissionIndex = studentSubmissions.findIndex(s => s.assignmentId === assignmentId && s.studentId === studentId);
            if (existingSubmissionIndex > -1) {
                studentSubmissions[existingSubmissionIndex] = {
                    ...studentSubmissions[existingSubmissionIndex],
                    submissionUrl,
                    submittedAt: new Date(),
                    status: 'submitted'
                };
                resolve({ success: true, submission: studentSubmissions[existingSubmissionIndex] });
            } else {
                const newSubmission = {
                    id: generateUniqueId('submission-'),
                    assignmentId,
                    studentId,
                    submissionUrl,
                    submittedAt: new Date(),
                    status: 'submitted'
                };
                studentSubmissions.push(newSubmission);
                resolve({ success: true, submission: newSubmission });
            }
        }, 500);
    });
};

export const mockFetchStudentPayments = async (studentId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const studentPayments = payments.filter(p => p.userId === studentId && p.type === 'tuition');
            resolve(studentPayments);
        }, 500);
    });
};

export const mockSubmitFeedback = async (feedbackData) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const newFeedback = {
                id: generateUniqueId('feedback-'),
                ...feedbackData,
                createdAt: new Date()
            };
            feedback.push(newFeedback);
            resolve({ success: true, feedback: newFeedback });
        }, 500);
    });
};

// Teacher specific
export const mockFetchTeacherClasses = async (teacherId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const teacherClasses = classes.filter(cls => cls.teacherId === teacherId);
            const classesWithCourseInfo = teacherClasses.map(cls => ({
                ...cls,
                courseName: courses.find(c => c.id === cls.courseId)?.name
            }));
            resolve(classesWithCourseInfo);
        }, 500);
    });
};

export const mockFetchClassStudents = async (classId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const enrolledStudentIds = enrollments.filter(e => e.classId === classId).map(e => e.studentId);
            const studentsInClass = users.filter(u => enrolledStudentIds.includes(u.id));
            resolve(studentsInClass.map(s => ({ id: s.id, fullName: s.fullName, username: s.username })));
        }, 500);
    });
};

export const mockFetchAttendanceByClassAndDate = async (classId, date) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const filteredAttendance = attendances.filter(a => a.classId === classId && a.date.toDateString() === new Date(date).toDateString());
            resolve(filteredAttendance);
        }, 500);
    });
};

export const mockUpdateAttendance = async (attendanceRecords) => {
    return new Promise(resolve => {
        setTimeout(() => {
            attendanceRecords.forEach(record => {
                const index = attendances.findIndex(a => a.id === record.id);
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
    return new Promise(resolve => {
        setTimeout(() => {
            const existingIndex = examResults.findIndex(e => e.studentId === resultData.studentId && e.classId === resultData.classId && e.examName === resultData.examName);
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
    return new Promise(resolve => {
        setTimeout(() => {
            const submissions = studentSubmissions.filter(s => s.assignmentId === assignmentId);
            const submissionsWithStudentInfo = submissions.map(s => ({
                ...s,
                studentName: users.find(u => u.id === s.studentId)?.fullName
            }));
            resolve(submissionsWithStudentInfo);
        }, 500);
    });
};

export const mockGradeSubmission = async (submissionId, grade, teacherComment) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = studentSubmissions.findIndex(s => s.id === submissionId);
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

// Academic specific
export const mockFetchAllUsers = async () => {
    return new Promise(resolve => {
        setTimeout(() => resolve([...users]), 500);
    });
};

export const mockAddUser = async (userData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (users.some(u => u.username === userData.username || u.email === userData.email)) {
                return reject(new Error('Tên đăng nhập hoặc Email đã tồn tại.'));
            }
            const newUser = { id: generateUniqueId('user-'), ...userData, status: 'active', token: `fake-token-${generateUniqueId()}` };
            users.push(newUser);
            resolve(newUser);
        }, 500);
    });
};

export const mockUpdateUser = async (userId, updatedData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = users.findIndex(u => u.id === userId);
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
            users = users.filter(u => u.id !== userId);
            if (users.length < initialLength) {
                resolve({ success: true });
            } else {
                reject(new Error('Không tìm thấy người dùng để xóa.'));
            }
        }, 500);
    });
};

export const mockCreateCourse = async (courseData) => {
    return new Promise(resolve => {
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
            const index = courses.findIndex(c => c.id === courseId);
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
            courses = courses.filter(c => c.id !== courseId);
            if (courses.length < initialLength) {
                resolve({ success: true });
            } else {
                reject(new Error('Không tìm thấy khóa học để xóa.'));
            }
        }, 500);
    });
};

export const mockCreateClass = async (classData) => {
    return new Promise(resolve => {
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
            const index = classes.findIndex(c => c.id === classId);
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
            classes = classes.filter(c => c.id !== classId);
            if (classes.length < initialLength) {
                resolve({ success: true });
            } else {
                reject(new Error('Không tìm thấy lớp học để xóa.'));
            }
        }, 500);
    });
};

export const mockFetchPlacementTestRegistrations = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const registrationsWithUserInfo = placementTestRegistrations.map(reg => ({
                ...reg,
                userName: users.find(u => u.id === reg.userId)?.fullName,
                userEmail: users.find(u => u.id === reg.userId)?.email,
            }));
            resolve(registrationsWithUserInfo);
        }, 500);
    });
};

export const mockUpdatePlacementTestStatus = async (regId, newStatus, assignedClassId = null) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = placementTestRegistrations.findIndex(r => r.id === regId);
            if (index > -1) {
                placementTestRegistrations[index].status = newStatus;
                if (assignedClassId) {
                    placementTestRegistrations[index].assignedClassId = assignedClassId;
                    // Nếu được xếp lớp, tạo enrollment và chuyển đổi vai trò
                    const user = users.find(u => u.id === placementTestRegistrations[index].userId);
                    if (user && user.role === ROLES.REGISTERED_USER) {
                        user.role = ROLES.HOC_VIEN;
                        user.token = `fake-student-token-${generateUniqueId()}`;
                        const newEnrollment = {
                            id: generateUniqueId('enroll-'),
                            studentId: user.id,
                            classId: assignedClassId,
                            enrollmentDate: new Date(),
                            status: 'active',
                            paymentStatus: 'pending' // Có thể yêu cầu thanh toán sau
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
    return new Promise(resolve => {
        setTimeout(() => resolve([...payments]), 500);
    });
};

export const mockUpdatePaymentStatus = async (paymentId, newStatus) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = payments.findIndex(p => p.id === paymentId);
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
            const payment = payments.find(p => p.id === paymentId);
            if (payment) {
                // Giả lập tạo hóa đơn (trong thực tế có thể là PDF link)
                resolve({ success: true, invoiceUrl: `fake-invoice-${paymentId}.pdf` });
            } else {
                reject(new Error('Không tìm thấy thanh toán để tạo hóa đơn.'));
            }
        }, 500);
    });
};

export const mockCalculatePayroll = async (period) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const teachers = users.filter(u => u.role === ROLES.GIANG_VIEN);
            const payrollData = teachers.map(teacher => {
                const baseSalary = 8000000; // Giả lập lương cơ bản
                const bonus = 0; // Có thể tính toán dựa trên hiệu suất
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
                    status: 'calculated'
                };
            });
            resolve(payrollData);
        }, 500);
    });
};

export const mockRecordPayment = async (paymentData) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const newPayment = { id: generateUniqueId('payment-'), ...paymentData, paymentDate: new Date(), status: 'completed' };
            payments.push(newPayment);
            resolve(newPayment);
        }, 500);
    });
};

export const mockGenerateFinancialReport = async (month, year) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const revenues = payments.filter(p => p.type === 'tuition' && p.paymentDate.getMonth() + 1 === month && p.paymentDate.getFullYear() === year).reduce((sum, p) => sum + p.amount, 0);
            const expenses = payments.filter(p => p.type === 'salary' && p.paymentDate.getMonth() + 1 === month && p.paymentDate.getFullYear() === year).reduce((sum, p) => sum + p.amount, 0); // Đơn giản là lương
            resolve({ month, year, totalRevenue: revenues, totalExpenses: expenses, netProfit: revenues - expenses });
        }, 500);
    });
};

// Admin specific
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
    return new Promise(resolve => {
        setTimeout(() => {
            const allClasses = classes.map(cls => ({
                ...cls,
                courseName: courses.find(c => c.id === cls.courseId)?.name,
                teacherName: users.find(u => u.id === cls.teacherId)?.fullName
            }));
            resolve(allClasses);
        }, 500);
    });
};

export const mockFetchAllFeedbacks = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const feedbacksWithUserInfo = feedback.map(f => ({
                ...f,
                studentName: users.find(u => u.id === f.studentId)?.fullName,
                className: f.classId ? classes.find(c => c.id === f.classId)?.className : 'N/A'
            }));
            resolve(feedbacksWithUserInfo);
        }, 500);
    });
};

export const mockAnalyzeFeedbackWithAI = async (feedbackText) => {
    return new Promise(resolve => {
        setTimeout(() => {
            // Đây chỉ là một mô phỏng rất đơn giản cho phân tích AI
            let sentiment = 'neutral';
            if (feedbackText.toLowerCase().includes('tuyệt vời') || feedbackText.toLowerCase().includes('hài lòng') || feedbackText.toLowerCase().includes('tốt')) {
                sentiment = 'positive';
            } else if (feedbackText.toLowerCase().includes('kém') || feedbackText.toLowerCase().includes('không hài lòng') || feedbackText.toLowerCase().includes('tệ')) {
                sentiment = 'negative';
            }
            const keywords = feedbackText.toLowerCase().split(' ').filter(word => word.length > 3 && !['là', 'một', 'không', 'rất', 'cần'].includes(word)).slice(0, 3);
            resolve({
                sentiment: sentiment,
                keywords: keywords,
                summary: `Phân tích AI: Phản hồi có xu hướng ${sentiment} với các từ khóa chính: ${keywords.join(', ')}.`,
            });
        }, 1000);
    });
};

export const mockSendGlobalNotification = async (notificationData) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const newNotification = { id: generateUniqueId('notif-'), ...notificationData, createdAt: new Date() };
            notifications.push(newNotification);
            resolve({ success: true, notification: newNotification });
        }, 500);
    });
};

export const mockUpdateWebsiteContent = async (section, content) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Updated website content for ${section}:`, content);
            resolve({ success: true, message: `Nội dung phần '${section}' đã được cập nhật.` });
        }, 500);
    });
};

export const mockFetchAllNotifications = async () => {
    return new Promise(resolve => {
        setTimeout(() => resolve([...notifications]), 500);
    });
};