// =======================================
// HÀNH TRÌNH TRUY VẾT TỘI PHẠM MẠNG
// script.js
// =======================================

// =============================
// LẤY CÁC THÀNH PHẦN HTML
// =============================

const home = document.getElementById("home");
const game = document.getElementById("game");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const progress = document.getElementById("progress");
const progressFill = document.getElementById("progressFill");

const scoreText = document.getElementById("score");

const caseTitle = document.getElementById("caseTitle");
const caseStory = document.getElementById("caseStory");
const evidence = document.getElementById("evidence");
const question = document.getElementById("question");

const answers = document.getElementById("answers");
const message = document.getElementById("message");

const finalScore = document.getElementById("finalScore");
const rank = document.getElementById("rank");

// =============================
// BIẾN ĐIỀU KHIỂN
// =============================

let current = 0;
let score = 0;
let selected = null;
let answered = false;

// =============================
// DỮ LIỆU TÌNH HUỐNG
// =============================

const cases = [

{

title:"Tình huống 1 - Email giả mạo",

story:
`Một nhân viên nhận được email tự xưng là ngân hàng yêu cầu xác minh tài khoản.

Email có logo rất giống thật và yêu cầu đăng nhập ngay để tránh khóa tài khoản.`,

evidence:
`Địa chỉ gửi:

support@vietcom-bank-security.com

IP gửi:

185.117.xxx.xxx

Liên kết:

https://vietcom-bank-security.com/login`,

question:
"Điểm đáng nghi nhất là gì?",

answers:[

"Có logo ngân hàng",

"Tên miền không phải tên miền chính thức",

"Email được gửi buổi tối",

"Có file PDF đính kèm"

],

correct:1

},

// =======================================

{

title:"Tình huống 2 - Nhật ký đăng nhập",

story:
`Sau khi nhấn vào liên kết, tài khoản của nạn nhân xuất hiện hoạt động bất thường.`,

evidence:
`02:15

Đăng nhập thành công

Quốc gia:

Nga

Thiết bị:

Windows 11

Trình duyệt:

Chrome`,

question:
"Dấu hiệu nào cho thấy tài khoản có khả năng bị xâm nhập?",

answers:[

"Đăng nhập bằng Chrome",

"Sử dụng Windows",

"Đăng nhập từ quốc gia bất thường",

"Đăng nhập lúc ban đêm"

],

correct:2

},

// =======================================

{

title:"Tình huống 3 - Kết thúc truy vết",

story:
`Máy chủ ghi nhận hơn 1500 yêu cầu mỗi phút từ hàng trăm địa chỉ IP.

Qua phân tích, AI phát hiện các dấu vết đều liên quan tới cùng một nhóm tấn công.`,

evidence:
`• Email giả

• Website giả mạo

• Đăng nhập trái phép

• 300 địa chỉ IP

• Botnet`,

question:
"Kết luận hợp lý nhất là gì?",

answers:[

"Máy chủ bị lỗi",

"Người dùng quên mật khẩu",

"Tội phạm sử dụng Phishing kết hợp Botnet",

"Lỗi trình duyệt"

],

correct:2

}

];
// =============================
// BẮT ĐẦU TRÒ CHƠI
// =============================

startBtn.addEventListener("click", () => {

    home.classList.remove("active");
    game.classList.add("active");

    loadCase();

});

// =============================
// HIỂN THỊ TÌNH HUỐNG
// =============================

function loadCase() {

    answered = false;
    selected = null;

    message.innerHTML = "";

    nextBtn.innerText = "XÁC NHẬN";

    const c = cases[current];

    progress.innerText = `${current + 1} / ${cases.length}`;

    scoreText.innerText = score;

    progressFill.style.width =
        ((current + 1) / cases.length) * 100 + "%";

    caseTitle.innerText = c.title;

    caseStory.innerText = c.story;

    evidence.innerText = c.evidence;

    question.innerText = c.question;

    answers.innerHTML = "";

    c.answers.forEach((text, index) => {

        const label = document.createElement("label");

        label.className = "answer";

        label.innerHTML = `

            <input
                type="radio"
                name="answer"
                value="${index}"
            >

            ${text}

        `;

        label.querySelector("input")
            .addEventListener("change", () => {

                selected = index;

        });

        answers.appendChild(label);

    });

}

// =============================
// NÚT XÁC NHẬN
// =============================

nextBtn.addEventListener("click", () => {

    if (!answered) {

        checkAnswer();

    } else {

        current++;

        if (current >= cases.length) {

            finishGame();

        } else {

            loadCase();

        }

    }

});

// =============================
// KIỂM TRA ĐÁP ÁN
// =============================

function checkAnswer() {

    if (selected === null) {

        alert("Hãy chọn một đáp án.");

        return;

    }

    answered = true;

    if (selected === cases[current].correct) {

        score += 10;

        scoreText.innerText = score;

        message.innerHTML =
            "✔ Truy vết thành công";

        message.className = "success";

    } else {

        message.innerHTML =
            "✖ Truy vết thất bại";

        message.className = "fail";

    }

    nextBtn.innerText =

        current === cases.length - 1

        ? "XEM KẾT QUẢ"

        : "TÌNH HUỐNG TIẾP";

}
// =============================
// KẾT THÚC TRÒ CHƠI
// =============================

function finishGame() {

    game.classList.remove("active");
    result.classList.add("active");

    finalScore.innerText = `${score} / ${cases.length * 10}`;

    let title = "";
    let color = "";

    if (score === cases.length * 10) {

        title = "🏆 Chuyên gia truy vết";
        color = "#00ff88";

    } else if (score >= 20) {

        title = "🥈 Điều tra viên";
        color = "#00eaff";

    } else if (score >= 10) {

        title = "📘 Người học";
        color = "#ffd54f";

    } else {

        title = "📖 Cần luyện tập thêm";
        color = "#ff6b6b";

    }

    rank.innerText = title;
    rank.style.color = color;

}

// =============================
// KHỞI TẠO
// =============================

progressFill.style.width = "0%";
scoreText.innerText = "0";
message.innerHTML = "";
