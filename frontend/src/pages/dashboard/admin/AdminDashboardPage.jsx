// src/pages/admin/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import adminService from '../../../services/adminService';
import { toast } from 'react-toastify';
import { FaChartLine, FaUsers, FaUserPlus, FaComments, FaDollarSign } from 'react-icons/fa';
import Card from '../../../components/common/Card';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const AdminDashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const dashboardStats = await adminService.getDashboardStats();
                setStats(dashboardStats);
            } catch (error) {
                toast.error('Lỗi khi tải dữ liệu dashboard.');
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!stats) {
        return <div className="text-center p-4">Không thể tải dữ liệu dashboard.</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Bảng Điều Khiển Quản Trị</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="flex items-center p-6 bg-white shadow-md rounded-lg">
                    <div className="p-4 bg-blue-100 rounded-full">
                        <FaUsers className="text-blue-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Tổng Học Viên</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                    </div>
                </Card>
                <Card className="flex items-center p-6 bg-white shadow-md rounded-lg">
                    <div className="p-4 bg-green-100 rounded-full">
                        <FaDollarSign className="text-green-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Tổng Doanh Thu</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString('vi-VN')} VND</p>
                    </div>
                </Card>
                <Card className="flex items-center p-6 bg-white shadow-md rounded-lg">
                    <div className="p-4 bg-yellow-100 rounded-full">
                        <FaUserPlus className="text-yellow-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Đăng Ký Chờ Duyệt</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.pendingRegistrations}</p>
                    </div>
                </Card>
                <Card className="flex items-center p-6 bg-white shadow-md rounded-lg">
                    <div className="p-4 bg-red-100 rounded-full">
                        <FaComments className="text-red-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Phản Hồi Mới</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.unreadFeedback}</p>
                    </div>
                </Card>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Tổng quan hoạt động</h2>
                <Card className="p-6 bg-white shadow-md rounded-lg">
                    {/* Placeholder for a chart or more detailed report */}
                    <div className="flex justify-center items-center h-64 bg-gray-50 border border-dashed border-gray-300 rounded-md">
                        <p className="text-gray-500">Biểu đồ thống kê sẽ hiển thị ở đây.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
