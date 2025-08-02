// src/pages/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import authService from '../../services/authService';
import { useNotification } from '../../contexts/NotificationContext';
import { ROLES } from '../../utils/constants';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' })); // Clear error when input changes
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Họ và tên không được để trống.';
    if (!formData.username) newErrors.username = 'Tên đăng nhập không được để trống.';
    if (!formData.email) {
      newErrors.email = 'Email không được để trống.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ.';
    }
    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    }
    // Phone and Address are optional for basic registration for now
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showNotification('Vui lòng điền đầy đủ và chính xác thông tin.', 'error');
      return;
    }

    setLoading(true);
    try {
      // Gửi dữ liệu đăng ký với vai trò mặc định là REGISTERED_USER
      await authService.register({ ...formData, role: ROLES.REGISTERED_USER });
      showNotification('Đăng ký thành công! Vui lòng đăng nhập.', 'success');
      navigate('/auth/login');
    } catch (err) {
      showNotification(err.message || 'Đăng ký thất bại. Vui lòng thử lại.', 'error');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          id="fullName"
          label="Họ và tên"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Nguyễn Văn A"
          error={errors.fullName}
          disabled={loading}
        />
        <Input
          id="username"
          label="Tên đăng nhập"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="ten_dang_nhap_cua_ban"
          error={errors.username}
          disabled={loading}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
          error={errors.email}
          disabled={loading}
        />
        <Input
          id="password"
          label="Mật khẩu"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mật khẩu (ít nhất 6 ký tự)"
          error={errors.password}
          disabled={loading}
        />
        <Input
          id="confirmPassword"
          label="Xác nhận mật khẩu"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Nhập lại mật khẩu"
          error={errors.confirmPassword}
          disabled={loading}
        />
        <Input
          id="phone"
          label="Số điện thoại (Tùy chọn)"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Số điện thoại của bạn"
          disabled={loading}
        />
        <Input
          id="address"
          label="Địa chỉ (Tùy chọn)"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="Địa chỉ của bạn"
          disabled={loading}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? <LoadingSpinner size="sm" /> : 'Đăng ký'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
            Đăng nhập
          </Link>
        </p>
        <p className="mt-2 text-sm text-gray-600">
            Bạn muốn làm giảng viên?{' '}
            <Link to="/auth/apply-as-teacher" className="font-medium text-blue-600 hover:text-blue-500">
                Đăng ký làm giảng viên
            </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;