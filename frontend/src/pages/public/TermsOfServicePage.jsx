// src/pages/public/TermsOfServicePage.jsx
import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Điều khoản dịch vụ</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 text-gray-700 leading-relaxed">
        <p className="mb-4">
          Chào mừng bạn đến với EduCenter. Các điều khoản dịch vụ này quy định việc bạn sử dụng trang web và các dịch vụ của chúng tôi. Bằng cách truy cập hoặc sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản này.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">1. Chấp nhận các Điều khoản</h2>
        <p className="mb-4">
          Bằng cách truy cập trang web này, bạn đồng ý bị ràng buộc bởi các Điều khoản và Điều kiện sử dụng này, tất cả các luật và quy định hiện hành, và đồng ý rằng bạn chịu trách nhiệm tuân thủ bất kỳ luật pháp địa phương hiện hành nào. Nếu bạn không đồng ý với bất kỳ điều khoản nào trong số này, bạn bị cấm sử dụng hoặc truy cập trang web này.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">2. Giấy phép sử dụng</h2>
        <p className="mb-4">
          Bạn được cấp quyền tạm thời để tải xuống một bản sao tài liệu (thông tin hoặc phần mềm) trên trang web của EduCenter chỉ cho mục đích xem cá nhân, phi thương mại. Đây là việc cấp giấy phép, không phải chuyển quyền sở hữu, và theo giấy phép này, bạn không được:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Sửa đổi hoặc sao chép tài liệu;</li>
          <li>Sử dụng tài liệu cho bất kỳ mục đích thương mại nào, hoặc cho bất kỳ màn hình công cộng nào (thương mại hoặc phi thương mại);</li>
          <li>Cố gắng dịch ngược hoặc đảo ngược kỹ thuật bất kỳ phần mềm nào có trên trang web của EduCenter;</li>
          <li>Xóa bất kỳ bản quyền hoặc các ký hiệu sở hữu khác khỏi tài liệu; hoặc</li>
          <li>Chuyển tài liệu cho người khác hoặc "nhân bản" tài liệu trên bất kỳ máy chủ nào khác.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">3. Tuyên bố từ chối trách nhiệm</h2>
        <p className="mb-4">
          Tài liệu trên trang web của EduCenter được cung cấp trên cơ sở "nguyên trạng". EduCenter không bảo đảm, rõ ràng hay ngụ ý, và theo đây từ chối và phủ nhận tất cả các bảo đảm khác, bao gồm không giới hạn, các bảo đảm ngụ ý hoặc điều kiện về khả năng bán được, tính phù hợp cho một mục đích cụ thể, hoặc không vi phạm quyền sở hữu trí tuệ hoặc các vi phạm quyền khác.
        </p>
        <p>
          Đối với bất kỳ câu hỏi nào liên quan đến các điều khoản này, vui lòng liên hệ với chúng tôi.
        </p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;