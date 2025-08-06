// src/pages/dashboard/admin/AdminWebsiteContentManagementPage.jsx

import React, { useState, useEffect } from 'react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import FormField from '../../../components/common/FormField';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import Alert from '../../../components/common/Alert';
import adminService from '../../../services/adminService'; // ✅ Sửa tại đây

const AdminWebsiteContentManagementPage = () => {
    const [content, setContent] = useState({
        heroBannerTitle: '',
        heroBannerDescription: '',
        aboutUsText: '',
        contactEmail: '',
    });
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [alert, setAlert] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await adminService.getWebsiteContent(); // ✅ Gọi từ adminService
                setContent(data);
            } catch (err) {
                setError('Không thể lấy nội dung trang web.');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContent({ ...content, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setAlert(null);
        setError(null);
        try {
            await adminService.updateWebsiteContent(content); // ✅ Gọi từ adminService
            setAlert({ type: 'success', message: 'Nội dung trang web đã được cập nhật thành công!' });
        } catch (err) {
            setError('Đã xảy ra lỗi khi cập nhật nội dung.');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <div className="p-6 flex justify-center items-center h-screen"><LoadingSpinner size="lg" /></div>;
    }

    if (error) {
        return <div className="p-6"><Alert type="error" message={error} /></div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Quản lý Nội dung Trang web</h1>

            {alert && <Alert type={alert.type} message={alert.message} className="mb-4" />}

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormField
                        label="Tiêu đề Banner"
                        name="heroBannerTitle"
                        type="text"
                        value={content.heroBannerTitle}
                        onChange={handleChange}
                    />
                    <FormField
                        label="Mô tả Banner"
                        name="heroBannerDescription"
                        type="textarea"
                        value={content.heroBannerDescription}
                        onChange={handleChange}
                    />
                    <FormField
                        label="Giới thiệu về chúng tôi"
                        name="aboutUsText"
                        type="textarea"
                        value={content.aboutUsText}
                        onChange={handleChange}
                    />
                    <FormField
                        label="Email Liên hệ"
                        name="contactEmail"
                        type="email"
                        value={content.contactEmail}
                        onChange={handleChange}
                    />

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-indigo-600 text-white hover:bg-indigo-700"
                            disabled={isSaving}
                        >
                            {isSaving ? <LoadingSpinner size="sm" /> : 'Lưu Thay đổi'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AdminWebsiteContentManagementPage;
