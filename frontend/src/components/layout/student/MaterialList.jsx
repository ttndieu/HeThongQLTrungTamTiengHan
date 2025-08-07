// src/components/dashboard/student/MaterialList.jsx
import React, { useState } from 'react';
import { DocumentIcon, PlayCircleIcon, DocumentTextIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline';

const MaterialList = ({ materials = [] }) => {
  const [viewMode, setViewMode] = useState('list');

  const getIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <DocumentIcon className="h-6 w-6 text-red-500 mr-3" />;
      case 'pptx':
      case 'ppt':
        return <PresentationChartBarIcon className="h-6 w-6 text-orange-500 mr-3" />;
      case 'docx':
      case 'doc':
        return <DocumentTextIcon className="h-6 w-6 text-blue-500 mr-3" />;
      case 'mp4':
      case 'mov':
      case 'avi':
        return <PlayCircleIcon className="h-6 w-6 text-green-500 mr-3" />;
      default:
        return <DocumentIcon className="h-6 w-6 text-gray-500 mr-3" />;
    }
  };

  const getFileTypeLabel = (fileType) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return 'PDF Document';
      case 'pptx':
      case 'ppt': return 'PowerPoint';
      case 'docx':
      case 'doc': return 'Word Document';
      case 'mp4':
      case 'mov':
      case 'avi': return 'Video';
      default: return 'Document';
    }
  };

  // ✅ Safety check for data
  if (!Array.isArray(materials) || materials.length === 0) {
    return (
      <div className="text-center py-12">
        <DocumentIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có tài liệu học tập</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Tài liệu học tập sẽ được giáo viên cung cấp trong quá trình học. 
          Hãy kiểm tra lại sau hoặc liên hệ với giáo viên nếu bạn cần hỗ trợ.
        </p>
      </div>
    );
  }

  const handleDownload = (material) => {
    if (material.url && material.url !== '#') {
      window.open(material.url, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with stats and view toggle */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-blue-700">
              Tổng số tài liệu: {materials.length}
            </span>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-green-700">
              Môn học: {new Set(materials.map(m => m.courseName)).size}
            </span>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'list' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Danh sách
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Lưới
          </button>
        </div>
      </div>

      {/* Materials Display */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {materials.map((material, index) => (
            <div 
              key={material.id || index} 
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center flex-1 min-w-0">
                {getIcon(material.fileType)}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {material.title || 'Không có tiêu đề'}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-600">
                      Môn: {material.courseName || 'Không xác định'}
                    </span>
                    <span className="text-sm text-gray-500">
                      Loại: {getFileTypeLabel(material.fileType)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Ngày: {material.uploadDate || 'Không xác định'}
                    </span>
                  </div>
                  {material.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {material.description}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDownload(material)}
                disabled={!material.url || material.url === '#'}
                className={`ml-4 px-4 py-2 rounded-md transition-colors duration-200 ${
                  !material.url || material.url === '#'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                }`}
              >
                {!material.url || material.url === '#' ? 'Không khả dụng' : 'Xem/Tải về'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material, index) => (
            <div 
              key={material.id || index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gray-50 rounded-full">
                  {getIcon(material.fileType)}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2 line-clamp-2">
                {material.title || 'Không có tiêu đề'}
              </h3>
              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-600 text-center">
                  <span className="font-medium">Môn:</span> {material.courseName || 'Không xác định'}
                </div>
                <div className="text-sm text-gray-500 text-center">
                  {getFileTypeLabel(material.fileType)} • {material.uploadDate || 'N/A'}
                </div>
              </div>
              <button
                onClick={() => handleDownload(material)}
                disabled={!material.url || material.url === '#'}
                className={`w-full px-4 py-2 rounded-md transition-colors duration-200 ${
                  !material.url || material.url === '#'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {!material.url || material.url === '#' ? 'Không khả dụng' : 'Xem/Tải về'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaterialList;