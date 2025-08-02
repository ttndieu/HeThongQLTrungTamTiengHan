// src/services/teacherService.js
import { mockFetchTeacherClasses, mockFetchClassStudents, mockFetchAttendanceByClassAndDate, mockUpdateAttendance, mockEnterExamResult, mockFetchSubmissionsForAssignment, mockGradeSubmission } from '../mockData/mockdata';

const getTeacherClasses = async (teacherId) => {
    try {
        const classes = await mockFetchTeacherClasses(teacherId);
        return classes;
    } catch (error) {
        throw error;
    }
};

const getClassStudents = async (classId) => {
    try {
        const students = await mockFetchClassStudents(classId);
        return students;
    } catch (error) {
        throw error;
    }
};

const getAttendanceByClassAndDate = async (classId, date) => {
    try {
        const attendance = await mockFetchAttendanceByClassAndDate(classId, date);
        return attendance;
    } catch (error) {
        throw error;
    }
};

const updateAttendance = async (attendanceRecords) => {
    try {
        const result = await mockUpdateAttendance(attendanceRecords);
        return result;
    } catch (error) {
        throw error;
    }
};

const enterExamResult = async (resultData) => {
    try {
        const result = await mockEnterExamResult(resultData);
        return result;
    } catch (error) {
        throw error;
    }
};

const fetchSubmissionsForAssignment = async (assignmentId) => {
    try {
        const submissions = await mockFetchSubmissionsForAssignment(assignmentId);
        return submissions;
    } catch (error) {
        throw error;
    }
};

const gradeSubmission = async (submissionId, grade, teacherComment) => {
    try {
        const result = await mockGradeSubmission(submissionId, grade, teacherComment);
        return result;
    } catch (error) {
        throw error;
    }
};

const teacherService = {
  getTeacherClasses,
  getClassStudents,
  getAttendanceByClassAndDate,
  updateAttendance,
  enterExamResult,
  fetchSubmissionsForAssignment,
  gradeSubmission,
  // Thêm hàm lấy lương nếu có
};

export default teacherService;