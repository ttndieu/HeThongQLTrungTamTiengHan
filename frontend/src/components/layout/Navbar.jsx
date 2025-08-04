// src/components/layout/Navbar.jsx
import React, { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Popover, Transition, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { ROLES } from '../../utils/constants'; // Import ROLES
import avatar from '../../assets/avatar.jpg'
import logo from '../../assets/logo.png'

const navigation = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Khóa học', href: '/courses' },
  { name: 'Giáo viên', href: '/teachers' },
  { name: 'Liên hệ', href: '/contact' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    showNotification('Bạn đã đăng xuất.', 'info');
    navigate('/');
  };

  // Xác định đường dẫn dashboard dựa trên vai trò
  let dashboardPath = '/dashboard';
  if (user) {
    switch (user.role) {
      case ROLES.HOC_VIEN:
        dashboardPath = '/dashboard/student';
        break;
      case ROLES.GIANG_VIEN:
        dashboardPath = '/dashboard/teacher';
        break;
      case ROLES.QUAN_LY_HOC_VU:
        dashboardPath = '/dashboard/academic';
        break;
      case ROLES.KE_TOAN:
        dashboardPath = '/dashboard/accounting';
        break;
      case ROLES.QUAN_TRI_HE_THONG:
        dashboardPath = '/dashboard/admin';
        break;
      case ROLES.REGISTERED_USER:
        dashboardPath = '/dashboard/registered';
        break;
      default:
        dashboardPath = '/dashboard'; // Fallback
    }
  }

  return (
    <Popover className="relative bg-white shadow-sm z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex items-center">
              <span className="sr-only">Your Company</span>
              {/*  */}
              <img
                className="h-16 w-auto "
                src = {logo} // Thay thế bằng đường dẫn logo của bạn
                alt="Logo"
              />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Mở menu chính</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="text-base font-medium text-gray-500 hover:text-gray-900">
                {item.name}
              </Link>
            ))}
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {!isAuthenticated ? (
              <Fragment>
                <Link to="/auth/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  Đăng nhập
                </Link>
                <Link
                  to="/auth/register"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Đăng ký
                </Link>
              </Fragment>
            ) : (
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span className="sr-only">Mở menu người dùng</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.avatar || avatar} // Dùng avatar mặc định nếu user.avatar không tồn tại
                      alt="avatar"
                    />
                    <span className="ml-2 text-gray-700 hidden lg:inline-block">{user.fullName || user.username}</span>
                    <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/dashboard/profile"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Hồ sơ của tôi
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={dashboardPath}
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Bảng điều khiển
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={classNames(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700')}
                        >
                          Đăng xuất
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition
        as={Fragment}
        show={mobileMenuOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="/logo.png" // Thay thế bằng đường dẫn logo của bạn
                    alt="Logo"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Đóng menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)} // Close menu on click
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              {!isAuthenticated ? (
                <div>
                  <Link
                    to="/auth/register"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Đăng ký
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Đã có tài khoản?{' '}
                    <Link to="/auth/login" className="text-blue-600 hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>
                      Đăng nhập
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link
                    to="/dashboard/profile"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Hồ sơ của tôi
                  </Link>
                  <Link
                    to={dashboardPath}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Bảng điều khiển
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navbar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from '../../components/common/Button';
// import { MegaphoneIcon, BookOpenIcon, ClockIcon, UserIcon, UsersIcon, GlobeAltIcon, ArrowRightIcon } from '@heroicons/react/24/outline'; // Thêm các icon mới nếu cần

// // Component placeholder cho Course Card, bạn sẽ thay thế bằng CourseCard thực tế của mình
// const CourseCardPlaceholder = ({ title, instructor, lessons, time, students, imageUrl }) => (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
//         <img src={imageUrl || 'https://via.placeholder.com/400x200?text=Course+Image'} alt={title} className="w-full h-40 object-cover" />
//         <div className="p-4">
//             <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
//             <div className="text-sm text-gray-600 mb-2">
//                 <p className="flex items-center mb-1"><UserIcon className="h-4 w-4 mr-2" />Giáo viên: {instructor}</p>
//                 <p className="flex items-center mb-1"><BookOpenIcon className="h-4 w-4 mr-2" />Số buổi học: {lessons}</p>
//                 <p className="flex items-center mb-1"><ClockIcon className="h-4 w-4 mr-2" />Thời gian: {time}</p>
//                 <p className="flex items-center"><UsersIcon className="h-4 w-4 mr-2" />{students} người</p>
//             </div>
//             {/* Bạn có thể thêm nút Đăng ký vào đây nếu muốn */}
//             {/* <Link to="/enroll" className="block mt-4 text-center">
//                 <Button variant="primary" className="w-full">Đăng ký</Button>
//             </Link> */}
//         </div>
//     </div>
// );


// const HomePage = () => {
//     // Dữ liệu giả định cho các khóa học để minh họa
//     const featuredCourses = [
//         {
//             id: 1,
//             title: 'Tiếng Hàn Sơ Cấp 1 Tổng Hợp',
//             instructor: 'Ngọc Diệu',
//             lessons: '25 buổi',
//             time: '20/7 - 30/8/2025',
//             students: 10,
//             imageUrl: 'http://googleusercontent.com/file_content/0', // Sử dụng ảnh từ mẫu
//         },
//         {
//             id: 2,
//             title: 'Tiếng Hàn Sơ Cấp 1 Tổng Hợp',
//             instructor: 'Ngọc Diệu',
//             lessons: '25 buổi',
//             time: '20/7 - 30/8/2025',
//             students: 10,
//             imageUrl: 'http://googleusercontent.com/file_content/0',
//         },
//         {
//             id: 3,
//             title: 'Tiếng Hàn Sơ Cấp 1 Tổng Hợp',
//             instructor: 'Ngọc Diệu',
//             lessons: '25 buổi',
//             time: '20/7 - 30/8/2025',
//             students: 10,
//             imageUrl: 'http://googleusercontent.com/file_content/0',
//         },
//         {
//             id: 4,
//             title: 'Tiếng Hàn Sơ Cấp 1 Tổng Hợp',
//             instructor: 'Ngọc Diệu',
//             lessons: '25 buổi',
//             time: '20/7 - 30/8/2025',
//             students: 10,
//             imageUrl: 'http://googleusercontent.com/file_content/0',
//         },
//     ];

//     // Dữ liệu cho lộ trình học tập (dựa trên image_9b5d88.png)
//     const learningRoadmap = [
//         {
//             step: 1,
//             title: 'Sơ cấp 1 - TOPIK I (2-3 tháng)',
//             content: ['Làm quen với tiếng Hàn, học bảng chữ cái', 'Đạt trình độ TOPIK 1']
//         },
//         {
//             step: 2,
//             title: 'Sơ cấp 2 - TOPIK I (2-3 tháng)',
//             content: ['Đạt trình độ TOPIK 2', 'Kỹ năng nghe hiểu hội thoại đơn giản', 'Viết đoạn văn ngắn về cuộc sống hàng ngày']
//         },
//         {
//             step: 3,
//             title: 'Trung cấp 1 - TOPIK II (2-3 tháng)',
//             content: ['Đạt trình độ TOPIK 3', 'Đọc hiểu bài báo ngắn, tin tức đơn giản', 'Viết bài luận văn, diễn đạt ý kiến cá nhân']
//         },
//         {
//             step: 4,
//             title: 'Trung cấp 2 - TOPIK II (2-4 tháng)',
//             content: ['Đạt trình độ TOPIK 4', 'Nghe hiểu chương trình tin tức, phim tài liệu', 'Viết báo cáo, thư chính thức']
//         },
//         {
//             step: 5,
//             title: 'Cao cấp 1 - TOPIK II (3-5 tháng)',
//             content: ['Đạt trình độ TOPIK 5', 'Đọc hiểu văn học, báo chí chuyên sâu', 'Thảo luận các chủ đề phức tạp']
//         },
//         {
//             step: 6,
//             title: 'Cao cấp 2 - TOPIK II (5-7 tháng)',
//             content: ['Thành thạo đọc tài liệu học thuật, tiểu thuyết', 'Viết luận văn, phân tích chuyên sâu', 'Giao tiếp tự nhiên như người bản ngữ']
//         },
//     ];


//     return (
//         <div className="homepage">
//             {/* Announcement Bar (dựa trên thanh màu tím đầu trang) */}
//             <div className="bg-blue-600 text-white text-center py-2 text-sm flex items-center justify-center space-x-2">
//                 <MegaphoneIcon className="h-5 w-5" />
//                 <span>Cơ hội việc làm tại Trung tâm Tiếng Hàn XYZ - Tuyển giáo viên tiếng Hàn và nhân viên marketing với chế độ đãi ngộ tốt. Ứng tuyển ngay qua hotline: 0987.654.321</span>
//             </div>

//             {/* Hero Section - Banner quảng cáo */}
//             <section className="bg-gray-100 py-8">
//                 <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
//                     {/* Main Banner */}
//                     <div className="flex-shrink-0">
//                         <img src="http://googleusercontent.com/file_content/0" alt="Học Tiếng Hàn Online Miễn Phí 100%" className="max-w-full h-auto rounded-lg shadow-lg" />
//                     </div>
//                     {/* Small Map Image */}
//                     <div className="flex-shrink-0">
//                         <img src="http://googleusercontent.com/file_content/0" alt="Korea Map" className="max-w-full h-auto rounded-lg shadow-lg" />
//                     </div>
//                     {/* Register Now Button (nếu có trên banner) */}
//                     {/* Nút Đăng ký ngay trong ảnh là một phần của hình ảnh lớn, nên sẽ khó tách riêng.
//                         Nếu muốn, bạn có thể thêm một nút riêng ở đây. */}
//                      <Link to="/auth/register" className="md:absolute md:right-8 md:bottom-8">
//                         <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 whitespace-nowrap">
//                             ĐĂNG KÝ NGAY
//                         </Button>
//                     </Link>
//                 </div>
//             </section>

//             {/* Main Content Area */}
//             <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
//                 {/* Left Sidebar - Categories */}
//                 <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
//                     <h2 className="text-xl font-bold text-gray-800 mb-4">Các khóa học</h2>
//                     <ul className="space-y-3">
//                         <li>
//                             <Link to="/courses/topik1" className="flex items-center text-gray-700 hover:text-blue-600 hover:font-medium">
//                                 <BookOpenIcon className="h-5 w-5 mr-3 text-gray-500" />
//                                 TOPK I
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/courses/topik2" className="flex items-center text-gray-700 hover:text-blue-600 hover:font-medium">
//                                 <BookOpenIcon className="h-5 w-5 mr-3 text-gray-500" />
//                                 TOPK II
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/courses/klpti" className="flex items-center text-gray-700 hover:text-blue-600 hover:font-medium">
//                                 <BookOpenIcon className="h-5 w-5 mr-3 text-gray-500" />
//                                 KLPTI ESP - TOPIK
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/courses/translation" className="flex items-center text-gray-700 hover:text-blue-600 hover:font-medium">
//                                 <BookOpenIcon className="h-5 w-5 mr-3 text-gray-500" />
//                                 Biên - Phiên dịch
//                             </Link>
//                         </li>
//                     </ul>
//                 </aside>

//                 {/* Right Content - Featured Courses (dưới banner chính) */}
//                 <main className="w-full md:w-3/4">
//                     <section className="mb-12">
//                         <div className="flex justify-between items-center mb-6">
//                             <h2 className="text-2xl font-bold text-gray-900">CÁC KHÓA HỌC</h2>
//                             <Link to="/courses" className="text-blue-600 hover:text-blue-800 flex items-center">
//                                 Xem tất cả <ArrowRightIcon className="h-4 w-4 ml-1" />
//                             </Link>
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                             {featuredCourses.map(course => (
//                                 <CourseCardPlaceholder
//                                     key={course.id}
//                                     title={course.title}
//                                     instructor={course.instructor}
//                                     lessons={course.lessons}
//                                     time={course.time}
//                                     students={course.students}
//                                     imageUrl={course.imageUrl}
//                                 />
//                             ))}
//                         </div>
//                     </section>

//                     {/* Learning Roadmap Section */}
//                     <section className="bg-white p-8 rounded-lg shadow-md mb-12">
//                         <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">LỘ TRÌNH HỌC TẬP</h2>
//                         <p className="text-gray-700 text-center mb-10 max-w-3xl mx-auto">
//                             Dưới đây là một lộ trình cơ bản được thiết kế theo trình tự từ cơ bản đến nâng cao, phù hợp với cấu trúc thi TOPIK và đảm bảo học viên có thể phát triển đều cả 4 kỹ năng: nghe, nói, đọc, viết.
//                         </p>
//                         <div className="relative flex flex-col items-center">
//                             {/* Đường kẻ dọc */}
//                             <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-300 hidden md:block"></div>
//                             {learningRoadmap.map((item, index) => (
//                                 <div key={item.step} className="flex items-start md:items-center w-full mb-8 md:mb-12 last:mb-0">
//                                     {/* Icon và số bước (cho desktop) */}
//                                     <div className="hidden md:flex flex-col items-center relative z-10 w-1/2 pr-12">
//                                         {index % 2 === 0 ? ( // Nếu bước chẵn, nội dung ở bên trái
//                                             <div className="w-full text-right pr-4">
//                                                 <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
//                                                 <ul className="text-gray-700 text-sm list-disc list-inside">
//                                                     {item.content.map((point, idx) => (
//                                                         <li key={idx}>{point}</li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                         ) : null}
//                                     </div>
//                                     <div className="flex-shrink-0 relative z-20 bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg shadow-md">
//                                         {item.step}
//                                     </div>
//                                     {/* Nội dung bước (cho desktop) */}
//                                     <div className="w-full md:w-1/2 pl-4 md:pl-12">
//                                         {index % 2 !== 0 ? ( // Nếu bước lẻ, nội dung ở bên phải
//                                             <div className="w-full text-left pl-4">
//                                                 <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
//                                                 <ul className="text-gray-700 text-sm list-disc list-inside">
//                                                     {item.content.map((point, idx) => (
//                                                         <li key={idx}>{point}</li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                         ) : null}
//                                         {/* Hiển thị trên mobile: luôn hiển thị nội dung bên phải icon */}
//                                         <div className="md:hidden w-full text-left pl-4">
//                                             <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
//                                             <ul className="text-gray-700 text-sm list-disc list-inside">
//                                                 {item.content.map((point, idx) => (
//                                                     <li key={idx}>{point}</li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </section>
//                 </main>
//             </div>
//             {/* NotificationToast cần được render ở đâu đó trong App.jsx hoặc layout chung */}
//             {/* <NotificationToast /> */}
//         </div>
//     );
// };

// export default HomePage;