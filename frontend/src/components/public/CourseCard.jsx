// src/components/public/CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import sach from '../../assets/sach.png';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-300">
      <img className="w-full h-48 object-cover" src={sach} alt={course.name} />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-blue-600">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
          </span>
          <span className="text-sm text-gray-500">{course.durationWeeks} tuần</span>
        </div>
        <Link to={`/courses/${course.id}`}>
          <Button variant="primary" className="w-full">
            Xem chi tiết
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;