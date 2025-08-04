import {
  mockFetchTeacherClasses,
  mockFetchClassStudents,
  mockFetchAttendanceByClassAndDate,
  mockUpdateAttendance,
  mockEnterExamResult,
  mockFetchSubmissionsForAssignment,
  mockGradeSubmission,
  mockFetchTeacherSchedule,
  mockUploadMaterial,
  mockFetchTeacherSalary,
  mockSendNotification,
  mockFetchNotifications,
  mockSubmitGrades,
  mockFetchStudentNotes,
  mockSaveStudentNote,
  mockFetchAssignments,
} from '../mockData/mockdata';
import { mockDelay } from '../utils/helpers';

export const getTeacherClasses = async (teacherId) => {
  await mockDelay(500);
  return await mockFetchTeacherClasses(teacherId);
};

export const getClassStudents = async (classId) => {
  await mockDelay(500);
  return await mockFetchClassStudents(classId);
};

export const submitGrades = async (data) => {
  await mockDelay(500);
  return await mockSubmitGrades(data);
};

export const getAttendanceByClassAndDate = async (classId, date) => {
  await mockDelay(500);
  return await mockFetchAttendanceByClassAndDate(classId, date);
};

export const updateAttendance = async (attendanceRecords) => {
  await mockDelay(500);
  return await mockUpdateAttendance(attendanceRecords);
};
export const submitComment = async (assignmentId, studentId, comment) => {
  await mockDelay(500);
  return {
    assignmentId,
    studentId,
    comment,
    message: 'Gửi nhận xét thành công',
  };
};
export const enterExamResult = async (resultData) => {
  await mockDelay(500);
  return await mockEnterExamResult(resultData);
};

export const fetchSubmissionsForAssignment = async (assignmentId) => {
  await mockDelay(500);
  return await mockFetchSubmissionsForAssignment(assignmentId);
};

export const gradeSubmission = async (submissionId, grade, teacherComment) => {
  await mockDelay(500);
  return await mockGradeSubmission(submissionId, grade, teacherComment);
};

export const getTeacherSchedule = async (teacherId) => {
  await mockDelay(500);
  return await mockFetchTeacherSchedule(teacherId);
};

export const markAttendance = async (classId, studentId, date, status) => {
  await mockDelay(500);
  return {
    classId,
    studentId,
    date,
    status,
    message: 'Điểm danh thành công',
  };
};

export const uploadMaterial = async (classId, material) => {
  await mockDelay(500);
  return await mockUploadMaterial(classId, material);
};

export const getTeacherSalary = async (teacherId) => {
  await mockDelay(500);
  return await mockFetchTeacherSalary(teacherId);
};

export const sendNotification = async (notificationData) => {
  await mockDelay(500);
  return await mockSendNotification(notificationData);
};

export const getNotifications = async (teacherId) => {
  await mockDelay(500);
  return await mockFetchNotifications(teacherId);
};

export const getAssignments = async (teacherId) => {
  await mockDelay(500);
  return await mockFetchAssignments(teacherId);
};

export { mockFetchStudentNotes, mockSaveStudentNote };

const teacherService = {
  getTeacherClasses,
  getClassStudents,
  submitGrades,
  mockFetchStudentNotes,
  mockSaveStudentNote,
  getAttendanceByClassAndDate,
  updateAttendance,
  enterExamResult,
  fetchSubmissionsForAssignment,
  gradeSubmission,
  getTeacherSchedule,
  markAttendance,
  uploadMaterial,
  getTeacherSalary,
  sendNotification,
  getNotifications,
  getAssignments,
  submitComment,
};

export default teacherService;