// src/components/dashboard/student/AssignmentForm.jsx
import React, { useState } from 'react';

const AssignmentForm = ({ assignment, onSubmit, onCancel, isSubmitting }) => {
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [errors, setErrors] = useState({});

  const validateUrl = (url) => {
    if (!url || !url.trim()) {
      return 'Vui lòng nhập URL bài nộp!';
    }
    
    // Basic URL validation
    try {
      new URL(url);
    } catch {
      return 'URL không hợp lệ. Vui lòng nhập URL đầy đủ (bắt đầu với http:// hoặc https://)';
    }

    // Check for common document platforms
    const allowedDomains = [
      'docs.google.com',
      'drive.google.com', 
      'onedrive.live.com',
      'dropbox.com',
      'github.com'
    ];
    
    const urlObj = new URL(url);
    const isAllowedDomain = allowedDomains.some(domain => 
      urlObj.hostname.includes(domain)
    );
    
    if (!isAllowedDomain) {
      return 'Vui lòng sử dụng URL từ Google Docs, Google Drive, OneDrive, Dropbox hoặc GitHub';
    }
    
    return null;
  };

  const handleSubmissionUrlChange = (e) => {
    const url = e.target.value;
    setSubmissionUrl(url);
    
    // Clear previous errors when user starts typing
    if (errors.url) {
      setErrors(prev => ({ ...prev, url: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const urlError = validateUrl(submissionUrl);
    if (urlError) {
      setErrors({ url: urlError });
      return;
    }
    
    setErrors({});
    onSubmit(assignment.id, submissionUrl.trim());
  };

  const handleCancel = () => {
    setSubmissionUrl('');
    setErrors({});
    onCancel();
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
      <h4 className="text-sm font-medium text-gray-900 mb-3">
        Nộp bài tập: {assignment.title}
      </h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor={`submission-url-${assignment.id}`}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            URL bài làm <span className="text-red-500">*</span>
          </label>
          <input
            id={`submission-url-${assignment.id}`}
            type="url"
            value={submissionUrl}
            onChange={handleSubmissionUrlChange}
            placeholder="https://docs.google.com/document/d/..."
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.url 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          />
          {errors.url && (
            <p className="mt-1 text-sm text-red-600">{errors.url}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Hỗ trợ: Google Docs, Google Drive, OneDrive, Dropbox, GitHub
          </p>
        </div>

        {/* Submission Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <h5 className="text-sm font-medium text-blue-900 mb-2">
            📋 Hướng dẫn nộp bài:
          </h5>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Đảm bảo file/link có thể truy cập được</li>
            <li>• Đặt quyền "Anyone with the link can view" cho Google Drive</li>
            <li>• Kiểm tra link trước khi nộp</li>
            <li>• Nộp bài trước hạn để tránh trễ deadline</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !submissionUrl.trim()}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang nộp...
              </span>
            ) : (
              '✅ Xác nhận nộp'
            )}
          </button>
          
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 disabled:opacity-50 transition-colors duration-200"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentForm;