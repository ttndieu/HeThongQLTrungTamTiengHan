import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import useApi from '../../../hooks/useApi';
import { getTeacherSchedule } from '../../../services/teacherService';
import Table from '../../../components/common/Table';

const TeacherSchedulePage = () => {
  const { user } = useAuth();
  const { data, loading, error, execute } = useApi(getTeacherSchedule);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    if (user?.id) {
      execute(user.id);
    }
  }, [user?.id, execute]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setSchedule(data.map(item => ({
        ...item,
        time: new Date(item.time).toLocaleString('vi-VN', {
          dateStyle: 'short',
          timeStyle: 'short',
        }),
      })));
    } else {
      setSchedule([]);
    }
  }, [data]);

  const columns = [
    { key: 'className', header: 'Lớp học' },
    { key: 'time', header: 'Thời gian' },
    { key: 'location', header: 'Địa điểm' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Thời khóa biểu</h1>
      {loading && <p className="text-gray-500">Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && schedule.length === 0 && (
        <p className="text-gray-500">Không có lịch học nào.</p>
      )}
      {schedule.length > 0 && (
        <Table
  headers={columns.map(col => col.header)}
  data={schedule}
  renderRow={(item) =>
    columns.map((col, i) => (
      <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {item[col.key]}
      </td>
    ))
  }
/>
      )}
    </div>
  );
};

export default TeacherSchedulePage;