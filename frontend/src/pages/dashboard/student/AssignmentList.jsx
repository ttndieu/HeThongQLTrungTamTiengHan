import React, { useState } from 'react';
import AssignmentForm from './AssignmentForm'; // Giả định bạn tạo component này

const AssignmentList = ({ assignments, submissionStatus, onSubmit }) => {
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

  const handleOpenForm = (assignmentId) => {
    setSelectedAssignmentId(assignmentId);
  };

  const handleCloseForm = () => {
    setSelectedAssignmentId(null);
  };

  return (
    <div className="space-y-6">
      {assignments.map((assignment) => (
        <div key={assignment.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{assignment.title}</h3>
              <p className="text-sm text-gray-600">Môn: {assignment.courseName}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                assignment.status === 'submitted' ? 'bg-green-100 text-green-800' :
                assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                assignment.status === 'late' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {assignment.status === 'submitted' ? 'Đã nộp' :
               assignment.status === 'pending' ? 'Chưa nộp' :
               assignment.status === 'late' ? 'Quá hạn' : 'Không xác định'}
            </span>
          </div>
          <p className="text-gray-700 mb-2">{assignment.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            Hạn chót: {assignment.dueDate}
          </p>

          {submissionStatus[assignment.id] === 'submitting' ? (
            <div className="text-blue-600">Đang xử lý nộp bài...</div>
          ) : submissionStatus[assignment.id] === 'error' ? (
            <div className="text-red-600">Lỗi khi nộp bài.</div>
          ) : assignment.status !== 'submitted' ? (
            <button
              onClick={() => handleOpenForm(assignment.id)}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              Nộp bài ngay
            </button>
          ) : (
            <div className="text-green-600 font-semibold">Bạn đã nộp bài thành công!</div>
          )}

          {selectedAssignmentId === assignment.id && (
            <AssignmentForm
              assignmentId={assignment.id}
              onClose={handleCloseForm}
              onSubmit={(url) => {
                onSubmit(assignment.id, url);
                handleCloseForm(); // Đóng form sau khi nộp
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;