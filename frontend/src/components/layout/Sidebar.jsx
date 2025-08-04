// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { classNames } from '../../utils/helpers'; // Import hàm classNames
import { useAuth } from '../../contexts/AuthContext';
import { ROLES } from '../../utils/constants';
import {
    HomeIcon, AcademicCapIcon, UserGroupIcon, BuildingOffice2Icon, BanknotesIcon,
    ClipboardDocumentListIcon, CalendarDaysIcon, ChartBarIcon, DocumentTextIcon,
    BookOpenIcon, DocumentArrowUpIcon, WalletIcon, ChatBubbleLeftRightIcon,
    LightBulbIcon, WrenchScrewdriverIcon, FingerPrintIcon, BellIcon,
    ShieldCheckIcon, PencilSquareIcon, EnvelopeIcon, CubeTransparentIcon,
    IdentificationIcon, ComputerDesktopIcon // Example for Admin dashboard or overall
} from '@heroicons/react/24/outline';
import logo from '../../assets/logo.png'


const Sidebar = ({ navigation }) => {
    const location = useLocation();
    const { user } = useAuth();

    return (
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto">
            <div className="flex items-center justify-center flex-shrink-0 px-4 py-4">
                <Link to="/" className="flex items-center">
                    <img
                        className="h-18 w-auto"
                        src={logo}
                        alt="logo"
                    />
                </Link>
            </div>
            <nav className="flex-1 flex flex-col px-2 py-4">
                <div className="space-y-1">
                    {navigation.map((item) => {
                        // Conditional rendering based on user roles
                        const hasPermission = item.roles.includes(user?.role) || item.roles.includes('all_authenticated');

                        if (!hasPermission) {
                            return null; // Don't render if user doesn't have permission
                        }

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                    location.pathname.startsWith(item.href) && item.href !== '/dashboard' // Exact match for current route, but exclude root dashboard path for general matching
                                        ? 'bg-gray-100 text-blue-600'
                                        : location.pathname === '/dashboard' && item.href === '/dashboard'
                                            ? 'bg-gray-100 text-blue-600' // Handle base dashboard path
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                )}
                            >
                                <item.icon
                                    className={classNames(
                                        location.pathname.startsWith(item.href) && item.href !== '/dashboard'
                                            ? 'text-blue-500'
                                            : location.pathname === '/dashboard' && item.href === '/dashboard'
                                                ? 'text-blue-500'
                                                : 'text-gray-400 group-hover:text-gray-500',
                                        'mr-3 flex-shrink-0 h-6 w-6'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;