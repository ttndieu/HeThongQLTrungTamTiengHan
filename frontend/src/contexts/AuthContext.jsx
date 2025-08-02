// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService'; // Đảm bảo import đúng
import { useNotification } from './NotificationContext';
import { ROLES } from '../utils/constants'; // Import ROLES nếu cần dùng ở đây

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const { showNotification } = useNotification();

  // Hàm này sẽ được gọi khi đăng nhập thành công và bạn đã có đối tượng user
  // Cập nhật: Hàm login giờ nhận 'authenticatedUser' (là user object từ mockLogin)
  const login = useCallback((authenticatedUser) => { // Thay đổi tham số từ (username, password) sang (authenticatedUser)
    try {
      setUser(authenticatedUser);
      setToken(authenticatedUser.token);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      localStorage.setItem('token', authenticatedUser.token);
      setIsAuthenticated(true);
      showNotification('Đăng nhập thành công!', 'success'); // Có thể bỏ dòng này nếu đã xử lý ở LoginPage
      // Không cần setLoading(false) ở đây vì LoginPage đã xử lý rồi
      return authenticatedUser; // Trả về user để LoginPage có thể dùng tiếp
    } catch (error) {
      console.error('Login failed in AuthContext:', error);
      showNotification(error.message || 'Đăng nhập thất bại.', 'error');
      // Không cần throw error ở đây vì AuthContext là nơi quản lý state, không phải nơi gọi API
    }
  }, [showNotification]);


  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    showNotification('Bạn đã đăng xuất.', 'info');
  }, [showNotification]);

  // Kiểm tra trạng thái đăng nhập khi khởi tạo ứng dụng
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        logout(); // Đăng xuất nếu dữ liệu bị lỗi
      }
    }
    setLoading(false); // Kết thúc loading sau khi kiểm tra
  }, [logout]);


  const authData = {
    user,
    token,
    isAuthenticated,
    loading, // Thêm loading vào context value
    ROLES, // Để các component con có thể truy cập
    login,
    logout,
  };

  if (loading) {
    return <div>Đang tải xác thực...</div>; // Hoặc một LoadingSpinner toàn màn hình
  }

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};