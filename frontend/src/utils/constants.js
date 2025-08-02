// src/utils/constants.js
export const ROLES = {
  HOC_VIEN: 'hocVien',
  GIANG_VIEN: 'giangVien',
  QUAN_LY_HOC_VU: 'quanLyHocVu',
  KE_TOAN: 'keToan',
  QUAN_TRI_HE_THONG: 'quanTriHeThong',
  REGISTERED_USER: 'registeredUser', // Đã đăng ký nhưng chưa là học viên/giảng viên chính thức
  GUEST: 'guest', // Khách truy cập
};

export const API_ENDPOINTS = {
  // Các endpoint API thực tế sẽ ở đây sau này
  // ví dụ:
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  COURSES: '/courses',
  STUDENTS: '/students',
  TEACHERS: '/teachers',
  CLASSES: '/classes',
  // ...
};

export const MESSAGES = {
  LOGIN_SUCCESS: 'Đăng nhập thành công!',
  LOGIN_FAILED: 'Tên đăng nhập hoặc mật khẩu không đúng.',
  REGISTER_SUCCESS: 'Đăng ký tài khoản thành công! Vui lòng đăng nhập.',
  REGISTER_FAILED: 'Đăng ký không thành công. Vui lòng thử lại.',
  UPDATE_PROFILE_SUCCESS: 'Cập nhật thông tin thành công!',
  ERROR_GENERAL: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
  // ...
};

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
  { value: 'other', label: 'Khác' },
];