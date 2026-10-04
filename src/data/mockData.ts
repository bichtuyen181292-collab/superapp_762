import { GuideItem, FeaturedProduct, BranchOffice } from '../types';

export const VIETINBANK_LOGO = 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/Logo%20VietinBank.png';

export const CONSULTANTS = {
  tuyen: {
    name: 'Nguyễn Thị Bích Tuyền',
    role: 'Chuyên viên tư vấn khách hàng',
    phone: '0988.580.031',
    displayPhone: '0988 580 031',
    branch: 'VietinBank CN Tây Tiền Giang',
  },
  hiep: {
    name: 'Lê Hoàng Hiệp',
    role: 'Chuyên viên tư vấn khách hàng',
    phone: '0907.800.525',
    displayPhone: '0907 800 525',
    branch: 'VietinBank CN Tây Tiền Giang',
  },
  hotline: '1900 558 868',
};

export const GUIDES: GuideItem[] = [
  {
    id: 'quen-mat-khau',
    title: '1. Hướng dẫn quên mật khẩu iPay',
    summary: 'Lấy lại mật khẩu đăng nhập VietinBank iPay nhanh chóng chỉ với 6 bước',
    badge: 'Phổ biến',
    videoUrl: 'https://www.youtube.com/watch?v=86r0pxPOzbs',
    steps: [
      {
        step: 1,
        title: 'Bước 1: Chọn Quên mật khẩu',
        description: 'Ở màn hình đăng nhập ứng dụng VietinBank iPay, bấm chọn mục "Quên mật khẩu".',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/1.1.png'
      },
      {
        step: 2,
        title: 'Bước 2: Nhập thông tin tài khoản',
        description: 'Nhập Tên đăng nhập và Số điện thoại đăng ký, sau đó bấm nút “Tiếp tục”.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/1.2.png'
      },
      {
        step: 3,
        title: 'Bước 3: Nhập mã xác thực OTP',
        description: 'Nhập mã xác thực OTP được gửi về tin nhắn SMS của số điện thoại đăng ký, sau đó bấm "Tiếp tục".',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/1.3.png'
      },
      {
        step: 4,
        title: 'Bước 4: Xác thực khuôn mặt',
        description: 'Thực hiện xác thực khuôn mặt theo hướng dẫn trên màn hình. Sau khi hoàn thành, iPay sẽ gửi mật khẩu mới về tin nhắn SMS. Bấm Đăng nhập iPay để tiếp tục.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/1.4.png'
      },
      {
        step: 5,
        title: 'Bước 5: Đổi mật khẩu mới',
        description: 'Nhập mật khẩu theo yêu cầu:\n- Mật khẩu hiện tại: Nhập theo mật khẩu được gửi về tin nhắn SMS.\n- Mật khẩu mới: Là mật khẩu mà khách hàng cần đổi.\nSau đó bấm “Tiếp tục”.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/1.5.png'
      },
      {
        step: 6,
        title: 'Bước 6: Xác nhận đổi mật khẩu',
        description: 'Thực hiện quét khuôn mặt để xác nhận đổi mật khẩu thành công.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/1.6.png'
      }
    ]
  },
  {
    id: 'dong-the',
    title: '2. Hướng dẫn đóng thẻ',
    summary: 'Chủ động quản lý và khóa/đóng thẻ ngân hàng ngay trên ứng dụng iPay',
    badge: 'Tiện ích',
    videoUrl: 'https://www.youtube.com/watch?v=acdT3KxET40',
    steps: [
      {
        step: 1,
        title: 'Bước 1: Đăng nhập ứng dụng',
        description: 'Đăng nhập vào App VietinBank iPay bằng tài khoản của Quý khách.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/2.1.png'
      },
      {
        step: 2,
        title: 'Bước 2: Mở danh sách thẻ',
        description: 'Tại màn hình chính, vào mục "Danh sách thẻ" để xem các thẻ đang hoạt động.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/2.2.png'
      },
      {
        step: 3,
        title: 'Bước 3: Chọn thẻ cần đóng',
        description: 'Xem đúng thẻ cần đóng, bấm vào phần "Xem thêm" trên thẻ đó.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/2.3.png'
      },
      {
        step: 4,
        title: 'Bước 4: Chọn chức năng Đóng thẻ',
        description: 'Trong danh sách chức năng thẻ, chọn "Đóng thẻ".',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/2.4.png'
      },
      {
        step: 5,
        title: 'Bước 5: Nhập mã OTP',
        description: 'Kiểm tra thông tin thẻ và nhập mã xác thực OTP gửi về điện thoại.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/2.5.png'
      },
      {
        step: 6,
        title: 'Bước 6: Xác nhận hoàn tất đóng thẻ',
        description: 'Xác nhận OTP để hệ thống ghi nhận đóng thẻ thành công an toàn.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/2.6.png'
      }
    ]
  },
  {
    id: 'sinh-trac-hoc',
    title: '3. Xác thực CCCD gắn chip & Sinh trắc học',
    summary: 'Cập nhật sinh trắc học và căn cước công dân gắn chip theo Quyết định 2345/QĐ-NHNN',
    badge: 'Quan trọng',
    videoUrl: 'https://www.youtube.com/watch?v=9yYn3SbMT9A',
    steps: [
      {
        step: 1,
        title: 'Bước 1: Đăng nhập VietinBank iPay',
        description: 'Đăng nhập vào ứng dụng VietinBank iPay và chọn biểu tượng Cập nhật sinh trắc học/CCCD.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.1.png'
      },
      {
        step: 2,
        title: 'Bước 2: Chuẩn bị chụp CCCD',
        description: 'Chuẩn bị thẻ Căn cước công dân gắn chip và click vào nút “Bắt đầu chụp”.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.2.png'
      },
      {
        step: 3,
        title: 'Bước 3: Chụp mặt trước CCCD',
        description: 'Đặt mặt trước CCCD vào vừa vặn khung ảnh, đủ sáng, không bị lóa hoặc mất góc.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.3.png'
      },
      {
        step: 4,
        title: 'Bước 4: Chụp mặt sau CCCD',
        description: 'Lật thẻ và chụp mặt sau căn cước công dân gắn chip rõ nét.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.4.png'
      },
      {
        step: 5,
        title: 'Bước 5: Xác nhận hướng dẫn NFC',
        description: 'Xem hướng dẫn quét chip NFC và click vào nút “Đã hiểu”.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.5.png'
      },
      {
        step: 6,
        title: 'Bước 6: Nhận diện khuôn mặt',
        description: 'Đưa gương mặt vào khung hình camera, giữ yên và làm theo chỉ dẫn (nhìn thẳng, không đeo kính râm, khẩu trang).',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.6.png'
      },
      {
        step: 7,
        title: 'Bước 7: Đọc chip NFC trên CCCD',
        description: 'Đặt vị trí chip trên mặt trước CCCD áp sát vào mặt sau điện thoại (khu vực anten NFC) và giữ nguyên khoảng 3-5 giây để đọc dữ liệu.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.7.png'
      },
      {
        step: 8,
        title: 'Bước 8: Hoàn tất cập nhật',
        description: 'Kiểm tra lại thông tin đọc từ chip và bấm “Tiếp tục” để hoàn thành cập nhật sinh trắc học.',
        image: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.8.png'
      }
    ]
  },
  {
    id: 'nop-thue',
    title: '4. Hướng dẫn nộp thuế điện tử',
    summary: 'Nộp thuế nội địa, thuế trước bạ, thuế đất trực tiếp và nhận giấy nộp tiền ngân sách nhà nước',
    badge: 'Nộp thuế',
    videoUrl: 'https://www.youtube.com/watch?v=ASKGDLi1tGE',
    steps: [
      {
        step: 1,
        title: 'Bước 1: Đăng nhập VietinBank iPay',
        description: 'Đăng nhập ứng dụng VietinBank iPay trên điện thoại di động.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.1.png'
      },
      {
        step: 2,
        title: 'Bước 2: Mở Tất cả dịch vụ',
        description: 'Chọn mục [Tất cả dịch vụ] trên giao diện chính.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.2.jpg'
      },
      {
        step: 3,
        title: 'Bước 3: Chọn Dịch vụ thanh toán',
        description: 'Tại màn hình Tất cả dịch vụ, chọn [Dịch vụ thanh toán].',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.3.jpg'
      },
      {
        step: 4,
        title: 'Bước 4: Chọn Nộp thuế điện tử',
        description: 'Trong danh sách thanh toán, chọn tính năng [Nộp thuế điện tử].',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.4.jpg'
      },
      {
        step: 5,
        title: 'Bước 5: Bắt đầu Nộp thuế',
        description: 'Chọn nút [Nộp thuế] để mở giao diện kê khai.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.5.jpg'
      },
      {
        step: 6,
        title: 'Bước 6: Chọn hình thức nộp thuế',
        description: 'Tại màn hình Thuế nội địa, mở droplist [Hình thức nộp thuế].',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.6.jpg'
      },
      {
        step: 7,
        title: 'Bước 7: Nhập mã số thuế / CCCD',
        description: 'Chọn [Tự kê khai] để nộp cho chính mình hoặc chọn [Nộp cho người khác]. Trường hợp chọn Truy vấn bằng Mã số thuế chính là số căn cước công dân.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.7.jpg'
      },
      {
        step: 8,
        title: 'Bước 8: Bấm Truy vấn',
        description: 'Nhấn button [Truy vấn] để hệ thống kết nối Cơ quan Thuế.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.8.jpg'
      },
      {
        step: 9,
        title: 'Bước 9: Xem thông tin người nộp thuế',
        description: 'Màn hình hiển thị thông tin người nộp thuế và danh sách các khoản chưa nộp. Khách hàng chọn: [1. Tài khoản nguồn; 2. Thông tin người nộp thuế, người nộp thay].',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.9.jpg'
      },
      {
        step: 10,
        title: 'Bước 10: Kiểm tra danh sách khoản nộp',
        description: 'Kiểm tra kỹ [Danh sách các khoản chưa nộp] trên màn hình.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.10.jpg'
      },
      {
        step: 11,
        title: 'Bước 11: Kiểm tra thông tin người nộp',
        description: 'Kiểm tra chính xác [Thông tin người nộp thuế] và chi cục thuế quản lý.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.11.jpg'
      },
      {
        step: 12,
        title: 'Bước 12: Kiểm tra số tiền thuế',
        description: 'Kiểm tra [Số tiền thuế] và [Các thông tin liên quan đến món thuế cần nộp].',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.12.jpg'
      },
      {
        step: 13,
        title: 'Bước 13: Bấm Nộp thuế',
        description: 'Kiểm tra tổng tiền thanh toán và nhấn button [Nộp thuế].',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.13.jpg'
      },
      {
        step: 14,
        title: 'Bước 14: Xác thực OTP',
        description: 'Nhập OTP SMS hoặc Soft OTP được kích hoạt trên VietinBank iPay.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.14.jpg'
      },
      {
        step: 15,
        title: 'Bước 15: Hoàn tất giao dịch',
        description: 'Chọn [Xác nhận & Hoàn tất] để trừ tiền và nộp vào ngân sách nhà nước.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.15.jpg'
      },
      {
        step: 16,
        title: 'Bước 16: Lấy chứng từ nộp NSNN',
        description: 'Để nhận chứng từ nộp NSNN, chọn tab [Lịch sử nộp thuế].',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.16.jpg'
      },
      {
        step: 17,
        title: 'Bước 17: Chọn khoảng thời gian truy vấn',
        description: 'Chọn khoảng thời gian truy vấn >> Nhấn chọn [Áp dụng].',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.17.jpg'
      },
      {
        step: 18,
        title: 'Bước 18: Xem chi tiết giao dịch',
        description: 'Chọn [Chi tiết] để xem toàn bộ thông tin, trạng thái của món thuế.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.18.jpg'
      },
      {
        step: 19,
        title: 'Bước 19: Nhận chứng từ qua Email',
        description: 'Chọn button [Nhận chứng từ qua Email], Quý khách có thể thay đổi Email nhận chứng từ nếu cần.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.19.jpg'
      },
      {
        step: 20,
        title: 'Bước 20: Kiểm tra hộp thư Email',
        description: 'Truy cập Email đã đăng ký để tải về Giấy nộp tiền vào NSNN có chữ ký điện tử hợp lệ.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Nop-thue-dien-tu/6.20.jpg'
      }
    ]
  },
  {
    id: 'dat-lich',
    title: '5. Hướng dẫn đặt lịch qua VietinBank iPay',
    summary: 'Đặt trước lịch hẹn đến quầy để không phải xếp hàng chờ đợi lâu',
    badge: 'Tiết kiệm thời gian',
    steps: [
      {
        step: 1,
        title: 'Bước 1: Tìm kiếm đặt lịch',
        description: 'Truy cập ứng dụng VietinBank iPay và click vào thanh tìm kiếm trên trang chủ.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.1.jpg'
      },
      {
        step: 2,
        title: 'Bước 2: Gõ từ khóa',
        description: 'Gõ từ khóa “đặt lịch” vào thanh tìm kiếm.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.2.jpg'
      },
      {
        step: 3,
        title: 'Bước 3: Thêm mới lịch hẹn',
        description: 'Chọn mục “Thêm mới lịch hẹn” để tạo phiên giao dịch mới.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.3.jpg'
      },
      {
        step: 4,
        title: 'Bước 4: Mở tab Thông tin đặt lịch',
        description: 'Click vào tab “Thông tin đặt lịch”.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.4.jpg'
      },
      {
        step: 5,
        title: 'Bước 5: Chọn loại dịch vụ',
        description: 'Chọn “Loại dịch vụ” Quý khách cần hỗ trợ (tiền gửi, vay vốn, thẻ, chuyển tiền...).',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.5.jpg'
      },
      {
        step: 6,
        title: 'Bước 6: Chọn Phòng giao dịch gần nhất',
        description: 'Chọn “Phòng giao dịch” và lựa chọn PGD gần bạn nhất.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.6.jpg'
      },
      {
        step: 7,
        title: 'Bước 7: Chọn khung giờ và ngày',
        description: 'Chọn ngày đến giao dịch và khung giờ thuận tiện nhất.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.7.jpg'
      },
      {
        step: 8,
        title: 'Bước 8: Kiểm tra lại thông tin',
        description: 'Nhìn lại ngày và giờ và điều chỉnh (nếu có thay đổi).',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.8.jpg'
      },
      {
        step: 9,
        title: 'Bước 9: Xác nhận đặt lịch',
        description: 'Chốt ngày và giờ đặt lịch, sau đó click nút “Xác nhận đặt lịch”.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.9.jpg'
      },
      {
        step: 10,
        title: 'Bước 10: Lưu ảnh phiếu hẹn',
        description: 'Lưu ảnh ngày đặt lịch có mã QR/số thứ tự để xuất trình khi tới phòng giao dịch.',
        image: 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Giai-dap-thac-mac/Dat-lich/4.10.jpg'
      }
    ]
  }
];

export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: 'tai-khoan-hkd',
    title: 'Mở tài khoản hộ kinh doanh',
    category: 'ho-kinh-doanh',
    categoryLabel: 'Hộ kinh doanh',
    tag: 'Gói giải pháp Shop Plus',
    description: 'Miễn phí chuyển khoản trọn đời, tặng số tài khoản phong thủy theo ngày sinh / số điện thoại / phát tài, ưu đãi lãi suất vay và miễn phí lắp đặt VietinBank QR.',
    imageUrl: 'https://raw.githubusercontent.com/lhhiep161/anh-super-app/main/Tai-khoan-hkd.png'
  },
  {
    id: 'cham-pos-rut-tien',
    title: 'Chạm POS rút tiền',
    category: 'ca-nhan',
    categoryLabel: 'Khách hàng cá nhân',
    tag: 'Tiện ích hiện đại',
    description: 'Rút tiền mặt tiện lợi qua máy POS VietinBank không cần mang theo thẻ vật lý, thao tác chạm thẻ hoặc điện thoại bảo mật tối ưu.',
    imageUrl: 'https://raw.githubusercontent.com/lhhiep161/anh-super-app/main/Rut-ten-tra-gop.png'
  },
  {
    id: 'quan-ly-kpt',
    title: 'Sản phẩm thu hộ KHDN',
    category: 'doanh-nghiep',
    categoryLabel: 'Khách hàng doanh nghiệp',
    tag: 'Tối ưu dòng tiền',
    description: 'Dịch vụ thu hộ tự động qua tài khoản định danh, quản lý doanh thu theo thời gian thực và đồng bộ phần mềm kế toán ERP doanh nghiệp.',
    imageUrl: 'https://raw.githubusercontent.com/lhhiep161/anh-super-app/main/Quan-ly-kpt.png'
  },
  {
    id: 'uu-dai',
    title: 'Ưu đãi đang triển khai',
    category: 'uu-dai',
    categoryLabel: 'Ưu đãi đặc quyền',
    tag: 'Chương trình tri ân',
    description: 'Tổng hợp các voucher, hoàn tiền chi tiêu thẻ tín dụng quốc tế, tặng lãi suất cộng thêm khi gửi tiền tiết kiệm online trên VietinBank iPay.',
    imageUrl: 'https://raw.githubusercontent.com/lhhiep161/anh-super-app/main/Uu-dai.png'
  },
  {
    id: 'dau-gia-ts',
    title: 'Bán đấu giá tài sản bảo đảm',
    category: 'dau-gia',
    categoryLabel: 'Thông tin bán đấu giá',
    tag: 'Minh bạch & Pháp lý rõ ràng',
    description: 'Thông tin danh mục tài sản phát mại, bất động sản, xe cơ giới được VietinBank thẩm định minh bạch, hỗ trợ vay lãi suất ưu đãi trọn gói.',
    imageUrl: 'https://raw.githubusercontent.com/lhhiep161/anh-super-app/main/Dau-gia-ts.png'
  }
];

export const BRANCH_OFFICES: BranchOffice[] = [
  {
    id: 1,
    name: 'CN Tây Tiền Giang (Hội sở)',
    branchName: 'Chi nhánh Tây Tiền Giang',
    address: '560 Quốc lộ 1A, Khu phố 1, Phường Cai Lậy, Tỉnh Tiền Giang (Đồng Tháp Mười)',
    imageUrl: 'https://raw.githubusercontent.com/lhiep161/anh-super-app/main/Hoi-so.jpg',
    googleMapsUrl: 'https://maps.app.goo.gl/vMvjvxLD33yUHaae8',
    phone: '0273 382 2888'
  },
  {
    id: 2,
    name: 'PGD Cái Bè',
    branchName: 'Phòng giao dịch Cái Bè',
    address: 'Khu 4, xã Cái Bè, Huyện Cái Bè, Tỉnh Tiền Giang',
    imageUrl: 'https://raw.githubusercontent.com/lhiep161/anh-super-app/main/PGD-Cai-Be.jpg',
    googleMapsUrl: 'https://www.google.com/maps/place/ATM+Vietinbank/@10.3401748,106.0310491,17z/data=!3m1!4b1!4m6!3m5!1s0x310a9bb15887a329:0xfe62632b954207c6!8m2!3d10.3401695!4d106.033624!16s%2Fg%2F1hc16z60t?entry=ttu',
    phone: '0273 382 4567'
  },
  {
    id: 3,
    name: 'PGD An Hữu',
    branchName: 'Phòng giao dịch An Hữu',
    address: 'Ấp 1, xã An Hữu, Huyện Cái Bè, Tỉnh Tiền Giang',
    imageUrl: 'https://raw.githubusercontent.com/lhiep161/anh-super-app/main/PGD-An-Huu.jpg',
    googleMapsUrl: 'https://www.google.com/maps/place/Vietinbank+-+ATM/@10.3145918,105.8908273,21z/data=!4m14!1m7!3m6!1s0x310a84092bd6e0ed:0x4ca1f06421ac03e7!2sVietinbank+-+ATM!8m2!3d10.3145123!4d105.8906965!16s%2Fg%2F11b69f9lzk!3m5!1s0x310a84092bd6e0ed:0x4ca1f06421ac03e7!8m2!3d10.3145123!4d105.8906965!16s%2Fg%2F11b69f9lzk?entry=ttu',
    phone: '0273 392 3456'
  },
  {
    id: 4,
    name: 'PGD Hưng Long',
    branchName: 'Phòng giao dịch Hưng Long',
    address: 'Ấp Bình Thanh, xã Ngũ Hiệp, Huyện Cai Lậy, Tỉnh Tiền Giang',
    imageUrl: 'https://raw.githubusercontent.com/lhiep161/anh-super-app/main/PGD-Hung-Long.jpg',
    googleMapsUrl: 'https://maps.app.goo.gl/NGXo98fMu9QN2H838',
    phone: '0273 383 1234'
  },
  {
    id: 5,
    name: 'PGD Long Định',
    branchName: 'Phòng giao dịch Long Định',
    address: '155 Ấp Tân Trang, xã Long Định, Huyện Châu Thành, Tỉnh Tiền Giang',
    imageUrl: 'https://raw.githubusercontent.com/lhiep161/anh-super-app/main/PGD-Long-Dinh.jpg',
    googleMapsUrl: 'https://www.google.com/maps/place/Ng%C3%A2n+H%C3%A0ng+Tmcp+C%C3%B4ng+Th%C6%B0%C6%A1ng+Vi%E1%BB%87t+Nam+(Vietinbank)+-+Pgd+Long+%C4%90%E1%BB%8Bnh/@10.4004334,106.2421749,17z/data=!3m1!4b1!4m6!3m5!1s0x310abc9898bf18b9:0xd496162046fcda92!8m2!3d10.4004281!4d106.2447498!16s%2Fg%2F11c1t5fpqm?entry=ttu',
    phone: '0273 385 6789'
  },
  {
    id: 6,
    name: 'PGD Ấp Bắc',
    branchName: 'Phòng giao dịch Ấp Bắc',
    address: '504 Ấp Bắc, Phường Đạo Thạnh, TP. Mỹ Tho, Tỉnh Tiền Giang',
    imageUrl: 'https://raw.githubusercontent.com/lhiep161/anh-super-app/main/PGD-Ap-Bac.jpg',
    googleMapsUrl: 'https://www.google.com/maps/place/Ng%C3%A2n+h%C3%A0ng+VietinBank/@10.370246,106.3495972,18z/data=!4m23!1m16!4m15!1m6!1m2!1s0x310aaf1c0875a515:0x73af784ab88422e7!2zTmfDom4gaMOgbmcgVmlldGluQmFuaywgMzAzIOG6pHAgQuG6r2MsIMSQ4bqhbyBUaOG6oW5oLCDEkOG7k25nIFRow6FwLCBWaeG7h3QgTmFt!2m2!1d106.3514918!2d10.3702471!1m6!1m2!1s0x310aaf1c0875a515:0x73af784ab88422e7!2zTmfDom4gaMOgbmcgVmlldGluQmFuaywgMzAzIOG6pHAgQuG6r2MsIMSQ4bqhbyBUaOG6oW5oLCDEkOG7k25nIFRow6FwLCBWaeG7h3QgTmFt!2m2!1d106.3514918!2d10.3702471!3e0!3m5!1s0x310aaf1c0875a515:0x73af784ab88422e7!8m2!3d10.3702468!4d106.3514917!16s%2Fg%2F11my930b_m?entry=ttu',
    phone: '0273 388 9900'
  }
];

export const WORKING_HOURS = {
  weekdays: 'Thứ 2 đến Thứ 6',
  morning: 'Sáng từ 07:30 Đến 11:30',
  afternoon: 'Chiều từ 13:30 Đến 16:30',
  weekend: 'Thứ 7 - Chủ nhật: Nghỉ giao dịch'
};

export const APP_DOWNLOAD_LINKS = {
  ios: 'https://apps.apple.com/vn/app/vietinbank-ipay/id689963454?l=vi',
  android: 'https://play.google.com/store/apps/details?id=com.vietinbank.ipay',
  tiktokSavingsGuide: 'https://www.tiktok.com/@nguyentrangtkneu/video/7202579533806062875'
};
