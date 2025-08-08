import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import studentService from '../../../services/studentService';
import MaterialList from '../../../components/layout/student/MaterialList';

const StudentMaterialsPage = () => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const studentMaterials = await studentService.getStudentMaterials(user.id);
        console.log('Raw materials data:', studentMaterials);
        
        // ✅ Transform data để phù hợp với MaterialList component
        const transformedMaterials = studentMaterials.map(assignment => ({
          id: assignment.id,
          title: assignment.title || 'Không có tiêu đề',
          description: assignment.description || 'Không có mô tả',
          courseName: getCourseName(assignment.classId) || 'Không xác định',
          type: 'Tài liệu học tập',
          fileType: extractFileType(assignment.materialUrl),
          url: assignment.materialUrl || '#',
          uploadDate: formatDate(assignment.dueDate),
          size: 'N/A' 
        }));
        
        setMaterials(Array.isArray(transformedMaterials) ? transformedMaterials : []);
      } catch (err) {
        setError('Không thể tải tài liệu học tập. Vui lòng thử lại.');
        console.error("Error fetching materials:", err);
        setMaterials([]); // Set về mảng rỗng khi có lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [user?.id]);

  // Helper functions
  const getCourseName = (classId) => {
    // This would ideally come from the API response or context
    const classMap = {
      'class-1': 'Tiếng Hàn Sơ Cấp 1',
      'class-3': 'Tiếng Hàn Giao Tiếp',
      'class-6': 'Tiếng Hàn Trung Cấp 1',
      'class-8': 'Luyện thi TOPIK I'
    };
    return classMap[classId] || 'Không xác định';
  };

  const extractFileType = (url) => {
    if (!url) return 'unknown';
    if (url.includes('docs.google.com')) return 'doc';
    if (url.includes('.pdf')) return 'pdf';
    if (url.includes('.ppt')) return 'ppt';
    if (url.includes('.mp4')) return 'mp4';
    return 'doc'; // Default for Google Docs links
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Không xác định';
    try {
      return new Date(dateString).toLocaleDateString('vi-VN');
    } catch {
      return 'Không xác định';
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Tài liệu học tập</h1>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-lg text-gray-700">Đang tải tài liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tài liệu học tập</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <MaterialList materials={materials} />
    </div>
  );
};

export default StudentMaterialsPage;