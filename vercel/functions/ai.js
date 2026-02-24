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
    const sets = {
        Fitness:[
            "50 Pushups","3km Walk","Healthy Breakfast",
            "Stretch 15 mins","Drink 3L Water","30 Squats","Core workout"
        ],
        Coding:[
            "Code 45 mins","Fix 2 Bugs","Build UI component",
            "Read Docs","Refactor Code","Deploy Project"
        ],
        Reading:[
            "Read 20 pages","Write summary",
            "Read biography","Note 5 quotes",
            "Silent reading 30 mins"
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
