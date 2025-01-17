// Script for handling cart functionality

// Store cart data in local storage to persist the cart between page refreshes
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.total p');
    cartContainer.innerHTML = ''; // Clear the cart container

    // If there are items in the cart
    if (cart.length > 0) {
        let total = 0;
        cart.forEach(item => {
            // Create elements for each cart item
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;
            cartContainer.appendChild(cartItem);

            total += item.price;
        });

        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    } else {
        // If the cart is empty
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalElement.textContent = 'Total: $0.00';
    }

    // Save cart data to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Add event listeners to the remove buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeItemFromCart);
    });
}

// Function to add an item to the cart
function addItemToCart(id, name, price, img) {
    const newItem = { id, name, price, img };

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(item => item.id === id);
    if (existingItemIndex === -1) {
        cart.push(newItem);
    }

    updateCartDisplay(); // Update the cart display after adding the item
}

// Function to remove an item from the cart
function removeItemFromCart(event) {
    const itemId = event.target.dataset.id;
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay(); // Update the cart display after removing the item
}

// Add event listeners to the "Add to Cart" buttons on the home page
document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', function () {
        const productId = this.closest('.product').dataset.id;
        const productName = this.closest('.product').querySelector('h3').textContent;
        const productPrice = parseFloat(this.closest('.product').querySelector('p').textContent.replace('$', ''));
        const productImg = this.closest('.product').querySelector('img').src;

        addItemToCart(productId, productName, productPrice, productImg);
    });
});

// Update the cart display when the page loads
if (document.body.classList.contains('cart-page')) {
    updateCartDisplay();
}
