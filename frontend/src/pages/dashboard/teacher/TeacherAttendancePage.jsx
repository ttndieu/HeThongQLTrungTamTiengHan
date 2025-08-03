import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import useApi from '../../../hooks/useApi';
import { getTeacherClasses, getClassStudents, markAttendance } from '../../../services/teacherService';
import FormField from '../../../components/common/FormField';
import Button from '../../../components/common/Button';
import { useNotification } from '../../../contexts/NotificationContext';

const TeacherAttendancePage = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();

  const { data: classesData, execute: fetchClasses } = useApi(getTeacherClasses);
  const { data: studentsData, loading, error, execute: fetchStudents } = useApi(getClassStudents);

  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    if (user?.id) {
      fetchClasses(user.id);
    }
  }, [user, fetchClasses]);

  useEffect(() => {
    if (classesData && Array.isArray(classesData)) {
      setClasses(classesData);
      if (classesData.length > 0 && !selectedClassId) {
        setSelectedClassId(classesData[0].id);
      }
    } else if (classesData?.classes && Array.isArray(classesData.classes)) {
      setClasses(classesData.classes);
      if (classesData.classes.length > 0 && !selectedClassId) {
        setSelectedClassId(classesData.classes[0].id);
      }
    } else {
      setClasses([]);
    }
  }, [classesData, selectedClassId]);

  useEffect(() => {
    if (selectedClassId) {
      fetchStudents(selectedClassId);
    }
  }, [selectedClassId, fetchStudents]);

  useEffect(() => {
    if (studentsData && Array.isArray(studentsData.students)) {
      setStudents(studentsData.students);
      const initialAttendance = {};
      studentsData.students.forEach((student) => {
        initialAttendance[student.id] = 'present';
      });
      setAttendance(initialAttendance);
    } else {
      setStudents([]);
      setAttendance({});
    }
  }, [studentsData]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async () => {
    if (!selectedClassId || !selectedDate) {
      showNotification('Vui lòng chọn lớp và ngày điểm danh', 'error');
      return;
    }
    try {
      const attendanceRecords = Object.entries(attendance).map(([studentId, status]) => ({
        id: `attend-${studentId}-${selectedClassId}-${selectedDate}`,
        studentId,
        classId: selectedClassId,
        date: new Date(selectedDate),
        status,
      }));
      await markAttendance(attendanceRecords);
      showNotification('Đã lưu điểm danh thành công', 'success');
      setAttendance({});
      fetchStudents(selectedClassId);
    } catch (err) {
      showNotification('Lỗi: ' + err.message, 'error');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Điểm danh học viên</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormField
            type="select"
            label="Chọn lớp"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            options={classes.map((cls) => ({
              value: cls.id,
              label: `${cls.className} (${cls.courseName})`,
            }))}
          />
          <FormField
            type="date"
            label="Chọn ngày"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {loading && <p className="text-gray-500">Đang tải danh sách học viên...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && students.length === 0 && (
          <p className="text-gray-600 italic">Không có học viên nào trong lớp này.</p>
        )}

        {students.length > 0 && (
          <div className="overflow-x-auto bg-white shadow-xl rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left divide-y divide-gray-200">
              <thead className="bg-blue-50 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-4 py-3">Họ và tên</th>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student, index) => (
                  <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3">{student.fullName}</td>
                    <td className="px-4 py-3">{student.id}</td>
                    <td className="px-4 py-3">{student.email}</td>
                    <td className="px-4 py-3">
                      <FormField
                        type="select"
                        className="w-full"
                        value={attendance[student.id] || 'present'}
                        onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                        options={[
                          { value: 'present', label: ' Đủ' },
                          { value: 'absent', label: ' Vắng' },
                          { value: 'late', label: ' Trễ' },
                          { value: 'excused', label: ' Có phép' },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {students.length > 0 && (
          <div className="mt-6 text-center">
            <Button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-full text-white bg-primary hover:bg-primary-dark"
            >
              Lưu điểm danh
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAttendancePage;