// src/types/index.js
/**
 * @typedef {'hocVien'|'giangVien'|'quanLyHocVu'|'keToan'|'quanTriHeThong'|'registeredUser'|'guest'} UserRole
 */

/**
 * @typedef {object} User
 * @property {string} id - ID duy nhất của người dùng.
 * @property {string} username - Tên đăng nhập.
 * @property {string} email - Email của người dùng.
 * @property {string} fullName - Tên đầy đủ.
 * @property {UserRole} role - Vai trò của người dùng.
 * @property {string} [token] - Token xác thực (chỉ có khi đăng nhập).
 * @property {string} [avatarUrl] - URL ảnh đại diện.
 * @property {string} [phone] - Số điện thoại.
 * @property {string} [address] - Địa chỉ.
 * @property {string} [status] - Trạng thái (ví dụ: 'active', 'pendingApproval', 'inactive').
 */

/**
 * @typedef {object} Course
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} level - (Sơ cấp, Trung cấp, Nâng cao, TOPIK)
 * @property {number} durationWeeks
 * @property {string} [imageUrl]
 */

/**
 * @typedef {object} Class
 * @property {string} id
 * @property {string} courseId
 * @property {string} teacherId
 * @property {string} className
 * @property {string} schedule - (ví dụ: "T2-T4-T6, 18:00-20:00")
 * @property {Date} startDate
 * @property {Date} endDate
 * @property {string} room
 * @property {'open'|'inProgress'|'closed'} status
 * @property {number} maxStudents
 * @property {number} currentStudents
 */

/**
 * @typedef {object} Assignment
 * @property {string} id
 * @property {string} classId
 * @property {string} title
 * @property {string} description
 * @property {Date} dueDate
 * @property {string} materialUrl - (Link Google Drive, Dropbox,...)
 */

/**
 * @typedef {object} StudentAssignment
 * @property {string} id
 * @property {string} assignmentId
 * @property {string} studentId
 * @property {string} submissionUrl
 * @property {Date} submittedAt
 * @property {number} [grade]
 * @property {string} [teacherComment]
 * @property {'submitted'|'graded'|'pending'} status
 */

/**
 * @typedef {object} AttendanceRecord
 * @property {string} id
 * @property {string} studentId
 * @property {string} classId
 * @property {Date} date
 * @property {boolean} isPresent
 */

/**
 * @typedef {object} ExamResult
 * @property {string} id
 * @property {string} studentId
 * @property {string} classId
 * @property {string} examName
 * @property {number} score
 * @property {string} [teacherComment]
 * @property {Date} examDate
 */

/**
 * @typedef {object} Payment
 * @property {string} id
 * @property {string} userId
 * @property {string} description
 * @property {number} amount
 * @property {Date} paymentDate
 * @property {'tuition'|'salary'|'bonus'|'penalty'} type
 * @property {'pending'|'completed'|'refunded'} status
 * @property {string} [classId] - Áp dụng cho học phí
 * @property {string} [payrollPeriod] - Áp dụng cho lương
 */

/**
 * @typedef {object} Feedback
 * @property {string} id
 * @property {string} studentId
 * @property {string} [classId]
 * @property {string} content
 * @property {number} [rating] - (1-5 sao)
 * @property {Date} createdAt
 * @property {string} [response] - Phản hồi từ trung tâm
 */

/**
 * @typedef {object} Notification
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {Date} createdAt
 * @property {string[]} recipients - (['all', 'hocVien', 'giangVien', userId])
 * @property {boolean} isRead - (Đối với người dùng cụ thể)
 */