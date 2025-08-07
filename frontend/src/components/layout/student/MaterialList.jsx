import React from 'react';
import { DocumentIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

const MaterialList = ({ materials = [] }) => { // Thêm default value là mảng rỗng
  const getIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <DocumentIcon className="h-6 w-6 text-red-500 mr-3" />;
      case 'pptx':
      case 'ppt':
        return <DocumentIcon className="h-6 w-6 text-orange-500 mr-3" />;
      case 'docx':
      case 'doc':
        return <DocumentIcon className="h-6 w-6 text-blue-500 mr-3" />;
      case 'mp4':
      case 'mov':
      case 'avi':
        return <PlayCircleIcon className="h-6 w-6 text-green-500 mr-3" />;
      default:
        return <DocumentIcon className="h-6 w-6 text-gray-500 mr-3" />;
    }
  };

  // Kiểm tra nếu materials không tồn tại hoặc không phải là mảng
  if (!materials || !Array.isArray(materials)) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Không có dữ liệu tài liệu để hiển thị.</p>
      </div>
    );
  }

  // Kiểm tra nếu mảng rỗng
  if (materials.length === 0) {
    return (
      <div className="text-center py-8">
        <DocumentIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Chưa có tài liệu nào được cung cấp.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {materials.map((material, index) => (
        <div 
          key={material.id || index} // Sử dụng material.id nếu có, fallback về index
          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center">
            {getIcon(material.fileType || 'unknown')}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {material.title || 'Không có tiêu đề'}
              </h3>
              <p className="text-sm text-gray-600">
                Môn: {material.courseName || 'Không xác định'} | 
                Loại: {material.type || 'Không xác định'}
              </p>
            </div>
          </div>
          <a
            href={material.url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Tải về
          </a>
        </div>
      ))}
    </div>
  );
};

export default MaterialList;