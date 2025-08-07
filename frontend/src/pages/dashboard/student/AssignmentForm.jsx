import React, { useState } from 'react';

const AssignmentForm = ({ assignmentId, onClose, onSubmit }) => {
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!submissionUrl.trim()) {
      setError('Vui lòng nhập URL hoặc đường dẫn bài nộp.');
      return;
    }
    setError(''); // Reset error
    onSubmit(submissionUrl);
    setSubmissionUrl(''); // Clear input after submit
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">Nộp bài cho Bài tập ID: {assignmentId}</h4>
      <div className="mb-3">
        <label htmlFor="submissionUrl" className="block text-sm font-medium text-gray-700 mb-1">
          URL bài nộp (hoặc liên kết tải lên):
        </label>
        <input
          type="text"
          id="submissionUrl"
          value={submissionUrl}
          onChange={(e) => setSubmissionUrl(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="https://example.com/bai-tap-cua-ban.pdf"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
        >
          Hủy
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
        >
          Xác nhận nộp
        </button>
      </div>
    </div>
  );
};

export default AssignmentForm;