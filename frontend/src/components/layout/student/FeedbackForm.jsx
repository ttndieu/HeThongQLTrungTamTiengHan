import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import studentService from '../../../services/studentService';
import { 
  StarIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const FeedbackForm = ({ onSubmit, isLoading = false }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    classId: '',
    rating: 0,
    content: '',
    category: 'general', // general, teaching, course_content, facilities
    isAnonymous: false
  });
  const [classes, setClasses] = useState([]);
  const [errors, setErrors] = useState({});
  const [loadingClasses, setLoadingClasses] = useState(true);

  // Fetch student's classes
  useEffect(() => {
    const fetchClasses = async () => {
      if (!user?.id) return;
      try {
        setLoadingClasses(true);
        const studentSchedule = await studentService.getStudentSchedule(user.id);
        setClasses(studentSchedule);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchClasses();
  }, [user?.id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.classId) {
      newErrors.classId = 'Vui lòng chọn lớp học';
    }
    if (formData.rating === 0) {
      newErrors.rating = 'Vui lòng đánh giá sao';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Vui lòng nhập nội dung phản hồi';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Nội dung phản hồi phải có ít nhất 10 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Find selected class info
    const selectedClass = classes.find(c => c.id === formData.classId);
    
    const submissionData = {
      ...formData,
      className: selectedClass?.className,
      courseName: selectedClass?.courseName,
      createdAt: new Date().toISOString()
    };

    onSubmit(submissionData);
  };

  const resetForm = () => {
    setFormData({
      classId: '',
      rating: 0,
      content: '',
      category: 'general',
      isAnonymous: false
    });
    setErrors({});
  };

  const categories = [
    { value: 'general', label: 'Tổng thể', icon: ChatBubbleLeftRightIcon },
    { value: 'teaching', label: 'Phương pháp giảng dạy', icon: AcademicCapIcon },
    { value: 'course_content', label: 'Nội dung khóa học', icon: AcademicCapIcon },
    { value: 'facilities', label: 'Cơ sở vật chất', icon: UserIcon }
  ];

  const ratingLabels = {
    1: 'Rất không hài lòng',
    2: 'Không hài lòng', 
    3: 'Bình thường',
    4: 'Hài lòng',
    5: 'Rất hài lòng'
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Class Selection */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <AcademicCapIcon className="h-5 w-5 mr-2" />
            Chọn lớp học
          </h3>
          
          {loadingClasses ? (
            <div className="flex items-center py-4">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-gray-600">Đang tải danh sách lớp...</span>
            </div>
          ) : (
            <div>
              <select
                name="classId"
                value={formData.classId}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.classId ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                disabled={isLoading}
              >
                <option value="">-- Chọn lớp học --</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.courseName} - {cls.className}
                  </option>
                ))}
              </select>
              {errors.classId && (
                <p className="mt-1 text-sm text-red-600">{errors.classId}</p>
              )}
            </div>
          )}
        </div>

        {/* Category Selection */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Loại phản hồi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.map(category => {
              const IconComponent = category.icon;
              return (
                <label
                  key={category.value}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.category === category.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={formData.category === category.value}
                    onChange={handleInputChange}
                    className="sr-only"
                    disabled={isLoading}
                  />
                  <IconComponent className="h-5 w-5 mr-3 text-gray-600" />
                  <span className="font-medium">{category.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Rating */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Đánh giá tổng thể</h3>
          
          <div className="flex items-center space-x-2 mb-3">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                disabled={isLoading}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                {star <= formData.rating ? (
                  <StarIconSolid className="h-8 w-8 text-yellow-400 hover:text-yellow-500 transition-colors" />
                ) : (
                  <StarIcon className="h-8 w-8 text-gray-300 hover:text-yellow-400 transition-colors" />
                )}
              </button>
            ))}
          </div>
          
          {formData.rating > 0 && (
            <p className="text-sm text-gray-600 mb-2">
              {ratingLabels[formData.rating]}
            </p>
          )}
          
          {errors.rating && (
            <p className="text-sm text-red-600">{errors.rating}</p>
          )}
        </div>

        {/* Feedback Content */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Nội dung phản hồi</h3>
          
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={6}
            placeholder="Chia sẻ trải nghiệm của bạn về khóa học, giáo viên, phương pháp giảng dạy, cơ sở vật chất... Góp ý của bạn sẽ giúp chúng tôi cải thiện chất lượng dịch vụ."
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
              errors.content ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            disabled={isLoading}
          />
          
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {formData.content.length}/500 ký tự
            </span>
            {errors.content && (
              <p className="text-sm text-red-600">{errors.content}</p>
            )}
          </div>
        </div>

        {/* Anonymous Option */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleInputChange}
              disabled={isLoading}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">
              Gửi phản hồi ẩn danh (thông tin cá nhân sẽ không được hiển thị)
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={resetForm}
            disabled={isLoading}
            className="px-6 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 transition-colors"
          >
            Làm lại
          </button>
          
          <button
            type="submit"
            disabled={isLoading || loadingClasses}
            className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang gửi...
              </>
            ) : (
              'Gửi phản hồi'
            )}
          </button>
        </div>
      </form>

      {/* Guidelines */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          💡 Hướng dẫn viết phản hồi hiệu quả:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Chia sẻ cụ thể về trải nghiệm học tập</li>
          <li>• Đề xuất cải thiện mang tính xây dựng</li>
          <li>• Tránh sử dụng ngôn từ không phù hợp</li>
          <li>• Phản hồi của bạn sẽ được xem xét một cách nghiêm túc</li>
        </ul>
      </div>
    </div>
  );
};

export default FeedbackForm;