import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import useApi from '../../../hooks/useApi';
import { getTeacherClasses } from '../../../services/teacherService';
import Table from '../../../components/common/Table';
import Button from '../../../components/common/Button';
import { enrollments } from '../../../mockData/mockdata';

const renderRow = (item, navigate, index) => (
  <tr
    key={item.id}
    className={`transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}
  >
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.className}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.courseName}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.schedule}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.room}</td>
    <td className="px-6 py-4 whitespace-nowrap text-center">
      <span className="inline-block min-w-[32px] bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full px-2 py-0.5">
        {item.studentCount ?? 0}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
      <Button
        onClick={() => navigate(`/dashboard/teacher/classes/${item.id}/students`)}
        className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded shadow"
      >
         Xem học viên
      </Button>
    </td>
  </tr>
);

const TeacherClassesPage = () => {
  const { user } = useAuth();
  const { data, loading, error, execute } = useApi(getTeacherClasses);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      execute(user.id);
    }
  }, [user?.id, execute]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const updated = data.map(cls => {
        const count = enrollments.filter(e => e.classId === cls.id).length;
        return { ...cls, studentCount: count };
      });
      setClasses(updated);
    } else {
      setClasses([]);
    }
  }, [data]);

  const headers = ['Mã lớp', 'Tên lớp', 'Khóa học', 'Lịch học', 'Phòng', 'Số lượng HV', ''];

  if (!user) {
    return <div className="p-6 text-red-500">Vui lòng đăng nhập.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <svg className="w-8 h-8 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h1v-2a2 2 0 012-2h6a2 2 0 012 2v2h1a1 1 0 001-1V4a1 1 0 00-1-1H4zm10 14v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2h8z" />
        </svg>
        Danh sách lớp học
      </h1>

      {loading && (
        <div className="text-center py-4 text-gray-500 animate-pulse">
          Đang tải dữ liệu lớp học...
        </div>
      )}

      {error && <p className="text-red-500">Lỗi: {error.message}</p>}

      {classes.length === 0 && !loading && !error && (
        <p className="text-gray-500">Không có lớp học nào.</p>
      )}

      {classes.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classes.map((item, index) => renderRow(item, navigate, index))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherClassesPage;
