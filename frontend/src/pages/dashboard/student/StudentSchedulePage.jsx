import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import studentService from '../../../services/studentService';
import ScheduleTable from '../../../components/layout/student/ScheduleTable'

const StudentSchedulePage = () => {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!user?.id) return; // Đảm bảo có user ID
      try {
        setLoading(true);
        const studentSchedule = await studentService.getStudentSchedule(user.id);
        setSchedule(studentSchedule);
      } catch (err) {
        setError('Không thể tải lịch học. Vui lòng thử lại.');
        console.error("Error fetching schedule:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [user?.id]); // Fetch lại khi user ID thay đổi

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Lịch học của tôi</h1>
      {loading && <p className="text-lg text-gray-700">Đang tải lịch học...</p>}
      {error && <p className="text-lg text-red-600">{error}</p>}
      {!loading && !error && schedule.length === 0 && (
        <p className="text-lg text-gray-700">Bạn chưa có lịch học nào.</p>
      )}
      {!loading && !error && schedule.length > 0 && (
        <ScheduleTable schedule={schedule} />
      )}
    </div>
  );
};

export default StudentSchedulePage;