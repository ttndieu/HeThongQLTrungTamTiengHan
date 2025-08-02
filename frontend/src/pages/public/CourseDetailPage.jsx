// src/pages/public/CourseDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import publicService from '../../services/publicService';
import studentService from '../../services/studentService'; // Để đăng ký khóa học
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { ROLES } from '../../utils/constants';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, setUser } = useAuth(); // setUser để cập nhật vai trò nếu cần
  const { showNotification } = useNotification();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await publicService.getCourseById(id);
        setCourse(data);
      } catch (err) {
        setError('Không tìm thấy khóa học này.');
        showNotification('Không tìm thấy khóa học này.', 'error');
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, showNotification]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      showNotification('Bạn cần đăng nhập để đăng ký khóa học.', 'info');
      navigate('/auth/login');
      return;
    }

    setIsEnrollModalOpen(true);
  };

  const confirmEnroll = async () => {
    setIsEnrolling(true);
    try {
      const result = await studentService.enrollCourse(user.id, course.id);
      showNotification('Đăng ký khóa học thành công! Vui lòng kiểm tra mục thanh toán.', 'success');
      setIsEnrollModalOpen(false);

      if (result.userRoleUpdated && result.newRole) {
        // Cập nhật thông tin user trong AuthContext
        setUser(prevUser => ({
          ...prevUser,
          role: result.newRole,
          token: result.user.token // Cập nhật token nếu thay đổi
        }));
        localStorage.setItem('user', JSON.stringify({ ...user, role: result.newRole, token: result.user.token }));
      }

      navigate('/dashboard/student/payments'); // Chuyển hướng đến trang thanh toán
    } catch (err) {
      showNotification(err.message || 'Đăng ký khóa học thất bại.', 'error');
      console.error('Enrollment error:', err);
    } finally {
      setIsEnrolling(false);
      setIsEnrollModalOpen(false); // Đảm bảo đóng modal
    }
  };


  if (loading) {
    return <LoadingSpinner className="h-screen" />;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600 text-lg">{error}</div>;
  }

  if (!course) {
    return <div className="text-center py-10 text-gray-500 text-lg">Khóa học không tồn tại.</div>;
  }

  const isStudent = user?.role === ROLES.HOC_VIEN;
  const alreadyEnrolled = isStudent && user?.enrolledCourseIds?.includes(course.id); // Giả lập kiểm tra
  // Trong mockData, việc kiểm tra đã đăng ký sẽ được thực hiện trong mockEnrollCourseDirectly
  // Nếu user là hocVien, có thể ẩn nút "Đăng ký"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="w-full h-64 object-cover md:w-80 md:h-full"
            src={course.imageUrl || '/assets/images/course-placeholder.jpg'}
            alt={course.name}
          />
        </div>
        <div className="p-6 flex-grow">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.name}</h1>
          <p className="text-gray-700 text-lg mb-4">{course.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-800">
            <p>
              <strong className="font-semibold">Cấp độ:</strong> {course.level}
            </p>
            <p>
              <strong className="font-semibold">Thời lượng:</strong> {course.durationWeeks} tuần
            </p>
            <p>
              <strong className="font-semibold">Học phí:</strong>{' '}
              <span className="text-blue-600 text-xl font-bold">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
              </span>
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Nội dung khóa học</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Giới thiệu bảng chữ cái Hangeul và phát âm chuẩn.</li>
            <li>Học các mẫu câu giao tiếp cơ bản hàng ngày.</li>
            <li>Xây dựng từ vựng về các chủ đề quen thuộc (gia đình, bạn bè, sở thích...).</li>
            <li>Rèn luyện kỹ năng nghe, nói, đọc, viết đơn giản.</li>
            <li>Tìm hiểu văn hóa Hàn Quốc sơ lược.</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button onClick={handleEnroll} variant="primary" className="flex-1 py-3 text-lg" disabled={alreadyEnrolled}>
              {alreadyEnrolled ? 'Đã đăng ký khóa học này' : 'Đăng ký ngay'}
            </Button>
            <Button onClick={() => navigate('/contact')} variant="outline" className="flex-1 py-3 text-lg">
              Liên hệ tư vấn
            </Button>
          </div>
        </div>
      </div>

      <Modal isOpen={isEnrollModalOpen} onClose={() => setIsEnrollModalOpen(false)} title="Xác nhận đăng ký khóa học">
        <p className="text-gray-700 mb-4">Bạn có chắc chắn muốn đăng ký khóa học **"{course.name}"** với học phí **{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}**?</p>
        <p className="text-red-600 text-sm mb-6">Việc đăng ký sẽ được ghi nhận và bạn sẽ được yêu cầu thanh toán sau đó.</p>
        <div className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={() => setIsEnrollModalOpen(false)} disabled={isEnrolling}>
            Hủy
          </Button>
          <Button variant="primary" onClick={confirmEnroll} disabled={isEnrolling}>
            {isEnrolling ? <LoadingSpinner size="sm" /> : 'Xác nhận Đăng ký'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CourseDetailPage;