const tasks = [

{
    id:1,

    title:"Task 1 - Email giả mạo",

    question:"Nguyễn Văn A nhận được email yêu cầu xác minh tài khoản ngân hàng với địa chỉ:\n\nsupport@vietcombank-security.xyz\n\nDấu hiệu nào đáng nghi nhất?",

    options:[

        "Email được gửi vào buổi tối",

        "Tên miền .xyz thay vì tên miền chính thức của ngân hàng",

        "Email có logo ngân hàng",

        "Email có chữ 'support'"

    ],

    answer:1,

    explain:"Tên miền không thuộc ngân hàng chính thức là dấu hiệu phổ biến của email lừa đảo (phishing)."

},

{
    id:2,

    title:"Task 2 - Website giả mạo",

    question:"Bạn truy cập vào website:\n\nhttps://facebook-login-security.com\n\nĐây là dấu hiệu của hình thức tấn công nào?",

    options:[

        "Brute Force",

        "DDoS",

        "Phishing",

        "SQL Injection"

    ],

    answer:2,

    explain:"Website sử dụng tên miền gần giống Facebook để đánh cắp tài khoản."

},

{
    id:3,

    title:"Task 3 - Phân tích IP",

    question:"Trong nhật ký hệ thống xuất hiện IP:\n\n185.201.12.88\n\nBước điều tra đầu tiên hợp lý nhất là gì?",

    options:[

        "Kiểm tra vị trí và thông tin của địa chỉ IP",

        "Cài lại Windows",

        "Đổi mật khẩu WiFi",

        "Khởi động lại modem"

    ],

    answer:0,

    explain:"Phân tích IP giúp xác định máy chủ, nhà mạng hoặc khu vực xuất phát."

},

{
    id:4,

    title:"Task 4 - Link rút gọn",

    question:"Đối tượng gửi đường dẫn:\n\nhttps://bit.ly/3abcXYZ\n\nViệc nên làm trước khi truy cập là gì?",

    options:[

        "Mở trực tiếp",

        "Kiểm tra URL đích bằng công cụ mở rộng liên kết",

        "Đổi sang trình duyệt khác",

        "Tắt phần mềm diệt virus"

    ],

    answer:1,

    explain:"Link rút gọn có thể che giấu website độc hại."

},

{
    id:5,

    title:"Task 5 - Tập tin đáng ngờ",

    question:"Sau khi mở email, trình duyệt yêu cầu tải tệp:\n\nHoaDon.pdf.exe\n\nĐiểm đáng nghi nhất là gì?",

    options:[

        "Tên tệp viết bằng tiếng Việt",

        "Tệp có hai phần mở rộng (.pdf.exe)",

        "Dung lượng nhỏ",

        "Tên tệp quá ngắn"

    ],

    answer:1,

    explain:"Tệp .exe được ngụy trang thành tài liệu PDF để lừa người dùng chạy mã độc."

},


{
    id:6,

    title:"Task 6 - Mật khẩu",

    question:"Mật khẩu nào dưới đây có độ mạnh cao nhất?",

    options:[

        "12345678",

        "nguyenvana",

        "P@5sW0rd!9xQ",

        "abcdef123"

    ],

    answer:2,

    explain:"Mật khẩu mạnh nên có chữ hoa, chữ thường, số, ký tự đặc biệt và đủ dài."

},

{
    id:7,

    title:"Task 7 - 2FA",

    question:"Biện pháp nào giúp giảm nguy cơ bị chiếm tài khoản ngay cả khi lộ mật khẩu?",

    options:[

        "Đổi tên WiFi",

        "Bật xác thực hai lớp (2FA)",

        "Xóa lịch sử trình duyệt",

        "Giảm độ sáng màn hình"

    ],

    answer:1,

    explain:"Xác thực hai lớp yêu cầu thêm một bước xác minh ngoài mật khẩu."

},

{
    id:8,

    title:"Task 8 - Địa chỉ IP",

    question:"Kết quả phân tích cho thấy IP truy cập thuộc máy chủ đặt tại Campuchia. Điều này cho phép kết luận điều gì?",

    options:[

        "Kẻ tấn công chắc chắn là người Campuchia",

        "Máy chủ trung gian đặt tại Campuchia, chưa đủ để xác định danh tính",

        "Máy tính nạn nhân đã bị hỏng",

        "Người dùng đang sử dụng điện thoại Android"

    ],

    answer:1,

    explain:"Địa chỉ IP chỉ phản ánh điểm kết nối hoặc máy chủ, không khẳng định quốc tịch hay danh tính."

},

{
    id:9,

    title:"Task 9 - VPN",

    question:"Đối tượng sử dụng VPN trước khi thực hiện hành vi lừa đảo. VPN gây khó khăn cho việc truy vết vì:",

    options:[

        "Làm tăng tốc độ Internet",

        "Ẩn hoặc thay đổi địa chỉ IP thật",

        "Tăng dung lượng ổ cứng",

        "Tự động xóa virus"

    ],

    answer:1,

    explain:"VPN che giấu IP thật bằng cách chuyển lưu lượng qua máy chủ trung gian."

},

{
    id:10,

    title:"Task 10 - Kết thúc điều tra",

    question:"Sau khi thu thập email, nhật ký truy cập, IP và các bằng chứng số, bước xử lý phù hợp nhất là gì?",

    options:[

        "Công khai toàn bộ thông tin nghi phạm lên mạng xã hội",

        "Lưu giữ bằng chứng và chuyển cho cơ quan có thẩm quyền",

        "Xóa toàn bộ dữ liệu",

        "Gửi email đe dọa đối tượng"

    ],

    answer:1,

    explain:"Bằng chứng cần được bảo quản và chuyển cho cơ quan chức năng để xử lý theo quy định."

}

];
