// src/pages/dashboard/registeredUser/RegisteredUserCourseEnrollmentPage.jsx
import React, { useState, useEffect } from 'react';
import publicService from '../../../services/publicService';
import CourseCard from '../../../components/public/CourseCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useNotification } from '../../../contexts/NotificationContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisteredUserCourseEnrollmentPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await publicService.getCourses();
        setCourses(data);
      } catch (err) {
        setError('Không thể tải danh sách khóa học.');
        showNotification('Không thể tải danh sách khóa học.', 'error');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [showNotification]);

  if (loading) {
    return <LoadingSpinner className="min-h-[50vh] flex items-center justify-center" />;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600 text-lg">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Đăng ký Khóa học</h1>
      <p className="text-center text-gray-600 mb-6">
        Là người dùng đã đăng ký, bạn có thể xem các khóa học và đăng ký để trở thành học viên.
      </p>
      {courses.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-10">Hiện chưa có khóa học nào.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RegisteredUserCourseEnrollmentPage;