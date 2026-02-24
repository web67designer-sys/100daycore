// ===============================
// 100DayCore - STORE ELITE ENGINE
// ===============================

let user = JSON.parse(localStorage.getItem("levelUpUser")) || {};

if (!user.inventory) user.inventory = [];
if (!user.frames) user.frames = [];
if (!user.crates) user.crates = 0;
if (!user.isPremium) user.isPremium = false;
if (!user.premiumPlan) user.premiumPlan = null; // "monthly" or "elite"

// ===============================
// CATEGORY STRUCTURE
// ===============================

const STORE_CATEGORIES = [
  "shirts",
  "tshirts",
  "shorts",
  "pants",
  "shoes",
  "glasses",
  "accessories",
  "frames",
  "rewards"
];

// ===============================
// ITEM GENERATOR
// ===============================

const STORE_ITEMS = {};

STORE_CATEGORIES.forEach(cat => {
  STORE_ITEMS[cat] = generateCategory(cat);
});

function generateCategory(category) {
  let items = [];

  // ----- 5 NORMAL ITEMS -----
  for (let i = 1; i <= 5; i++) {
    items.push({
      id: `${category}_normal_${i}`,
      name: `${category} Basic ${i}`,
      price: 50 * i,
      premium: false,
      levelRequired: i * 2,
      type: category
    });
  }

  // ----- 5 PREMIUM ITEMS -----
  for (let i = 1; i <= 5; i++) {
    items.push({
      id: `${category}_premium_${i}`,
      name: `${category} Elite ${i}`,
      price: 100 * i,
      premium: true,
      levelRequired: i * 3,
      type: category
    });
  }

  return items;
}

// ===============================
// RENDER STORE
// ===============================

function renderStore(category = "shirts") {
  const grid = document.getElementById("store-items");
  grid.innerHTML = "";

  const items = STORE_ITEMS[category];

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "store-card";

    let lockedByLevel = user.level < item.levelRequired;
    let lockedByPremium = item.premium && !user.isPremium;
    let owned = user.inventory.includes(item.id);

    if (owned) {
      div.innerHTML = `
        <div class="icon">✅</div>
        <div>${item.name}</div>
        <div class="owned">Owned</div>
      `;
    }

    else if (lockedByPremium) {
      div.innerHTML = `
        <div class="icon">🔒</div>
        <div>${item.name}</div>
        <div class="locked">Premium Required 💎</div>
      `;
    }

    else if (lockedByLevel) {
      div.innerHTML = `
        <div class="icon">🔐</div>
        <div>${item.name}</div>
        <div class="locked">Unlock at Lv ${item.levelRequired}</div>
      `;
    }

    else {
      div.innerHTML = `
        <div class="icon">${item.premium ? "💎" : "🛍️"}</div>
        <div>${item.name}</div>
        <div class="price">${item.price} 🪙</div>
        <button onclick="buyItem('${item.id}', ${item.price})">
          Buy
        </button>
      `;
    }

    grid.appendChild(div);
  });
}

// ===============================
// BUY ITEM
// ===============================

function buyItem(id, price) {
  let item = findItemById(id);

  if (!item) return;

  if (item.premium && !user.isPremium) {
    alert("Upgrade to Premium to unlock this 💎");
    return;
  }

  if (user.level < item.levelRequired) {
    alert("Reach Level " + item.levelRequired + " to unlock this 🔓");
    return;
  }

  if (user.coins >= price) {
    user.coins -= price;
    user.inventory.push(id);
    saveUser();
    renderStore(item.type);
    alert("Purchased Successfully 🔥");
  } else {
    alert("Not enough coins 🪙");
  }
}

// ===============================
// FIND ITEM
// ===============================

function findItemById(id) {
  for (let category in STORE_ITEMS) {
    let found = STORE_ITEMS[category].find(i => i.id === id);
    if (found) return found;
  }
  return null;
}

// ===============================
// PREMIUM SYSTEM
// ===============================

function activatePremium(plan) {
  user.isPremium = true;
  user.premiumPlan = plan; // monthly / elite

  if (plan === "elite") {
    user.xpMultiplier = 1.5;
    user.dailyBonusCoins = 20;
  }

  if (plan === "monthly") {
    user.xpMultiplier = 1.2;
    user.dailyBonusCoins = 10;
  }

  saveUser();
  alert("Premium Activated ⚜️");
}

// ===============================
// LEADERBOARD REWARD SYSTEM
// ===============================

function rewardTopPlayers(position) {

  if (position === 1) {
    user.coins += 200;
    user.xp += 100;
    user.crates += 1;
  }

  if (position === 2) {
    user.coins += 150;
    user.xp += 70;
    user.crates += 1;
  }

  if (position === 3) {
    user.coins += 100;
    user.xp += 50;
    user.crates += 1;
  }

  saveUser();
}

// ===============================
// CRATE SYSTEM
// ===============================

function openCrate() {

  if (user.crates <= 0) {
    alert("No crates available 📦");
    return;
  }

  const allItems = Object.values(STORE_ITEMS).flat();
  const randomItem = allItems[Math.floor(Math.random() * allItems.length)];

  user.inventory.push(randomItem.id);
  user.crates -= 1;

  saveUser();
  alert("You got: " + randomItem.name + " 🎉");
}

// ===============================
// FREE DAILY REWARD
// ===============================

function claimFreeReward() {

  if (localStorage.getItem("freeRewardClaimed") === todayDate()) {
    alert("Already claimed today 🎁");
    return;
  }

  user.coins += 30;
  user.xp += 20;

  localStorage.setItem("freeRewardClaimed", todayDate());
  saveUser();
  alert("Free reward claimed 🎉");
}

function todayDate() {
  return new Date().toDateString();
}

// ===============================
// SAVE SYSTEM
// ===============================

function saveUser() {
  localStorage.setItem("levelUpUser", JSON.stringify(user));
}

// ===============================
// XP LEVEL UP CHECK
// ===============================

function checkLevelUp() {
  let requiredXP = user.level * 100;

  if (user.xp >= requiredXP) {
    user.level += 1;
    user.coins += 50;
    saveUser();
    alert("Level Up! 🚀");
  }
}
