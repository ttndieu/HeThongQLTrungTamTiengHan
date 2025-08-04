// src/pages/admin/AdminReportsPage.jsx
import React, { useState, useEffect } from 'react';
import adminService from '../../../services/adminService';
import { toast } from 'react-toastify';
import { FaChartBar, FaUsers, FaDollarSign, FaBookOpen } from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js';
import Card from '../../../components/common/Card';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
);

const AdminReportsPage = () => {
    const [reports, setReports] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const fetchedReports = await adminService.getOverallReports();
                setReports(fetchedReports);
            } catch (error) {
                toast.error('Lỗi khi tải báo cáo tổng quan.');
                console.error('Error fetching reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!reports) {
        return <div className="text-center p-4">Không có dữ liệu báo cáo để hiển thị.</div>;
    }

    const enrollmentChartData = {
        labels: reports.enrollmentData.map(d => d.name),
        datasets: [
            {
                label: 'Số lượng học viên',
                data: reports.enrollmentData.map(d => d.students),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const revenueChartData = {
        labels: reports.revenueData.map(d => d.name),
        datasets: [
            {
                label: 'Doanh thu',
                data: reports.revenueData.map(d => d.revenue),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                        family: 'Inter, sans-serif'
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Số lượng / Doanh thu',
                    font: {
                        size: 14,
                        family: 'Inter, sans-serif'
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Khóa học / Tháng',
                    font: {
                        size: 14,
                        family: 'Inter, sans-serif'
                    }
                }
            }
        },
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <FaChartBar className="mr-3 text-purple-600" />
                Báo Cáo Thống Kê Tổng Quan
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 flex items-center bg-white shadow-md rounded-lg">
                    <div className="p-4 bg-blue-100 rounded-full">
                        <FaUsers className="text-blue-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Tổng Số Học Viên</p>
                        <p className="text-2xl font-bold text-gray-900">{reports.totalStudents}</p>
                    </div>
                </Card>
                <Card className="p-6 flex items-center bg-white shadow-md rounded-lg">
                    <div className="p-4 bg-green-100 rounded-full">
                        <FaDollarSign className="text-green-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Tổng Doanh Thu</p>
                        <p className="text-2xl font-bold text-gray-900">{reports.totalRevenue.toLocaleString('vi-VN')} VND</p>
                    </div>
                </Card>
                <Card className="p-6 flex items-center bg-white shadow-md rounded-lg">
                    <div className="p-4 bg-yellow-100 rounded-full">
                        <FaBookOpen className="text-yellow-600 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Khóa Học Đang Hoạt Động</p>
                        <p className="text-2xl font-bold text-gray-900">{reports.activeCourses}</p>
                    </div>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Biểu Đồ Học Viên Theo Khóa Học</h2>
                    <Bar data={enrollmentChartData} options={chartOptions} />
                </Card>
                <Card className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Biểu Đồ Doanh Thu</h2>
                    <Line data={revenueChartData} options={chartOptions} />
                </Card>
            </div>
        </div>
    );
};

export default AdminReportsPage;
