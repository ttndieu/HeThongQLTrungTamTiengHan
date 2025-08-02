// src/pages/auth/ApplyAsTeacherPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import publicService from '../../services/publicService';
import { useNotification } from '../../contexts/NotificationContext';

const ApplyAsTeacherPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    qualifications: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

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
    if (!formData.experience) newErrors.experience = 'Kinh nghiệm không được để trống.';
    if (!formData.qualifications) newErrors.qualifications = 'Bằng cấp không được để trống.';
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
      const response = await publicService.applyAsTeacher(formData);
      showNotification(response.message, 'success');
      setFormData({ fullName: '', email: '', phone: '', experience: '', qualifications: '' }); // Reset form
      navigate('/auth/login'); // Chuyển hướng về trang đăng nhập
    } catch (err) {
      showNotification(err.message || 'Gửi đơn đăng ký thất bại. Vui lòng thử lại.', 'error');
      console.error('Teacher application error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <p className="text-gray-600 text-center text-sm">Điền thông tin để đăng ký làm giảng viên của EduCenter. Chúng tôi sẽ liên hệ với bạn sau khi xem xét hồ sơ.</p>
        <Input
          id="fullName"
          label="Họ và tên"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Họ và tên của bạn"
          error={errors.fullName}
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
          id="phone"
          label="Số điện thoại"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Số điện thoại của bạn"
          error={errors.phone}
          disabled={loading}
        />
        <TextArea
          id="experience"
          label="Kinh nghiệm giảng dạy"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Mô tả kinh nghiệm giảng dạy của bạn..."
          rows={4}
          error={errors.experience}
          disabled={loading}
        />
        <TextArea
          id="qualifications"
          label="Bằng cấp và chứng chỉ"
          value={formData.qualifications}
          onChange={handleChange}
          placeholder="Liệt kê các bằng cấp, chứng chỉ liên quan..."
          rows={4}
          error={errors.qualifications}
          disabled={loading}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? <LoadingSpinner size="sm" /> : 'Gửi đơn đăng ký'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ApplyAsTeacherPage;