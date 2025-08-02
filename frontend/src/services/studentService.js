// src/services/studentService.js
import { mockEnrollCourseDirectly, mockRegisterForPlacementTest, mockFetchStudentSchedule, mockFetchStudentGrades, mockFetchStudentMaterials, mockFetchStudentAssignments, mockSubmitAssignment, mockFetchStudentPayments, mockSubmitFeedback } from '../mockData/mockdata';

const enrollCourse = async (userId, courseId) => {
    try {
        const result = await mockEnrollCourseDirectly(userId, courseId);
        return result;
    } catch (error) {
        throw error;
    }
};

const registerForPlacementTest = async (userId, testData) => {
    try {
        const result = await mockRegisterForPlacementTest(userId, testData);
        return result;
    } catch (error) {
        throw error;
    }
};

const getStudentSchedule = async (studentId) => {
    try {
        const schedule = await mockFetchStudentSchedule(studentId);
        return schedule;
    } catch (error) {
        throw error;
    }
};

const getStudentGrades = async (studentId) => {
    try {
        const grades = await mockFetchStudentGrades(studentId);
        return grades;
    } catch (error) {
        throw error;
    }
};

const getStudentMaterials = async (studentId) => {
    try {
        const materials = await mockFetchStudentMaterials(studentId);
        return materials;
    } catch (error) {
        throw error;
    }
};

const getStudentAssignments = async (studentId) => {
    try {
        const assignments = await mockFetchStudentAssignments(studentId);
        return assignments;
    } catch (error) {
        throw error;
    }
};

const submitAssignment = async (assignmentId, studentId, submissionUrl) => {
    try {
        const submission = await mockSubmitAssignment(assignmentId, studentId, submissionUrl);
        return submission;
    } catch (error) {
        throw error;
    }
};

const getStudentPayments = async (studentId) => {
    try {
        const payments = await mockFetchStudentPayments(studentId);
        return payments;
    } catch (error) {
        throw error;
    }
};

const submitFeedback = async (feedbackData) => {
    try {
        const feedback = await mockSubmitFeedback(feedbackData);
        return feedback;
    } catch (error) {
        throw error;
    }
};

const studentService = {
  enrollCourse,
  registerForPlacementTest,
  getStudentSchedule,
  getStudentGrades,
  getStudentMaterials,
  getStudentAssignments,
  submitAssignment,
  getStudentPayments,
  submitFeedback,
};

export default studentService;