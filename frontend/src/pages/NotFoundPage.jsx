// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Trang không tìm thấy.</h2>
        <p className="text-gray-600 text-lg mb-8">Rất tiếc, trang bạn đang tìm kiếm không tồn tại.</p>
        <Link to="/">
          <Button variant="primary">
            Quay về trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;