// src/pages/public/ContactPage.jsx
import React, { useState } from 'react';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import publicService from '../../services/publicService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useNotification } from '../../contexts/NotificationContext';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' })); // Xóa lỗi khi người dùng bắt đầu gõ
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Tên không được để trống.';
    if (!formData.email) {
      newErrors.email = 'Email không được để trống.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ.';
    }
    if (!formData.subject) newErrors.subject = 'Chủ đề không được để trống.';
    if (!formData.message) newErrors.message = 'Tin nhắn không được để trống.';
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
      const response = await publicService.submitContactForm(formData);
      showNotification(response.message, 'success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } catch (err) {
      showNotification(err.message || 'Gửi tin nhắn thất bại. Vui lòng thử lại.', 'error');
      console.error('Contact form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Liên hệ với chúng tôi</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-8">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Thông tin liên hệ</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center">
              <MapPinIcon className="h-6 w-6 text-blue-500 mr-3" />
              <span>123 Đường ABC, Quận XYZ, TP Đà Nẵng, Việt Nam</span>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="h-6 w-6 text-blue-500 mr-3" />
              <span>(84) 123 456 789</span>
            </div>
            <div className="flex items-center">
              <EnvelopeIcon className="h-6 w-6 text-blue-500 mr-3" />
              <span>info@educenter.com</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Giờ làm việc</h3>
            <p className="text-gray-700">Thứ 2 - Thứ 6: 8:00 AM - 6:00 PM</p>
            <p className="text-gray-700">Thứ 7: 9:00 AM - 12:00 PM</p>
            <p className="text-gray-700">Chủ Nhật: Đóng cửa</p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gửi tin nhắn cho chúng tôi</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Tên của bạn"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tên của bạn"
              error={errors.name}
              disabled={loading}
            />
            <Input
              label="Email của bạn"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              error={errors.email}
              disabled={loading}
            />
            <Input
              label="Chủ đề"
              id="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Chủ đề tin nhắn"
              error={errors.subject}
              disabled={loading}
            />
            <TextArea
              label="Tin nhắn của bạn"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Viết tin nhắn của bạn ở đây..."
              rows={5}
              error={errors.message}
              disabled={loading}
            />
            <Button type="submit" variant="primary" className="w-full py-3" disabled={loading}>
              {loading ? <LoadingSpinner size="sm" /> : 'Gửi tin nhắn'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;