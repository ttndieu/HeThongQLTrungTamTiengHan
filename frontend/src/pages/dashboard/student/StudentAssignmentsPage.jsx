import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import studentService from '../../../services/studentService';
import AssignmentList from '../../../components/layout/student/MaterialList'

const StudentAssignmentsPage = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState({}); // Để quản lý trạng thái nộp bài

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const studentAssignments = await studentService.getStudentAssignments(user.id);
        setAssignments(studentAssignments);
        // Khởi tạo submissionStatus dựa trên trạng thái ban đầu của assignments
        const initialStatus = {};
        studentAssignments.forEach(assignment => {
          initialStatus[assignment.id] = assignment.status; // e.g., 'submitted', 'pending'
        });
        setSubmissionStatus(initialStatus);
      } catch (err) {
        setError('Không thể tải danh sách bài tập. Vui lòng thử lại.');
        console.error("Error fetching assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [user?.id]);

  const handleAssignmentSubmit = async (assignmentId, submissionUrl) => {
    // Cập nhật trạng thái tạm thời cho người dùng thấy
    setSubmissionStatus(prev => ({ ...prev, [assignmentId]: 'submitting' }));
    try {
      await studentService.submitAssignment(assignmentId, user.id, submissionUrl);
      // Cập nhật trạng thái cuối cùng nếu thành công
      setSubmissionStatus(prev => ({ ...prev, [assignmentId]: 'submitted' }));
      // Có thể fetch lại danh sách bài tập để cập nhật UI chính xác hơn
      // Hoặc chỉ cập nhật trạng thái của bài tập này trong state 'assignments'
      setAssignments(prevAssignments =>
        prevAssignments.map(a =>
          a.id === assignmentId ? { ...a, status: 'submitted' } : a
        )
      );
      alert('Nộp bài thành công!');
    } catch (err) {
      setError(`Không thể nộp bài tập ${assignmentId}. Vui lòng thử lại.`);
      setSubmissionStatus(prev => ({ ...prev, [assignmentId]: 'error' })); // Hoặc giữ nguyên trạng thái cũ
      console.error("Error submitting assignment:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Bài tập của tôi</h1>
      {loading && <p className="text-lg text-gray-700">Đang tải bài tập...</p>}
      {error && <p className="text-lg text-red-600">{error}</p>}
      {!loading && !error && assignments.length === 0 && (
        <p className="text-lg text-gray-700">Bạn chưa có bài tập nào.</p>
      )}
      {!loading && !error && assignments.length > 0 && (
        <AssignmentList
          assignments={assignments}
          submissionStatus={submissionStatus}
          onSubmit={handleAssignmentSubmit}
        />
      )}
    </div>
  );
};

export default StudentAssignmentsPage;