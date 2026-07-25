// CƠ SỞ DỮ LIỆU TÌNH HUỐNG (7 Bước Truy Vết)
const missions = [
    {
        scenario: "TÌNH HUỐNG 1: Một nhân viên báo cáo vừa nhận được email yêu cầu đổi mật khẩu. Giao diện giống hệt ngân hàng đối tác. Bạn trích xuất Header của email để kiểm tra.",
        clue: "Return-Path: <update-security@banc-support-alert.com>\nFrom: \"Bank Security\" <security@techbank.com>\nSubject: Yêu cầu cập nhật mật khẩu khẩn cấp!",
        options: [
            "Email an toàn vì địa chỉ 'From' đúng là của Techbank.",
            "Đây là lừa đảo (Phishing) vì tên miền ở 'Return-Path' không khớp với tên miền ngân hàng.",
            "Đây là lừa đảo vì có chữ 'khẩn cấp' trong tiêu đề."
        ],
        correct: 1, 
        feedback: "Chính xác! Kẻ tấn công có thể giả mạo trường 'From' để đánh lừa mắt người dùng, nhưng 'Return-Path' (nơi nhận phản hồi thực sự) đã tố cáo tên miền giả mạo của chúng."
    },
    {
        scenario: "TÌNH HUỐNG 2: Nhân viên trên đã lỡ tải file đính kèm từ email. Bạn ngay lập tức kiểm tra hệ thống giám sát Endpoint (EDR) trên máy tính của nạn nhân và phân tích cây tiến trình (Process Tree).",
        clue: "PROCESS TREE LOG:\nexplorer.exe\n └── winword.exe (Bao-cao-tai-chinh.doc)\n      └── cmd.exe /c\n           └── powershell.exe -WindowStyle Hidden -EncodedCommand JABzAD0ATgBl...",
        options: [
            "Đây là tính năng tự động cập nhật ẩn của phần mềm Microsoft Word.",
            "Nhân viên đang cố gắng gõ lệnh PowerShell thủ công để sửa lỗi file Word.",
            "File Word chứa Macro độc hại. Khi mở, nó tự động gọi CMD và PowerShell ẩn để tải mã độc (Malware)."
        ],
        correct: 2,
        feedback: "Tuyệt vời! Hành vi một ứng dụng văn phòng (winword.exe) gọi ra công cụ dòng lệnh (cmd/powershell) là một Dấu hiệu thỏa hiệp (IoC - Indicator of Compromise) cực kỳ rõ ràng."
    },
    {
        scenario: "TÌNH HUỐNG 3: Mã độc trên máy nạn nhân đã giúp hacker lọt vào mạng nội bộ. Tiếp đó, chúng nhắm tới máy chủ Web của công ty. Bạn kiểm tra Access Log (nhật ký truy cập web) và phát hiện điều bất thường.",
        clue: "192.168.1.15 - - [14/Oct/2026:14:22:11] \"GET /login.php?user=admin' OR '1'='1 -- &pass=123 HTTP/1.1\" 200 4522",
        options: [
            "Kẻ tấn công dùng lỗ hổng SQL Injection để đăng nhập trái phép bỏ qua mật khẩu.",
            "Kẻ tấn công đang thực hiện từ chối dịch vụ (DDoS) vào file login.php.",
            "Đây chỉ là một truy vấn báo lỗi 404 bình thường của trình duyệt."
        ],
        correct: 0,
        feedback: "Chính xác! Lỗ hổng SQL Injection (' OR '1'='1) đã ép cơ sở dữ liệu trả về kết quả luôn ĐÚNG, giúp hacker đăng nhập với quyền Admin mà không cần mật khẩu thật."
    },
    {
        scenario: "TÌNH HUỐNG 4: Sau khi xâm nhập máy chủ Web (chạy Linux), hacker cố gắng chiếm quyền điều khiển cao nhất (Root). Bạn phân tích lịch sử lệnh (.bash_history) bị bỏ lại.",
        clue: "[BASH HISTORY]\nwhoami\nuname -a\nfind / -perm -4000 -type f 2>/dev/null\n./linpeas.sh\npython3 -c 'import pty; pty.spawn(\"/bin/bash\")'",
        options: [
            "Hacker đang cố gắng xóa toàn bộ dữ liệu trên ổ cứng bằng lệnh find.",
            "Hacker đang tìm kiếm các file có quyền SUID và chạy tool linpeas để tìm lỗ hổng leo thang đặc quyền (Privilege Escalation).",
            "Hacker đang cài đặt và cấu hình phần mềm Python hợp pháp cho máy chủ."
        ],
        correct: 1,
        feedback: "Rất nhạy bén! Lệnh `find / -perm -4000` chuyên dùng để tìm file có quyền SUID. Nếu khai thác thành công file này, hacker có thể chiếm quyền Root."
    },
    {
        scenario: "TÌNH HUỐNG 5: Hacker đã có quyền root và thiết lập đường hầm kết nối để duy trì quyền truy cập. Bạn kiểm tra Tường lửa (Firewall) bảo vệ máy chủ Web.",
        clue: "FIREWALL LOG:\nACTION: ALLOW | SRC: [Web_Server_IP] | DST: 185.15.22.x | PORT: 4444 \nPROTOCOL: TCP | DIRECTION: OUTBOUND | STATE: ESTABLISHED",
        options: [
            "Máy chủ web đang tải bản cập nhật Windows từ cổng 4444.",
            "Đây là kết nối Reverse Shell (Vỏ bọc ngược), máy chủ bị ép tự động kết nối ra ngoài để hacker điều khiển.",
            "Đây là một cuộc gọi DNS hợp lệ để phân giải tên miền."
        ],
        correct: 1,
        feedback: "Đúng vậy! Port 4444 là cổng mặc định của công cụ hack Metasploit. Tường lửa thường chặn các kết nối TỪ NGOÀI VÀO (Inbound), nên hacker dùng Reverse Shell (TỪ TRONG RA - Outbound) để qua mặt tường lửa."
    },
    {
        scenario: "TÌNH HUỐNG 6: Bạn đã chặn IP 185.15.22.x (Máy chủ C2 của hacker). Để tìm danh tính, bạn thực hiện tra cứu WHOIS lịch sử đối với tên miền trỏ về IP này.",
        clue: "IP: 185.15.22.x\nReverse DNS: server.update-sys-net.com\nWHOIS Domain (Hiện tại): hidden-privacy@domains.com\nWHOIS Domain (Lịch sử năm 2023): shadowbyte99@proton.me",
        options: [
            "Domain này chắc chắn thuộc về công ty Microsoft vì có chữ 'update-sys-net'.",
            "Kẻ tấn công ẩn danh hoàn toàn thông qua dịch vụ Privacy, không thể truy vết tiếp.",
            "Tra cứu lịch sử WHOIS đã làm lộ bí danh thật từng đăng ký tên miền này trong quá khứ là 'shadowbyte99'."
        ],
        correct: 2,
        feedback: "Quan sát rất tốt! Dịch vụ bảo mật WHOIS (Privacy Protection) hiện tại có thể che giấu thông tin, nhưng Lịch sử WHOIS thường là 'tử huyệt' của tội phạm mạng vì những sai lầm trong quá khứ."
    },
    {
        scenario: "TÌNH HUỐNG 7 (CUỐI): Có bí danh 'shadowbyte99'. Bạn áp dụng kỹ thuật OSINT (Trí tuệ nguồn mở) và tìm thấy một tài khoản Github tương ứng chứa đoạn mã giống hệt mã độc trên máy chủ công ty.",
        clue: "GITHUB REPOSITORY: github.com/shadowbyte99/ReverseShell_C2\nCommit Message: 'Update C2 server IP address'\nProfile Link: twitter.com/nguyen_minh_hacker99",
        options: [
            "Dùng công cụ Brute-force để cố gắng hack lại tài khoản Github của kẻ đó.",
            "Xóa mọi file và kết thúc điều tra vì đã an toàn.",
            "Thu thập thông tin tài khoản mạng xã hội liên kết, trích xuất danh tính thật và chuyển toàn bộ bằng chứng số cho Cảnh sát phòng chống tội phạm công nghệ cao."
        ],
        correct: 2,
        feedback: "TRUY VẾT HOÀN TẤT! Việc hack ngược (Hack back) là vi phạm pháp luật. Việc của Chuyên gia An ninh mạng là thu thập bằng chứng kỹ thuật số nguyên vẹn (Digital Forensics) và phối hợp với cơ quan hành pháp."
    }
];

// Biến trạng thái trò chơi
let currentLevel = 0;
let mistakes = 0;

// Các DOM Elements
const introScreen = document.getElementById('intro-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const levelDisplay = document.getElementById('level-display');
const scenarioText = document.getElementById('scenario-text');
const clueBox = document.getElementById('clue-box');
const optionsContainer = document.getElementById('options-container');
const feedbackMsg = document.getElementById('feedback-msg');

// Hàm bắt đầu game
function startGame() {
    currentLevel = 0;
    mistakes = 0;
    introScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    loadLevel();
}

// Hàm tải nội dung vòng chơi
function loadLevel() {
    const mission = missions[currentLevel];
    levelDisplay.innerText = `[Giai đoạn truy vết: ${currentLevel + 1} / ${missions.length}]`;
    scenarioText.innerHTML = `> ${mission.scenario}`;
    clueBox.innerText = mission.clue;
    feedbackMsg.innerHTML = "";
    
    // Xóa nút cũ
    optionsContainer.innerHTML = '';

    // Render nút mới
    mission.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerText = `> ${opt}`;
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

// Hàm kiểm tra đáp án
function checkAnswer(selectedIndex, btnElement) {
    const mission = missions[currentLevel];
    const allBtns = document.querySelectorAll('.options .btn');
    
    // Khóa nút tạm thời
    allBtns.forEach(b => b.disabled = true);

    if (selectedIndex === mission.correct) {
        // TRẢ LỜI ĐÚNG
        btnElement.style.backgroundColor = 'var(--text-secondary)';
        btnElement.style.color = '#fff';
        feedbackMsg.innerHTML = `<span class="success">TRUY VẾT THÀNH CÔNG!</span><br><small style="color:#aaa;">${mission.feedback}</small>`;
        
        setTimeout(() => {
            currentLevel++;
            if (currentLevel < missions.length) {
                loadLevel();
            } else {
                showResult();
            }
        }, 5000); // Cho người chơi 5 giây để đọc giải thích kiến thức
    } else {
        // TRẢ LỜI SAI
        mistakes++;
        btnElement.style.borderColor = 'var(--alert-color)';
        btnElement.style.color = 'var(--alert-color)';
        feedbackMsg.innerHTML = '<span class="error">CẢNH BÁO: Phân tích sai hướng! Dấu vết đang mờ dần. Hãy thử lại.</span>';
        
        setTimeout(() => {
            feedbackMsg.innerHTML = "";
            btnElement.style.borderColor = 'var(--text-main)';
            btnElement.style.color = 'var(--text-main)';
            
            // Mở khóa các nút khác, mờ đi nút đã bấm sai
            allBtns.forEach(b => b.disabled = false);
            btnElement.disabled = true; 
            btnElement.style.opacity = '0.3';
        }, 2500);
    }
}

// Hàm hiển thị màn hình kết quả cuối cùng
function showResult() {
    gameScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    // Thuật toán tính điểm (Tổng 100, sai 1 câu trừ 10 điểm)
    let score = 100 - (mistakes * 10);
    if (score < 10) score = 10; 
    
    document.getElementById('final-score').innerText = score;

    // Phân loại đánh giá
    let evalText = "";
    if (score === 100) {
        evalText = "XUẤT SẮC (Hacker Mũ Trắng Thực Thụ). Bạn phân tích không vết xước!";
    } else if (score >= 70) {
        evalText = "KHÁ TỐT (Chuyên viên an ninh mạng). Bạn đã tìm ra thủ phạm dù gặp vài cảnh báo giả.";
    } else {
        evalText = "THỰC TẬP SINH (Security Analyst intern). Bạn tìm ra tội phạm nhưng để lộ quá nhiều sơ hở. Cần đào tạo thêm!";
    }
    document.getElementById('final-eval').innerText = evalText;
}

// Hàm chơi lại
function resetGame() {
    resultScreen.classList.add('hidden');
    introScreen.classList.remove('hidden');
}
