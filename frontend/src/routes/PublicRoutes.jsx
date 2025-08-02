// src/routes/PublicRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';

// Import các trang công khai
import HomePage from '../pages/public/HomePage';
import CoursesPage from '../pages/public/CoursesPage';
import CourseDetailPage from '../pages/public/CourseDetailPage';
import TeachersPage from '../pages/public/TeachersPage';
import ContactPage from '../pages/public/ContactPage';
import AboutUsPage from '../pages/public/AboutUsPage'; // Nếu có
import PrivacyPolicyPage from '../pages/public/PrivacyPolicyPage'; // Nếu có
import TermsOfServicePage from '../pages/public/TermsOfServicePage'; // Nếu có

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        {/* Các route công khai khác */}
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;