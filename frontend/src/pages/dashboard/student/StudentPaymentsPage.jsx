import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import studentService from '../../../services/studentService';
import PaymentHistoryTable from '../../../components/layout/student/PaymentHistoryTable'

const StudentPaymentsPage = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const studentPayments = await studentService.getStudentPayments(user.id);
        setPayments(studentPayments);
      } catch (err) {
        setError('Không thể tải lịch sử thanh toán. Vui lòng thử lại.');
        console.error("Error fetching payments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user?.id]);

  // Giả định có thông tin học phí hiện tại
  const currentFee = { amount: 1500000, dueDate: '2024-09-15', status: 'unpaid' }; // Ví dụ

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Thanh toán học phí</h1>

      {/* Phần thông tin học phí hiện tại */}
      <div className="mb-8 p-5 bg-blue-50 border-l-4 border-blue-600 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Học phí hiện tại</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg text-gray-700">Số tiền: <span className="font-bold text-blue-700">{currentFee.amount.toLocaleString('vi-VN')} VNĐ</span></p>
            <p className="text-sm text-gray-600">Hạn chót: {currentFee.dueDate}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentFee.status === 'paid' ? 'bg-green-100 text-green-800' :
              currentFee.status === 'unpaid' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {currentFee.status === 'paid' ? 'Đã thanh toán' :
             currentFee.status === 'unpaid' ? 'Chưa thanh toán' : 'Tạm hoãn'}
          </span>
        </div>
        {currentFee.status === 'unpaid' && (
          <button className="mt-4 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200">
            Thanh toán ngay
          </button>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Lịch sử giao dịch</h2>
      {loading && <p className="text-lg text-gray-700">Đang tải lịch sử thanh toán...</p>}
      {error && <p className="text-lg text-red-600">{error}</p>}
      {!loading && !error && payments.length === 0 && (
        <p className="text-lg text-gray-700">Chưa có giao dịch thanh toán nào.</p>
      )}
      {!loading && !error && payments.length > 0 && (
        <PaymentHistoryTable payments={payments} />
      )}
    </div>
  );
};

export default StudentPaymentsPage;