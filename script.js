//===========================
// HÀNH TRÌNH TRUY VẾT
//===========================

const home=document.getElementById("home");
const game=document.getElementById("game");
const result=document.getElementById("result");

const startBtn=document.getElementById("startBtn");

const question=document.getElementById("question");
const answers=document.getElementById("answers");

const statusText=document.getElementById("status");
const nextBtn=document.getElementById("nextBtn");

const currentTask=document.getElementById("currentTask");
const totalTask=document.getElementById("totalTask");

const scoreText=document.getElementById("score");

const progress=document.getElementById("progressBar");

const alias=document.getElementById("alias");
const ip=document.getElementById("ip");
const country=document.getElementById("country");

const finalScore=document.getElementById("finalScore");
const rank=document.getElementById("rank");

let index=0;
let score=0;

totalTask.innerText=tasks.length;

//===========================
// DỮ LIỆU MÔ PHỎNG
//===========================

const aliases=[

"ShadowFox",

"DarkWolf",

"GhostByte",

"NightSpider",

"ZeroTrace",

"BlackRoot",

"SilentMask",

"CyberGhost"

];

const ips=[

"185.201.12.88",

"103.74.21.54",

"91.201.44.12",

"178.12.44.199",

"194.11.56.90",

"103.221.88.15"

];

const countries=[

"Campuchia",

"Việt Nam (VPN)",

"Singapore",

"Hong Kong",

"Malaysia",

"Thái Lan"

];

//===========================

startBtn.onclick=()=>{

home.classList.add("hidden");

game.classList.remove("hidden");

loadTask();

};

//===========================

function loadTask(){

statusText.innerHTML="";

statusText.className="";

nextBtn.classList.add("hidden");

currentTask.innerText=index+1;

progress.style.width=((index)/tasks.length)*100+"%";

const task=tasks[index];

question.innerHTML=task.question.replace(/\n/g,"<br>");

answers.innerHTML="";

task.options.forEach((option,i)=>{

const btn=document.createElement("button");

btn.className="answer";

btn.innerHTML=option;

btn.onclick=()=>check(btn,i);

answers.appendChild(btn);

});

}

//===========================

function check(button,choose){

const task=tasks[index];

const all=document.querySelectorAll(".answer");

all.forEach(btn=>btn.disabled=true);

statusText.className="trace";

statusText.innerHTML="🔍 Đang truy vết...";

setTimeout(()=>{

if(choose===task.answer){

button.classList.add("correct");

score++;

scoreText.innerText=score;

statusText.className="success";

statusText.innerHTML="✅ Truy vết thành công";

}else{

button.classList.add("wrong");

all[task.answer].classList.add("correct");

statusText.className="fail";

statusText.innerHTML="❌ Truy vết thất bại";

}

nextBtn.classList.remove("hidden");

},800);

}

//===========================

nextBtn.onclick=()=>{

index++;

if(index>=tasks.length){

showResult();

}else{

loadTask();

}

};

//===========================

function randomItem(array){

return array[Math.floor(Math.random()*array.length)];

}

//===========================

function showResult(){

game.classList.add("hidden");

result.classList.remove("hidden");

progress.style.width="100%";

alias.innerText=randomItem(aliases);

ip.innerText=randomItem(ips);

country.innerText=randomItem(countries);

finalScore.innerText=score+" / "+tasks.length;

let text="";

if(score==tasks.length){

text="★★★★★ Chuyên gia truy vết";

}

else if(score>=8){

text="★★★★☆ Điều tra viên cao cấp";

}

else if(score>=6){

text="★★★☆☆ Có kiến thức khá";

}

else if(score>=4){

text="★★☆☆☆ Cần luyện thêm";

}

else{

text="★☆☆☆☆ Người mới";

}

rank.innerText=text;

}
