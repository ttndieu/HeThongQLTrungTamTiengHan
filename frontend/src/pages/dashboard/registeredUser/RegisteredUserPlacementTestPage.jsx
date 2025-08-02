// src/pages/dashboard/registeredUser/RegisteredUserPlacementTestPage.jsx
import React, { useState } from 'react';
import Input from '../../../components/common/Input';
import TextArea from '../../../components/common/TextArea';
import Button from '../../../components/common/Button';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import studentService from '../../../services/studentService';
import { useNotification } from '../../../contexts/NotificationContext';
import { useAuth } from '../../../contexts/AuthContext';

const RegisteredUserPlacementTestPage = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.preferredDate) newErrors.preferredDate = 'Ngày mong muốn không được để trống.';
    if (!formData.preferredTime) newErrors.preferredTime = 'Giờ mong muốn không được để trống.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showNotification('Vui lòng điền đầy đủ thông tin yêu cầu.', 'error');
      return;
    }

    setLoading(true);
    try {
      const result = await studentService.registerForPlacementTest(user.id, formData);
      showNotification('Đăng ký kiểm tra trình độ thành công! Chúng tôi sẽ liên hệ với bạn.', 'success');
      setFormData({ preferredDate: '', preferredTime: '', notes: '' }); // Reset form
    } catch (err) {
      showNotification(err.message || 'Đăng ký kiểm tra trình độ thất bại.', 'error');
      console.error('Placement test registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Đăng ký kiểm tra trình độ</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
        <p className="text-gray-700 mb-6">
          Nếu bạn không chắc chắn về cấp độ tiếng Hàn của mình, hãy đăng ký kiểm tra trình độ. Chúng tôi sẽ sắp xếp một buổi kiểm tra để đánh giá và tư vấn khóa học phù hợp nhất cho bạn.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Ngày mong muốn kiểm tra"
            id="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleChange}
            error={errors.preferredDate}
            disabled={loading}
          />
          <Input
            label="Giờ mong muốn kiểm tra"
            id="preferredTime"
            type="time"
            value={formData.preferredTime}
            onChange={handleChange}
            error={errors.preferredTime}
            disabled={loading}
          />
          <TextArea
            label="Ghi chú (nếu có)"
            id="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Ví dụ: Tôi muốn kiểm tra vào buổi sáng sớm."
            rows={3}
            disabled={loading}
          />
          <Button type="submit" variant="primary" className="w-full py-3" disabled={loading}>
            {loading ? <LoadingSpinner size="sm" /> : 'Gửi đăng ký'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisteredUserPlacementTestPage;