// ============================================
// store.js – Buy Clothes, Daily Gift, Premium Items
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. Verify engine and user
    // ----------------------------------------------------
    if (typeof user === 'undefined') {
        console.error('Bitmoji Engine not loaded.');
        return;
    }

    const profile = JSON.parse(localStorage.getItem('profile')) || { gender: 'male' };
    user.gender = profile.gender;

    // ----------------------------------------------------
    // 2. Master catalog of all clothes
    //    (You can expand this array with your own items)
    // ----------------------------------------------------
    window.clothesCatalog = [
        // Shirts
        { id: 'shirt1', name: 'Basic Tee', type: 'shirt', gender: 'male', image: '/assets/bitmoji/male/clothes/shirt/basic_tee.png', price: 50, premium: false, requiredLevel: 1 },
        { id: 'shirt2', name: 'Floral Shirt', type: 'shirt', gender: 'female', image: '/assets/bitmoji/female/clothes/shirt/floral.png', price: 80, premium: false, requiredLevel: 2 },
        { id: 'shirt3', name: 'Gold Jacket', type: 'jackets', gender: 'male', image: '/assets/bitmoji/male/clothes/jackets/gold.png', price: 200, premium: true, requiredLevel: 5 },
        // Pants
        { id: 'pants1', name: 'Jeans', type: 'pants', gender: 'male', image: '/assets/bitmoji/male/clothes/pants/jeans.png', price: 40, premium: false, requiredLevel: 1 },
        // Shoes, glasses, etc. – add your own
    ];

    // ----------------------------------------------------
    // 3. UI Elements
    // ----------------------------------------------------
    const storeContainer = document.getElementById('store-container');
    const closeBtn = document.getElementById('store-close');
    const dailyGiftBtn = document.getElementById('daily-gift-btn');
    const categoryButtons = {
        shirt: document.getElementById('store-cat-shirt'),
        pants: document.getElementById('store-cat-pants'),
        shoes: document.getElementById('store-cat-shoes'),
        jackets: document.getElementById('store-cat-jackets'),
        glasses: document.getElementById('store-cat-glasses')
    };
    const storeGrid = document.getElementById('store-grid');
    const coinsDisplay = document.getElementById('store-coins');

    // ----------------------------------------------------
    // 4. State
    // ----------------------------------------------------
    let currentCategory = 'shirt';

    // ----------------------------------------------------
    // 5. Update coin display
    // ----------------------------------------------------
    function updateCoins() {
        if (coinsDisplay) coinsDisplay.textContent = user.coins;
    }

    // ----------------------------------------------------
    // 6. Render store items (filtered by category & gender, and availability)
    // ----------------------------------------------------
    function renderStore() {
        if (!storeGrid) return;

        const items = clothesCatalog.filter(item =>
            item.type === currentCategory &&
            (!item.gender || item.gender === user.gender)
        );

        storeGrid.innerHTML = '';

        items.forEach(item => {
            const owned = user.inventory.some(i => i.id === item.id);
            const canBuy = !owned && user.coins >= item.price && user.level >= item.requiredLevel;
            const isPremiumLocked = item.premium && !user.premium;

            const card = document.createElement('div');
            card.className = 'store-item';
            if (owned) card.classList.add('owned');
            if (isPremiumLocked) card.classList.add('premium-locked');

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;

            const info = document.createElement('div');
            info.className = 'item-info';
            info.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-price">💰 ${item.price}</span>
                ${item.premium ? '<span class="premium-badge">PREMIUM</span>' : ''}
                ${item.requiredLevel > 1 ? `<span class="level-req">Lvl ${item.requiredLevel}</span>` : ''}
            `;

            const buyBtn = document.createElement('button');
            buyBtn.className = 'buy-btn';
            if (owned) {
                buyBtn.textContent = 'Owned';
                buyBtn.disabled = true;
            } else if (isPremiumLocked) {
                buyBtn.textContent = 'Premium Only';
                buyBtn.disabled = true;
            } else if (!canBuy) {
                buyBtn.textContent = 'Locked';
                buyBtn.disabled = true;
            } else {
                buyBtn.textContent = 'Buy';
                buyBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    purchaseItem(item);
                });
            }

            card.appendChild(img);
            card.appendChild(info);
            card.appendChild(buyBtn);
            storeGrid.appendChild(card);
        });
    }

    // ----------------------------------------------------
    // 7. Purchase item
    // ----------------------------------------------------
    function purchaseItem(item) {
        if (user.coins < item.price) {
            alert('Not enough coins!');
            return;
        }
        if (user.level < item.requiredLevel) {
            alert(`Reach level ${item.requiredLevel} to unlock this.`);
            return;
        }
        if (item.premium && !user.premium) {
            alert('This item is for premium users only.');
            return;
        }

        // Deduct coins, add to inventory
        user.coins -= item.price;
        user.inventory.push({ ...item }); // store a copy
        saveUser();
        updateCoins();
        renderStore(); // re-render to reflect ownership
        alert(`Purchased ${item.name}!`);
    }

    // ----------------------------------------------------
    // 8. Daily Free Gift
    // ----------------------------------------------------
    function claimDailyGift() {
        const lastClaim = localStorage.getItem('dailyGiftLastClaim');
        const today = new Date().toDateString();

        if (lastClaim === today) {
            alert('You already claimed your free gift today!');
            return;
        }

        // Define pool of free items (could be a subset of catalog)
        const freePool = clothesCatalog.filter(item => !item.premium && item.price <= 30); // example
        if (freePool.length === 0) {
            alert('No free items available right now.');
            return;
        }

        const randomItem = freePool[Math.floor(Math.random() * freePool.length)];
        user.inventory.push({ ...randomItem });
        saveUser();
        localStorage.setItem('dailyGiftLastClaim', today);
        alert(`You received a free ${randomItem.name}!`);
        renderStore(); // update store if open
    }

    if (dailyGiftBtn) {
        dailyGiftBtn.addEventListener('click', claimDailyGift);
    }

    // ----------------------------------------------------
    // 9. Category switching
    // ----------------------------------------------------
    function setActiveCategory(cat) {
        currentCategory = cat;
        Object.keys(categoryButtons).forEach(key => {
            const btn = categoryButtons[key];
            if (btn) {
                if (key === cat) btn.classList.add('active');
                else btn.classList.remove('active');
            }
        });
        renderStore();
    }

    Object.keys(categoryButtons).forEach(cat => {
        const btn = categoryButtons[cat];
        if (btn) {
            btn.addEventListener('click', () => setActiveCategory(cat));
        }
    });

    // ----------------------------------------------------
    // 10. Close button
    // ----------------------------------------------------
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (storeContainer) storeContainer.style.display = 'none';
        });
    }

    // ----------------------------------------------------
    // 11. Initial render
    // ----------------------------------------------------
    updateCoins();
    setActiveCategory('shirt');
});
