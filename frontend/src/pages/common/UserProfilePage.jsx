// src/pages/common/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import authService from '../../services/authService';

const UserProfilePage = () => {
  const { user, setUser } = useAuth();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    username: user?.username || '', // Username usually not editable
    role: user?.role || '', // Role usually not editable by user
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // Update formData when user context changes (e.g., after login or initial load)
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        username: user.username || '',
        role: user.role || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Họ và tên không được để trống.';
    if (!formData.email) {
      newErrors.email = 'Email không được để trống.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ.';
    }
    if (!formData.phone) newErrors.phone = 'Số điện thoại không được để trống.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showNotification('Vui lòng điền đầy đủ và chính xác thông tin.', 'error');
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await authService.updateProfile(user.id, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      });
      setUser(updatedUser); // Cập nhật AuthContext
      showNotification('Cập nhật hồ sơ thành công!', 'success');
      setIsEditing(false); // Thoát chế độ chỉnh sửa
    } catch (err) {
      showNotification(err.message || 'Cập nhật hồ sơ thất bại.', 'error');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <LoadingSpinner className="h-full flex items-center justify-center" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Hồ sơ cá nhân</h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Input
              label="Tên đăng nhập"
              id="username"
              type="text"
              value={formData.username}
              disabled={true} // Username không cho phép chỉnh sửa
              className="bg-gray-100 cursor-not-allowed"
            />
            <Input
              label="Vai trò"
              id="role"
              type="text"
              value={formData.role}
              disabled={true} // Vai trò không cho phép chỉnh sửa
              className="bg-gray-100 cursor-not-allowed"
            />
            <Input
              label="Họ và tên"
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              disabled={!isEditing || loading}
            />
            <Input
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={!isEditing || loading}
            />
            <Input
              label="Số điện thoại"
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              disabled={!isEditing || loading}
            />
            <Input
              label="Địa chỉ"
              id="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              disabled={!isEditing || loading}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            {!isEditing ? (
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Chỉnh sửa hồ sơ
              </Button>
            ) : (
              <>
                <Button variant="secondary" onClick={() => { setIsEditing(false); setErrors({}); setFormData({ // Reset form to original user data
                    fullName: user.fullName || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    address: user.address || '',
                    username: user.username || '',
                    role: user.role || '',
                }); }} disabled={loading}>
                  Hủy
                </Button>
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? <LoadingSpinner size="sm" /> : 'Lưu thay đổi'}
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfilePage;