// src/utils/permissions.js
import { ROLES } from './constants';

/**
 * Kiểm tra xem một vai trò có quyền truy cập vào các vai trò được yêu cầu hay không.
 * @param {string} userRole - Vai trò hiện tại của người dùng.
 * @param {string|string[]} requiredRoles - Vai trò hoặc mảng các vai trò được yêu cầu để truy cập.
 * @returns {boolean}
 */
export const checkPermission = (userRole, requiredRoles) => {
  if (!userRole) return false;

  // Chuyển requiredRoles thành mảng nếu nó không phải mảng
  const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  // Kiểm tra xem vai trò của người dùng có nằm trong các vai trò được yêu cầu không
  return rolesArray.includes(userRole);
};

// Bạn có thể định nghĩa các quyền cụ thể cho từng trang/tính năng ở đây
export const PAGE_PERMISSIONS = {
  '/dashboard/student': [ROLES.HOC_VIEN],
  '/dashboard/teacher': [ROLES.GIANG_VIEN],
  '/dashboard/academic': [ROLES.QUAN_LY_HOC_VU],
  '/dashboard/accounting': [ROLES.KE_TOAN],
  '/dashboard/admin': [ROLES.QUAN_TRI_HE_THONG],
  '/dashboard/registered': [ROLES.REGISTERED_USER],
  '/dashboard/profile': [ROLES.HOC_VIEN, ROLES.GIANG_VIEN, ROLES.QUAN_LY_HOC_VU, ROLES.KE_TOAN, ROLES.QUAN_TRI_HE_THONG, ROLES.REGISTERED_USER],
  // ... thêm các trang khác
};

/**
 * Kiểm tra xem người dùng có thể xem một route cụ thể không.
 * @param {string} userRole - Vai trò của người dùng.
 * @param {string} routePath - Đường dẫn của route.
 * @returns {boolean}
 */
export const canViewRoute = (userRole, routePath) => {
    // Một cách đơn giản: kiểm tra xem routePath có trong PAGE_PERMISSIONS không
    // và người dùng có vai trò phù hợp không.
    const required = PAGE_PERMISSIONS[routePath];
    if (!required) {
        // Nếu route không có trong danh sách yêu cầu quyền, mặc định là ai cũng xem được (ví dụ: trang công khai)
        // HOẶC, nếu đây là route dashboard mà không có trong PAGE_PERMISSIONS, có thể coi là không có quyền
        return true; // Cân nhắc lại logic này tùy thuộc vào cách bạn tổ chức route
    }
    return checkPermission(userRole, required);
};