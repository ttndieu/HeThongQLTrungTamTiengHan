// src/services/publicService.js
import { mockFetchCourses, mockFetchCourseById, mockFetchTeachers, mockContactUs, mockApplyAsTeacher } from '../mockData/mockdata';

const getCourses = async () => {
  try {
    const courses = await mockFetchCourses();
    return courses;
  } catch (error) {
    throw error;
  }
};

const getCourseById = async (id) => {
  try {
    const course = await mockFetchCourseById(id);
    return course;
  } catch (error) {
    throw error;
  }
};

const getTeachers = async () => {
    try {
        const teachers = await mockFetchTeachers();
        return teachers;
    } catch (error) {
        throw error;
    }
};

const submitContactForm = async (formData) => {
    try {
        const response = await mockContactUs(formData);
        return response;
    } catch (error) {
        throw error;
    }
};

const applyAsTeacher = async (applicationData) => {
    try {
        const response = await mockApplyAsTeacher(applicationData);
        return response;
    } catch (error) {
        throw error;
    }
};

const publicService = {
  getCourses,
  getCourseById,
  getTeachers,
  submitContactForm,
  applyAsTeacher,
};

export default publicService;