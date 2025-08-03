import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import useApi from '../../../hooks/useApi';
import { useNotification } from '../../../hooks/useNotification';
import { uploadMaterial, getAssignments, submitComment } from '../../../services/teacherService';

const TeacherAssignmentManagementPage = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const { data: assignments, loading, error, execute: fetchAssignments } = useApi(getAssignments);
  const { execute: uploadMaterialFn } = useApi(uploadMaterial);
  const { execute: submitCommentFn } = useApi(submitComment);
  const [materialForm, setMaterialForm] = useState({
    classId: '',
    title: '',
    description: '',
    dueDate: '',
    url: '',
  });
  const [commentForm, setCommentForm] = useState({
    submissionId: '',
    grade: '',
    comment: '',
  });
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
  if (user?.id) {
    fetchAssignments(user.id);
  }
}, [user?.id]);

  useEffect(() => {
    if (error) {
      showNotification(`Lỗi: ${error.message}`, 'error');
    }
  }, [error, showNotification]);

  const handleMaterialInputChange = (e) => {
    const { name, value } = e.target;
    setMaterialForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMaterialSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadMaterialFn(materialForm.classId, materialForm);
      setMaterialForm({ classId: '', title: '', description: '', dueDate: '', url: '' });
      fetchAssignments(user.id);
      showNotification('Tải tài liệu thành công!', 'success');
      await uploadMaterialFn(materialForm.classId, materialForm);
      console.log("Tải lên thành công, gọi lại fetchAssignments...");
      await fetchAssignments(user.id); // nhớ await nếu useApi hỗ trợ

    } catch (err) {
      showNotification(`Lỗi khi tải tài liệu: ${err.message}`, 'error');
    }
  };

  const handleCommentInputChange = (e) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitCommentFn(commentForm.submissionId, parseFloat(commentForm.grade), commentForm.comment);
      setCommentForm({ submissionId: '', grade: '', comment: '' });
      fetchAssignments(user.id);
      showNotification('Nhận xét bài tập thành công!', 'success');
    } catch (err) {
      showNotification(`Lỗi khi nhận xét bài tập: ${err.message}`, 'error');
    }
  };

  const handleSelectAssignment = (assignment) => {
    setSelectedAssignment(assignment);
  };

  if (loading) {
    return <div className="p-6">Đang tải...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý bài tập và tài liệu</h2>

      {/* Form tải tài liệu/bài tập */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Tải tài liệu/bài tập mới</h3>
        <form onSubmit={handleMaterialSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Lớp học</label>
            <select
              name="classId"
              value={materialForm.classId}
              onChange={handleMaterialInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value="">Chọn lớp</option>
              <option value="class-1">SC1-A2025</option>
              <option value="class-2">TC1-B2025</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
            <input
              type="text"
              name="title"
              value={materialForm.title}
              onChange={handleMaterialInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              name="description"
              value={materialForm.description}
              onChange={handleMaterialInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Hạn nộp (nếu có)</label>
            <input
              type="date"
              name="dueDate"
              value={materialForm.dueDate}
              onChange={handleMaterialInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">URL tài liệu</label>
            <input
              type="url"
              name="url"
              value={materialForm.url}
              onChange={handleMaterialInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Tải lên
          </button>
        </form>
      </div>

      {/* Danh sách bài tập */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <h3 className="text-lg font-semibold p-4">Danh sách bài tập</h3>
        {assignments && assignments.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lớp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hạn nộp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{assignment.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{assignment.classId === 'class-1' ? 'SC1-A2025' : 'TC1-B2025'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString('vi-VN') : 'Không có'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleSelectAssignment(assignment)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Xem bài nộp
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-gray-500">Không có bài tập nào.</p>
        )}
      </div>

      {/* Form nhận xét bài tập */}
      {selectedAssignment && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Nhận xét bài tập: {selectedAssignment.title}</h3>
          {selectedAssignment.submissions && selectedAssignment.submissions.length > 0 ? (
            <div>
              <table className="min-w-full divide-y divide-gray-200 mb-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Học viên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL bài nộp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày nộp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedAssignment.submissions.map((submission) => (
                    <tr key={submission.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{submission.studentName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={submission.submissionUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          Xem bài nộp
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(submission.submittedAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{submission.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <form onSubmit={handleCommentSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Chọn bài nộp</label>
                  <select
                    name="submissionId"
                    value={commentForm.submissionId}
                    onChange={handleCommentInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required
                  >
                    <option value="">Chọn bài nộp</option>
                    {selectedAssignment.submissions.map((submission) => (
                      <option key={submission.id} value={submission.id}>
                        {submission.studentName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Điểm</label>
                  <input
                    type="number"
                    name="grade"
                    value={commentForm.grade}
                    onChange={handleCommentInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    min="0"
                    max="100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Nhận xét</label>
                  <textarea
                    name="comment"
                    value={commentForm.comment}
                    onChange={handleCommentInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    rows="4"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Gửi nhận xét
                </button>
              </form>
            </div>
          ) : (
            <p className="text-gray-500">Không có bài nộp nào cho bài tập này.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherAssignmentManagementPage;