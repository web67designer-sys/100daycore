const app = {
data: {
    name: "",
    email: "user@example.com",
    age: 0,
    gender: "",
    goal: "",
    xp: 0,
    level: 1,
    streak: 0,
    coins: 50,
    day: 1,
    completedDays: [],
    tasks: [],
    completedTasks: [],
    inventory: [],
    equipped: [],
    premium: false,
    premiumType: null // monthly | elite
},

// ================= INIT =================
init() {
    const saved = localStorage.getItem("levelup_user");
    if (saved) {
        this.data = JSON.parse(saved);
        onboarding.classList.add("hidden");
        app.classList.remove("hidden");
        this.updateUI();
        this.generateTasks();
    }
},

save() {
    localStorage.setItem("levelup_user", JSON.stringify(this.data));
},

// ================= BADGES =================
getBadge(level){
    if(level < 5) return "Rookie";
    if(level < 10) return "Warrior";
    if(level < 20) return "Champion";
    return "Legend";
},

// ================= TASK SYSTEM =================
generateTasks(){
    const goalTasks = {
  weightLoss: [
    { task: "Morning 20-min walk", points: 50 },
    { task: "Drink 3L water", points: 50 },
    { task: "No sugar today", points: 50 },
    { task: "30-min cardio", points: 50 },
    { task: "Eat salad with lunch", points: 50 },
    { task: "10k steps", points: 50 },
    { task: "No junk food", points: 50 },
    { task: "Intermittent fasting 16:8", points: 50 },
    { task: "Green tea instead of soda", points: 50 },
    { task: "Home HIIT workout", points: 50 },
    { task: "Track calories", points: 50 },
    { task: "Avoid late night snacks", points: 50 },
    { task: "Stretch 15 mins", points: 50 },
    { task: "Eat high protein meal", points: 50 },
    { task: "Replace rice with veggies", points: 50 },
    { task: "Cycling 30 mins", points: 50 },
    { task: "Swimming session", points: 50 },
    { task: "Leg day workout", points: 50 },
    { task: "Core workout", points: 50 },
    { task: "Reduce carbs today", points: 50 },
    { task: "No fried food", points: 50 },
    { task: "Meal prep healthy food", points: 50 },
    { task: "Morning lemon water", points: 50 },
    { task: "Jogging 25 mins", points: 50 },
    { task: "Jump rope 10 mins", points: 50 },
    { task: "Burpees 3 sets", points: 50 },
    { task: "Wall sits challenge", points: 50 },
    { task: "Plank 3 mins total", points: 50 },
    { task: "Pushups 30 reps", points: 50 },
    { task: "Squats 50 reps", points: 50 },
    { task: "Healthy breakfast", points: 50 },
    { task: "Avoid processed food", points: 50 },
    { task: "Evening walk", points: 50 },
    { task: "Yoga session", points: 50 },
    { task: "Sleep 8 hours", points: 50 },
    { task: "No soft drinks", points: 50 },
    { task: "Eat fruits today", points: 50 },
    { task: "Protein shake instead dessert", points: 50 },
    { task: "Track weight progress", points: 50 },
    { task: "Reduce portion size", points: 50 },
    { task: "Outdoor activity 1hr", points: 50 },
    { task: "Dance workout", points: 50 },
    { task: "Climb stairs instead lift", points: 50 },
    { task: "Drink detox water", points: 50 },
    { task: "Low calorie dinner", points: 50 },
    { task: "Meal without oil", points: 50 },
    { task: "Healthy snack choice", points: 50 },
    { task: "Consistency check", points: 50 },
    { task: "Track body measurements", points: 50 },
    { task: "Weekly progress review", points: 50 }
  ],

  muscleGain: [
    { task: "Chest workout", points: 50 },
    { task: "Back workout", points: 50 },
    { task: "Shoulder workout", points: 50 },
    { task: "Leg workout", points: 50 },
    { task: "Biceps workout", points: 50 },
    { task: "Triceps workout", points: 50 },
    { task: "Deadlift session", points: 50 },
    { task: "Bench press session", points: 50 },
    { task: "Squat session", points: 50 },
    { task: "Pull-ups 3 sets", points: 50 },
    { task: "Pushups 4 sets", points: 50 },
    { task: "Increase protein intake", points: 50 },
    { task: "Protein shake", points: 50 },
    { task: "Progressive overload", points: 50 },
    { task: "Warm up properly", points: 50 },
    { task: "Stretch after workout", points: 50 },
    { task: "Track reps", points: 50 },
    { task: "Track weight lifted", points: 50 },
    { task: "Calorie surplus day", points: 50 },
    { task: "Eggs in breakfast", points: 50 },
    { task: "Chicken meal", points: 50 },
    { task: "Peanut butter snack", points: 50 },
    { task: "Core strength workout", points: 50 },
    { task: "Upper body session", points: 50 },
    { task: "Lower body session", points: 50 },
    { task: "Rest and recovery day", points: 50 },
    { task: "Foam rolling", points: 50 },
    { task: "Hydration check", points: 50 },
    { task: "Good posture practice", points: 50 },
    { task: "Increase dumbbell weight", points: 50 },
    { task: "Barbell training", points: 50 },
    { task: "Resistance band training", points: 50 },
    { task: "Incline pushups", points: 50 },
    { task: "Chin-ups", points: 50 },
    { task: "Farmer carry", points: 50 },
    { task: "Muscle mind connection focus", points: 50 },
    { task: "Healthy carbs meal", points: 50 },
    { task: "Oats breakfast", points: 50 },
    { task: "Milk intake", points: 50 },
    { task: "Track body weight", points: 50 },
    { task: "Check muscle progress pics", points: 50 },
    { task: "Heavy lifting day", points: 50 },
    { task: "Light recovery workout", points: 50 },
    { task: "Abs workout", points: 50 },
    { task: "Glutes workout", points: 50 },
    { task: "Hamstring workout", points: 50 },
    { task: "Calf raises", points: 50 },
    { task: "Forearm workout", points: 50 },
    { task: "Sleep 8 hours", points: 50 },
    { task: "Weekly strength test", points: 50 }
  ],

  healthyLifestyle: [
    { task: "Wake up early", points: 50 },
    { task: "Meditation 10 mins", points: 50 },
    { task: "Deep breathing", points: 50 },
    { task: "Drink water on wake", points: 50 },
    { task: "Healthy breakfast", points: 50 },
    { task: "Read 20 mins", points: 50 },
    { task: "Journal thoughts", points: 50 },
    { task: "Digital detox 1hr", points: 50 },
    { task: "Call family member", points: 50 },
    { task: "Clean your room", points: 50 },
    { task: "Gratitude list", points: 50 },
    { task: "Nature walk", points: 50 },
    { task: "Limit screen time", points: 50 },
    { task: "Plan next day", points: 50 },
    { task: "Sleep before 11pm", points: 50 },
    { task: "Healthy lunch", points: 50 },
    { task: "Healthy dinner", points: 50 },
    { task: "Positive affirmation", points: 50 },
    { task: "Smile more", points: 50 },
    { task: "Avoid negativity", points: 50 },
    { task: "Stretching routine", points: 50 },
    { task: "Sunlight exposure", points: 50 },
    { task: "Organize workspace", points: 50 },
    { task: "Declutter space", points: 50 },
    { task: "Hydration goal met", points: 50 },
    { task: "Practice kindness", points: 50 },
    { task: "No gossip day", points: 50 },
    { task: "Cook healthy meal", points: 50 },
    { task: "No junk day", points: 50 },
    { task: "Self reflection", points: 50 },
    { task: "Goal review", points: 50 },
    { task: "Weekly reset", points: 50 },
    { task: "Track habits", points: 50 },
    { task: "Morning routine complete", points: 50 },
    { task: "Evening routine complete", points: 50 },
    { task: "Drink herbal tea", points: 50 },
    { task: "Limit caffeine", points: 50 },
    { task: "Avoid sugar", points: 50 },
    { task: "Good posture", points: 50 },
    { task: "Help someone", points: 50 },
    { task: "Practice patience", points: 50 },
    { task: "No complaining day", points: 50 },
    { task: "Focus on self growth", points: 50 },
    { task: "Creative activity", points: 50 },
    { task: "Mindful eating", points: 50 },
    { task: "Deep cleaning task", points: 50 },
    { task: "Personal hygiene care", points: 50 },
    { task: "Mental health check", points: 50 },
    { task: "Weekly reflection", points: 50 },
    { task: "Celebrate small win", points: 50 }
  ],

  productivity: [
    { task: "Wake up 6AM", points: 50 },
    { task: "Make to-do list", points: 50 },
    { task: "Complete hardest task first", points: 50 },
    { task: "Study 1 hour", points: 50 },
    { task: "Read 10 pages", points: 50 },
    { task: "No phone 2 hrs", points: 50 },
    { task: "Finish pending work", points: 50 },
    { task: "Organize files", points: 50 },
    { task: "Plan weekly goals", points: 50 },
    { task: "Focus 45-min session", points: 50 },
    { task: "Learn new skill", points: 50 },
    { task: "Watch educational video", points: 50 },
    { task: "Write 500 words", points: 50 },
    { task: "Code 30 mins", points: 50 },
    { task: "Practice typing speed", points: 50 },
    { task: "Update resume", points: 50 },
    { task: "Research topic", points: 50 },
    { task: "Clean inbox", points: 50 },
    { task: "Review finances", points: 50 },
    { task: "Budget planning", points: 50 },
    { task: "Pomodoro x4", points: 50 },
    { task: "Brainstorm ideas", points: 50 },
    { task: "Skill practice", points: 50 },
    { task: "Online course lesson", points: 50 },
    { task: "Networking message", points: 50 },
    { task: "Public speaking practice", points: 50 },
    { task: "Create project plan", points: 50 },
    { task: "Update portfolio", points: 50 },
    { task: "Morning deep work", points: 50 },
    { task: "Evening review", points: 50 },
    { task: "Limit distractions", points: 50 },
    { task: "Organize schedule", points: 50 },
    { task: "Goal visualization", points: 50 },
    { task: "Skill improvement", points: 50 },
    { task: "Daily reflection", points: 50 },
    { task: "Time tracking", points: 50 },
    { task: "Set deadlines", points: 50 },
    { task: "Finish book chapter", points: 50 },
    { task: "Improve handwriting", points: 50 },
    { task: "Declutter desk", points: 50 },
    { task: "Create habit tracker", points: 50 },
    { task: "Mind mapping", points: 50 },
    { task: "Update calendar", points: 50 },
    { task: "Plan tomorrow", points: 50 },
    { task: "Avoid procrastination", points: 50 },
    { task: "Skill revision", points: 50 },
    { task: "Practice consistency", points: 50 },
    { task: "Read industry news", points: 50 },
    { task: "Track progress", points: 50 },
    { task: "Weekly productivity review", points: 50 }
  ]
};

    let base = sets[this.data.goal] || ["Stay productive"];
    let shuffled = [...base].sort(()=>0.5 - Math.random());
    this.data.tasks = shuffled.slice(0,5);
    this.data.completedTasks = [];
    this.renderTasks();
},

renderTasks(){
    const box = document.getElementById("tasks-container");
    box.innerHTML = "";

    this.data.tasks.forEach((task,i)=>{
        const done = this.data.completedTasks.includes(i);
        box.innerHTML += `
        <div class="task">
            <span>${task}</span>
            <div class="check ${done?'checked':''}" 
            onclick="app.toggleTask(${i})">
            ${done?'✓':''}
            </div>
        </div>`;
    });
},

toggleTask(i){
    if(this.data.completedTasks.includes(i)){
        this.data.completedTasks =
            this.data.completedTasks.filter(x=>x!==i);
    } else {
        this.data.completedTasks.push(i);
        this.data.xp += 20;
        this.data.coins += 10;
    }
    this.updateUI();
    this.save();
    this.renderTasks();
},

completeDay(){
    if(this.data.completedTasks.length < 5){
        alert("Complete all 5 tasks!");
        return;
    }

    this.data.streak++;
    this.data.day++;
    this.data.completedDays.push(this.data.day);
    this.data.xp += 50;
    this.data.coins += 20;

    let needed = this.data.level * 100;
    if(this.data.xp >= needed){
        this.data.level++;
        this.data.xp -= needed;
        alert("🎉 LEVEL UP!");
    }

    this.generateTasks();
    this.save();
    this.updateUI();
},

// ================= PREMIUM =================
buyPremium(type){
    if(type==="monthly"){
        this.data.premium = true;
        this.data.premiumType = "monthly";
    }
    if(type==="elite"){
        this.data.premium = true;
        this.data.premiumType = "elite";
    }
    alert("Premium Activated!");
    this.save();
},

// ================= STORE =================
storeItems:[
{ id:1,name:"Street Glasses",price:60,icon:"🕶️",level:1,premium:false },
{ id:2,name:"Hoodie Black",price:120,icon:"🧥",level:2,premium:false },
{ id:3,name:"Air Shoes",price:150,icon:"👟",level:3,premium:false },
{ id:4,name:"Elite Crown",price:300,icon:"👑",level:5,premium:true },
{ id:5,name:"Diamond Aura",price:500,icon:"💎",level:8,premium:true },
{ id:6,name:"Golden Frame",price:250,icon:"🖼️",level:4,premium:true }
],

loadStore(){
    const grid = document.getElementById("store-items");
    grid.innerHTML="";

    this.storeItems.forEach(item=>{
        let owned = this.data.inventory.includes(item.id);
        let lockedLevel = this.data.level < item.level;
        let lockedPremium = item.premium && !this.data.premium;

        let button = "";

        if(owned){
            button = `<button disabled>Owned</button>`;
        }
        else if(lockedLevel){
            button = `<button disabled>Lvl ${item.level}</button>`;
        }
        else if(lockedPremium){
            button = `<button disabled>Premium</button>`;
        }
        else{
            button = `<button onclick="app.buyItem(${item.id})">
            Buy 🪙${item.price}</button>`;
        }

        grid.innerHTML += `
        <div class="item-card">
            <div style="font-size:2rem">${item.icon}</div>
            <h4>${item.name}</h4>
            <p>Unlock Lvl ${item.level}</p>
            ${item.premium?'<span>⚜ Premium</span>':''}
            ${button}
        </div>`;
    });
},

buyItem(id){
    let item = this.storeItems.find(x=>x.id===id);

    if(this.data.coins < item.price){
        alert("Not enough coins!");
        return;
    }

    this.data.coins -= item.price;
    this.data.inventory.push(id);
    this.save();
    this.updateUI();
    this.loadStore();
},

// ================= LEADERBOARD =================
loadLeaderboard(){
    let players = [
        {name:this.data.name,xp:this.data.xp},
        {name:"ProKing",xp:1500},
        {name:"ShadowDev",xp:900},
        {name:"FitLord",xp:700}
    ];

    players.sort((a,b)=>b.xp-a.xp);

    const box = document.getElementById("leaderboard-list");
    box.innerHTML="";

    players.forEach((p,i)=>{
        let medal = i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1;
        box.innerHTML+=`
        <div class="list-item">
        ${medal} ${p.name} - ${p.xp} XP
        </div>`;

        if(i<3 && p.name===this.data.name){
            this.rewardCrate();
        }
    });
},

rewardCrate(){
    this.data.coins+=100;
    alert("🎁 You received 100 coins + mystery item!");
},

// ================= UI =================
updateUI(){
    document.getElementById("disp-level").innerText=this.data.level;
    document.getElementById("disp-streak").innerText=this.data.streak;
    document.getElementById("header-coins").innerText=this.data.coins;

    let needed=this.data.level*100;
    let percent=(this.data.xp/needed)*100;
    document.getElementById("xp-bar").style.width=percent+"%";
}
};

window.onload=()=>app.init();
