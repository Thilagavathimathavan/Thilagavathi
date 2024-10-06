let cart = {};
let totalPrice = 0;
const restaurants = [
    { name: 'Restaurant A', description: 'This is Restaurant A, special for burger.' },
    { name: 'Restaurant B', description: 'This is Restaurant B, famous for pizza.' },
    { name: 'Restaurant C', description: 'This is Restaurant C, famous for showerma.' }
];

// Function to generate restaurant buttons dynamically
function loadRestaurants() {
    const restaurantListDiv = document.getElementById("restaurant-list");

    restaurants.forEach(restaurant => {
        const button = document.createElement("button");
        button.className = "restaurant-button";
        button.textContent = restaurant.name;
        button.onclick = () => selectRestaurant(restaurant);
        restaurantListDiv.appendChild(button);
    });
}

// Function to display selected restaurant details
function selectRestaurant(restaurant) {
    document.getElementById("restaurant-name").textContent = restaurant.name;
    document.getElementById("restaurant-description").textContent = restaurant.description;
    document.getElementById("selected-restaurant").style.display = "block";
}

// Load restaurants on page load
window.onload = loadRestaurants;

function addToCart(dishName, price) {
    if (cart[dishName]) {
        cart[dishName].quantity++;
    } else {
        cart[dishName] = { price, quantity: 1 };
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    totalPrice = 0;

    for (let dishName in cart) {
        const item = cart[dishName];
        const li = document.createElement('li');
        li.textContent = `${dishName} - ${item.quantity} x $${item.price}`;
        cartItems.appendChild(li);
        totalPrice += item.price * item.quantity;
    }

    document.getElementById('totalPrice').textContent = totalPrice;
}

function checkout() {
    if (Object.keys(cart).length > 0) {
        // Hide the cart and show order confirmation
        document.getElementById('cart').style.display = 'none';
        document.getElementById('orderConfirmation').style.display = 'block';
    } else {
        alert('Your cart is empty!');
    }
}

function confirmOrder() {
    alert('Your order has been confirmed!');
    // Reset the cart and go back to initial state
    cart = {};
    updateCart();
    document.getElementById('cart').style.display = 'block';
    document.getElementById('orderConfirmation').style.display = 'none';
}
