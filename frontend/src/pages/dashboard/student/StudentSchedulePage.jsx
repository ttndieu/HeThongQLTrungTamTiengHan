import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import studentService from '../../../services/studentService';
import ScheduleTable from '../../../components/layout/student/ScheduleTable'; 

const StudentSchedulePage = () => {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const studentSchedule = await studentService.getStudentSchedule(user.id);
        console.log('Raw schedule data:', studentSchedule);
        
        // Transform data để phù hợp với ScheduleTable component
        const transformedSchedule = studentSchedule.map(classItem => {
          // Parse schedule string "T2-T4-T6, 18:00-20:00" 
          const scheduleParts = classItem.schedule ? classItem.schedule.split(', ') : ['', ''];
          const days = scheduleParts[0] || 'Chưa xác định';
          const time = scheduleParts[1] || 'Chưa xác định';
          
          return {
            courseName: classItem.courseName || classItem.className || 'Không xác định',
            time: time,
            day: days,
            teacher: classItem.teacherName || 'Chưa phân công',
            location: classItem.room || 'Chưa xác định'
          };
        });
        
        setSchedule(transformedSchedule);
      } catch (err) {
        setError('Không thể tải lịch học. Vui lòng thử lại.');
        console.error("Error fetching schedule:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Lịch học của tôi</h1>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-lg text-gray-700">Đang tải lịch học...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Lịch học của tôi</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      {!error && schedule.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-lg text-gray-700">Bạn chưa có lịch học nào.</p>
          <p className="text-sm text-gray-500 mt-2">Hãy đăng ký khóa học để xem lịch học của bạn.</p>
        </div>
      )}
      
      {!error && schedule.length > 0 && (
        <ScheduleTable schedule={schedule} />
      )}
    </div>
  );
};

export default StudentSchedulePage;