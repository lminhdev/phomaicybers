// =========================================
// HÀNH TRÌNH TRUY VẾT TỘI PHẠM MẠNG
// script.js
// Phiên bản 2.0
// =========================================

// ================================
// DOM
// ================================

const home = document.getElementById("home");
const game = document.getElementById("game");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const question = document.getElementById("question");
const answers = document.getElementById("answers");

const statusText = document.getElementById("status");

const currentTask = document.getElementById("currentTask");
const totalTask = document.getElementById("totalTask");

const scoreText = document.getElementById("score");

const progressBar = document.getElementById("progressBar");

// RESULT

const alias = document.getElementById("alias");
const ip = document.getElementById("ip");
const country = document.getElementById("country");
const finalScore = document.getElementById("finalScore");
const rank = document.getElementById("rank");

// ================================
// BIẾN HỆ THỐNG
// ================================

let currentIndex = 0;
let score = 0;
let answered = false;

// ================================
// DỮ LIỆU MÔ PHỎNG
// ================================

const aliases = [

    "ShadowFox",
    "GhostByte",
    "NightSpider",
    "DarkRoot",
    "ZeroTrace",
    "CyberWolf",
    "SilentMask",
    "BlackFalcon"

];

const ips = [

    "185.201.12.88",
    "103.74.21.54",
    "91.202.44.71",
    "194.61.100.25",
    "178.120.55.81",
    "45.88.201.9",
    "103.221.88.15"

];

const countries = [

    "Campuchia",
    "Singapore",
    "Malaysia",
    "Hong Kong",
    "Thái Lan",
    "Việt Nam (VPN)",
    "Không xác định"

];

// ================================
// HÀM LẤY NGẪU NHIÊN
// ================================

function randomItem(array){

    return array[Math.floor(Math.random()*array.length)];

}

// ================================
// CẬP NHẬT THANH TIẾN TRÌNH
// ================================

function updateProgress(){

    const percent =
        (currentIndex / tasks.length) * 100;

    progressBar.style.width = percent + "%";

}

// ================================
// KHỞI TẠO
// ================================

function initialize(){

    totalTask.textContent = tasks.length;

    currentTask.textContent = 1;

    scoreText.textContent = 0;

    progressBar.style.width = "0%";

}

// ================================
// BẮT ĐẦU TRÒ CHƠI
// ================================

startBtn.addEventListener("click",()=>{

    home.classList.add("hidden");

    game.classList.remove("hidden");

    initialize();

    loadTask();

});
// ================================
// HIỂN THỊ TASK
// ================================

function loadTask(){

    answered = false;

    nextBtn.classList.add("hidden");

    statusText.className = "";
    statusText.textContent = "";

    updateProgress();

    const task = tasks[currentIndex];

    currentTask.textContent = currentIndex + 1;

    question.innerHTML =
        "<small>" + task.title + "</small><br><br>" +
        task.question.replace(/\n/g,"<br>");

    answers.innerHTML = "";

    task.options.forEach((option,index)=>{

        const button = document.createElement("button");

        button.className = "answer";

        button.innerHTML = option;

        button.addEventListener("click",()=>{

            checkAnswer(index);

        });

        answers.appendChild(button);

    });

}

// ================================
// VÔ HIỆU HÓA ĐÁP ÁN
// ================================

function disableAnswers(){

    document
        .querySelectorAll(".answer")
        .forEach(button=>{

            button.disabled = true;

        });

}

// ================================
// ĐÁNH DẤU ĐÁP ÁN ĐÚNG
// ================================

function highlightCorrectAnswer(){

    const buttons =
        document.querySelectorAll(".answer");

    buttons.forEach((button,index)=>{

        if(index===tasks[currentIndex].answer){

            button.classList.add("correct");

        }

    });

}

// ================================
// ĐÁNH DẤU ĐÁP ÁN NGƯỜI CHƠI
// ================================

function highlightSelectedAnswer(index){

    const buttons =
        document.querySelectorAll(".answer");

    if(index===tasks[currentIndex].answer){

        buttons[index].classList.add("correct");

    }else{

        buttons[index].classList.add("wrong");

    }

}

// ================================
// KIỂM TRA ĐÁP ÁN
// ================================

function checkAnswer(selectedIndex){

    if(answered) return;

    answered = true;

    disableAnswers();

    highlightSelectedAnswer(selectedIndex);

    highlightCorrectAnswer();

    statusText.className = "trace";

    statusText.textContent =
        "🔍 Đang phân tích dấu vết...";

    setTimeout(()=>{

        showAnswerResult(selectedIndex);

    },1000);

}
// ================================
// HIỂN THỊ KẾT QUẢ TASK
// ================================

function showAnswerResult(selectedIndex){

    const task = tasks[currentIndex];

    // Trả lời đúng
    if(selectedIndex === task.answer){

        score++;

        scoreText.textContent = score;

        statusText.className = "success";

        statusText.innerHTML = `
            ✅ Truy vết thành công
            <br><br>
            <small>${task.explain}</small>
        `;

    }

    // Trả lời sai
    else{

        statusText.className = "fail";

        statusText.innerHTML = `
            ❌ Truy vết thất bại
            <br><br>
            <small>${task.explain}</small>
        `;

    }

    nextBtn.classList.remove("hidden");

}

// ================================
// NÚT TIẾP TỤC
// ================================

nextBtn.addEventListener("click",()=>{

    currentIndex++;

    // Hết nhiệm vụ
    if(currentIndex >= tasks.length){

        showResult();

        return;

    }

    loadTask();

});
// ================================
// HIỂN THỊ KẾT QUẢ CUỐI
// ================================

function showResult(){

    game.classList.add("hidden");

    result.classList.remove("hidden");

    // Hoàn thành thanh tiến trình

    progressBar.style.width = "100%";

    // Dữ liệu mô phỏng

    alias.textContent = randomItem(aliases);

    ip.textContent = randomItem(ips);

    country.textContent = randomItem(countries);

    // Điểm

    finalScore.textContent =
        score + " / " + tasks.length;

    // Xếp hạng

    let text = "";

    if(score === tasks.length){

        text =
        "🏆 Chuyên gia An ninh mạng";

    }

    else if(score >= 8){

        text =
        "🥇 Điều tra viên cao cấp";

    }

    else if(score >= 6){

        text =
        "🥈 Điều tra viên";

    }

    else if(score >= 4){

        text =
        "🥉 Thực tập sinh SOC";

    }

    else{

        text =
        "📖 Cần luyện tập thêm";

    }

    rank.textContent = text;

}

// ================================
// RESET GAME
// ================================

function resetGame(){

    currentIndex = 0;

    score = 0;

    answered = false;

    scoreText.textContent = "0";

    progressBar.style.width = "0%";

}

// ================================
// KHỞI ĐỘNG
// ================================

initialize();

console.log(
    "Cyber Trace System v2.0 loaded."
);
