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

const alias = document.getElementById("alias");
const ip = document.getElementById("ip");
const country = document.getElementById("country");
const finalScore = document.getElementById("finalScore");
const rank = document.getElementById("rank");

let currentIndex = 0;
let score = 0;
let answered = false;

const aliases = [

    "phomaiconmelcuoi",
    "phomaiconmelcuoi",
    "phomaiconmelcuoi",
    "phomaiconmelcuoi",
    "phomaiconmelcuoi",
    "phomaiconmelcuoi",
    "phomaiconmelcuoi",
    "saygex69"

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

function randomItem(array){

    return array[Math.floor(Math.random()*array.length)];

}

function updateProgress(){

    const percent =
        (currentIndex / tasks.length) * 100;

    progressBar.style.width = percent + "%";

}

function initialize(){

    totalTask.textContent = tasks.length;

    currentTask.textContent = 1;

    scoreText.textContent = 0;

    progressBar.style.width = "0%";

}

startBtn.addEventListener("click",()=>{

    home.classList.add("hidden");

    game.classList.remove("hidden");

    initialize();

    loadTask();

});

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

function disableAnswers(){

    document
        .querySelectorAll(".answer")
        .forEach(button=>{

            button.disabled = true;

        });

}

function highlightCorrectAnswer(){

    const buttons =
        document.querySelectorAll(".answer");

    buttons.forEach((button,index)=>{

        if(index===tasks[currentIndex].answer){

            button.classList.add("correct");

        }

    });

}

function highlightSelectedAnswer(index){

    const buttons =
        document.querySelectorAll(".answer");

    if(index===tasks[currentIndex].answer){

        buttons[index].classList.add("correct");

    }else{

        buttons[index].classList.add("wrong");

    }

}

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

function showAnswerResult(selectedIndex){

    const task = tasks[currentIndex];

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

nextBtn.addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex >= tasks.length){

        showResult();

        return;

    }

    loadTask();

});

function showResult(){

    game.classList.add("hidden");

    result.classList.remove("hidden");

    progressBar.style.width = "100%";

    alias.textContent = randomItem(aliases);

    ip.textContent = randomItem(ips);

    country.textContent = randomItem(countries);

    finalScore.textContent =
        score + " / " + tasks.length;

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

function resetGame(){

    currentIndex = 0;

    score = 0;

    answered = false;

    scoreText.textContent = "0";

    progressBar.style.width = "0%";

}

initialize();

console.log(
    "Cyber Trace System v2.0 loaded."
);
