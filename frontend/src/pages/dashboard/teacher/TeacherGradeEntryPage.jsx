import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import { getClassStudents, submitGrades } from '../../../services/teacherService';
import Button from '../../../components/common/Button';

const TeacherGradeEntryPage = () => {
  const navigate = useNavigate();
  const { data, loading, error, execute } = useApi(getClassStudents);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});

  useEffect(() => {
    execute('class-1');
  }, []);

  useEffect(() => {
    if (data && Array.isArray(data.students)) {
      setStudents(data.students);
    } else {
      console.warn(' getClassStudents không trả về danh sách học viên hợp lệ:', data);
      setStudents([]);
    }
  }, [data]);

  const handleGradeChange = (studentId, field, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [studentId]: {
        ...prevGrades[studentId],
        [field]: parseFloat(value),
      },
    }));
  };

  const calculateAverage = (studentGrades) => {
    const fields = ['midterm_listen', 'midterm_speak', 'midterm_read', 'midterm_write', 'final_listen', 'final_speak', 'final_read', 'final_write', 'assignment_listen', 'assignment_speak', 'assignment_read', 'assignment_write'];
    const values = fields.map((field) => parseFloat(studentGrades[field]) || 0);
    const sum = values.reduce((acc, val) => acc + val, 0);
    return (sum / values.length).toFixed(1);
  };

  const handleSubmit = async () => {
    try {
      for (const studentId of Object.keys(grades)) {
        await submitGrades({
          classId: 'class-1',
          studentId,
          grades: grades[studentId],
          note: grades[studentId].note || '',
        });
      }
      alert('Đã lưu điểm');
    } catch (err) {
      alert(' Lỗi: ' + err.message);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const renderInput = (studentId, field, placeholder) => (
    <input
      type="number"
      placeholder={placeholder}
      className="w-full p-2 text-center border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={grades[studentId]?.[field] || ''}
      onChange={(e) => handleGradeChange(studentId, field, e.target.value)}
    />
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Nhập điểm học viên</h1>
          <p className="text-gray-500 mt-1">Điền điểm từng kỹ năng cho từng học viên.</p>
        </div>
        <Button onClick={handleBack} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl shadow-sm">
          ← Quay lại
        </Button>
      </div>

      {loading && <p className="text-gray-500">Đang tải danh sách học viên...</p>}
      {error && <p className="text-red-500">Lỗi: {error.message}</p>}
      {!loading && students.length === 0 && <p className="text-gray-500 italic">Không có học viên nào trong lớp này.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-2xl border border-gray-200 shadow-md p-5 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800"> {student.fullName}</h2>

            <div>
              <label className="font-medium text-sm text-gray-600">Chuyên cần</label>
              {renderInput(student.id, 'attendance')}
            </div>

            {['assignment', 'midterm', 'final'].map((section) => (
              <div key={section}>
                <h3 className="text-sm font-bold text-blue-700 uppercase mt-2 mb-1">
                  {section === 'assignment' ? 'Bài tập' : section === 'midterm' ? 'Giữa kỳ' : 'Cuối kỳ'}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500">Nghe</label>
                    {renderInput(student.id, `${section}_listen`, '0-10')}
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Nói</label>
                    {renderInput(student.id, `${section}_speak`, '0-10')}
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Đọc</label>
                    {renderInput(student.id, `${section}_read`, '0-10')}
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Viết</label>
                    {renderInput(student.id, `${section}_write`, '0-10')}
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-2 text-sm font-semibold text-right text-blue-700">
              Trung bình: {grades[student.id] ? calculateAverage(grades[student.id]) : '-'}
            </div>
          </div>
        ))}
      </div>

      {students.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md">
             Lưu điểm
          </Button>
        </div>
      )}
    </div>
  );
};

export default TeacherGradeEntryPage;
