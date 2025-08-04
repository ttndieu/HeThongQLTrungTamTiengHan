// src/pages/admin/AdminSystemSettingsPage.jsx
import React, { useState, useEffect } from 'react';
import adminService from '../../../services/adminService';
import { toast } from 'react-toastify';
import { FaCog, FaSave, FaMoon, FaSun } from 'react-icons/fa';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useTheme } from '../../../contexts/ThemeContext';

const AdminSystemSettingsPage = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const fetchedSettings = await adminService.getSystemSettings();
                setSettings(fetchedSettings);
            } catch (error) {
                toast.error('Lỗi khi tải cài đặt hệ thống.');
                console.error('Error fetching system settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setSettings(prevSettings => ({
            ...prevSettings,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSaveSettings = async () => {
        setIsSaving(true);
        try {
            await adminService.updateSystemSettings(settings);
            toast.success('Cài đặt hệ thống đã được cập nhật thành công!');
        } catch (error) {
            toast.error('Lỗi khi cập nhật cài đặt hệ thống.');
            console.error('Error updating system settings:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!settings) {
        return <div className="text-center p-4 dark:text-gray-300">Không có dữ liệu cài đặt hệ thống.</div>;
    }

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen font-inter transition-colors duration-200">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                <FaCog className="mr-3 text-purple-600" />
                Cài Đặt Hệ Thống
            </h1>
            <Card className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Chế độ bảo trì */}
                    <div className="flex flex-col">
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                            Chế độ bảo trì
                        </label>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="maintenanceMode"
                                checked={settings.maintenanceMode}
                                onChange={handleInputChange}
                                className="form-checkbox h-5 w-5 text-purple-600 rounded-md"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">Bật chế độ bảo trì</span>
                        </div>
                    </div>
                    
                    {/* Thông báo qua Email */}
                    <div className="flex flex-col">
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                            Thông báo qua Email
                        </label>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={settings.emailNotifications}
                                onChange={handleInputChange}
                                className="form-checkbox h-5 w-5 text-purple-600 rounded-md"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">Bật thông báo qua email</span>
                        </div>
                    </div>
                    
                    {/* Đơn vị tiền tệ mặc định */}
                    <div className="flex flex-col">
                        <label htmlFor="defaultCurrency" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                            Đơn vị tiền tệ mặc định
                        </label>
                        <select
                            id="defaultCurrency"
                            name="defaultCurrency"
                            value={settings.defaultCurrency}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                        >
                            <option value="VND">VND - Đồng Việt Nam</option>
                            <option value="USD">USD - Đô la Mỹ</option>
                        </select>
                    </div>

                    {/* Chế độ tối (Dark Mode) */}
                    <div className="flex flex-col">
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                            Chế độ giao diện
                        </label>
                        <div className="flex items-center">
                            <button
                                onClick={toggleTheme}
                                className="flex items-center justify-center p-2 rounded-full text-white transition-all duration-300 transform hover:scale-105"
                            >
                                {theme === 'dark' ? (
                                    <FaSun className="text-yellow-400 text-2xl" />
                                ) : (
                                    <FaMoon className="text-gray-600 text-2xl" />
                                )}
                            </button>
                            <span className="ml-2 text-gray-700 dark:text-gray-300">
                                {theme === 'dark' ? 'Chế độ tối' : 'Chế độ sáng'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button
                        onClick={handleSaveSettings}
                        disabled={isSaving}
                        className="bg-purple-600 text-white hover:bg-purple-700 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                    >
                        {isSaving ? (
                            'Đang lưu...'
                        ) : (
                            <>
                                <FaSave className="mr-2" /> Lưu Cài Đặt
                            </>
                        )}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default AdminSystemSettingsPage;
