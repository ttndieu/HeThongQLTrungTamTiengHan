// src/pages/public/PrivacyPolicyPage.jsx
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Chính sách bảo mật</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 text-gray-700 leading-relaxed">
        <p className="mb-4">
          Tại EduCenter, chúng tôi cam kết bảo vệ quyền riêng tư của người dùng. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Thu thập thông tin</h2>
        <p className="mb-4">
          Chúng tôi thu thập thông tin bạn cung cấp trực tiếp cho chúng tôi, chẳng hạn như khi bạn đăng ký tài khoản, đăng ký khóa học, điền vào biểu mẫu liên hệ hoặc tham gia khảo sát. Thông tin này có thể bao gồm tên, địa chỉ email, số điện thoại, địa chỉ, thông tin đăng nhập và mật khẩu, v.v.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Sử dụng thông tin</h2>
        <p className="mb-4">
          Chúng tôi sử dụng thông tin thu thập được để:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Cung cấp và quản lý các dịch vụ của chúng tôi.</li>
          <li>Cá nhân hóa trải nghiệm của bạn.</li>
          <li>Cải thiện trang web và dịch vụ của chúng tôi.</li>
          <li>Gửi các thông báo, cập nhật và thông tin liên lạc liên quan đến dịch vụ.</li>
          <li>Xử lý các giao dịch và thanh toán.</li>
          <li>Tuân thủ các yêu cầu pháp lý.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Chia sẻ thông tin</h2>
        <p className="mb-4">
          Chúng tôi không bán, trao đổi hoặc cho thuê thông tin nhận dạng cá nhân của bạn cho người khác. Chúng tôi có thể chia sẻ thông tin tổng hợp, không nhận dạng cá nhân với các đối tác kinh doanh, chi nhánh đáng tin cậy và nhà quảng cáo cho các mục đích được nêu trên.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Bảo mật thông tin</h2>
        <p className="mb-4">
          Chúng tôi áp dụng các biện pháp bảo mật thích hợp để bảo vệ khỏi sự truy cập trái phép, thay đổi, tiết lộ hoặc phá hủy thông tin cá nhân của bạn.
        </p>
        <p>
          Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ với chúng tôi.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;