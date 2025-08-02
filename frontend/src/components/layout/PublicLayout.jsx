// src/components/layout/PublicLayout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import NotificationToast from '../common/NotificationToast';

const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <NotificationToast />
    </div>
  );
};

export default PublicLayout;