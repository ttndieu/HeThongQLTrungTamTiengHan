import React from 'react';

const GradesTable = ({ grades = [] }) => {
  // ✅ Safety check for data
  if (!Array.isArray(grades) || grades.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Không có dữ liệu điểm số để hiển thị.</p>
      </div>
    );
  }

  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600 font-semibold';
    if (percentage >= 60) return 'text-blue-600 font-semibold';
    if (percentage >= 40) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  const getGradeBadge = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { text: 'Xuất sắc', color: 'bg-green-100 text-green-800' };
    if (percentage >= 80) return { text: 'Giỏi', color: 'bg-blue-100 text-blue-800' };
    if (percentage >= 70) return { text: 'Khá', color: 'bg-yellow-100 text-yellow-800' };
    if (percentage >= 50) return { text: 'Trung bình', color: 'bg-orange-100 text-orange-800' };
    return { text: 'Yếu', color: 'bg-red-100 text-red-800' };
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700">Tổng số bài kiểm tra</h3>
          <p className="text-2xl font-bold text-blue-900">{grades.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-700">Điểm trung bình</h3>
          <p className="text-2xl font-bold text-green-900">
            {grades.length > 0 
              ? ((grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / grades.length).toFixed(1) + '%')
              : '0%'
            }
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-700">Bài kiểm tra gần nhất</h3>
          <p className="text-2xl font-bold text-purple-900">
            {grades.length > 0 ? grades[0].date : 'Chưa có'}
          </p>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Môn học
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại bài kiểm tra
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Điểm số
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Xếp loại
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nhận xét
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {grades.map((grade, index) => {
              const badge = getGradeBadge(grade.score, grade.maxScore);
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {grade.courseName || 'Không xác định'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center">
                      {grade.type === 'exam' ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                          Kiểm tra
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-2">
                          Bài tập
                        </span>
                      )}
                      {grade.examType || 'Không xác định'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <span className={getScoreColor(grade.score, grade.maxScore)}>
                        {grade.score || 0}
                      </span>
                      <span className="text-gray-500 ml-1">
                        /{grade.maxScore || 100}
                      </span>
                      <span className="text-gray-400 ml-2">
                        ({((grade.score / grade.maxScore) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                      {badge.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {grade.date || 'Không xác định'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                    <div className="truncate" title={grade.comment}>
                      {grade.comment || 'Chưa có nhận xét'}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradesTable;