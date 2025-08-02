// src/hooks/usePermissions.js
import { useAuth } from '../contexts/AuthContext';
import { checkPermission } from '../utils/permissions'; // Sẽ tạo ở phần utils

const usePermissions = () => {
  const { user, isAuthenticated } = useAuth();

  const canAccess = (requiredRoles) => {
    if (!isAuthenticated) return false;
    return checkPermission(user.role, requiredRoles);
  };

  return { canAccess, user, isAuthenticated };
};

export default usePermissions;