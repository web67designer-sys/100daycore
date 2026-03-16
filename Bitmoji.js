// ============================================
// bitmoji.js – Wardrobe (Manage & Equip Owned Clothes)
// ============================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. Ensure user data is loaded and has gender
    // ----------------------------------------------------
    if (typeof user === 'undefined') {
        console.error('Bitmoji Engine not loaded. Make sure engine script runs first.');
        return;
    }

    // Load gender from profile (adjust key as needed)
    const profile = JSON.parse(localStorage.getItem('profile')) || { gender: 'male' };
    user.gender = profile.gender;  // attach to user object for easy access

    // ----------------------------------------------------
    // 2. Get references to UI elements
    // ----------------------------------------------------
    const wardrobeContainer = document.getElementById('wardrobe-container'); // main container
    const closeBtn = document.getElementById('wardrobe-close');              // X button
    const avatarBase = document.getElementById('avatar-base');               // base body image (static)
    const categoryButtons = {
        shirt: document.getElementById('cat-shirt'),
        pants: document.getElementById('cat-pants'),
        shoes: document.getElementById('cat-shoes'),
        jackets: document.getElementById('cat-jackets'),
        glasses: document.getElementById('cat-glasses')
    };
    const clothesGrid = document.getElementById('clothes-grid');             // grid for owned clothes
    const saveBtn = document.getElementById('wardrobe-save');                // save button

    // ----------------------------------------------------
    // 3. State
    // ----------------------------------------------------
    let currentCategory = 'shirt'; // default

    // ----------------------------------------------------
    // 4. Load avatar base image (if not already)
    // ----------------------------------------------------
    if (avatarBase) {
        // Path example: /assets/bitmoji/male/base.png or /assets/bitmoji/female/base.png
        avatarBase.src = `/assets/bitmoji/${user.gender}/base.png`;
    }

    // ----------------------------------------------------
    // 5. Render owned clothes filtered by category & gender
    // ----------------------------------------------------
    function renderInventory() {
        if (!clothesGrid) return;

        // Filter user.inventory by current category and gender
        const items = user.inventory.filter(item =>
            item.type === currentCategory &&
            (!item.gender || item.gender === user.gender) // some items may be unisex
        );

        // Clear grid
        clothesGrid.innerHTML = '';

        if (items.length === 0) {
            clothesGrid.innerHTML = '<p class="no-items">No items in this category.</p>';
            return;
        }

        // Create thumbnails
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'clothing-item';
            itemDiv.dataset.id = item.id;
            itemDiv.dataset.type = item.type;
            itemDiv.dataset.image = item.image;

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name || 'clothing';

            // Highlight if currently equipped
            if (user.equipped[item.type] === item.image) {
                itemDiv.classList.add('equipped');
            }

            itemDiv.appendChild(img);
            itemDiv.addEventListener('click', () => equipFromWardrobe(item));
            clothesGrid.appendChild(itemDiv);
        });
    }

    // ----------------------------------------------------
    // 6. Equip item (uses engine's equipItem)
    // ----------------------------------------------------
    function equipFromWardrobe(item) {
        if (typeof equipItem === 'function') {
            equipItem(item);
            // Update highlight after equip
            renderInventory();
        } else {
            console.error('equipItem function not found');
        }
    }

    // ----------------------------------------------------
    // 7. Category switching
    // ----------------------------------------------------
    function setActiveCategory(cat) {
        currentCategory = cat;
        // Update button active state
        Object.keys(categoryButtons).forEach(key => {
            const btn = categoryButtons[key];
            if (btn) {
                if (key === cat) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        });
        renderInventory();
    }

    // Attach category button events
    Object.keys(categoryButtons).forEach(cat => {
        const btn = categoryButtons[cat];
        if (btn) {
            btn.addEventListener('click', () => setActiveCategory(cat));
        }
    });

    // ----------------------------------------------------
    // 8. Save button (manual save – optional)
    // ----------------------------------------------------
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveUser(); // from engine
            alert('Outfit saved!');
        });
    }

    // ----------------------------------------------------
    // 9. Close button (X)
    // ----------------------------------------------------
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            // Hide wardrobe or go back – adjust as needed
            if (wardrobeContainer) wardrobeContainer.style.display = 'none';
            // or window.history.back();
        });
    }

    // ----------------------------------------------------
    // 10. Initial render
    // ----------------------------------------------------
    setActiveCategory('shirt');
});
