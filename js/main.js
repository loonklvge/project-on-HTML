let selectedSize = null;

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateAuthButtons();
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('loonklage_cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cartCount');
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

function updateAuthButtons() {
    const authButtonsElements = document.querySelectorAll('#authButtons');
    
    authButtonsElements.forEach(authButtons => {
        if (!authButtons) return;
        
        const user = JSON.parse(localStorage.getItem('loonklage_current_user'));
        
        if (user) {
            authButtons.innerHTML = `
                <span style="color: var(--white-secondary); margin-right: 1rem;">
                    <i class="fas fa-user"></i> ${user.name}
                </span>
                <button class="btn-auth" onclick="handleLogout()">
                    <i class="fas fa-sign-out-alt"></i> ВЫЙТИ
                </button>
                <button class="btn-auth" onclick="window.location.href='cart.html'">
                    КОРЗИНА (<span id="cartCount">0</span>)
                </button>
            `;
        } else {
            authButtons.innerHTML = `
                <button class="btn-auth" onclick="window.location.href='login.html'">
                    <i class="fas fa-sign-in-alt"></i> ВОЙТИ
                </button>
                <button class="btn-auth" onclick="window.location.href='cart.html'">
                    КОРЗИНА (<span id="cartCount">0</span>)
                </button>
            `;
        }
    });
    
    updateCartCount();
}

function handleLogout() {
    localStorage.removeItem('loonklage_current_user');
    showNotification('Вы вышли из системы', 'success');
    
    setTimeout(() => {
        updateAuthButtons();
        window.location.href = 'index.html';
    }, 1000);
}

function showNotification(message, type = 'success') {
    document.querySelectorAll('.notification').forEach(el => el.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function selectSize(size) {
    selectedSize = size;
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function showSizeError() {
    document.querySelectorAll('.size-error').forEach(el => el.remove());
    
    const error = document.createElement('div');
    error.className = 'size-error';
    error.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <div>
            <strong>Пожалуйста, выберите размер</strong>
            <div style="font-size: 0.9rem; margin-top: 5px;">Выберите размер из доступных вариантов</div>
        </div>
    `;
    
    document.body.appendChild(error);
    
    setTimeout(() => {
        if (error.parentNode) {
            error.parentNode.remove();
        }
    }, 3000);
}