import React, { useEffect, useState, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import useApi from '../../../hooks/useApi';
import {
  getClassStudents,
  getTeacherClasses,
  mockFetchStudentNotes,
  mockSaveStudentNote
} from '../../../services/teacherService';

const TeacherClassStudentsPage = () => {
  const { classId } = useParams();
  const { user } = useAuth();
  const { data: students, loading: studentsLoading, error: studentsError, execute: fetchStudents } = useApi(getClassStudents);
  const { data: classes, loading: classesLoading, error: classesError, execute: fetchClasses } = useApi(getTeacherClasses);
  const [studentsList, setStudentsList] = useState([]);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    if (user?.id) fetchClasses(user.id);
  }, [user?.id, fetchClasses]);

  useEffect(() => {
    if (classId) {
      fetchStudents(classId);
      mockFetchStudentNotes(classId)
        .then((fetchedNotes) => {
          const notesMap = fetchedNotes.reduce((acc, note) => {
            acc[note.studentId] = note.note;
            return acc;
          }, {});
          setNotes(notesMap);
        })
        .catch((err) => console.error('Error fetching notes:', err.message));
    }
  }, [classId, fetchStudents]);

  useEffect(() => {
    if (students?.students && Array.isArray(students.students)) {
      setStudentsList(students.students);
    } else {
      setStudentsList([]);
    }
  }, [students]);

  const handleNoteChange = async (studentId, value) => {
    setNotes((prev) => ({ ...prev, [studentId]: value }));
    try {
      await mockSaveStudentNote(studentId, classId, value);
    } catch (err) {
      console.error(`Error saving note for student ${studentId}:`, err.message);
    }
  };

  const isValidClass = classes?.some((cls) => cls.id === classId);

  if (!user) return <div className="p-6 text-red-500">Vui lòng đăng nhập.</div>;
  if (classesLoading || studentsLoading) return <div className="p-6 text-gray-600">Đang tải dữ liệu...</div>;
  if (classesError) return <div className="p-6 text-red-500">Lỗi tải lớp học: {classesError.message}</div>;
  if (studentsError) return <div className="p-6 text-red-500">Lỗi tải học viên: {studentsError.message}</div>;
  if (!isValidClass) return <div className="p-6 text-red-500">Bạn không có quyền truy cập lớp này.</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Danh sách học viên - Lớp {classId}</h2>
        <Link
          to={`/dashboard/teacher/grades?classId=${classId}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Nhập điểm
        </Link>
      </div>

      {studentsList.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-xl rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left divide-y divide-gray-200">
            <thead className="bg-blue-50 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3">Họ và tên</th>
                <th className="px-4 py-3">Tên đăng nhập</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Số điện thoại</th>
                <th className="px-4 py-3">Địa chỉ</th>
                <th className="px-4 py-3">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {studentsList.map((student, index) => (
                <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3">{student.fullName}</td>
                  <td className="px-4 py-3">{student.username}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3">{student.phone}</td>
                  <td className="px-4 py-3">{student.address}</td>
                  <td className="px-4 py-3">
                    <textarea
                      value={notes[student.id] || ''}
                      onChange={(e) => handleNoteChange(student.id, e.target.value)}
                      placeholder="Nhập ghi chú..."
                      rows={2}
                      className="w-full p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-gray-600 italic">Không có học viên nào trong lớp này.</p>
      )}

      <div className="mt-6">
        <Link
          to="/dashboard/teacher/classes"
          className="inline-block text-sm text-blue-700 hover:text-blue-900 hover:underline"
        >
          ← Quay lại danh sách lớp học
        </Link>
      </div>
    </div>
  );
};

export default memo(TeacherClassStudentsPage);
