/*========================================================

Cyber Trace Simulator
Version 1.4

data.js

Part 3.1

========================================================*/


const CASE_DATA={

caseInfo:{

id:"CASE-001",

title:"Lừa đảo chuyển khoản",

victim:"Nguyễn Văn A",

loss:"50.000.000 VNĐ",

risk:"HIGH",

alias:"ShadowFox",

ip:"185.201.12.88",

country:"Campuchia",

technique:"Phishing + Social Engineering"

},

modules:{

email:[

{

id:1,

title:"Email giả mạo",

question:

`Nguyễn Văn A nhận được email

support@vietcombank-security.xyz

Điểm bất thường nhất là gì?`,

options:[

"Tên miền .xyz",

"Logo ngân hàng",

"Email gửi buổi tối",

"Có chữ Support"

],

answer:0,

success:

"✔ Truy vết thành công",

fail:

"✖ Truy vết thất bại",

explain:

"Tên miền .xyz không phải tên miền chính thức của ngân hàng."

},

{

id:2,

title:"Reply-To",

question:

`Header email

From:

vietcombank@gmail.com

Reply-To:

abc123@qq.com

Điều gì đáng nghi?`,

options:[

"Reply-To khác From",

"Có Gmail",

"Email quá ngắn",

"Tiêu đề viết hoa"

],

answer:0,

success:

"✔ Truy vết thành công",

fail:

"✖ Truy vết thất bại",

explain:

"Reply-To khác địa chỉ người gửi là dấu hiệu giả mạo."

},

{

id:3,

title:"Attachment",

question:

`File đính kèm

HoaDon.pdf.exe

Điểm đáng nghi nhất?`,

options:[

"Tên quá dài",

"Có hai phần mở rộng",

"Dung lượng nhỏ",

"Là PDF"

],

answer:1,

success:

"✔ Truy vết thành công",

fail:

"✖ Truy vết thất bại",

explain:

"Tệp .exe được ngụy trang thành PDF."

}

],

url:[

{

id:1,

title:"URL",

question:

`https://facebook-login-security.com`

,

options:[

"URL chính thức",

"Website giả mạo",

"Trang Github",

"Cloud Storage"

],

answer:1,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"Tên miền gần giống Facebook để lừa đăng nhập."

},

{

id:2,

title:"Link rút gọn",

question:

`https://bit.ly/abc123`

,

options:[

"Mở ngay",

"Dùng công cụ mở rộng URL",

"Tắt Antivirus",

"Đổi WiFi"

],

answer:1,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"Cần mở rộng URL trước khi truy cập."

},

{

id:3,

title:"HTTPS",

question:

"Một website không có HTTPS có thể gây rủi ro gì?",

options:[

"Dữ liệu truyền không được mã hóa",

"Tăng tốc Internet",

"Tiết kiệm pin",

"Không có rủi ro"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"HTTPS giúp mã hóa dữ liệu."

}

],

whois:[/*========================================================
PART 3.2
WHOIS + DNS + IP
========================================================*/

{

id:1,

title:"WHOIS - Ngày đăng ký",

question:

`Tên miền

facebook-login-security.com

được đăng ký cách đây 2 ngày.

Điều này cho thấy điều gì?`,

options:[

"Có khả năng là website giả mạo",

"Facebook vừa đổi tên miền",

"Website chắc chắn an toàn",

"Không thể kết luận gì"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"Tên miền mới đăng ký thường được sử dụng trong các chiến dịch phishing."

},

{

id:2,

title:"WHOIS - Registrar",

question:

"Thông tin WHOIS nào hữu ích nhất khi điều tra?",

options:[

"Registrar",

"Ngày đăng ký",

"Abuse Contact",

"Tất cả đều quan trọng"

],

answer:3,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"Mỗi trường trong WHOIS đều có giá trị đối với điều tra số."

},

{

id:3,

title:"WHOIS Privacy",

question:

"Dịch vụ ẩn thông tin WHOIS thường nhằm mục đích gì?",

options:[

"Bảo vệ quyền riêng tư của chủ sở hữu",

"Tăng tốc Internet",

"Chống virus",

"Tăng SEO"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"WHOIS Privacy che giấu thông tin đăng ký, nhưng không đồng nghĩa website là độc hại."

}

],

dns:[

{

id:1,

title:"DNS Record",

question:

"MX Record dùng để làm gì?",

options:[

"Mail Server",

"Địa chỉ IPv4",

"SSL",

"CDN"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"MX Record xác định máy chủ thư điện tử."

},

{

id:2,

title:"DNS",

question:

"A Record có chức năng gì?",

options:[

"Liên kết tên miền với địa chỉ IPv4",

"Liên kết Email",

"Chứa chứng chỉ SSL",

"Lưu mật khẩu"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"A Record ánh xạ Domain → IPv4."

},

{

id:3,

title:"TXT Record",

question:

"TXT Record thường dùng để triển khai công nghệ nào?",

options:[

"SPF / DKIM",

"Bluetooth",

"VPN",

"DHCP"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"SPF và DKIM thường sử dụng TXT Record."

}

],

ip:[

{

id:1,

title:"IP Intelligence",

question:

`185.201.12.88`

,

options:[

"Đây chắc chắn là IP của tội phạm",

"Đây chỉ là địa chỉ cần tiếp tục điều tra",

"Đây là IP nội bộ",

"Đây là MAC Address"

],

answer:1,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"Không thể kết luận danh tính chỉ dựa trên địa chỉ IP."

},

{

id:2,

title:"VPN",

question:

"Tại sao VPN gây khó khăn cho việc truy vết?",

options:[

"Ẩn IP thật",

"Tăng RAM",

"Diệt virus",

"Đổi DNS tự động"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"VPN chuyển lưu lượng qua máy chủ trung gian để che giấu IP."

},

{

id:3,

title:"Hosting",

question:

"Khi IP thuộc một nhà cung cấp VPS, điều này có nghĩa là:",

options:[

"IP thuộc máy chủ trung gian",

"Đã xác định được nghi phạm",

"Máy tính nạn nhân bị lỗi",

"Địa chỉ IP giả"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"Máy chủ VPS có thể chỉ là điểm trung chuyển, không phải vị trí thật của đối tượng."

}

],

log:[/*========================================================
PART 3.3
LOG + METADATA + OSINT + TIMELINE
========================================================*/

{

id:1,

title:"Web Server Log",

question:

`Log ghi nhận:

POST /login

Status:200

Có ý nghĩa gì?`,

options:[

"Đăng nhập thành công",

"Website bị lỗi",

"Máy chủ bị tắt",

"Không xác định"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"Mã trạng thái HTTP 200 cho biết yêu cầu đã được xử lý thành công."

},

{

id:2,

title:"User-Agent",

question:

"User-Agent trong log dùng để làm gì?",

options:[

"Nhận diện trình duyệt hoặc thiết bị",

"Lưu mật khẩu",

"Xóa cookie",

"Ẩn địa chỉ IP"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"User-Agent giúp nhận diện trình duyệt, hệ điều hành hoặc thiết bị."

},

{

id:3,

title:"Access Log",

question:

"Nếu một IP gửi hàng nghìn yêu cầu trong thời gian ngắn, dấu hiệu phù hợp nhất là:",

options:[

"Truy cập bình thường",

"Tấn công hoặc hành vi bất thường",

"Cập nhật Windows",

"Đồng bộ thời gian"

],

answer:1,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"Lưu lượng bất thường trong thời gian ngắn cần được điều tra thêm."

}

],

metadata:[

{

id:1,

title:"EXIF",

question:

"EXIF của ảnh thường chứa thông tin nào?",

options:[

"Thiết bị chụp",

"Thời gian",

"GPS (nếu có)",

"Tất cả các đáp án trên"

],

answer:3,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"EXIF có thể lưu nhiều thông tin hữu ích cho điều tra."

},

{

id:2,

title:"GPS",

question:

"Nếu ảnh không còn dữ liệu GPS thì có thể kết luận gì?",

options:[

"Ảnh chắc chắn là giả",

"EXIF có thể đã bị xóa hoặc thiết bị không ghi GPS",

"Ảnh bị virus",

"Không thể mở ảnh"

],

answer:1,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"Thiếu GPS không đồng nghĩa ảnh là giả."

}

],

osint:[

{

id:1,

title:"Username",

question:

"Nếu cùng một username xuất hiện trên nhiều nền tảng mạng xã hội thì:",

options:[

"Có thể là cùng một người, cần kiểm chứng thêm",

"Chắc chắn là cùng một người",

"Không có giá trị điều tra",

"Đó là tài khoản giả"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"OSINT cần kết hợp nhiều nguồn trước khi đưa ra kết luận."

},

{

id:2,

title:"Avatar",

question:

"Ảnh đại diện giống nhau trên nhiều tài khoản có ý nghĩa gì?",

options:[

"Là một manh mối cần đối chiếu",

"Chắc chắn cùng chủ sở hữu",

"Không có ý nghĩa",

"Là lỗi hệ thống"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"Avatar chỉ là một chỉ dấu, không đủ để xác định danh tính."

},

{

id:3,

title:"Nguồn mở",

question:

"OSINT là viết tắt của:",

options:[

"Open Source Intelligence",

"Online Security Internet",

"Open Security Interface",

"Official Secure Intelligence"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"OSINT là quá trình thu thập và phân tích thông tin từ các nguồn công khai."

}

],

timeline:[

{

id:1,

title:"Timeline",

question:

"Bước nào nên thực hiện trước trong điều tra số?",

options:[

"Thu thập và bảo toàn chứng cứ",

"Công khai nghi phạm",

"Xóa dữ liệu",

"Khởi động lại toàn bộ hệ thống"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"Thu thập và bảo toàn chứng cứ là nguyên tắc quan trọng trong điều tra số."

},

{

id:2,

title:"Chuỗi sự kiện",

question:

"Sau khi phân tích email, URL và IP, bước hợp lý tiếp theo là:",

options:[

"Đối chiếu các bằng chứng để xây dựng timeline",

"Xóa log",

"Đăng thông tin lên mạng xã hội",

"Bỏ qua các bằng chứng"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"Timeline giúp tái hiện diễn biến vụ việc theo trình tự thời gian."

},

{

id:3,

title:"Kết thúc điều tra",

question:

"Khi đã hoàn tất phân tích kỹ thuật, cần làm gì?",

options:[

"Lập báo cáo và chuyển cơ quan có thẩm quyền",

"Xóa toàn bộ dữ liệu",

"Công bố danh tính nghi phạm",

"Tự ý truy cập hệ thống của đối tượng"

],

answer:0,

success:"✔ Truy vết thành công",

fail:"✖ Truy vết thất bại",

explain:

"Kết quả điều tra cần được tổng hợp và xử lý theo đúng quy định pháp luật."

}

]

}

};

