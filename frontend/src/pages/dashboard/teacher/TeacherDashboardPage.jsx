import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNotification } from '../../../hooks/useNotification';
import Card from '../../../components/common/Card';
import Notification from '../../../components/common/NotificationToast';
import { CalendarDaysIcon, BookOpenIcon, BellIcon } from 'lucide-react';

const TeacherDashboardPage = () => {
  const { user } = useAuth();
  const { notifications } = useNotification();
  console.log('user từ useAuth:', user);


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
         Giảng viên
      </h1>
      <p className="text-sm text-gray-500"> Hôm nay, {new Date().toLocaleDateString('vi-VN')}</p>

      <p className="text-gray-600 text-lg italic">
        Chào mừng {user.fullName}! Chúc bạn một ngày giảng dạy hiệu quả và đầy cảm hứng 
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col gap-2 items-start justify-between">
          <div className="flex items-center gap-3">
            <BookOpenIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-700">Chào mừng, {user.fullName}</h2>
          </div>
          <p className="text-gray-600">Số lớp đang dạy: <span className="font-semibold text-blue-600">5</span></p>
          <p className="text-gray-600">Lịch dạy hôm nay: <span className="font-semibold text-green-600">2 buổi</span></p>
        </Card>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <BellIcon className="w-6 h-6 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-700">Thông báo mới</h2>
          </div>
          {(notifications || []).length === 0 ? (
            <p className="text-gray-500 italic">Không có thông báo nào</p>
          ) : (
            (notifications || []).slice(0, 3).map((notification) => (
              <Notification
                key={notification.id}
                message={notification.message}
                type={notification.type}
              />
            ))
          )}
        </Card>

        <Card className="flex gap-3">
          <div className="pt-1">
            <CalendarDaysIcon className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Lịch dạy sắp tới</h2>
            <p className="text-gray-600">Thứ 2 - 8:00 AM - Lớp A</p>
            <p className="text-gray-600">Thứ 4 - 14:00 PM - Lớp B</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
