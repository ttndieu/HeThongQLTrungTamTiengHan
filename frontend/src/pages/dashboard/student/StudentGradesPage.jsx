import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import studentService from '../../../services/studentService';
import GradesTable from '../../../components/layout/student/GradesTable'

const StudentGradesPage = () => {
  const { user } = useAuth();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const studentGrades = await studentService.getStudentGrades(user.id);
        setGrades(studentGrades);
      } catch (err) {
        setError('Không thể tải điểm số. Vui lòng thử lại.');
        console.error("Error fetching grades:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [user?.id]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Điểm số của tôi</h1>
      {loading && <p className="text-lg text-gray-700">Đang tải điểm số...</p>}
      {error && <p className="text-lg text-red-600">{error}</p>}
      {!loading && !error && grades.length === 0 && (
        <p className="text-lg text-gray-700">Bạn chưa có điểm số nào.</p>
      )}
      {!loading && !error && grades.length > 0 && (
        <GradesTable grades={grades} />
      )}
    </div>
  );
};

export default StudentGradesPage;