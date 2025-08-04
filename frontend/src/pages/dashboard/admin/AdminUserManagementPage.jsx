import React, { useEffect, useState } from 'react';
import adminService from '../../../services/adminService';
import Table from '../../../components/common/Table';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import FormField from '../../../components/common/FormField';
import { ROLES } from '../../../utils/constants';

const AdminUserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userToDeleteId, setUserToDeleteId] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        role: '',
    });

    // Define staff roles
    const staffRoles = [
        ROLES.GIANG_VIEN,
        ROLES.QUAN_LY_HOC_VU,
        ROLES.KE_TOAN,
        ROLES.QUAN_TRI_HE_THONG
    ];

    // Helper function to get role labels
    const getRoleLabel = (role) => {
        switch (role) {
            case ROLES.GIANG_VIEN:
                return 'Giảng viên';
            case ROLES.QUAN_LY_HOC_VU:
                return 'Quản lý học vụ';
            case ROLES.KE_TOAN:
                return 'Kế toán';
            case ROLES.QUAN_TRI_HE_THONG:
                return 'Quản trị hệ thống';
            default:
                return 'Không xác định';
        }
    };

    // Effect to fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch all staff users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await adminService.getAllUsersAdmin();
            const staff = data.filter(user => staffRoles.includes(user.role));
            setUsers(staff);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Open "Add Staff" modal
    const handleOpenAddModal = () => {
        setEditingUser(null);
        setFormData({ fullName: '', email: '', phone: '', role: staffRoles[0] });
        setIsModalOpen(true);
    };

    // Open "Edit Staff" modal with pre-filled data
    const handleOpenEditModal = (user) => {
        setEditingUser(user);
        setFormData({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
        });
        setIsModalOpen(true);
    };

    // Close the add/edit modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({ fullName: '', email: '', phone: '', role: '' });
    };

    // Handle form submission (add/edit user)
    const handleSaveUser = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                // Logic to update an existing user (mocked for now)
                await adminService.updateUserAdmin(editingUser.id, formData);
                setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
            } else {
                // Logic to add a new user (mocked for now)
                await adminService.createUserAdmin(formData);
                fetchUsers(); // Refresh the list after adding
            }
            handleCloseModal();
        } catch (error) {
            console.error('Lỗi khi lưu người dùng:', error);
        }
    };

    // Handle opening the delete confirmation modal
    const handleDelete = (id) => {
        setUserToDeleteId(id);
        setIsConfirmModalOpen(true);
    };

    // Handle delete confirmation
    const handleDeleteConfirm = async () => {
        if (!userToDeleteId) return;
        try {
            await adminService.deleteUserAdmin(userToDeleteId);
            setUsers(prev => prev.filter(user => user.id !== userToDeleteId));
        } catch (error) {
            console.error('Lỗi khi xoá người dùng:', error);
        } finally {
            setIsConfirmModalOpen(false);
            setUserToDeleteId(null);
        }
    };

    // Handle delete cancellation
    const handleDeleteCancel = () => {
        setIsConfirmModalOpen(false);
        setUserToDeleteId(null);
    };

    // Filter users based on selected role
    const filteredUsers = selectedRole
        ? users.filter(user => user.role === selectedRole)
        : users;

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Quản lý nhân viên</h2>
                <Button
                    onClick={handleOpenAddModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                >
                    <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        Thêm nhân viên
                    </span>
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <label htmlFor="role-filter" className="text-sm font-medium text-gray-700">Lọc theo chức vụ:</label>
                <select
                    id="role-filter"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-1 text-sm"
                >
                    <option value="">Tất cả</option>
                    {staffRoles.map(role => (
                        <option key={role} value={role}>
                            {getRoleLabel(role)}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
            ) : (
                <Table
                    headers={['Họ tên', 'Email', 'Điện thoại', 'Chức vụ', 'Hành động']}
                    data={filteredUsers}
                    renderRow={(user) => (
                        <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.fullName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getRoleLabel(user.role)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button
                                    onClick={() => handleOpenEditModal(user)}
                                    className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 mr-4"
                                >
                                    Sửa
                                </Button>
                                <Button
                                    onClick={() => handleDelete(user.id)}
                                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                >
                                    Xoá
                                </Button>
                            </td>
                        </>
                    )}
                />
            )}

            {/* Modal for adding/editing user */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingUser ? 'Sửa thông tin nhân viên' : 'Thêm nhân viên mới'}
            >
                <form onSubmit={handleSaveUser}>
                    <FormField
                        label="Họ và tên"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleFormChange}
                        placeholder="Nguyễn Văn A"
                    />
                    <FormField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="email@example.com"
                    />
                    <FormField
                        label="Số điện thoại"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="090-xxx-xxxx"
                    />
                    <FormField
                        label="Chức vụ"
                        name="role"
                        type="select"
                        value={formData.role}
                        onChange={handleFormChange}
                        options={staffRoles.map(role => ({ value: role, label: getRoleLabel(role) }))}
                    />
                    <div className="flex justify-end mt-6 space-x-2">
                        <Button
                            type="button"
                            onClick={handleCloseModal}
                            className="bg-gray-300 text-gray-800 hover:bg-gray-400 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            {editingUser ? 'Lưu thay đổi' : 'Thêm'}
                        </Button>
                    </div>
                </form>
            </Modal>
            
            {/* Modal for delete confirmation */}
            <Modal
                isOpen={isConfirmModalOpen}
                onClose={handleDeleteCancel}
                title="Xác nhận xoá"
                size="sm"
            >
                <p>Bạn có chắc chắn muốn xoá nhân viên này? Hành động này không thể hoàn tác.</p>
                <div className="flex justify-end mt-4 space-x-2">
                    <Button
                        onClick={handleDeleteCancel}
                        className="bg-gray-300 text-gray-800 hover:bg-gray-400 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        className="bg-red-600 text-white hover:bg-red-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Xoá
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default AdminUserManagementPage;
