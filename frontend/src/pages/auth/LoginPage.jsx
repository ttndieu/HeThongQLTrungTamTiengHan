// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import authService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { ROLES } from '../../utils/constants';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu.');
      showNotification('Vui lòng nhập tên đăng nhập và mật khẩu.', 'error');
      return;
    }

    setLoading(true);
    try {
      const user = await authService.login(username, password);
      login(user); // Cập nhật trạng thái người dùng trong AuthContext
      showNotification('Đăng nhập thành công!', 'success');

      // Chuyển hướng dựa trên vai trò
      switch (user.role) {
        case ROLES.HOC_VIEN:
          navigate('/dashboard/student');
          break;
        case ROLES.GIANG_VIEN:
          navigate('/dashboard/teacher');
          break;
        case ROLES.QUAN_LY_HOC_VU:
          navigate('/dashboard/academic');
          break;
        case ROLES.KE_TOAN:
          navigate('/dashboard/accounting');
          break;
        case ROLES.QUAN_TRI_HE_THONG:
          navigate('/dashboard/admin');
          break;
        case ROLES.REGISTERED_USER:
          navigate('/dashboard/registered');
          break;
        default:
          navigate('/dashboard'); // Fallback nếu vai trò không xác định
      }
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại.');
      showNotification(err.message || 'Đăng nhập thất bại.', 'error');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          id="username"
          label="Tên đăng nhập hoặc Email"
          type="text"
          value={username}
          onChange={(e) => { setUsername(e.target.value); setError(''); }}
          placeholder="Nhập tên đăng nhập hoặc email"
          disabled={loading}
        />
        <Input
          id="password"
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(''); }}
          placeholder="Nhập mật khẩu"
          disabled={loading}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <Button
          type="submit"
          variant="primary"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? <LoadingSpinner size="sm" /> : 'Đăng nhập'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
            Đăng ký ngay
          </Link>
        </p>
        {/* <p className="mt-2 text-sm text-gray-600">
          <Link to="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
            Quên mật khẩu?
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;