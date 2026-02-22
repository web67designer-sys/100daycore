<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>100 Days Core</title>

<style>
body{
margin:0;
font-family:Segoe UI, sans-serif;
background:#0f0f14;
color:white;
text-align:center;
}

.container{
max-width:520px;
margin:auto;
padding:20px;
}

.card{
background:#1c1c24;
padding:20px;
border-radius:20px;
margin-top:20px;
box-shadow:0 0 20px rgba(0,0,0,0.4);
}

button{
padding:12px;
border:none;
border-radius:12px;
margin-top:10px;
cursor:pointer;
font-weight:bold;
background:linear-gradient(45deg,#7c3aed,#2563eb);
color:white;
width:100%;
}

input,select{
padding:10px;
border-radius:10px;
border:none;
margin:5px 0;
width:100%;
}

.avatar{
width:160px;
margin:15px auto;
transition:0.3s;
}

.glow{
filter:drop-shadow(0 0 20px #7c3aed);
}

.fireAura{
filter:drop-shadow(0 0 30px orange);
}

.task{
background:#252532;
padding:10px;
border-radius:10px;
margin:8px 0;
}

.store-item{
background:#252532;
padding:10px;
border-radius:10px;
margin:8px 0;
}

.leaderboard-item{
background:#2b2b38;
padding:8px;
border-radius:8px;
margin:5px 0;
}
</style>
</head>

<body>
<div class="container">

<h1>🔥 100 Days Core</h1>

<div id="onboarding" class="card">
<input id="name" placeholder="Name">
<input id="age" placeholder="Age">
<select id="goal">
<option value="muscle">Build Muscle</option>
<option value="study">Study Focus</option>
<option value="discipline">Discipline</option>
<option value="general">General Growth</option>
</select>

<select id="avatarSelect">
<option value="male">Male Avatar</option>
<option value="female">Female Avatar</option>
</select>

<button onclick="startJourney()">Start Journey</button>
</div>

<div id="dashboard" style="display:none">

<img id="avatarImage" class="avatar">

<div class="card">
<h3>Stats</h3>
<p>Level: <span id="level">1</span></p>
<p>XP: <span id="xp">0</span></p>

<div style="background:#2b2b38;border-radius:10px;height:10px;">
<div id="xpBar" style="height:10px;width:0%;background:linear-gradient(90deg,#7c3aed,#2563eb);border-radius:10px;"></div>
</div>

<p>Coins: <span id="coins">0</span></p>
<p>Streak: 🔥 <span id="streak">0</span></p>
<p>Badge: <span id="badge">Rookie</span></p>
</div>

<div class="card">
<h3>Daily Tasks</h3>
<div id="tasks"></div>
<button onclick="completeDay()">Complete Day</button>
</div>

<div class="card">
<h3>Store</h3>
<div id="store"></div>
<button onclick="buyPremium()">Unlock Premium</button>
</div>

<div class="card">
<h3>Inventory</h3>
<div id="inventory"></div>
</div>

<div class="card">
<h3>Leaderboard</h3>
<div id="leaderboard"></div>
</div>

</div>
</div>

<script>
let userId=localStorage.getItem("userId");
let avatarType=localStorage.getItem("avatar");

function generateId(){
return"user_"+Math.random().toString(36).substr(2,9);
}

function getTodayDay(){
const start=localStorage.getItem("startDate");
if(!start){
localStorage.setItem("startDate",new Date().toISOString());
return 1;
}
return Math.floor((new Date()-new Date(start))/(1000*60*60*24))+1;
}

function loadAvatar(type){
const avatar=document.getElementById("avatarImage");
avatar.src=type==="female"
?"https://i.imgur.com/8Km9tLL.png"
:"https://i.imgur.com/4AiXzf8.png";
}

function applyLevelEffects(level){
const avatar=document.getElementById("avatarImage");
avatar.classList.remove("glow","fireAura");
if(level>=10)avatar.classList.add("fireAura");
else if(level>=5)avatar.classList.add("glow");
}

function updateXPBar(level,xp){
const needed=level*200;
document.getElementById("xpBar").style.width=(xp/needed*100)+"%";
}

function showLevelUp(){
const div=document.createElement("div");
div.innerHTML="🎉 LEVEL UP!";
div.style.position="fixed";
div.style.top="40%";
div.style.left="50%";
div.style.transform="translate(-50%,-50%)";
div.style.fontSize="30px";
div.style.background="#7c3aed";
div.style.padding="20px";
div.style.borderRadius="20px";
document.body.appendChild(div);
setTimeout(()=>div.remove(),2000);
}

async function startJourney(){
userId=generateId();
localStorage.setItem("userId",userId);
avatarType=document.getElementById("avatarSelect").value;
localStorage.setItem("avatar",avatarType);

await fetch("/.netlify/functions/core",{
method:"POST",
body:JSON.stringify({
userId,
name:document.getElementById("name").value,
age:document.getElementById("age").value,
goal:document.getElementById("goal").value,
avatar:avatarType
})
});

document.getElementById("onboarding").style.display="none";
document.getElementById("dashboard").style.display="block";

loadAvatar(avatarType);
loadTasks();
loadStore();
}

async function loadTasks(){
const res=await fetch("/.netlify/functions/core",{method:"POST",
body:JSON.stringify({userId,type:"get_tasks"})});
const data=await res.json();
const container=document.getElementById("tasks");
container.innerHTML="";
data.tasks.forEach(t=>{
const div=document.createElement("div");
div.className="task";
div.innerText=t;
container.appendChild(div);
});
}

async function completeDay(){
const today=getTodayDay();
const res=await fetch("/.netlify/functions/core",{method:"POST",
body:JSON.stringify({userId,type:"daily",day:today})});
const data=await res.json();

document.getElementById("level").innerText=data.level;
document.getElementById("xp").innerText=data.xp;
document.getElementById("coins").innerText=data.coins;
document.getElementById("streak").innerText=data.streak;
document.getElementById("badge").innerText=data.badge;

applyLevelEffects(data.level);
updateXPBar(data.level,data.xp);
updateLeaderboard(data.leaderboard);

if(data.xp===0)showLevelUp();
}

function updateLeaderboard(list){
const lb=document.getElementById("leaderboard");
lb.innerHTML="";
list.forEach(u=>{
const div=document.createElement("div");
div.className="leaderboard-item";
div.innerText=u.id+" - "+u.score;
lb.appendChild(div);
});
}

async function loadStore(){
const store=document.getElementById("store");
store.innerHTML="";

const items=[
{id:"basic_shirt",price:0},
{id:"elite_hoodie",price:200},
{id:"legend_armor",price:500}
];

items.forEach(item=>{
const div=document.createElement("div");
div.className="store-item";
div.innerHTML=item.id+" - "+item.price+" coins";
const btn=document.createElement("button");
btn.innerText="Buy";
btn.onclick=()=>purchase(item.id);
div.appendChild(btn);
store.appendChild(div);
});
}

async function purchase(id){
const res=await fetch("/.netlify/functions/core",{method:"POST",
body:JSON.stringify({userId,type:"purchase",itemId:id})});
const data=await res.json();
if(data.inventory)loadInventory(data.inventory);
}

function loadInventory(list){
const inv=document.getElementById("inventory");
inv.innerHTML="";
list.forEach(i=>{
const div=document.createElement("div");
div.className="store-item";
div.innerText=i;
inv.appendChild(div);
});
}

async function buyPremium(){
await fetch("/.netlify/functions/core",{method:"POST",
body:JSON.stringify({userId,type:"buy_premium"})});
alert("Premium Unlocked");
}

window.onload=function(){
if(userId){
document.getElementById("onboarding").style.display="none";
document.getElementById("dashboard").style.display="block";
loadAvatar(avatarType);
loadTasks();
loadStore();
}
};
</script>

</body>
</html>
