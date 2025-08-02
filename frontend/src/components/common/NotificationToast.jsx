// src/components/common/NotificationToast.jsx
import React, { useEffect, useCallback } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'; // Sử dụng Icon của Heroicons

const NotificationToast = () => {
  const { notification, hideNotification } = useNotification();

  const handleDismiss = useCallback(() => {
    hideNotification();
  }, [hideNotification]);


  useEffect(() => {
    // Đây là điểm mấu chốt: CHỈ CHẠY CÁC DÒNG TIẾP THEO NẾU notification KHÔNG PHẢI LÀ null/undefined
    if (notification && notification.message) { // <-- Lỗi của bạn ở dòng 24, vậy đây là vị trí lỗi
      const timer = setTimeout(() => {
        handleDismiss();
      }, notification.duration || 3000); // Thêm giá trị mặc định cho duration phòng khi không được cung cấp
      return () => clearTimeout(timer);
    }
  }, [notification, handleDismiss]);

  // Dòng này rất quan trọng để dừng render sớm nếu không có thông báo
  if (!notification || !notification.message) {
    return null;
  }

  let bgColor, textColor, icon, iconColor;
  switch (notification.type) {
    case 'success':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      icon = <CheckCircleIcon className="h-6 w-6" />;
      iconColor = 'text-green-500';
      break;
    case 'error':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      icon = <ExclamationCircleIcon className="h-6 w-6" />;
      iconColor = 'text-red-500';
      break;
    case 'warning':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      icon = <ExclamationTriangleIcon className="h-6 w-6" />;
      iconColor = 'text-yellow-500';
      break;
    case 'info':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      icon = <InformationCircleIcon className="h-6 w-6" />;
      iconColor = 'text-blue-500';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      icon = <InformationCircleIcon className="h-6 w-6" />;
      iconColor = 'text-gray-500';
  }

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3
        ${bgColor} ${textColor}
        animate-slideIn
      `}
      role="alert"
    >
      <div className={`${iconColor}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{notification.message}</p>
      </div>
      <button
        onClick={handleDismiss}
        className={`ml-auto ${textColor} opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md`}
        aria-label="Đóng thông báo"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default NotificationToast;