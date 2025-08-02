// src/services/authService.js

import { mockLogin, mockRegister, mockUpdateProfile } from '../mockData/mockdata';



const login = async (username, password) => {

    try {

        const user = await mockLogin(username, password);

        return user;

    } catch (error) {

        throw error;

    }

};



const register = async (userData) => {

    try {

        const newUser = await mockRegister(userData);

        return newUser;

    } catch (error) {

        throw error;

    }

};



const updateProfile = async (userId, updatedData) => {

    try {

        const updatedUser = await mockUpdateProfile(userId, updatedData);

        return updatedUser;

    } catch (error) {

        throw error;

    }

};



// Bạn có thể thêm các hàm khác như `forgotPassword`, `resetPassword` ở đây

const authService = {

    login,

    register,

    updateProfile,

};



export default authService; 