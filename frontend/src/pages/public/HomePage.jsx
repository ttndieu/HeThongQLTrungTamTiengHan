// src/pages/public/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { SparklesIcon, AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/outline'; // Ví dụ Heroicons

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 animate-fadeInDown">
            Chào mừng đến với EduCenter
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fadeIn">
            Nơi chắp cánh ước mơ tiếng Hàn của bạn!
          </p>
          <Link to="/courses">
            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 animate-zoomIn">
              Khám phá các khóa học
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Về chúng tôi</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
            EduCenter là trung tâm đào tạo tiếng Hàn uy tín, cam kết mang đến chất lượng giáo dục tốt nhất
            với đội ngũ giảng viên giàu kinh nghiệm và phương pháp giảng dạy hiện đại.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <SparklesIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chất lượng hàng đầu</h3>
              <p className="text-gray-600">Giáo trình chuẩn, phương pháp tiên tiến.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <AcademicCapIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Giáo viên giỏi</h3>
              <p className="text-gray-600">Đội ngũ giảng viên tận tâm, chuyên môn cao.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <UserGroupIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cộng đồng sôi nổi</h3>
              <p className="text-gray-600">Môi trường học tập và giao lưu tích cực.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Các khóa học nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for CourseCard components - will be dynamically loaded */}
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
              Course Card 1 (Placeholder)
            </div>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
              Course Card 2 (Placeholder)
            </div>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
              Course Card 3 (Placeholder)
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/courses">
              <Button variant="outline" className="text-lg px-6 py-2">
                Xem tất cả khóa học
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-500 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sẵn sàng bắt đầu hành trình tiếng Hàn của bạn?</h2>
          <p className="text-lg md:text-xl mb-8">Đăng ký ngay hôm nay để nhận tư vấn miễn phí!</p>
          <Link to="/auth/register">
            <Button variant="secondary" className="bg-white text-blue-500 hover:bg-gray-100 text-lg px-8 py-3">
              Đăng ký ngay
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;