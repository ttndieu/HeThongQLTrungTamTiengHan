// src/contexts/NotificationContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import Alert from '../components/common/Alert'; // Sẽ tạo ở phần sau

export const NotificationContext = createContext(null);


export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null); // { message, type: 'success'|'error'|'warning' }
  const [timeoutId, setTimeoutId] = useState(null);

  const showNotification = useCallback((message, type = 'info', duration = 3000) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setNotification({ message, type });
    const id = setTimeout(() => {
      showNotification(null);
    }, duration);
    setTimeoutId(id);
  }, [timeoutId]);

  const value = {
    showNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert message={notification.message} type={notification.type} />
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};