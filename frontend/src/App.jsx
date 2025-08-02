// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext'; // Nếu bạn dùng ThemeContext

// Import các nhóm routes đã tạo
import PublicRoutes from './routes/PublicRoutes';
import AuthRoutes from './routes/AuthRoutes';
import DashboardRoutes from './routes/DashboardRoutes';

// Import trang 404
import NotFoundPage from './pages/NotFoundPage';

// Import CSS global (tailwind)
import './App.css';

// Thêm div cho modal nếu bạn sử dụng ReactDOM.createPortal
function App() {
  return (
    <Router>
      {/* Cung cấp các Context cho toàn bộ ứng dụng */}
      <NotificationProvider>
        <AuthProvider>
          <ThemeProvider> {/* Chỉ thêm nếu bạn sử dụng ThemeContext */}
            <Routes>
              {/* Các route công khai và xác thực (đường dẫn bắt đầu từ gốc) */}
              <Route path="/*" element={<PublicRoutes />} />
              <Route path="/auth/*" element={<AuthRoutes />} />

              {/* Các route của Dashboard (bảo vệ bởi Auth và Role) */}
              <Route path="/dashboard/*" element={<DashboardRoutes />} />

              {/* Route bắt tất cả các đường dẫn không khớp (trang 404) */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </NotificationProvider>
      {/* Thêm một div root cho Modal nếu bạn sử dụng ReactDOM.createPortal */}
      <div id="modal-root"></div>
    </Router>
  );
}

export default App;