/*======================================================
Cyber Trace Simulator v1.4
script.js
Part 4.1
======================================================*/

/* =========================
   GLOBAL VARIABLES
========================= */

const screens = {
    home: document.getElementById("homeScreen"),
    dashboard: document.getElementById("dashboardScreen"),
    module: document.getElementById("moduleScreen"),
    report: document.getElementById("reportScreen")
};

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const backBtn = document.getElementById("backBtn");

const moduleTitle = document.getElementById("moduleTitle");
const moduleContent = document.getElementById("moduleContent");

const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progressBar");

/* =========================
   MODULE ORDER
========================= */

const moduleOrder = [
    "email",
    "url",
    "whois",
    "dns",
    "ip",
    "log",
    "metadata",
    "osint",
    "timeline"
];

/* =========================
   GAME STATE
========================= */

let game = {

    score: 0,

    completed: 0,

    currentModule: null,

    currentQuestion: 0,

    unlocked: 1,

    evidence: []

};

/* =========================
   SHOW SCREEN
========================= */

function showScreen(name){

    Object.values(screens).forEach(screen=>{

        screen.classList.remove("active");

    });

    screens[name].classList.add("active");

}

/* =========================
   UPDATE SCORE
========================= */

function updateScore(){

    scoreElement.textContent = game.score;

}

/* =========================
   UPDATE PROGRESS
========================= */

function updateProgress(){

    const percent =
        (game.completed / moduleOrder.length) * 100;

    progressBar.style.width = percent + "%";

}

/* =========================
   RESET GAME
========================= */

function resetGame(){

    game.score = 0;

    game.completed = 0;

    game.currentModule = null;

    game.currentQuestion = 0;

    game.unlocked = 1;

    game.evidence = [];

    updateScore();

    updateProgress();

}

/* =========================
   START GAME
========================= */

function startGame(){

    resetGame();

    unlockModules();

    showScreen("dashboard");

}

/* =========================
   DASHBOARD
========================= */

function unlockModules(){

    const buttons =
        document.querySelectorAll(".module");

    buttons.forEach((button,index)=>{

        button.classList.remove(
            "locked",
            "active",
            "completed"
        );

        if(index >= game.unlocked){

            button.classList.add("locked");

        }

    });

}

/* =========================
   MODULE CLICK
========================= */

document
.querySelectorAll(".module")
.forEach((button,index)=>{

    button.addEventListener("click",()=>{

        if(index >= game.unlocked){

            return;

        }

        const moduleName =
            button.dataset.module;

        openModule(moduleName);

    });

});

/* =========================
   BUTTON EVENTS
========================= */

startBtn.addEventListener("click",startGame);

restartBtn.addEventListener("click",()=>{

    location.reload();

});

backBtn.addEventListener("click",()=>{

    showScreen("dashboard");

});

/* =========================
   PLACEHOLDER
========================= */

/*
Các hàm dưới đây sẽ được
cài đặt ở Phần 4.2

- openModule()
- renderQuestion()
- renderAnswers()
- nextQuestion()

*/
/*======================================================
Part 4.2
MODULE ENGINE
======================================================*/

/* =========================
   OPEN MODULE
========================= */

function openModule(moduleName){

    game.currentModule = moduleName;

    game.currentQuestion = 0;

    showScreen("module");

    const title =
        moduleName.charAt(0).toUpperCase() +
        moduleName.slice(1);

    moduleTitle.textContent = title;
    highlightModule();
    renderQuestion();

}

/* =========================
   GET QUESTIONS
========================= */

function getCurrentQuestions(){

    return CASE_DATA.modules[game.currentModule] || [];

}

/* =========================
   RENDER QUESTION
========================= */

function renderQuestion(){

    const questions = getCurrentQuestions();

    if(game.currentQuestion >= questions.length){

        finishModule();

        return;

    }

    const q = questions[game.currentQuestion];

    let html = "";

    html += `
        <div class="question-card">

            <h3>${q.title}</h3>

            <p>${q.question}</p>

            <div
                class="answers"
                id="answers">

            </div>

            <div
                class="status"
                id="status">

            </div>

        </div>
    `;

    moduleContent.innerHTML = html;

    renderAnswers(q);

}

/* =========================
   RENDER ANSWERS
========================= */

function renderAnswers(question){

    const container =
        document.getElementById("answers");

    question.options.forEach((text,index)=>{

        const button =
            document.createElement("button");

        button.className = "answer";

        button.textContent = text;

        button.addEventListener("click",()=>{

            answerQuestion(
                index,
                question,
                button
            );

        });

        container.appendChild(button);

    });

}

/* =========================
   LOCK ANSWERS
========================= */

function lockAnswers(){

    document
        .querySelectorAll(".answer")
        .forEach(button=>{

            button.disabled = true;

        });

}

/* =========================
   NEXT QUESTION
========================= */

function nextQuestion(){

    game.currentQuestion++;

    renderQuestion();

}

/* =========================
   STATUS
========================= */

function setStatus(message,success){

    const status =
        document.getElementById("status");

    status.textContent = message;

    status.className =
        success
        ? "status success"
        : "status fail";

}
/*======================================================
Part 4.3
ANSWER ENGINE
======================================================*/

/* =========================
   ANSWER QUESTION
========================= */

function answerQuestion(index, question, button){

    lockAnswers();

    const answers =
        document.querySelectorAll(".answer");

    const correct =
        question.answer;

    answers.forEach((item,i)=>{

        if(i===correct){

            item.classList.add("correct");

        }

    });

    if(index===correct){

        button.classList.add("correct");

        game.score += 10;

        game.evidence.push({

            module:game.currentModule,

            title:question.title

        });

        updateScore();

        setStatus(

            question.success ||

            "✔ Truy vết thành công",

            true

        );

    }

    else{

        button.classList.add("wrong");

        setStatus(

            question.fail ||

            "✖ Truy vết thất bại",

            false

        );

    }

    setTimeout(()=>{

        nextQuestion();

    },1500);

}

/* =========================
   FINISH MODULE
========================= */

function finishModule(){

    game.completed++;

    updateProgress();

    completeCurrentModule();

    unlockNextModule();

    showScreen("dashboard");

}

/* =========================
   COMPLETE MODULE
========================= */

function completeCurrentModule(){

    document
    .querySelectorAll(".module")
    .forEach(button=>{

        if(

            button.dataset.module===

            game.currentModule

        ){

            button.classList.remove("active");

            button.classList.add("completed");

        }

    });

}

/* =========================
   UNLOCK NEXT
========================= */

function unlockNextModule(){

    if(

        game.unlocked <

        moduleOrder.length

    ){

        game.unlocked++;

    }

    unlockModules();

    checkCaseFinished();

}

/* =========================
   CHECK CASE
========================= */

function checkCaseFinished(){

    if(

        game.completed >=

        moduleOrder.length

    ){

        showReport();

    }

}

/* =========================
   ACTIVE MODULE
========================= */

function highlightModule(){

    document
    .querySelectorAll(".module")
    .forEach(button=>{

        button.classList.remove("active");

        if(

            button.dataset.module===

            game.currentModule

        ){

            button.classList.add("active");

        }

    });

}
/*======================================================
Part 4.4
UTILITY + TOAST + EVIDENCE
======================================================*/

/* =========================
   TOAST
========================= */

function showToast(message,type="info"){

    const old=document.querySelector(".toast");

    if(old){
        old.remove();
    }

    const toast=document.createElement("div");

    toast.className="toast";

    switch(type){

        case "success":
            toast.style.borderColor="#2aff9b";
            break;

        case "error":
            toast.style.borderColor="#ff5d5d";
            break;

        default:
            toast.style.borderColor="#39d8ff";

    }

    toast.textContent=message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },2500);

}

/* =========================
   LOADING
========================= */

function showLoading(){

    moduleContent.innerHTML=`

        <div class="terminal">

            <div class="terminal-top">

                <div class="dot red"></div>

                <div class="dot yellow"></div>

                <div class="dot green"></div>

            </div>

            <div class="terminal-body">

                Đang phân tích dữ liệu...

                <div class="loader">

                    <span></span>

                </div>

            </div>

        </div>

    `;

}

/* =========================
   EVIDENCE
========================= */

function renderEvidenceBoard(){

    if(game.evidence.length===0){

        return `
            <p>Chưa có bằng chứng.</p>
        `;

    }

    let html='<div class="evidence-board">';

    game.evidence.forEach(item=>{

        html+=`

        <div class="evidence">

            <h4>${item.module.toUpperCase()}</h4>

            <small>${item.title}</small>

        </div>

        `;

    });

    html+='</div>';

    return html;

}

/* =========================
   TERMINAL MESSAGE
========================= */

function terminalMessage(text){

    return `

    <div class="terminal">

        <div class="terminal-top">

            <div class="dot red"></div>

            <div class="dot yellow"></div>

            <div class="dot green"></div>

        </div>

        <div class="terminal-body">

${text}

        </div>

    </div>

    `;

}

/* =========================
   MODULE TITLE
========================= */

const moduleNames={

email:"Email Forensics",

url:"URL Analysis",

whois:"WHOIS",

dns:"DNS Analysis",

ip:"IP Intelligence",

log:"Log Analysis",

metadata:"Metadata",

osint:"OSINT",

timeline:"Timeline"

};

/* =========================
   UPDATE TITLE
========================= */

function updateModuleTitle(){

    moduleTitle.textContent=

        moduleNames[game.currentModule] ||

        game.currentModule;

}

/* =========================
   OVERRIDE
========================= */

const oldOpenModule=openModule;

openModule=function(moduleName){

    showLoading();

    setTimeout(()=>{

        oldOpenModule(moduleName);

        updateModuleTitle();

        showToast(

            "Đã mở module " +

            moduleNames[moduleName],

            "success"

        );

    },600);

};

/* =========================
   CASE INFORMATION
========================= */

function getCaseInfo(){

    return CASE_DATA.caseInfo;

}

/* =========================
   SCORE PERCENT
========================= */

function getAccuracy(){

    const totalQuestions=

        game.completed*3+

        game.currentQuestion;

    if(totalQuestions<=0){

        return 0;

    }

    return Math.round(

        game.score/

        (totalQuestions*10)

        *100

    );

}

/* =========================
   RANK
========================= */

function getRank(){

    if(game.score>=240){

        return "S";

    }

    if(game.score>=200){

        return "A";

    }

    if(game.score>=150){

        return "B";

    }

    if(game.score>=100){

        return "C";

    }

    return "D";

}
/*======================================================
Part 4.5
REPORT ENGINE
======================================================*/

/* =========================
   SHOW REPORT
========================= */

function showReport(){

    showScreen("report");

    const info = getCaseInfo();

    document.getElementById("alias").textContent =
        info.alias;

    document.getElementById("criminalIP").textContent =
        info.ip;

    document.getElementById("country").textContent =
        info.country;

    document.getElementById("technique").textContent =
        info.technique;

    document.getElementById("finalScore").textContent =
        game.score;

    const evidenceElement =
        document.getElementById("evidenceCount");

    if(evidenceElement){

        evidenceElement.textContent =
            game.evidence.length;

    }

    createReportExtra();

}

/* =========================
   REPORT EXTRA
========================= */

function createReportExtra(){

    const report =
        document.querySelector(".report-card");

    let old =
        document.getElementById("extraReport");

    if(old){

        old.remove();

    }

    const div =
        document.createElement("div");

    div.id = "extraReport";

    div.innerHTML = `

        <hr>

        <h2>KẾT QUẢ ĐIỀU TRA</h2>

        <p>

        <strong>Xếp hạng:</strong>

        ${getRank()}

        </p>

        <p>

        <strong>Độ chính xác:</strong>

        ${getAccuracy()}%

        </p>

        <p>

        <strong>Bằng chứng thu thập:</strong>

        ${game.evidence.length}

        </p>

        <br>

        <h3>Evidence Board</h3>

        ${renderEvidenceBoard()}

    `;

    report.insertBefore(

        div,

        restartBtn

    );

}

/* =========================
   SAVE RESULT
========================= */

function saveResult(){

    const result = {

        score: game.score,

        evidence: game.evidence,

        rank: getRank(),

        accuracy: getAccuracy(),

        date: new Date().toLocaleString()

    };

    localStorage.setItem(

        "CyberTraceResult",

        JSON.stringify(result)

    );

}

/* =========================
   LOAD RESULT
========================= */

function loadResult(){

    const data =

        localStorage.getItem(

            "CyberTraceResult"

        );

    if(!data){

        return null;

    }

    return JSON.parse(data);

}

/* =========================
   REPORT OVERRIDE
========================= */

const oldShowReport = showReport;

showReport = function(){

    saveResult();

    oldShowReport();

    showToast(

        "Hoàn thành điều tra!",

        "success"

    );

}

/* =========================
   RESTART
========================= */

restartBtn.addEventListener(

    "click",

    ()=>{

        localStorage.removeItem(

            "CyberTraceResult"

        );

        location.reload();

    }

);

/* =========================
   STARTUP
========================= */

window.addEventListener(

    "load",

    ()=>{

        updateScore();

        updateProgress();

        unlockModules();

    }

);
