// src/services/adminService.js
import { mockFetchDashboardStats, mockFetchAllUsers, mockUpdateUser, mockDeleteUser,
         mockFetchAllClasses, mockFetchAllFeedbacks, mockAnalyzeFeedbackWithAI,
         mockSendGlobalNotification, mockUpdateWebsiteContent, mockFetchAllNotifications } from '../mockData/mockdata';

const getDashboardStats = async () => {
    try {
        const stats = await mockFetchDashboardStats();
        return stats;
    } catch (error) {
        throw error;
    }
};

const getAllUsersAdmin = async () => { // Đổi tên để tránh trùng với academicService.getAllUsers
    try {
        const users = await mockFetchAllUsers();
        return users;
    } catch (error) {
        throw error;
    }
};

const updateUserAdmin = async (userId, updatedData) => {
    try {
        const user = await mockUpdateUser(userId, updatedData);
        return user;
    } catch (error) {
        throw error;
    }
};

const deleteUserAdmin = async (userId) => {
    try {
        const result = await mockDeleteUser(userId);
        return result;
    } catch (error) {
        throw error;
    }
};

const getAllClassesAdmin = async () => {
    try {
        const classes = await mockFetchAllClasses();
        return classes;
    } catch (error) {
        throw error;
    }
};

const getAllFeedbacks = async () => {
    try {
        const feedbacks = await mockFetchAllFeedbacks();
        return feedbacks;
    } catch (error) {
        throw error;
    }
};

const analyzeFeedback = async (feedbackText) => {
    try {
        const analysis = await mockAnalyzeFeedbackWithAI(feedbackText);
        return analysis;
    } catch (error) {
        throw error;
    }
};

const sendGlobalNotification = async (notificationData) => {
    try {
        const result = await mockSendGlobalNotification(notificationData);
        return result;
    } catch (error) {
        throw error;
    }
};

const updateWebsiteContent = async (section, content) => {
    try {
        const result = await mockUpdateWebsiteContent(section, content);
        return result;
    } catch (error) {
        throw error;
    }
};

const getAllNotifications = async () => {
    try {
        const notifications = await mockFetchAllNotifications();
        return notifications;
    } catch (error) {
        throw error;
    }
};

const adminService = {
  getDashboardStats,
  getAllUsersAdmin, updateUserAdmin, deleteUserAdmin,
  getAllClassesAdmin,
  getAllFeedbacks, analyzeFeedback,
  sendGlobalNotification,
  updateWebsiteContent,
  getAllNotifications,
};

export default adminService;