// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Cột 1: Giới thiệu */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">EduCenter</h3>
                        <p className="text-gray-400 text-sm">
                            Trung tâm đào tạo tiếng Hàn hàng đầu, mang đến những khóa học chất lượng cao và môi trường học tập thân thiện.
                        </p>
                    </div>

                    {/* Cột 2: Liên kết nhanh */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white text-sm">Trang chủ</Link></li>
                            <li><Link to="/courses" className="text-gray-400 hover:text-white text-sm">Khóa học</Link></li>
                            <li><Link to="/teachers" className="text-gray-400 hover:text-white text-sm">Giáo viên</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Liên hệ</Link></li>
                            <li><Link to="/about-us" className="text-gray-400 hover:text-white text-sm">Về chúng tôi</Link></li>
                        </ul>
                    </div>

                    {/* Cột 3: Chính sách */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Chính sách</h3>
                        <ul className="space-y-2">
                            <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm">Chính sách bảo mật</Link></li>
                            <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white text-sm">Điều khoản dịch vụ</Link></li>
                            {/* Thêm các chính sách khác */}
                        </ul>
                    </div>

                    {/* Cột 4: Thông tin liên hệ */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
                        <p className="text-gray-400 text-sm">
                            Địa chỉ: 123 Đường ABC, Quận XYZ, TP Đà Nẵng
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Email: info@educenter.com
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Điện thoại: (84) 123 456 789
                        </p>
                        {/**/}
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-youtube"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
                    &copy; {currentYear} EduCenter. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;