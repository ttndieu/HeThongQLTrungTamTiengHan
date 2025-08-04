// src/services/adminService.js
import * as mockAPI from '../mockData/mockdata';

const getDashboardStats = () => mockAPI.mockFetchDashboardStats();

const getAllUsersAdmin = () => mockAPI.mockFetchAllUsers();

const updateUserAdmin = (userId, updatedData) => mockAPI.mockUpdateUser(userId, updatedData);

const deleteUserAdmin = (userId) => mockAPI.mockDeleteUser(userId);

const getAllClassesAdmin = () => mockAPI.mockFetchAllClasses();

const getAllFeedbacks = () => mockAPI.mockFetchAllFeedbacks();

const analyzeFeedback = (feedbackText) => mockAPI.mockAnalyzeFeedbackWithAI(feedbackText);

const sendGlobalNotification = (notificationData) => mockAPI.mockSendGlobalNotification(notificationData);

const updateWebsiteContent = (section, content) => mockAPI.mockUpdateWebsiteContent(section, content);

const getAllNotifications = () => mockAPI.mockFetchAllNotifications();

const getOverallReports = () => mockAPI.mockGetOverallReports();

const getSystemSettings = () => mockAPI.mockGetSystemSettings();

const updateSystemSettings = (settingsData) => mockAPI.mockUpdateSystemSettings(settingsData);

const createUserAdmin = (userData) => mockAPI.mockCreateUser(userData);


const adminService = {
  getDashboardStats,
  getAllUsersAdmin,
  createUserAdmin,
  updateUserAdmin,
  deleteUserAdmin,
  getAllClassesAdmin,
  getAllFeedbacks,
  analyzeFeedback,
  sendGlobalNotification,
  updateWebsiteContent,
  getAllNotifications,
  getOverallReports,
  getSystemSettings,
  updateSystemSettings,
};

export default adminService;
