const storeData = [
    {
        id: "pc-budget",
        name: "تجميعات اقتصادية",
        icon: "fas fa-coins",
        products: [
            { id: 101, name: "نيكسوس Entry-1", price: 2499, image: "BUDGET-PC1.png" },
            { id: 102, name: "نيكسوس Entry-2", price: 3000, image: "BUDGET-PC2.png" },
            { id: 103, name: "نيكسوس Entry-3", price: 3100, image: "BUDGET-PC3.png" },
            { id: 104, name: "نيكسوس Entry-4", price: 3400, image: "BUDGET-9C4.png" },
        ]
    },
    {
        id: "pc-mid",
        name: "تجميعات متوسطة",
        icon: "fas fa-balance-scale",
        products: [
            { id: 201, name: "نيكسوس Mid-1", price: 5500, image: "MID-PC1.png" },
            { id: 202, name: "نيكسوس Mid-2", price: 5800, image: "MID-PC2.png" },
            { id: 203, name: "نيكسوس Mid-3", price: 6200, image: "MID-PC3.png" },
            { id: 204, name: "نيكسوس Mid-4", price: 6500, image: "MID-PC4.png" },
        ]
    },
    {
        id: "pc-high",
        name: "تجميعات النخبة",
        icon: "fas fa-crown",
        products: [
            { id: 301, name: "نيكسوس Ultra-1", price: 14500, image: "HIGH-PC1.png" },
            { id: 302, name: "نيكسوس Ultra-2", price: 16800, image: "HIGH-PC2.png" },
            { id: 303, name: "نيكسوس Ultra-3", price: 18000, image: "HIGH-PC3.png" },
        ]
    },
    {
        id: "smartphones",
        name: "الهواتف الذكية",
        icon: "fas fa-mobile-alt",
        products: [
            { id: 401, name: "آيفون 17 برو ماكس", price: 5699, image: "iphone.png" },
            { id: 402, name: "جالكسي S26 الترا", price: 5299, image: "ultra26.png" },
            { id: 403, name: "جوجل بيكسل 10 برو", price: 4299, image: "pixle.png" },
            { id: 404, name: "هونور ماجيك 7 برو", price: 3899, image: "honor.png" },
        ]
    },
    {
        id: "peripherals",
        name: "الملحقات والشاشات",
        icon: "fas fa-keyboard",
        products: [
            { id: 501, name: "شاشة سامسونج Odyssey G9", price: 5500, image: "g9.png", specs: ["49-inch Curved", "240Hz OLED", "0.03ms Response"], description: "انغماس كامل في الألعاب." },
            { id: 502, name: "ماوس Logitech G Pro X Superlight 2", price: 650, image: "superlight.png", specs: ["60g Weight", "HERO 2 Sensor", "95h Battery"], description: "خيار المحترفين الأول." },
            { id: 503, name: "كيبورد Razer Huntsman V3 Pro", price: 950, image: "keyboard.png", specs: ["Analog Switches", "Rapid Trigger", "PBT Keycaps"], description: "استجابة فورية لكل ضغطة." },
            { id: 504, name: "سماعة SteelSeries Arctis Nova Pro", price: 1400, image: "headset.png", specs: ["Hi-Res Audio", "ANC", "Dual Battery System"], description: "نقاء صوتي لا يصدق." },
            { id: 505, name: "شاشة LG UltraGear 27\" OLED", price: 3200, image: "LG.png", specs: ["27-inch 2K", "240Hz OLED", "G-Sync Compatible"], description: "ألوان مذهلة وسرعة فائقة." },
            { id: 506, name: "ماوس Razer Basilisk V3 Pro", price: 700, image: "razer.png", specs: ["Hyperscroll Wheel", "30K DPI", "RGB Lighting"], description: "راحة وتحكم كامل." },
            { id: 507, name: "كيبورد Corsair K100 RGB", price: 1100, image: "razer-keyboard.png", specs: ["OPX Switches", "iCUE Control", "Macro Keys"], description: "فخامة وأداء عالي." },
            { id: 508, name: "ميكروفون Shure SM7B", price: 1800, image: "mic.png", specs: ["Studio Quality", "XLR Connection", "Noise Isolation"], description: "الخيار الذهبي للبث الصوتي." },
        ]
    }
];

let cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-sections')) {
        renderStore();
        renderNav();
    }
    updateCartUI();
    initScrollReveal();
});

function renderNav() {
    const nav = document.getElementById('dynamic-nav');
    const footerLinks = document.getElementById('footer-links');
    storeData.forEach(cat => {
        nav.innerHTML += `<li><a href="#${cat.id}">${cat.name}</a></li>`;
        footerLinks.innerHTML += `<li><a href="#${cat.id}">${cat.name}</a></li>`;
    });
}

function renderStore() {
    const container = document.getElementById('product-sections');
    storeData.forEach(category => {
        const section = document.createElement('section');
        section.id = category.id;
        section.className = 'category-section container';
        section.innerHTML = `
            <h2 class="category-title reveal"><i class="${category.icon}"></i> ${category.name}</h2>
            <div class="product-grid">
                ${category.products.map(p => `
                    <div class="product-card reveal">
                        <div class="product-image">
                            <img src="${p.image}" alt="${p.name}" loading="lazy">
                        </div>
                        <div class="product-info">
                            <h3>${p.name}</h3>
                            <p class="product-price">${p.price.toLocaleString()} ريال</p>
                            <button class="btn-add" onclick="addToCart(${p.id}, '${p.name}', ${p.price}, '${p.image}')">إضافة للسلة</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(section);
    });
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('cart-overlay').classList.toggle('active');
}

function addToCart(id, name, price, image) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    saveCart();
    updateCartUI();
    if (!document.getElementById('cart-sidebar').classList.contains('active')) {
        toggleCart();
    }
}

function updateQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart();
        updateCartUI();
    }
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('nexus_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal-price');
    const taxEl = document.getElementById('tax-price');
    const totalEl = document.getElementById('total-price');

    if (!cartItems) return;

    cartCount.innerText = cart.reduce((s, i) => s + i.quantity, 0);

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center; padding:20px;">السلة فارغة</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-img"><img src="${item.image}"></div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()} ريال</p>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <i class="fas fa-trash remove-item" onclick="removeItem(${item.id})"></i>
            </div>
        `).join('');
    }

    const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    subtotalEl.innerText = subtotal.toLocaleString();
    taxEl.innerText = tax.toLocaleString();
    totalEl.innerText = total.toLocaleString();

    // Update checkout summary if exists
    const summaryItems = document.getElementById('summary-items');
    if (summaryItems) {
        renderCheckoutSummary();
    }
}

function goToCheckout() {
    if (cart.length === 0) {
        alert('السلة فارغة!');
        return;
    }
    
    // Create checkout page content dynamically
    const mainContent = document.getElementById('main-content');
    const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    mainContent.innerHTML = `
        <div class="container checkout-container">
            <h1 style="margin-bottom: 30px;">إتمام الطلب</h1>
            <div class="checkout-grid">
                <div class="checkout-form">
                    <h2>بيانات الشحن</h2>
                    <form id="checkout-form-data" onsubmit="confirmOrder(event)">
                        <div class="form-group">
                            <label>الاسم الكامل</label>
                            <input type="text" required placeholder="أدخل اسمك الكامل">
                        </div>
                        <div class="form-group">
                            <label>رقم الجوال</label>
                            <input type="tel" required placeholder="05xxxxxxxx">
                        </div>
                        <div class="form-group">
                            <label>المدينة</label>
                            <input type="text" required placeholder="مثلاً: الرياض">
                        </div>
                        <div class="form-group">
                            <label>العنوان</label>
                            <input type="text" required placeholder="اسم الحي، الشارع">
                        </div>
                        
                        <h2 style="margin-top:40px;">طريقة الدفع</h2>
                        <div class="payment-methods">
                            <div class="payment-method active" onclick="selectPayment(this)">
                                <i class="fab fa-cc-visa"></i>
                                <span>مدى / فيزا</span>
                            </div>
                            <div class="payment-method" onclick="selectPayment(this)">
                                <i class="fab fa-apple-pay"></i>
                                <span>Apple Pay</span>
                            </div>
                        </div>
                        <button type="submit" class="btn-checkout" style="margin-top:30px;">تأكيد الطلب</button>
                    </form>
                </div>
                <div class="order-summary">
                    <h2>ملخص الطلب</h2>
                    <div id="summary-items">
                        ${cart.map(item => `
                            <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
                                <span>${item.name} (x${item.quantity})</span>
                                <span>${(item.price * item.quantity).toLocaleString()} ريال</span>
                            </div>
                        `).join('')}
                    </div>
                    <hr style="opacity:0.1; margin:20px 0;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                        <span>المجموع:</span>
                        <span>${subtotal.toLocaleString()} ريال</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                        <span>الضريبة (15%):</span>
                        <span>${tax.toLocaleString()} ريال</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:1.2rem; color:var(--accent-blue);">
                        <span>الإجمالي النهائي:</span>
                        <span>${total.toLocaleString()} ريال</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    toggleCart();
    window.scrollTo(0,0);
}

function selectPayment(el) {
    document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
}

function confirmOrder(e) {
    e.preventDefault();
    const orderId = 'NX-' + Math.floor(1000 + Math.random() * 9000);
    
    const name = e.target.querySelector('input[placeholder="أدخل اسمك الكامل"]').value;
    const phone = e.target.querySelector('input[placeholder="05xxxxxxxx"]').value;
    const city = e.target.querySelector('input[placeholder="مثلاً: الرياض"]').value;
    const address = e.target.querySelector('input[placeholder="اسم الحي، الشارع"]').value;

    let message = `🛒 *طلب جديد من متجر نيكسوس*\n`;
    message += `🆔 *رقم الطلب:* \`${orderId}\`\n`;
    message += `--------------------------\n`;
    message += `👤 *بيانات العميل:*\n`;
    message += `- الاسم: ${name}\n`;
    message += `- الجوال: ${phone}\n`;
    message += `- المدينة: ${city}\n`;
    message += `- العنوان: ${address}\n`;
    message += `--------------------------\n`;
    message += `📦 *المنتجات:*\n`;
    
    cart.forEach(item => {
        message += `- ${item.name} (x${item.quantity}) - ${item.price * item.quantity} ريال\n`;
    });

    const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    message += `--------------------------\n`;
    message += `💰 *الإجمالي النهائي:* ${total.toLocaleString()} ريال\n`;

    const botToken = "8777898915:AAGnFHpH74mFJb0TX7bkQTPQk0mZ5IZqkdM";
    const chatId = "7928028163";
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
        })
    }).then(response => {
        console.log('Order sent to Telegram successfully');
    }).catch(error => {
        console.error('Error sending order to Telegram:', error);
    });

    // عرض رسالة النجاح للمستخدم
    document.getElementById('order-id').innerText = orderId;
    document.getElementById('success-popup').style.display = 'block';
    document.getElementById('success-overlay').style.display = 'block';

    // تفريغ السلة
    cart = [];
    saveCart();
    updateCartUI();
}

function closeSuccess() {
    location.reload();
}

function filterProducts() {
    const query = document.getElementById('product-search').value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
        const name = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = name.includes(query) ? 'block' : 'none';
    });
}

function initScrollReveal() {
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.reveal', { distance: '40px', duration: 800, interval: 50 });
    }
}
