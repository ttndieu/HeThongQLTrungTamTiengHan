// src/pages/dashboard/student/StudentMaterialsPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import studentService from '../../../services/studentService';
import MaterialList from '../../../components/layout/student/MaterialList'

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
        // Đảm bảo studentMaterials là một mảng
        setMaterials(Array.isArray(studentMaterials) ? studentMaterials : []);
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