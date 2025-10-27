// Shopping cart state
let cart = [];

// DOM elements
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutItems = document.getElementById('checkoutItems');
const checkoutTotal = document.getElementById('checkoutTotal');
const cartNotification = document.getElementById('cartNotification');

// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = button.closest('.product-card');
            const productId = productCard.dataset.id;
            const productName = productCard.dataset.name;
            const productPrice = parseFloat(productCard.dataset.price);
            const productImage = productCard.querySelector('img').src;
            
            // Check if item already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            
            updateCartDisplay();
            showNotification(`${productName} added to cart!`);
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
});

// Cart icon click
cartIcon.addEventListener('click', () => {
    cartModal.classList.add('show');
    updateCartDisplay();
});

// Close cart modal
closeCart.addEventListener('click', () => {
    cartModal.classList.remove('show');
});

closeCheckout.addEventListener('click', () => {
    checkoutModal.classList.remove('show');
});

// Close modals when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('show');
    }
});

checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
        checkoutModal.classList.remove('show');
    }
});

// Update cart display
function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Clear cart items display
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        checkoutBtn.disabled = true;
        cartTotal.textContent = '$0';
        return;
    }
    
    checkoutBtn.disabled = false;
    
    // Display cart items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price} × ${item.quantity}</p>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">×</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Proceed to checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    cartModal.classList.remove('show');
    checkoutModal.classList.add('show');
    updateCheckoutDisplay();
});

// Update checkout display
function updateCheckoutDisplay() {
    checkoutItems.innerHTML = '';
    
    cart.forEach(item => {
        const checkoutItem = document.createElement('div');
        checkoutItem.style.cssText = 'display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--sepia-light);';
        checkoutItem.innerHTML = `
            <span>${item.name} × ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        checkoutItems.appendChild(checkoutItem);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

// Handle checkout form submission
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would normally send the data to a server
    // For demo purposes, we'll just show a success message
    
    const name = document.getElementById('name').value;
    
    alert(`Thank you, ${name}! Your order has been placed successfully. In a real application, this would process the payment.`);
    
    // Reset cart and close modals
    cart = [];
    updateCartDisplay();
    checkoutModal.classList.remove('show');
    checkoutForm.reset();
    
    // Show success message
    showNotification('Order placed successfully!');
});

// Show notification
function showNotification(message) {
    cartNotification.textContent = message;
    cartNotification.classList.add('show');
    
    setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 3000);
}

// Add subtle animation on scroll
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowBottom = window.innerHeight;
        
        if (cardTop < windowBottom - 100) {
            card.style.opacity = '1';
        }
    });
});

// Initialize card opacity
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transition = 'opacity 0.6s ease';
});

// Trigger initial opacity check
window.dispatchEvent(new Event('scroll'));
