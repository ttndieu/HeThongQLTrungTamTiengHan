// src/pages/public/TeachersPage.jsx
import React, { useState, useEffect } from 'react';
import publicService from '../../services/publicService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { UserCircleIcon } from '@heroicons/react/24/outline'; // Icon cho giáo viên
import avatar from '../../assets/avatar.jpg'




const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await publicService.getTeachers();
        setTeachers(data);
      } catch (err) {
        setError('Không thể tải danh sách giảng viên.');
        console.error('Error fetching teachers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return <LoadingSpinner className="h-screen" />;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600 text-lg">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Đội ngũ Giảng viên của chúng tôi</h1>
      {teachers.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-10">Hiện chưa có thông tin giảng viên.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map(teacher => (
            <div key={teacher.id} className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
              <div className="flex-shrink-0">
                {/*  */}
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={avatar} // Avatar mặc định
                  alt={teacher.fullName}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{teacher.fullName}</h3>
                <p className="text-blue-600 text-sm">Giảng viên tiếng Hàn</p>
                <p className="text-gray-600 text-sm">Email: {teacher.email}</p>
                <p className="text-gray-600 text-sm">Phone: {teacher.phone}</p>
                {/* Thêm thông tin chuyên môn, kinh nghiệm nếu có */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeachersPage;