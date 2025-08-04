// src/pages/dashboard/admin/AdminOverallReportsPage.jsx

import React, { useState, useEffect } from 'react';
import Card from '../../../components/common/Card';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import Alert from '../../../components/common/Alert';
import { mockGetOverallReports } from '../../../services/adminService';
import { UserGroupIcon, ChartBarIcon, CurrencyDollarIcon, BookOpenIcon } from '@heroicons/react/solid';

const AdminOverallReportsPage = () => {
    const [reports, setReports] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await mockGetOverallReports();
                setReports(data);
            } catch (err) {
                setError('Không thể lấy báo cáo tổng thể.');
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return <div className="p-6 flex justify-center items-center h-screen"><LoadingSpinner size="lg" /></div>;
    }

    if (error) {
        return <div className="p-6"><Alert type="error" message={error} /></div>;
    }

    const { totalStudents, totalRevenue, activeCourses, enrollmentData, revenueData } = reports;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Báo cáo Tổng thể</h1>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="flex items-center gap-4 bg-indigo-50">
                    <UserGroupIcon className="w-12 h-12 text-indigo-600 p-2 bg-indigo-200 rounded-full" />
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Tổng số Học viên</h3>
                        <p className="text-3xl font-bold text-gray-900">{totalStudents.toLocaleString()}</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 bg-green-50">
                    <CurrencyDollarIcon className="w-12 h-12 text-green-600 p-2 bg-green-200 rounded-full" />
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Tổng Doanh thu</h3>
                        <p className="text-3xl font-bold text-gray-900">{totalRevenue.toLocaleString()} VND</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 bg-yellow-50">
                    <BookOpenIcon className="w-12 h-12 text-yellow-600 p-2 bg-yellow-200 rounded-full" />
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Số khóa học đang hoạt động</h3>
                        <p className="text-3xl font-bold text-gray-900">{activeCourses}</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 bg-red-50">
                    <ChartBarIcon className="w-12 h-12 text-red-600 p-2 bg-red-200 rounded-full" />
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Mô phỏng Chỉ số khác</h3>
                        <p className="text-3xl font-bold text-gray-900">123</p>
                    </div>
                </Card>
            </div>

            {/* Enrollment and Revenue Data */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Top 5 Khóa học có nhiều học viên nhất</h3>
                    <ul className="divide-y divide-gray-200">
                        {enrollmentData.slice(0, 5).map((course, index) => (
                            <li key={index} className="py-4 flex justify-between items-center">
                                <span className="font-medium text-gray-700">{course.name}</span>
                                <span className="text-gray-500">{course.students} học viên</span>
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Biểu đồ Doanh thu theo tháng</h3>
                    {/* Placeholder for a chart. In a real app, you would use a library like Recharts here. */}
                    <div className="bg-gray-100 rounded-md p-4 text-center text-gray-500 h-64 flex items-center justify-center">
                        <p>Biểu đồ sẽ hiển thị ở đây (ví dụ: sử dụng Recharts)</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminOverallReportsPage;
