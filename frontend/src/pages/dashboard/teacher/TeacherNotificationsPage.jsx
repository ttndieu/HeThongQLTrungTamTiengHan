import React, { useEffect, useState } from 'react';
import teacherService from '../../../services/teacherService';
import useApi from '../../../hooks/useApi';
import { useAuth } from '../../../hooks/useAuth';
import { useNotification } from '../../../hooks/useNotification';

const TeacherNotificationsPage = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const { data: notifications, loading, error, execute: fetchNotifications } = useApi(teacherService.getNotifications);
  const { execute: sendNotification } = useApi(teacherService.sendNotification);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    recipients: ['all'],
  });

  useEffect(() => {
    if (user?.id) {
      fetchNotifications(user.id);
    }
  }, [user, fetchNotifications]);

  useEffect(() => {
    if (error) {
      addNotification(`Lỗi: ${error.message}`, 'error');
    }
  }, [error, addNotification]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendNotification({
        ...formData,
        teacherId: user.id,
        createdAt: new Date().toISOString(),
      });
      setFormData({ title: '', content: '', recipients: ['all'] });
      fetchNotifications(user.id);
      addNotification('Thông báo đã được gửi thành công!', 'success');
    } catch (err) {
      addNotification(`Lỗi khi gửi thông báo: ${err.message}`, 'error');
    }
  };

  if (loading) {
    return <div className="p-6">Đang tải...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý thông báo</h2>

      {/* Form gửi thông báo */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Gửi thông báo mới</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nội dung</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Người nhận</label>
            <select
              name="recipients"
              value={formData.recipients[0]}
              onChange={(e) => setFormData((prev) => ({ ...prev, recipients: [e.target.value] }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="all">Tất cả</option>
              <option value="class-1">Lớp SC1-A2025</option>
              <option value="class-2">Lớp TC1-B2025</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Gửi thông báo
          </button>
        </form>
      </div>

      {/* Danh sách thông báo */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h3 className="text-lg font-semibold p-4">Danh sách thông báo</h3>
        {notifications && notifications.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người nhận</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày gửi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notifications.map((notification) => (
                <tr key={notification.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{notification.title}</td>
                  <td className="px-6 py-4">{notification.content}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {notification.recipients[0] === 'all' ? 'Tất cả' : `Lớp ${notification.recipients[0]}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(notification.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-gray-500">Không có thông báo nào.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherNotificationsPage;