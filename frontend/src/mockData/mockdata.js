import { generateUniqueId } from '../utils/helpers';
import { ROLES } from '../utils/constants';

// Giả lập cơ sở dữ liệu
let users = [
  { id: 'user-1', username: 'student1', email: 'student1@example.com', fullName: 'Nguyễn Văn A', role: ROLES.HOC_VIEN, token: 'fake-student-token-123', phone: '0901111111', address: '123 Đường Học Viên', password: '123' },
  {id: 'user-11', username: 'student11', email: 'student1@example.com', fullName: 'Nguyễn Văn AN', role: ROLES.HOC_VIEN, token: 'fake-student-token-123', phone: '09018881111', address: '1234 Đường Học Viên', password: '123' },
  { id: 'user-2', username: 'teacher1', email: 'teacher1@example.com', fullName: 'Lê Thị B', role: ROLES.GIANG_VIEN, token: 'fake-teacher-token-456', phone: '0902222222', address: '456 Đường Giảng Viên', status: 'approved', password: '123' },
  { id: 'user-3', username: 'academic_manager', email: 'academic@example.com', fullName: 'Phạm Văn C', role: ROLES.QUAN_LY_HOC_VU, token: 'fake-academic-token-789', phone: '0903333333', address: '789 Đường Quản Lý', password: '123' },
  { id: 'user-4', username: 'accountant', email: 'accountant@example.com', fullName: 'Trần Thị D', role: ROLES.KE_TOAN, token: 'fake-accountant-token-101', phone: '0904444444', address: '101 Đường Kế Toán', password: '123' },
  { id: 'user-5', username: 'admin', email: 'admin@example.com', fullName: 'Hoàng Văn E', role: ROLES.QUAN_TRI_HE_THONG, token: 'fake-admin-token-112', phone: '0905555555', address: '112 Đường Quản Trị', password: '123' },
  { id: 'user-6', username: 'newuser', email: 'newuser@example.com', fullName: 'Đặng Đình F', role: ROLES.REGISTERED_USER, token: 'fake-registered-token-131', phone: '0906666666', address: '131 Đường Đăng Ký Mới', password: '123' },
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
  { id: 'enroll-1', studentId: 'user-1', classId: 'class-1', enrollmentDate: new Date('2025-07-25'), status: 'active', paymentStatus: 'paid' },
{ id: 'enroll-11', studentId: 'user-11', classId: 'class-1', enrollmentDate: new Date('2025-07-25'), status: 'active', paymentStatus: 'paid' },
];

let schedules = [
  { id: 'sch-1', classId: 'class-1', className: 'SC1-A2025', teacherId: 'user-2', time: '2025-08-03 18:00', location: 'Phòng A101' },
  { id: 'sch-2', classId: 'class-2', className: 'TC1-B2025', teacherId: 'user-2', time: '2025-09-02 19:00', location: 'Phòng B203' },
];

let assignments = [
  { id: 'assign-1', classId: 'class-1', title: 'Bài tập về nhà tuần 1', description: 'Viết đoạn văn giới thiệu bản thân.', dueDate: new Date('2025-08-08'), materialUrl: 'https://docs.google.com/document/d/1' },
  { id: 'assign-2', classId: 'class-1', title: 'Bài tập nghe tuần 2', description: 'Nghe và trả lời câu hỏi.', dueDate: new Date('2025-08-15'), materialUrl: 'https://docs.google.com/document/d/2' },
];

let studentSubmissions = [
  { id: 'submission-1', assignmentId: 'assign-1', studentId: 'user-1', submissionUrl: 'https://docs.google.com/document/d/2', submittedAt: new Date('2025-08-07'), status: 'pending' },
];

let attendances = [
  { id: 'attend-1', studentId: 'user-1', classId: 'class-1', date: new Date('2025-08-01'), status: 'present' },
  { id: 'attend-2', studentId: 'user-1', classId: 'class-1', date: new Date('2025-08-04'), status: 'absent' },
];

let examResults = [
  { id: 'exam-1', studentId: 'user-1', classId: 'class-1', examName: 'Kiểm tra giữa kỳ', score: 85, teacherComment: 'Làm tốt, cần cải thiện phát âm.', examDate: new Date('2025-09-15') },
];
let studentNotes = [
  { id: '1', classId: 'class-1', studentId: 'user-1', note: 'Cần cải thiện phát âm.' },
];


let payments = [
  { id: 'payment-1', userId: 'user-1', description: 'Học phí Tiếng Hàn Sơ Cấp 1', amount: 2500000, paymentDate: new Date('2025-07-20'), type: 'tuition', status: 'completed', classId: 'class-1' },
  { id: 'payment-2', userId: 'user-2', description: 'Lương tháng 7/2025', amount: 8000000, paymentDate: new Date('2025-08-01'), type: 'salary', status: 'completed', payrollPeriod: '07/2025' },
  { id: 'payment-3', userId: 'user-2', description: 'Lương tháng 8/2025', amount: 8500000, paymentDate: new Date('2025-09-01'), type: 'salary', status: 'pending', payrollPeriod: '08/2025' },
];

let notifications = [
  { id: 'notif-1', title: 'Thông báo nghỉ lễ', content: 'Trung tâm nghỉ lễ 02/09.', createdAt: new Date('2025-08-20'), recipients: ['all'], teacherId: null },
  { id: 'notif-2', title: 'Nhắc nhở nộp học phí', content: 'Học phí khóa học TC1 đến hạn.', createdAt: new Date('2025-07-28'), recipients: ['user-1'], teacherId: 'user-2' },
  { id: 'notif-3', title: 'Lịch thi mới', content: 'Lớp SC1-A2025 có lịch thi giữa kỳ.', createdAt: new Date('2025-08-25'), recipients: ['class-1'], teacherId: 'user-2' },
];

let placementTestRegistrations = [
  { id: 'ptr-1', userId: 'user-6', preferredDate: new Date('2025-08-15'), preferredTime: '10:00', status: 'pending', notes: 'Muốn kiểm tra sớm.' },
];

// --- Hàm mô phỏng API ---

// Auth & User
export const mockLogin = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const inputUsername = String(username || '').trim().toLowerCase();
      const inputPassword = String(password || '').trim();

      console.log('--- ĐANG KIỂM TRA ĐĂNG NHẬP ---');
      console.log('Tên đăng nhập:', inputUsername);
      console.log('Mật khẩu:', inputPassword);

      const user = users.find(
        (u) => String(u.username || '').trim().toLowerCase() === inputUsername && String(u.password || '').trim() === inputPassword
      );

      if (user) {
        console.log('Đăng nhập thành công cho người dùng:', user.username);
        resolve({ ...user });
      } else {
        console.log('Đăng nhập thất bại: Không tìm thấy người dùng khớp.');
        reject(new Error('Tên đăng nhập hoặc mật khẩu không đúng.'));
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
  return new Promise((resolve) => {
    setTimeout(() => resolve([...courses]), 300);
  });
};

export const mockFetchCourseById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const course = courses.find((c) => c.id === id);
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

export const mockAddUser = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users.some((u) => u.username === userData.username || u.email === userData.email)) {
        return reject(new Error('Tên đăng nhập hoặc Email đã tồn tại.'));
      }
      const newUser = { id: generateUniqueId('user-'), ...userData, status: 'active', token: `fake-token-${generateUniqueId()}`, password: '123' };
      users.push(newUser);
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

// Admin specific
export const mockFetchDashboardStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalStudents: users.filter((u) => u.role === ROLES.HOC_VIEN).length,
        totalTeachers: users.filter((u) => u.role === ROLES.GIANG_VIEN && u.status === 'approved').length,
        totalCourses: courses.length,
        totalClasses: classes.length,
        activeClasses: classes.filter((c) => c.status === 'inProgress').length,
        pendingTeacherApplications: users.filter((u) => u.role === ROLES.GIANG_VIEN && u.status === 'pendingApproval').length,
        totalRevenueLastMonth: payments.filter((p) => p.type === 'tuition' && p.paymentDate.getMonth() === new Date().getMonth() - 1).reduce((sum, p) => sum + p.amount, 0),
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
};

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
  return new Promise((resolve) => {
    setTimeout(() => {
      const newNotification = { id: generateUniqueId('notif-'), ...notificationData, createdAt: new Date() };
      notifications.push(newNotification);
      resolve({ success: true, notification: newNotification });
    }, 500);
  });
};

export const mockUpdateWebsiteContent = async (section, content) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Updated website content for ${section}:`, content);
      resolve({ success: true, message: `Nội dung phần '${section}' đã được cập nhật.` });
    }, 500);
  });
};

export const mockFetchAllNotifications = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...notifications]), 500);
  });
};

export const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export {
  enrollments, // Thêm dòng nà

};