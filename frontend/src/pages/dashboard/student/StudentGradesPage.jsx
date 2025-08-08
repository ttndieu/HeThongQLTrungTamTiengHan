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
          console.log('Raw grades data:', studentGrades); // Debug log
          
          // ✅ Transform data để phù hợp với GradesTable component
          const transformedGrades = [];
          
          // Process exam results
          if (studentGrades.exams && studentGrades.exams.length > 0) {
            studentGrades.exams.forEach(exam => {
              transformedGrades.push({
                courseName: getCourseName(exam.classId) || 'Không xác định',
                examType: exam.examName || 'Bài kiểm tra',
                score: exam.score || 0,
                maxScore: getMaxScore(exam.examName),
                date: formatDate(exam.examDate),
                comment: exam.teacherComment || '',
                type: 'exam'
              });
            });
          }
          
          // Process assignment results
          if (studentGrades.assignments && studentGrades.assignments.length > 0) {
            studentGrades.assignments.forEach(assignment => {
              if (assignment.score !== undefined) {
                transformedGrades.push({
                  courseName: getCourseName(assignment.classId) || 'Không xác định', 
                  examType: 'Bài tập: ' + (assignment.title || 'Không có tiêu đề'),
                  score: assignment.score || 0,
                  maxScore: 100, // Default max score for assignments
                  date: formatDate(assignment.submittedAt),
                  comment: assignment.teacherComment || '',
                  type: 'assignment'
                });
              }
            });
          }
          
          // Sort by date (newest first)
          transformedGrades.sort((a, b) => new Date(b.date) - new Date(a.date));
          
          setGrades(transformedGrades);
        } catch (err) {
          setError('Không thể tải điểm số. Vui lòng thử lại.');
          console.error("Error fetching grades:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchGrades();
    }, [user?.id]);
  
    // Helper functions
    const getCourseName = (classId) => {
      return 'Môn học'; 
    };
  
    const getMaxScore = (examName) => {
      if (examName && examName.toLowerCase().includes('topik')) {
        return 300; // TOPIK max score
      }
      return 100; // Default max score
    };
  
    const formatDate = (dateString) => {
      if (!dateString) return 'Không xác định';
      try {
        return new Date(dateString).toLocaleDateString('vi-VN');
      } catch {
        return 'Không xác định';
      }
    };
  
    // ✅ Improved loading state
    if (loading) {
      return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Điểm số của tôi</h1>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-lg text-gray-700">Đang tải điểm số...</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Điểm số của tôi</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {!error && grades.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-lg text-gray-700">Bạn chưa có điểm số nào.</p>
            <p className="text-sm text-gray-500 mt-2">Điểm số sẽ được cập nhật sau khi bạn hoàn thành các bài kiểm tra.</p>
          </div>
        )}
        
        {!error && grades.length > 0 && (
          <GradesTable grades={grades} />
        )}
      </div>
    );
  };
  
  export default StudentGradesPage;