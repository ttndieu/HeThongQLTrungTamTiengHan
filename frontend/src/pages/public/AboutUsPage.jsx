// src/pages/public/AboutUsPage.jsx
import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Về chúng tôi</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 text-gray-700 leading-relaxed">
        <p className="mb-4">
          EduCenter được thành lập với sứ mệnh mang đến môi trường học tiếng Hàn chất lượng cao và hiệu quả nhất cho mọi đối tượng học viên. Chúng tôi tin rằng việc học một ngôn ngữ mới không chỉ là việc tiếp thu kiến thức mà còn là hành trình khám phá văn hóa và mở rộng cơ hội.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Tầm nhìn</h2>
        <p className="mb-4">
          Trở thành trung tâm đào tạo tiếng Hàn hàng đầu, là cầu nối văn hóa và ngôn ngữ giữa Việt Nam và Hàn Quốc, góp phần thúc đẩy sự phát triển cá nhân và nghề nghiệp cho học viên.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Sứ mệnh</h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Cung cấp chương trình đào tạo tiếng Hàn toàn diện, được thiết kế bởi các chuyên gia.</li>
          <li>Xây dựng đội ngũ giảng viên tận tâm, giàu kinh nghiệm và chuyên môn.</li>
          <li>Tạo ra môi trường học tập năng động, truyền cảm hứng và hỗ trợ.</li>
          <li>Luôn cập nhật phương pháp giảng dạy và công nghệ mới nhất để tối ưu hóa trải nghiệm học tập.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Đội ngũ của chúng tôi</h2>
        <p className="mb-4">
          Chúng tôi tự hào có một đội ngũ giảng viên người Việt và người Hàn giàu kinh nghiệm, nhiệt huyết,
          luôn sẵn sàng chia sẻ kiến thức và kinh nghiệm thực tế. Ngoài ra, đội ngũ nhân viên hỗ trợ của chúng tôi
          luôn túc trực để đảm bảo mọi trải nghiệm của học viên đều suôn sẻ và hiệu quả.
        </p>
        <p>
          Hãy cùng EduCenter chinh phục tiếng Hàn và mở ra cánh cửa đến với nhiều cơ hội mới!
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;