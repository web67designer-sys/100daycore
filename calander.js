<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🔥 100 Day AI PRO MAX ULTRA - Gen Z Edition</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
<style>
body{
  margin:0;
  font-family:'Poppins',sans-serif;
  background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);
  color:white;
}
.container{
  max-width:900px;
  margin:auto;
  padding:20px;
  position:relative;
}
h2,h3,h4{margin:8px 0;}
.card{
  background:rgba(255,255,255,0.08);
  padding:20px;
  border-radius:20px;
  margin-top:20px;
  backdrop-filter:blur(12px);
  box-shadow: 0 0 15px rgba(0,0,0,0.3);
  transition: transform 0.3s;
}
.card:hover{transform:translateY(-3px);}
button,input,select,textarea{
  width:100%;
  padding:12px;
  margin-top:10px;
  border-radius:12px;
  border:none;
  font-size:15px;
  outline:none;
}
button{
  background:#ff416c;
  color:white;
  font-weight:bold;
  cursor:pointer;
  transition:all 0.2s;
}
button:hover{
  transform:scale(1.02);
  opacity:0.95;
}
.statusBar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-top:10px;
}
#xpBar{
  height:14px;
  background:#222;
  border-radius:10px;
  overflow:hidden;
  margin-top:10px;
  box-shadow: 0 0 6px #00f260 inset, 0 0 6px #0575e6 inset;
}
#xpFill{
  height:100%;
  width:0%;
  background:linear-gradient(90deg,#00f260,#0575e6);
  transition:width 0.6s ease;
}
.badge{
  display:inline-block;
  background:#ffcc00;
  color:black;
  padding:6px 12px;
  border-radius:20px;
  font-size:12px;
  margin:5px 5px 0 0;
  box-shadow:0 0 4px #ffcc00;
  transition: transform 0.2s;
}
.badge:hover{transform:scale(1.1);}
.notification{
  position:fixed;
  right:10px;
  top:40%;
  background:#00c853;
  padding:14px;
  border-radius:12px;
  display:none;
  font-weight:bold;
  z-index:999;
  box-shadow:0 0 10px #00c853;
}
.taskItem input{margin-right:10px; transform:scale(1.2);}
.aiBox{
  margin-top:10px;
  display:flex;
  gap:5px;
}
.aiInput{flex:1; padding:10px; border-radius:10px;}
.aiButton{width:80px; background:#00f260; color:#000; font-weight:bold; transition:all 0.2s;}
.aiButton:hover{transform:scale(1.05);}
#aiResponse{
  margin-top:10px;
  background:rgba(0,0,0,0.3);
  padding:12px;
  border-radius:12px;
  min-height:50px;
  font-style:italic;
}
.grid{
  display:grid;
  grid-template-columns:repeat(10,1fr);
  gap:10px;
  margin-top:20px;
}
.dayBox{
  background:rgba(255,255,255,0.08);
  padding:15px;
  text-align:center;
  border-radius:12px;
  cursor:pointer;
  transition:0.2s;
}
.dayBox:hover{
  transform:scale(1.05);
  background:rgba(255,255,255,0.15);
}
.tasksModal{
  position:fixed;
  top:5%;
  left:50%;
  transform:translateX(-50%);
  width:95%;
  max-width:900px;
  background:rgba(0,0,0,0.85);
  padding:20px;
  border-radius:20px;
  display:none;
  z-index:999;
  max-height:90%;
  overflow-y:auto;
}
.closeBtn{
  float:right;
  cursor:pointer;
  font-weight:bold;
  color:#ff416c;
}
.tasksGrid{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:10px;
  margin-top:15px;
}
</style>
</head>
<body>

<div class="container">
<h2>🔥 100 Day AI PRO MAX ULTRA - Gen Z Edition</h2>

<!-- Setup -->
<div id="setup" class="card">
<input id="nameInput" placeholder="Your Name">
<input id="ageInput" type="number" placeholder="Your Age">
<select id="goalInput">
<option value="">Select Goal</option>
<option value="weight loss">Weight Loss</option>
<option value="muscle gain">Muscle Gain</option>
<option value="healthy lifestyle">Healthy Lifestyle</option>
<option value="productivity">Productivity</option>
</select>
<select id="personalityInput">
<option value="hardcore">Hardcore 🔥</option>
<option value="balanced">Balanced ⚖️</option>
<option value="chill">Chill 🌿</option>
</select>
<button onclick="startApp()">Start Challenge</button>
</div>

<!-- App -->
<div id="app" style="display:none;">
<div class="card">
<div class="statusBar">
  <div>🔥 Streak: <span id="streakText"></span></div>
  <div>⭐ XP: <span id="xpText"></span></div>
</div>

<h3 id="dayText"></h3>

<h4>🏅 Achievements</h4>
<div id="achievements"></div>

<h3>🎯 Daily Task</h3>
<p id="dailyTask">Loading...</p>
<button onclick="completeDay()">Complete Day ✅</button>

<h4>🤖 Ask AI Coach</h4>
<div class="aiBox">
<input id="aiInput" class="aiInput" placeholder="Ask about your tasks...">
<button class="aiButton" onclick="askAI()">Ask</button>
</div>
<div id="aiResponse"></div>

<h4>📅 Calendar</h4>
<div class="grid" id="daysGrid"></div>
</div>
</div>

<div class="tasksModal" id="tasksModal">
  <div><span class="closeBtn" onclick="closeTasks()">✖ Close</span></div>
  <h3 id="modalDay">Day 1 Tasks</h3>
  <div class="tasksGrid" id="tasksList"></div>
</div>

<div id="notify" class="notification"></div>

<audio id="levelSound" src="https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3"></audio>
<audio id="completeSound" src="https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3"></audio>

<script>
// ==== User Data ====
function getData(){
  let d = JSON.parse(localStorage.getItem("ultraAI"));
  if(!d){
    d = {name:"",age:"",goal:"",personality:"",day:1,streak:0,xp:0,level:1,history:[],achievements:[],lastComplete:0};
  }
  return d;
}
function saveData(d){ localStorage.setItem("ultraAI", JSON.stringify(d)); }

// ==== Start App ====
function startApp(){
  let d = getData();
  d.name = nameInput.value.trim();
  d.age = ageInput.value.trim();
  d.goal = goalInput.value;
  d.personality = personalityInput.value;
  saveData(d);
  setup.style.display="none";
  app.style.display="block";
  loadApp();
  generateDailyTask();
  renderCalendar();
}

// ==== Load UI ====
function loadApp(){
  let d = getData();
  dayText.innerText = `Day ${d.day} • Level ${d.level}`;
  streakText.innerText = d.streak;
  xpText.innerText = d.xp;
  renderAchievements();
}

// ==== Achievements ====
function unlockAchievements(d){
  const awards = {7:"7 Day Warrior",30:"30 Day Beast",100:"100 Day Legend"};
  if(awards[d.day] && !d.achievements.includes(awards[d.day])){ d.achievements.push(awards[d.day]); }
}
function renderAchievements(){
  let d = getData();
  achievements.innerHTML = "";
  d.achievements.forEach(a=>{ achievements.innerHTML += `<span class="badge">${a}</span>`; });
}

// ==== Daily Task ====
async function generateDailyTask(){
  let d = getData();
  dailyTask.innerText = "Loading...";
  try{
    const res = await fetch("/.netlify/functions/ai",{
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({type:"daily",goal:d.goal,personality:d.personality,day:d.day,name:d.name})
    });
    const result = await res.json();
    dailyTask.innerText = result.reply || "Stay consistent today 🔥";
  }catch{
    dailyTask.innerText = "Stay consistent today 🔥";
  }
}

// ==== Complete Day ====
function completeDay(){
  let d = getData();
  const now = Date.now();
  const diff = now - d.lastComplete;
  if(diff < 86400000){ showNotify("Come back tomorrow 🔥"); return; }
  if(diff > 172800000) d.streak=0;
  d.day++; d.streak++; d.xp+=50;
  d.history.push(`Day ${d.day} completed`);
  document.getElementById("completeSound").play();
  if(d.xp >= d.level*200){ d.level++; d.xp=0; document.getElementById("levelSound").play(); showNotify("LEVEL UP 🚀"); }
  unlockAchievements(d);
  d.lastComplete = now;
  saveData(d);
  loadApp();
  generateDailyTask();
  renderCalendar();
  showNotify("Great job! 🔥");
}

// ==== AI Coach ====
async function askAI(){
  let q = aiInput.value.trim();
  if(!q) return;
  let d = getData();
  aiResponse.innerText = "Thinking... 🤖";
  try{
    const res = await fetch("/.netlify/functions/ai",{
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({type:"assistant",question:q,goal:d.goal,personality:d.personality,name:d.name})
    });
    const result = await res.json();
    aiResponse.innerText = result.reply || "Stay consistent and focused 🔥";
  }catch(err){
    console.error(err);
    aiResponse.innerText = "AI Coach is not available right now 🔥";
  }
  aiInput.value = "";
}

// ==== Notifications ====
function showNotify(msg){ notify.innerText = msg; notify.style.display="block"; setTimeout(()=>{notify.style.display="none";},2500); }

// ==== Calendar ====
const tasksModal = document.getElementById('tasksModal');
const modalDay = document.getElementById('modalDay');
const tasksList = document.getElementById('tasksList');

const tasksDatabase = {
  "muscle gain":[
    "Train chest 45 mins 💪","Squat 3 sets 🔥","Protein rich meal 🍗","Stretch 15 mins 🧘","Drink 2L water 💧",
    "Deadlift 3 sets 🏋️","Pull-ups 3x10","Track macros 📝","Push-ups 50 reps","Leg press 3 sets",
    "Bicep curls 3x15","Tricep dips 3x15","Shoulder press 3x12","Ab circuit 20 mins","Cardio 20 mins",
    "Lunge 3x12","Calf raises 3x20","Back extensions 3x15","Yoga 15 mins","Foam roll 10 mins",
    "Chest fly 3x12","Incline bench press 3x12","Dumbbell rows 3x12","Kettlebell swings 15","Resistance bands 10 min",
    "Pull-up holds 30s","Medicine ball slams 15","Hamstring curls 3x12","Barbell squats 3x12","Hip thrusts 3x12",
    "Plank 2 min","Russian twists 20","Mountain climbers 30","Burpees 20","Jump rope 5 min",
    "Treadmill incline walk 20","Elliptical 20","Stationary bike 20","Lat pull-down 3x12","Cable rows 3x12",
    "Front raises 3x12","Side lateral raises 3x12","Leg extensions 3x12","Incline push-ups 20","Bodyweight squats 20",
    "TRX rows 12","Dumbbell deadlifts 3x12","Medicine ball throws 15","Single leg deadlift 3x12","Hip abduction 3x15"
  ],
  "weight loss":[
    "30 min cardio 🏃","No junk today 🍔","Drink 2L water 💧","Track calories 📝","Stretch 15 mins 🧘",
    "Walk 10,000 steps 🚶","HIIT 20 min 🔥","Eat vegetables 🥦","No sugar day 🍭","Morning yoga 15 min",
    "Bike 20 min 🚴","Meditate 10 min 🧘","Green smoothie 🍵","Meal prep 🥗","Drink lemon water 🍋",
    "Jump rope 10 min","Step-ups 3x15","Push-ups 20","Plank 1 min","Squat jumps 15",
    "Jog 15 min","Pilates 20 min","Track macros 📝","Drink herbal tea 🍵","Stretch shoulders 10 min",
    "Mountain climbers 30","Burpees 15","Dance 20 min 💃","Foam roll 10 min","Clean eating day",
    "Track water intake 💧","Morning walk 20 min","Push-ups 30","Leg raises 15","Side lunges 15",
    "Tabata 15 min","High knees 1 min","Lunge jumps 15","Ab crunches 20","Resistance bands 10 min",
    "Cardio kickboxing 15","Stair climb 10 min","Bodyweight squats 20","Plank twists 15","Arm circles 2 min",
    "Step-ups 20","Jog 20 min","Healthy snack 🥒","Stretch hamstrings 10 min","Foam roll back 10 min"
  ],
  "healthy lifestyle":[
    "Meditate 15 mins 🧘","Drink 2L water 💧","Walk 5000 steps 🚶","No sugar day 🍭","Eat fruits 🍎",
    "Sleep 7-8 hrs 🛌","Plan tomorrow 📝","Stretch 10 mins 🧘","Read 30 min 📖","Cook healthy meal 🍲",
    "Morning routine ⏰","Journal 10 min 🖊️","Limit screen time 📵","Take supplements 💊","Clean workspace 🗂️",
    "Nature walk 15 min 🌳","Breathing exercises 10 min","Avoid caffeine after 3pm ☕","Digital detox 1 hr","Organize wardrobe 👕",
    "Yoga 20 min 🧘","Gratitude list ✨","Healthy snack 🥑","Drink herbal tea 🍵","Declutter desk 🗄️",
    "Meal prep 🥗","Evening walk 20 min","Stretch shoulders 10 min","Meditate before sleep 🛌","Read health article 📖",
    "Foam roll 10 min","Take vitamins 💊","Drink water first thing 💧","Avoid processed food 🍔","Cook new healthy recipe 🍲",
    "Track sleep 💤","Hydration challenge 💧","Morning sun 10 min ☀️","Plan week meals 📝","Limit sugar day 🍭",
    "Mindful eating 🥗","Stretch 15 min 🧘","Read motivational book 📖","Prepare healthy snacks 🥒","Evening journaling 🖊️",
    "Walk after meals 🚶","Relaxation music 🎵","Stretch hamstrings 10 min","Digital detox evening 📵","Self reflection 10 min 🪞"
  ],
  "productivity":[
    "Deep work 2 hrs 📚","Plan tomorrow 📝","No social media 📵","Finish one task ✅","Organize workspace 🗂️",
    "Read 30 min 📖","Write journal 🖊️","Morning routine ⏰","Pomodoro 4x25min ⏳","Set 3 goals for day 🎯",
    "Email zero inbox 📧","Meeting prep 📝","Declutter desk 🗄️","Prioritize tasks 📝","Review goals 🗂️",
    "Focus on hardest task first 💪","Evening reflection 🖊️","Track time spent ⏱️","Limit distractions 🚫","Morning planning 15 min ⏰",
    "Daily learning 30 min 📚","Review calendar 📅","Batch similar tasks 📌","Delegate 1 task 🧑‍🤝‍🧑","Clean workspace 🗂️",
    "Weekly review 📝","Set top 3 goals 🔝","Track habits 📊","Prepare next day 📝","Avoid multitasking 🚫",
    "Focus sprints 25 min ⏳","Morning exercise 🏃","Evening reading 📖","Organize files 🗂️","Digital detox 📵",
    "Write reflection 🖊️","Review to-do list 📝","Set micro goals 🔹","Plan meals 🥗","Morning meditation 🧘",
    "Evening journaling 🖊️","Breaks every 90 min ⏱️","Track streaks 🔥","Weekly learning review 📚","End of day reflection 🪞",
    "Prioritize 3 tasks 🔝","Clear email inbox 📧","No phone 30 min
