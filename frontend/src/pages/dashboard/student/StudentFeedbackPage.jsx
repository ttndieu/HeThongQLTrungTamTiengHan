import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import studentService from '../../../services/studentService';
import FeedbackForm from '../../../components/layout/student/FeedbackForm'

const StudentFeedbackPage = () => {
  const { user } = useAuth();
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [error, setError] = useState(null);

  const handleFeedbackSubmit = async (feedbackData) => {
    if (!user?.id) {
      setError("Thông tin người dùng không hợp lệ.");
      return;
    }
    const dataToSend = {
      ...feedbackData,
      studentId: user.id,
      studentName: user.fullName || user.username,
      timestamp: new Date().toISOString(),
    };

    try {
      await studentService.submitFeedback(dataToSend);
      setFeedbackSent(true);
      setError(null); // Xóa lỗi nếu có từ lần gửi trước
    } catch (err) {
      setError('Không thể gửi phản hồi. Vui lòng thử lại.');
      console.error("Error submitting feedback:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gửi phản hồi</h1>
      {feedbackSent && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
          Phản hồi của bạn đã được gửi thành công. Cảm ơn bạn đã đóng góp ý kiến!
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <FeedbackForm onSubmit={handleFeedbackSubmit} isLoading={false} /* Bạn có thể thêm isLoading nếu cần xử lý upload file */ />
    </div>
  );
};

export default StudentFeedbackPage;