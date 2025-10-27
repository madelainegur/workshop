// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    const cartNotification = document.getElementById('cartNotification');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get product name
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Show notification
            cartNotification.textContent = `${productName} added to cart!`;
            cartNotification.classList.add('show');
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                cartNotification.classList.remove('show');
            }, 3000);
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
});

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

