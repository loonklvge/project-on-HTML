function addToCart(productId, size) {
    const product = getProductById(productId);
    if (!product) return;
    
    if (!size) {
        showNotification('Пожалуйста, выберите размер', 'error');
        return;
    }
    
    const cart = JSON.parse(localStorage.getItem('loonklage_cart')) || [];
    
    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        size: size,
        image: product.image,
        quantity: 1
    };
    
    const existingItemIndex = cart.findIndex(item => 
        item.id === productId && item.size === size
    );
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(cartItem);
    }
    
    localStorage.setItem('loonklage_cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`Товар "${product.name}" добавлен в корзину!`);
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('loonklage_cart')) || [];
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem('loonklage_cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
        showNotification('Товар удален из корзины');
    }
}

function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('loonklage_cart')) || [];
    if (index >= 0 && index < cart.length) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('loonklage_cart', JSON.stringify(cart));
        updateCartCount();
        if (typeof renderCart === 'function') {
            renderCart();
        }
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItemsContainer) return;
    
    const cart = JSON.parse(localStorage.getItem('loonklage_cart')) || [];
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartTotal) cartTotal.innerHTML = '';
        return;
    }
    
    if (cartEmpty) cartEmpty.style.display = 'none';
    
    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div style="flex: 1;">
                    <h4 style="margin-bottom: 0.5rem;">${item.name}</h4>
                    <p style="color: var(--white-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">
                        Размер: ${item.size}
                    </p>
                    <p style="font-weight: bold;">${item.price.toLocaleString()} ₽ × ${item.quantity}</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem; align-items: center;">
                        <button onclick="updateQuantity(${index}, -1)" style="background: none; border: 1px solid var(--gray); color: var(--white); width: 30px; height: 30px; cursor: pointer;">-</button>
                        <span style="display: flex; align-items: center;">${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)" style="background: none; border: 1px solid var(--gray); color: var(--white); width: 30px; height: 30px; cursor: pointer;">+</button>
                        <button onclick="removeFromCart(${index})" style="background: none; border: none; color: var(--red); margin-left: 1rem; cursor: pointer; font-size: 0.8rem;">Удалить</button>
                    </div>
                </div>
                <div style="font-weight: bold;">
                    ${itemTotal.toLocaleString()} ₽
                </div>
            </div>
        `;
    }).join('');
    
    if (cartTotal) {
        cartTotal.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <span>ИТОГО:</span>
                <span style="font-size: 1.2rem; font-weight: bold;">${total.toLocaleString()} ₽</span>
            </div>
        `;
    }
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('loonklage_cart')) || [];
    if (cart.length === 0) {
        showNotification('Корзина пуста', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = Date.now();
    
    const orders = JSON.parse(localStorage.getItem('loonklage_orders')) || [];
    const newOrder = {
        id: orderId,
        date: new Date().toISOString(),
        items: [...cart],
        total: total,
        status: 'new',
        statusHistory: [
            {
                status: 'new',
                date: new Date().toISOString(),
                description: 'Заказ создан'
            }
        ]
    };
    
    orders.push(newOrder);
    localStorage.setItem('loonklage_orders', JSON.stringify(orders));
    
    localStorage.removeItem('loonklage_cart');
    updateCartCount();
    if (typeof renderCart === 'function') {
        renderCart();
    }
    
    const telegramLink = 'https://t.me/loonklvge';
    const message = `Заказ оформлен!\n\nНомер заказа: #${orderId}\nСумма: ${total.toLocaleString()} ₽\n\nДля подтверждения напишите в Telegram: @loonklvge`;
    
    alert(message);
    
    window.open(telegramLink, '_blank');
}