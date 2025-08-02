// src/hooks/useApi.js
import { useState, useCallback } from 'react';
import { useNotification } from '../contexts/NotificationContext';

const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...args);
      setData(result);
      // showNotification('Thao tác thành công!', 'success'); // Có thể tùy chọn
      return { success: true, data: result };
    } catch (err) {
      setError(err);
      showNotification(err.message || 'Có lỗi xảy ra!', 'error');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  }, [apiFunction, showNotification]);

  return { data, loading, error, execute, setData, setError }; // Thêm setData, setError để có thể cập nhật từ bên ngoài
};

export default useApi;