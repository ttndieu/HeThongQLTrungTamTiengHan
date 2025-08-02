// src/services/academicService.js
import { mockFetchAllUsers, mockAddUser, mockUpdateUser, mockDeleteUser,
         mockCreateCourse, mockUpdateCourse, mockDeleteCourse,
         mockCreateClass, mockUpdateClass, mockDeleteClass,
         mockFetchPlacementTestRegistrations, mockUpdatePlacementTestStatus,
         mockSendGlobalNotification } from '../mockData/mockdata'; // Lấy thêm mockSendGlobalNotification

const getAllUsers = async () => {
    try {
        const users = await mockFetchAllUsers();
        return users;
    } catch (error) {
        throw error;
    }
};

const addUser = async (userData) => {
    try {
        const user = await mockAddUser(userData);
        return user;
    } catch (error) {
        throw error;
    }
};

const updateUser = async (userId, updatedData) => {
    try {
        const user = await mockUpdateUser(userId, updatedData);
        return user;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        const result = await mockDeleteUser(userId);
        return result;
    } catch (error) {
        throw error;
    }
};

const createCourse = async (courseData) => {
    try {
        const course = await mockCreateCourse(courseData);
        return course;
    } catch (error) {
        throw error;
    }
};

const updateCourse = async (courseId, updatedData) => {
    try {
        const course = await mockUpdateCourse(courseId, updatedData);
        return course;
    } catch (error) {
        throw error;
    }
};

const deleteCourse = async (courseId) => {
    try {
        const result = await mockDeleteCourse(courseId);
        return result;
    } catch (error) {
        throw error;
    }
};

const createClass = async (classData) => {
    try {
        const newClass = await mockCreateClass(classData);
        return newClass;
    } catch (error) {
        throw error;
    }
};

const updateClass = async (classId, updatedData) => {
    try {
        const updatedClass = await mockUpdateClass(classId, updatedData);
        return updatedClass;
    } catch (error) {
        throw error;
    }
};

const deleteClass = async (classId) => {
    try {
        const result = await mockDeleteClass(classId);
        return result;
    } catch (error) {
        throw error;
    }
};

const getPlacementTestRegistrations = async () => {
    try {
        const registrations = await mockFetchPlacementTestRegistrations();
        return registrations;
    } catch (error) {
        throw error;
    }
};

const updatePlacementTestStatus = async (regId, newStatus, assignedClassId = null) => {
    try {
        const result = await mockUpdatePlacementTestStatus(regId, newStatus, assignedClassId);
        return result;
    } catch (error) {
        throw error;
    }
};

const sendNotification = async (notificationData) => {
    try {
        const result = await mockSendGlobalNotification(notificationData);
        return result;
    } catch (error) {
        throw error;
    }
};

const academicService = {
  getAllUsers, addUser, updateUser, deleteUser,
  createCourse, updateCourse, deleteCourse,
  createClass, updateClass, deleteClass,
  getPlacementTestRegistrations, updatePlacementTestStatus,
  sendNotification,
};

export default academicService;