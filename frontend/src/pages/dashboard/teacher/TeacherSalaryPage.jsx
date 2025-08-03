import React, { useEffect, useState } from 'react';
import useApi from '../../../hooks/useApi';
import { getTeacherSalary } from '../../../services/teacherService';
import Table from '../../../components/common/Table';

const TeacherSalaryPage = () => {
  const { data, loading, error, execute } = useApi(getTeacherSalary);
  const [salary, setSalary] = useState([]);

  useEffect(() => {
    execute('user-2');
  }, [execute]);

  useEffect(() => {
    if (data) {
      console.log("Dữ liệu lương:", data);
      // Đảm bảo dữ liệu là mảng
      const normalized = Array.isArray(data) ? data : [data];
      setSalary(normalized);
    }
  }, [data]);

  const columns = [
    { key: 'payrollPeriod', header: 'Tháng' },
    { key: 'amount', header: 'Số tiền' },
    { key: 'status', header: 'Trạng thái' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bảng lương</h1>
      {loading && <p className="text-gray-500">Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <Table
        headers={columns.map(col => col.header)}
        data={salary}
        className="bg-white rounded-lg shadow-md"
        renderRow={(item) => (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.payrollPeriod}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.amount.toLocaleString()} đ</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.status === 'completed' ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </td>
          </>
        )}
      />
    </div>
  );
};

export default TeacherSalaryPage;
