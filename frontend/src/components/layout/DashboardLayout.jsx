// src/components/layout/DashboardLayout.jsx
import React, { Fragment, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition, Menu } from '@headlessui/react'; // <-- BỎ COMMENT DÒNG NÀY
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ChevronDownIcon,
  HomeIcon, AcademicCapIcon, UserGroupIcon, BuildingOffice2Icon, BanknotesIcon,
  ClipboardDocumentListIcon, CalendarDaysIcon, ChartBarIcon, DocumentTextIcon,
  BookOpenIcon, DocumentArrowUpIcon, WalletIcon, ChatBubbleLeftRightIcon,
  LightBulbIcon, WrenchScrewdriverIcon, FingerPrintIcon, IdentificationIcon, ComputerDesktopIcon,
  UsersIcon, CurrencyDollarIcon, PresentationChartLineIcon, Cog6ToothIcon,
  GlobeAltIcon, MegaphoneIcon, PencilSquareIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { ROLES } from '../../utils/constants'; // Import ROLES
import { classNames } from '../../utils/helpers'; // Import hàm classNames
import Sidebar from './Sidebar';
import NotificationToast from '../common/NotificationToast'; // Import NotificationToast
import avatar from '../../assets/avatar.jpg';

// Danh sách điều hướng cho từng vai trò
const getNavigation = (userRole) => {
    // Navigation chung cho mọi người dùng đã đăng nhập
    let commonNav = [
        { name: 'Tổng quan', href: '/dashboard', icon: HomeIcon, roles: ['all_authenticated'] },
        { name: 'Hồ sơ của tôi', href: '/dashboard/profile', icon: UserGroupIcon, roles: ['all_authenticated'] },
    ];

    // Navigation cụ thể theo vai trò
    const roleSpecificNav = {
        [ROLES.REGISTERED_USER]: [
            { name: 'Đăng ký khóa học', href: '/dashboard/registered/enroll', icon: BookOpenIcon, roles: [ROLES.REGISTERED_USER] },
            { name: 'Kiểm tra trình độ', href: '/dashboard/registered/placement-test', icon: PencilSquareIcon, roles: [ROLES.REGISTERED_USER] },
            // Thêm các mục khác cho Registered User
        ],
        [ROLES.HOC_VIEN]: [
            { name: 'Lịch học', href: '/dashboard/student/schedule', icon: CalendarDaysIcon, roles: [ROLES.HOC_VIEN] },
            { name: 'Điểm số', href: '/dashboard/student/grades', icon: ChartBarIcon, roles: [ROLES.HOC_VIEN] },
            { name: 'Tài liệu học tập', href: '/dashboard/student/materials', icon: DocumentTextIcon, roles: [ROLES.HOC_VIEN] },
            { name: 'Bài tập', href: '/dashboard/student/assignments', icon: ClipboardDocumentListIcon, roles: [ROLES.HOC_VIEN] },
            { name: 'Thanh toán', href: '/dashboard/student/payments', icon: WalletIcon, roles: [ROLES.HOC_VIEN] },
            { name: 'Gửi phản hồi', href: '/dashboard/student/feedback', icon: ChatBubbleLeftRightIcon, roles: [ROLES.HOC_VIEN] },
        ],
        [ROLES.GIANG_VIEN]: [
            { name: 'Lớp học của tôi', href: '/dashboard/teacher/classes', icon: AcademicCapIcon, roles: [ROLES.GIANG_VIEN] },
            { name: 'Quản lý điểm danh', href: '/dashboard/teacher/attendance', icon: ClipboardDocumentListIcon, roles: [ROLES.GIANG_VIEN] },
            { name: 'Bài tập học viên', href: '/dashboard/teacher/assignments', icon: ClipboardDocumentListIcon, roles: [ROLES.GIANG_VIEN] },
            { name: 'Lịch dạy', href: '/dashboard/teacher/schedule', icon: CalendarDaysIcon, roles: [ROLES.GIANG_VIEN] },
            { name: 'Quản lý lương', href: '/dashboard/teacher/salary', icon: BanknotesIcon, roles: [ROLES.GIANG_VIEN] },
            { name: 'Thông báo', href: '/dashboard/teacher/notifications', icon: BellIcon, roles: [ROLES.GIANG_VIEN] },
        ],
        [ROLES.QUAN_LY_HOC_VU]: [
            { name: 'Quản lý Người dùng', href: '/dashboard/academic/students', icon: UserGroupIcon, roles: [ROLES.QUAN_LY_HOC_VU] }, // Gộp quản lý học viên và giảng viên
            { name: 'Quản lý Khóa học', href: '/dashboard/academic/courses', icon: AcademicCapIcon, roles: [ROLES.QUAN_LY_HOC_VU] },
            { name: 'Quản lý Lớp học', href: '/dashboard/academic/classes', icon: BuildingOffice2Icon, roles: [ROLES.QUAN_LY_HOC_VU] },
            { name: 'Lịch học & Lịch dạy', href: '/dashboard/academic/schedule', icon: CalendarDaysIcon, roles: [ROLES.QUAN_LY_HOC_VU] },
            { name: 'Đăng ký kiểm tra trình độ', href: '/dashboard/academic/placement-tests', icon: IdentificationIcon, roles: [ROLES.QUAN_LY_HOC_VU] },
            { name: 'Thông báo', href: '/dashboard/academic/notifications', icon: BellIcon, roles: [ROLES.QUAN_LY_HOC_VU] },
        ],
        [ROLES.KE_TOAN]: [
            { name: 'Quản lý Học phí', href: '/dashboard/accounting/tuition', icon: CurrencyDollarIcon, roles: [ROLES.KE_TOAN] },
            { name: 'Quản lý Lương', href: '/dashboard/accounting/payroll', icon: BanknotesIcon, roles: [ROLES.KE_TOAN] },
            { name: 'Báo cáo Tài chính', href: '/dashboard/accounting/reports', icon: PresentationChartLineIcon, roles: [ROLES.KE_TOAN] },
        ],
        [ROLES.QUAN_TRI_HE_THONG]: [
            { name: 'Quản lý Người dùng', href: '/dashboard/admin/users', icon: UserGroupIcon, roles: [ROLES.QUAN_TRI_HE_THONG] },
            { name: 'Báo cáo & Thống kê', href: '/dashboard/admin/reports', icon: ChartBarIcon, roles: [ROLES.QUAN_TRI_HE_THONG] },
            { name: 'Cấu hình hệ thống', href: '/dashboard/admin/settings', icon: WrenchScrewdriverIcon, roles: [ROLES.QUAN_TRI_HE_THONG] },
            { name: 'Quản lý Nội dung Website', href: '/dashboard/admin/website-content', icon: GlobeAltIcon, roles: [ROLES.QUAN_TRI_HE_THONG] },
            { name: 'Phân tích phản hồi', href: '/dashboard/admin/feedback-analysis', icon: LightBulbIcon, roles: [ROLES.QUAN_TRI_HE_THONG] },
            { name: 'Gửi thông báo toàn hệ thống', href: '/dashboard/academic/notifications', icon: MegaphoneIcon, roles: [ROLES.QUAN_TRI_HE_THONG] }, // Admin có thể gửi thông báo
        ],
    };

    const currentRoleNav = roleSpecificNav[userRole] || [];
    return [...commonNav, ...currentRoleNav];
};

const DashboardLayout = ({ children }) => {
    
    const { user, logout } = useAuth();
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        showNotification('Bạn đã đăng xuất.', 'info');
        navigate('/');
    };

    const userNavigation = [
        { name: 'Hồ sơ của bạn', href: '/dashboard/profile' },
        { name: 'Cài đặt', href: '#' }, // Tạm thời
    ];

    const navigation = getNavigation(user?.role);

    return (
        <div className="min-h-screen flex">
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Đóng sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <Sidebar navigation={navigation} />
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close button */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <Sidebar navigation={navigation} />
                </div>
            </div>

            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
                    <button
                        type="button"
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Mở sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex-1 px-4 flex justify-between">
                        <div className="flex-1 flex">
                            {/* Thanh tìm kiếm hoặc tiêu đề trang */}
                            <h1 className="text-2xl font-bold text-gray-900 self-center">
                                {/* Tiêu đề trang động */}
                                Dashboard
                            </h1>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <button
                                type="button"
                                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <span className="sr-only">Xem thông báo</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Profile dropdown */}
                            <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <span className="sr-only">Mở menu người dùng</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={user?.avatar || avatar}
                                            alt=""
                                        />
                                        <span className="ml-2 text-gray-700 hidden lg:inline-block">{user?.fullName || user?.username}</span>
                                        <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                            <Menu.Item key={item.name}>
                                                {({ active }) => (
                                                    <Link
                                                        to={item.href}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ))}
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={handleLogout}
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Đăng xuất
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children || <Outlet />} {/* Render children or Outlet */}
                        </div>
                    </div>
                </main>
            </div>
            <NotificationToast />
        </div>
    );
};

export default DashboardLayout;