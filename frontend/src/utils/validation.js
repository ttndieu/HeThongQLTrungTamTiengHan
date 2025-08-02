// src/utils/validation.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase()) ? '' : 'Email không hợp lệ.';
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return 'Mật khẩu phải có ít nhất 6 ký tự.';
  }
  return '';
};

export const validateRequired = (value, fieldName = 'Trường này') => {
  if (!value || String(value).trim() === '') {
    return `${fieldName} không được để trống.`;
  }
  return '';
};

export const validatePhoneNumber = (phone) => {
  const re = /^(0|\+84)\d{9,10}$/; // Ví dụ cho số điện thoại Việt Nam
  return re.test(phone) ? '' : 'Số điện thoại không hợp lệ.';
};

// Hàm validate tổng quát cho form (sẽ dùng trong useForm)
export const validateLoginForm = (values) => {
  let errors = {};
  errors.username = validateRequired(values.username, 'Tên đăng nhập');
  if (!errors.username) { // Chỉ kiểm tra email nếu username không trống và có vẻ là email
      if (values.username.includes('@')) {
          errors.username = validateEmail(values.username);
      }
  }
  errors.password = validateRequired(values.password, 'Mật khẩu');
  if (!errors.password && !errors.username) { // Chỉ kiểm tra nếu cả 2 trường không rỗng
    errors.password = validatePassword(values.password);
  }
  return errors;
};

export const validateRegisterForm = (values) => {
  let errors = {};
  errors.fullName = validateRequired(values.fullName, 'Họ và tên');
  errors.email = validateRequired(values.email, 'Email');
  if (!errors.email) {
    errors.email = validateEmail(values.email);
  }
  errors.password = validateRequired(values.password, 'Mật khẩu');
  if (!errors.password) {
    errors.password = validatePassword(values.password);
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
  }
  errors.phone = validateRequired(values.phone, 'Số điện thoại');
  if (!errors.phone) {
      errors.phone = validatePhoneNumber(values.phone);
  }
  return errors;
};