// src/components/dashboard/student/AssignmentList.jsx
import React, { useState } from 'react';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  DocumentIcon,
  LinkIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import AssignmentForm from './AssignmentForm';

const AssignmentList = ({ assignments = [], submissionStatus = {}, onSubmit }) => {
  const [activeSubmission, setActiveSubmission] = useState(null);

  if (!Array.isArray(assignments) || assignments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Không có bài tập nào để hiển thị.</p>
      </div>
    );
  }

  const getStatusIcon = (assignment) => {
    const status = submissionStatus[assignment.id] || assignment.status;
    const isOverdue = assignment.isOverdue && status === 'pending';

    if (status === 'submitting') {
      return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />;
    }
    if (status === 'graded') {
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    }
    if (status === 'submitted') {
      return <CheckCircleIcon className="h-5 w-5 text-blue-500" />;
    }
    if (isOverdue) {
      return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
    }
    return <ClockIcon className="h-5 w-5 text-yellow-500" />;
  };

  const getStatusLabel = (assignment) => {
    const status = submissionStatus[assignment.id] || assignment.status;
    const isOverdue = assignment.isOverdue && status === 'pending';

    if (status === 'submitting') return 'Đang nộp...';
    if (status === 'graded') return 'Đã chấm điểm';
    if (status === 'submitted') return 'Đã nộp';
    if (isOverdue) return 'Quá hạn';
    return 'Chưa nộp';
  };

  const getStatusColor = (assignment) => {
    const status = submissionStatus[assignment.id] || assignment.status;
    const isOverdue = assignment.isOverdue && status === 'pending';

    if (status === 'submitting') return 'bg-blue-100 text-blue-800';
    if (status === 'graded') return 'bg-green-100 text-green-800';
    if (status === 'submitted') return 'bg-blue-100 text-blue-800';
    if (isOverdue) return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Không xác định';
    try {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Không xác định';
    }
  };

  const toggleSubmissionForm = (assignmentId) => {
    setActiveSubmission(activeSubmission === assignmentId ? null : assignmentId);
  };

  const handleFormSubmit = (assignmentId, submissionUrl) => {
    if (onSubmit) {
      onSubmit(assignmentId, submissionUrl);
    }
    // Close form after submission
    setActiveSubmission(null);
  };

  const handleFormCancel = () => {
    setActiveSubmission(null);
  };

  // Statistics
  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => (submissionStatus[a.id] || a.status) === 'pending').length,
    submitted: assignments.filter(a => ['submitted', 'graded'].includes(submissionStatus[a.id] || a.status)).length,
    overdue: assignments.filter(a => a.isOverdue && (submissionStatus[a.id] || a.status) === 'pending').length
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700">Tổng số bài tập</h3>
          <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-700">Chưa nộp</h3>
          <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-700">Đã nộp</h3>
          <p className="text-2xl font-bold text-green-900">{stats.submitted}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-700">Quá hạn</h3>
          <p className="text-2xl font-bold text-red-900">{stats.overdue}</p>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment) => {
          const status = submissionStatus[assignment.id] || assignment.status;
          const canSubmit = status === 'pending' && !assignment.isOverdue;
          const isSubmitting = status === 'submitting';
          
          return (
            <div 
              key={assignment.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Assignment Header */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">
                        {assignment.title}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment)}`}>
                        {getStatusIcon(assignment)}
                        <span className="ml-1">{getStatusLabel(assignment)}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <DocumentIcon className="h-4 w-4 mr-1" />
                        {assignment.courseName}
                      </span>
                      <span className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        Hạn: {formatDate(assignment.dueDate)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      {assignment.description}
                    </p>

                    {/* Assignment Material Link */}
                    {assignment.materialUrl && (
                      <a
                        href={assignment.materialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <LinkIcon className="h-4 w-4 mr-1" />
                        Xem đề bài
                      </a>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2 ml-4">
                    {canSubmit && (
                      <button
                        onClick={() => toggleSubmissionForm(assignment.id)}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
                      >
                        Nộp bài
                      </button>
                    )}
                    
                    {assignment.submission && (
                      <a
                        href={assignment.submission.submissionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium text-center"
                      >
                        Xem bài đã nộp
                      </a>
                    )}
                  </div>
                </div>

                {/* ✅ Submission Form - Sử dụng AssignmentForm component */}
                {activeSubmission === assignment.id && canSubmit && (
                  <AssignmentForm
                    assignment={assignment}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    isSubmitting={isSubmitting}
                  />
                )}

                {/* Grade Display */}
                {assignment.status === 'graded' && assignment.score !== null && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-green-900 mb-1">Kết quả chấm điểm</h4>
                        <p className="text-2xl font-bold text-green-700">
                          {assignment.score}/100 điểm
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-600">Nộp lúc:</p>
                        <p className="text-sm font-medium text-green-900">
                          {formatDate(assignment.submittedAt)}
                        </p>
                      </div>
                    </div>
                    {assignment.teacherComment && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <p className="text-sm font-medium text-green-900 mb-1">Nhận xét của giáo viên:</p>
                        <p className="text-sm text-green-800">{assignment.teacherComment}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssignmentList;