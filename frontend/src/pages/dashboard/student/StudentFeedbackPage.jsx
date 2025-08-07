import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import studentService from '../../../services/studentService';
import FeedbackForm from '../../../components/layout/student/FeedbackForm'

const StudentFeedbackPage = () => {
    const { user } = useAuth();
    const [feedbackSent, setFeedbackSent] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleFeedbackSubmit = async (feedbackData) => {
      if (!user?.id) {
        setError("Thông tin người dùng không hợp lệ.");
        return;
      }
  
      const dataToSend = {
        ...feedbackData,
        studentId: user.id,
        studentName: feedbackData.isAnonymous ? 'Ẩn danh' : (user.fullName || user.username),
        timestamp: new Date().toISOString(),
      };
  
      try {
        setIsSubmitting(true);
        setError(null);
        
        await studentService.submitFeedback(dataToSend);
        setFeedbackSent(true);
        
        // Auto hide success message after 5 seconds
        setTimeout(() => {
          setFeedbackSent(false);
        }, 5000);
        
      } catch (err) {
        setError('Không thể gửi phản hồi. Vui lòng thử lại.');
        console.error("Error submitting feedback:", err);
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gửi phản hồi</h1>
          <p className="text-gray-600">
            Chia sẻ trải nghiệm học tập của bạn để giúp chúng tôi cải thiện chất lượng dịch vụ
          </p>
        </div>
  
        {feedbackSent && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Phản hồi của bạn đã được gửi thành công. Cảm ơn bạn đã đóng góp ý kiến!
          </div>
        )}
  
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
  
        <FeedbackForm 
          onSubmit={handleFeedbackSubmit} 
          isLoading={isSubmitting}
        />
      </div>
    );
  };
  
  export default StudentFeedbackPage;