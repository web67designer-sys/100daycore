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
        premium: false
    },

    // --- Initialization ---
    init: function() {
        const saved = localStorage.getItem("levelup_user");
        if (saved) {
            this.data = JSON.parse(saved);
            document.getElementById("onboarding").classList.add("hidden");
            document.getElementById("app").classList.remove("hidden");
            this.updateUI();
            this.generateTasks();
        }
    },

    // --- Profile Creation ---
    createProfile: function() {
        const name = document.getElementById("inp-name").value;
        const age = document.getElementById("inp-age").value;
        const gender = document.getElementById("inp-gender").value;
        const goal = document.getElementById("inp-goal").value;

        if (!name || !age || !gender || !goal) {
            alert("Please fill all fields!");
            return;
        }

        this.data.name = name;
        this.data.age = age;
        this.data.gender = gender;
        this.data.goal = goal;
        
        this.save();
        document.getElementById("onboarding").classList.add("hidden");
        document.getElementById("app").classList.remove("hidden");
        
        this.updateUI();
        this.generateTasks();
    },

    save: function() {
        localStorage.setItem("levelup_user", JSON.stringify(this.data));
    },

    // --- Navigation ---
    nav: function(view) {
        document.getElementById("view-home").classList.add("hidden");
        document.getElementById("view-profile").classList.add("hidden");
        document.getElementById("view-leaderboard").classList.add("hidden");
        document.getElementById("view-bitmoji").classList.add("hidden");
        document.getElementById("view-store").classList.add("hidden");
        document.getElementById("view-premium").classList.add("hidden");

        document.getElementById("view-" + view).classList.remove("hidden");
        this.toggleSidebar();

        if (view === "profile") this.loadProfile();
        if (view === "leaderboard") this.loadLeaderboard();
        if (view === "bitmoji") this.loadBitmoji();
        if (view === "store") this.loadStore();
    },

    toggleSidebar: function() {
        document.getElementById("sidebar").classList.toggle("active");
        document.getElementById("overlay").classList.toggle("active");
    },

    updateUI: function() {
        document.getElementById("menu-name").innerText = this.data.name;
        document.getElementById("menu-level").innerText = "Level " + this.data.level;
        document.getElementById("header-coins").innerText = this.data.coins;

        document.getElementById("disp-level").innerText = this.data.level;
        document.getElementById("disp-badge").innerText = this.getBadge(this.data.level);
        document.getElementById("disp-streak").innerText = this.data.streak;
        
        const xpNeeded = this.data.level * 100;
        document.getElementById("disp-xp").innerText = this.data.xp;
        document.getElementById("next-level-xp").innerText = xpNeeded;
        
        const xpPercent = (this.data.xp / xpNeeded) * 100;
        document.getElementById("xp-bar").style.width = xpPercent + "%";

        document.getElementById("ai-goal-display").innerText = this.data.goal;
    },

    getBadge: function(level) {
        if (level < 5) return "Rookie";
        if (level < 10) return "Warrior";
        if (level < 20) return "Champion";
        return "Legend";
    },

    generateTasks: function() {
        const goal = this.data.goal;
        const taskSets = {
            "Fitness": ["Do 20 pushups", "Run for 15 mins", "Stretch for 10 mins", "Drink 3L water", "Do 50 squats"],
            "Coding": ["Code for 30 mins", "Fix 1 bug", "Learn 1 new function", "Read documentation", "Build a small project"],
            "Reading": ["Read 10 pages", "Summarize a chapter", "Read news article", "Read for 20 mins", "Highlight key points"]
        };

        const baseTasks = taskSets[goal] || ["Complete task 1", "Complete task 2"];
        this.data.tasks = baseTasks.sort(() => 0.5 - Math.random()).slice(0, 3);
        this.data.completedTasks = [];
        this.renderTasks();
    },

    renderTasks: function() {
        const container = document.getElementById("tasks-container");
        container.innerHTML = "";
        
        this.data.tasks.forEach((task, index) => {
            const isDone = this.data.completedTasks.includes(index);
            const div = document.createElement("div");
            div.className = "task";
            div.innerHTML = `
                <span>${task}</span>
                <div class="check ${isDone ? 'checked' : ''}" onclick="app.toggleTask(${index})">${isDone ? '✓' : ''}</div>
            `;
            container.appendChild(div);
        });
    },

    toggleTask: function(index) {
        if (this.data.completedTasks.includes(index)) {
            this.data.completedTasks = this.data.completedTasks.filter(i => i !== index);
        } else {
            this.data.completedTasks.push(index);
        }
        this.renderTasks();
    },

    completeDay: function() {
        if (this.data.completedTasks.length < this.data.tasks.length) {
            alert("Complete all tasks first!");
            return;
        }

        this.data.xp += 50;
        this.data.coins += 20;
        this.data.streak += 1;
        
        if (!this.data.completedDays.includes(this.data.day)) {
            this.data.completedDays.push(this.data.day);
        }

        const xpNeeded = this.data.level * 100;
        if (this.data.xp >= xpNeeded) {
            this.data.level++;
            this.data.xp = this.data.xp - xpNeeded;
            alert("🎉 LEVEL UP! You are now Level " + this.data.level);
        }

        this.save();
        this.updateUI();
        this.generateTasks();
    },

    askAI: function() {
        const input = document.getElementById("ai-input");
        const responseBox = document.getElementById("ai-response");
        const question = input.value;

        if (!question) return;

        let answer = "Keep pushing! You're doing great.";
        
        if (this.data.goal === "Fitness") {
            if (question.toLowerCase().includes("food") || question.toLowerCase().includes("diet")) 
                answer = "Eat protein rich food! Chicken, eggs, and lots of water.";
            else if (question.toLowerCase().includes("tired"))
                answer = "Rest is important. Take a day off if needed, but don't give up!";
        } else if (this.data.goal === "Coding") {
            if (question.toLowerCase().includes("error") || question.toLowerCase().includes("bug"))
                answer = "Check your console logs. Break the problem into smaller pieces.";
            else if (question.toLowerCase().includes("learn"))
                answer = "Start with HTML/CSS, then move to JavaScript. Practice daily!";
        } else if (this.data.goal === "Reading") {
            answer = "Focus on understanding, not just speed. Take notes!";
        }

        responseBox.innerHTML = `<b>You:</b> ${question}<br><br><b>AI:</b> ${answer}`;
        input.value = "";
    },

    openCalendar: function() {
        const modal = document.getElementById("modal");
        modal.classList.add("active");
        
        const grid = document.getElementById("cal-grid");
        grid.innerHTML = "";

        const today = this.data.day;

        for (let i = 1; i <= 30; i++) {
            const day = document.createElement("div");
            day.className = "day";
            
            if (this.data.completedDays.includes(i)) {
                day.classList.add("done");
                day.innerText = "✓";
            } else if (i > today) {
                day.classList.add("locked");
                day.innerText = "🔒";
            } else if (i === today) {
                day.classList.add("today");
                day.innerText = i;
                day.onclick = () => this.showTasksForDay(i);
            } else {
                day.classList.add("future");
                day.innerText = i;
            }
            
            grid.appendChild(day);
        }
    },

    showTasksForDay: function(dayNum) {
        alert("Tasks for Day " + dayNum + " would appear here. Complete them to earn XP!");
    },

    closeModal: function() {
        document.getElementById("modal").classList.remove("active");
    },

    loadProfile: function() {
        document.getElementById("prof-name").value = this.data.name;
        document.getElementById("prof-age").value = this.data.age;
        document.getElementById("prof-email").value = this.data.email;
        document.getElementById("prof-gender").value = this.data.gender;
        
        const goalSelect = document.getElementById("prof-goal");
        goalSelect.innerHTML = `
            <option value="Fitness">💪 Fitness</option>
            <option value="Coding">💻 Coding</option>
            <option value="Reading">📚 Reading</option>
        `;
        goalSelect.value = this.data.goal;
    },

    saveProfile: function() {
        this.data.name = document.getElementById("prof-name").value;
        this.data.age = document.getElementById("prof-age").value;
        this.data.goal = document.getElementById("prof-goal").value;
        
        this.save();
        this.updateUI();
        alert("Profile Saved!");
    },

    loadLeaderboard: function() {
        const list = document.getElementById("leaderboard-list");
        
        let users = [
            { name: "You", xp: this.data.xp, level: this.data.level },
            { name: "ProGamer", xp: 500, level: 5 },
            { name: "CodeMaster", xp: 1200, level: 12 },
            { name: "FitKing", xp: 800, level: 8 },
            { name: "BookWorm", xp: 300, level: 3 }
        ];

        users.sort((a, b) => b.xp - a.xp);

        let html = "";
        users.forEach((u, i) => {
            const topClass = i < 3 ? "top-3" : "";
            const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : (i+1) + ".";
            
            html += `
                <div class="list-item">
                    <span class="${topClass}">${medal} ${u.name}</span>
                    <span>${u.xp} XP (Lvl ${u.level})</span>
                </div>
            `;
            
            if (i < 3 && u.name === "You") {
                html += `<div style="padding:10px; color:var(--green); text-align:center;">🎉 Reward: 100 Coins!</div>`;
            }
        });
        
        list.innerHTML = html;
    },

    loadBitmoji: function() {
        const display = document.getElementById("bitmoji-display");
        const genderSpan = document.getElementById("bitmoji-gender");
        
        genderSpan.innerText = this.data.gender;
        
        if (this.data.gender === "Male") display.innerText = "👨‍💻";
        else if (this.data.gender === "Female") display.innerText = "👩‍💻";
        else display.innerText = "🧑‍💻";
    },

    loadStore: function() {
        const items = [
            { id: 1, name: "Cool Glasses", price: 50, icon: "🕶️" },
            { id: 2, name: "Gold Hat", price: 100, icon: "🧢" },
            { id: 3, name: "Super Jacket", price: 150, icon: "🧥" },
            { id: 4, name: "Speed Shoes", price: 80, icon: "👟" },
            { id: 5, name: "Magic Wand", price: 200, icon: "🪄" },
            { id: 6, name: "Diamond Ring", price: 500, icon: "💍" }
        ];

        const grid = document.getElementById("store-items");
        grid.innerHTML = "";

        items.forEach(item => {
            const owned = this.data.inventory.includes(item.id);
            const div = document.createElement("div");
            div.className = `item-card ${owned ? 'owned' : ''}`;
            div.innerHTML = `
                <div style="font-size:2rem;">${item.icon}</div>
                <h4>${item.name}</h4>
                <div class="price">🪙 ${item.price}</div>
                ${owned 
                    ? '<button class="btn btn-small" disabled>Owned</button>' 
                    : `<button class="btn btn-small" onclick="app.buyItem(${item.id}, ${item.price})">Buy</button>`
                }
            `;
            grid.appendChild(div);
        });
    },

    buyItem: function(id, price) {
        if (this.data.coins >= price) {
            this.data.coins -= price;
            this.data.inventory.push(id);
            this.save();
            this.updateUI();
            this.loadStore();
            alert("Purchased successfully!");
        } else {
            alert("Not enough coins!");
        }
    }
};

document.querySelector('.close').addEventListener('click', function() {
    app.closeModal();
});

window.onload = function() {
    app.init();
};
