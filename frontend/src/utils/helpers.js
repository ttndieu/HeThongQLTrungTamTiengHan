// src/utils/helpers.js
export const formatDate = (dateString, format = 'DD/MM/YYYY') => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  if (format === 'DD/MM/YYYY') return `${day}/${month}/${year}`;
  // Thêm các định dạng khác nếu cần
  return `${day}/${month}/${year}`;
};

export const formatCurrency = (amount, currency = 'VND') => {
  if (typeof amount !== 'number') return '';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

export const generateUniqueId = (prefix = '') => {
  return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

export const getGreetingMessage = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
};

// --- THÊM ĐOẠN MÃ NÀY VÀO ĐÂY ---
/**
 * Ghép các tên class CSS lại với nhau một cách có điều kiện.
 * Hàm này loại bỏ các giá trị falsy (như null, undefined, false)
 * và nối các chuỗi còn lại bằng khoảng trắng.
 * @param {...(string|boolean|null|undefined)} classes - Các chuỗi class hoặc giá trị boolean.
 * @returns {string} - Chuỗi tên class đã được ghép.
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
// ----------------------------------
// Thêm mockDelay vào helpers.js
export const mockDelay = (ms) => new Promise((res) => setTimeout(res, ms));
