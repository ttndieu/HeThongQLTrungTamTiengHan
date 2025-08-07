import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import studentService from '../../../services/studentService';
import PaymentHistoryTable from '../../../components/layout/student/PaymentHistoryTable'

const StudentPaymentsPage = () => {
    const { user } = useAuth();
    const [payments, setPayments] = useState([]);
    const [currentFees, setCurrentFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPaymentsAndFees = async () => {
        if (!user?.id) return;
        try {
          setLoading(true);
          const studentPayments = await studentService.getStudentPayments(user.id);
          setPayments(studentPayments);
          
          const currentFeesData = await calculateCurrentFees(user.id, studentPayments);
          setCurrentFees(currentFeesData);
          
        } catch (err) {
          setError('Không thể tải thông tin thanh toán. Vui lòng thử lại.');
          console.error("Error fetching payments:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPaymentsAndFees();
    }, [user?.id]);

    const calculateCurrentFees = async (studentId, existingPayments = []) => {
      try {
        const studentSchedule = await studentService.getStudentSchedule(studentId);
        
        const fees = studentSchedule.map(classInfo => {
          const existingPayment = existingPayments.find(p => p.classId === classInfo.id);
          
          return {
            id: `fee-${classInfo.id}`,
            classId: classInfo.id,
            className: classInfo.className,
            courseName: classInfo.courseName,
            amount: classInfo.coursePrice, 
            dueDate: new Date(classInfo.startDate.getTime() + 7 * 24 * 60 * 60 * 1000),
            status: existingPayment?.status === 'completed' ? 'completed' : 'unpaid'
          };
        });
        
        return fees;
      } catch (error) {
        console.error('Error calculating current fees:', error);
        return [];
      }
    };
  
    const handlePayment = async (feeId) => {
      alert('Chức năng thanh toán sẽ được tích hợp với cổng thanh toán thực tế!');
      
      setCurrentFees(prevFees => 
        prevFees.map(fee => 
          fee.id === feeId 
            ? { ...fee, status: 'completed' }
            : fee
        )
      );
    };
  
    if (loading) {
      return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Thanh toán học phí</h1>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-lg text-gray-700">Đang tải thông tin thanh toán...</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Thanh toán học phí</h1>
  
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            {error}
          </div>
        )}
  
        {/* Phần học phí hiện tại */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Học phí cần thanh toán</h2>
          
          {currentFees.length === 0 ? (
            <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <p className="text-blue-700">ℹ️ Hiện tại bạn chưa có lớp học nào hoặc đã thanh toán đầy đủ!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentFees.map((fee) => (
                <div 
                  key={fee.id}
                  className={`p-5 border-l-4 rounded-lg shadow-md ${
                    fee.status === 'completed' 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {fee.courseName}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">Lớp: {fee.className}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>
                          Số tiền: <span className="font-bold text-lg text-blue-700">
                            {fee.amount.toLocaleString('vi-VN')} VNĐ
                          </span>
                        </span>
                        <span>
                          Hạn chót: {fee.dueDate.toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          fee.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {fee.status === 'completed' ? '✅ Đã thanh toán' : '❌ Chưa thanh toán'}
                      </span>
                      
                      {fee.status !== 'completed' && (
                        <button 
                          onClick={() => handlePayment(fee.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
                        >
                          Thanh toán ngay
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
  
        {/* Lịch sử giao dịch */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Lịch sử giao dịch</h2>
          
          {payments.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg text-gray-700">Chưa có giao dịch thanh toán nào.</p>
            </div>
          ) : (
            <PaymentHistoryTable payments={payments} />
          )}
        </div>
      </div>
    );
  };
  
  export default StudentPaymentsPage;