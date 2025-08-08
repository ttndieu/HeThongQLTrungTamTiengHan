import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import studentService from '../../../services/studentService';
import AssignmentList from '../../../components/layout/student/AssignmentList'; 

const StudentAssignmentsPage = () => {
    const { user } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState({});
  
    useEffect(() => {
      const fetchAssignments = async () => {
        if (!user?.id) return;
        try {
          setLoading(true);
          const studentAssignments = await studentService.getStudentAssignments(user.id);
          console.log('Raw assignments data:', studentAssignments); 
          
          const transformedAssignments = studentAssignments.map(assignment => ({
            id: assignment.id,
            title: assignment.title || 'Không có tiêu đề',
            description: assignment.description || 'Không có mô tả',
            dueDate: assignment.dueDate,
            courseName: assignment.courseName, 
            materialUrl: assignment.materialUrl,
            status: assignment.status || 'pending',
            submission: assignment.submission || null,
            score: assignment.submission?.score || null,
            teacherComment: assignment.submission?.teacherComment || null,
            submittedAt: assignment.submission?.submittedAt || null,
            isOverdue: isOverdue(assignment.dueDate)
          }));
          
          setAssignments(transformedAssignments);
          
          // Khởi tạo submissionStatus
          const initialStatus = {};
          transformedAssignments.forEach(assignment => {
            initialStatus[assignment.id] = assignment.status;
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
  
    const isOverdue = (dueDate) => {
      if (!dueDate) return false;
      return new Date(dueDate) < new Date();
    };
  
    const handleAssignmentSubmit = async (assignmentId, submissionUrl) => {
      setSubmissionStatus(prev => ({ ...prev, [assignmentId]: 'submitting' }));
      try {
        const result = await studentService.submitAssignment(assignmentId, user.id, submissionUrl);
        
        setSubmissionStatus(prev => ({ ...prev, [assignmentId]: 'submitted' }));
        
        setAssignments(prevAssignments =>
          prevAssignments.map(assignment =>
            assignment.id === assignmentId 
              ? { 
                  ...assignment, 
                  status: 'submitted',
                  submission: {
                    submissionUrl,
                    submittedAt: new Date(),
                    status: 'submitted'
                  }
                } 
              : assignment
          )
        );
        
        alert('Nộp bài thành công!');
      } catch (err) {
        setError(`Không thể nộp bài tập. Vui lòng thử lại.`);
        setSubmissionStatus(prev => ({ ...prev, [assignmentId]: 'error' }));
        console.error("Error submitting assignment:", err);
        
        setTimeout(() => {
          setSubmissionStatus(prev => ({ ...prev, [assignmentId]: 'pending' }));
          setError(null);
        }, 3000);
      }
    };
  
    if (loading) {
      return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Bài tập của tôi</h1>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-lg text-gray-700">Đang tải bài tập...</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Bài tập của tôi</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {!error && assignments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có bài tập nào</h3>
            <p className="text-gray-500">Bài tập sẽ được giáo viên giao trong quá trình học.</p>
          </div>
        )}
        
        {!error && assignments.length > 0 && (
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