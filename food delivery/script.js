// Sample data for restaurants, menu items, and users
const restaurants = [
    { id: 1, name: 'Restaurant A', rating: 4.5, reviews: 120, cuisine: 'Italian', menu: [{ name: 'Pizza', price: 100,img:"pizza.jpg'}, { name: 'Burger', price: 150,img:"burger.jpg"},{name:'Showerma',price:140,img:"showerma.jpg"}] },
    { id: 2, name: 'Restaurant B', rating: 4.0, reviews: 80, cuisine: 'Chinese', menu: [{ name: 'Noodles', price: 80 ,img:"noodles.jpg"}, { name: 'Spring Rolls', price: 60 ,img:"springrolls.jpg"},{name:'grill chicken', price:160,img:"grillchicken.jpg"}] }
];

  // Mock user data
let users= [];
let loggedInUser = null;  // To keep traletk of the logged-in user
let cart = [];

// Load Home Page on Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderHomePage();

    // Setup Event Listeners for Navigation Links
    document.getElementById('login-link').addEventListener('click', renderLoginPage);
    document.getElementById('home-link').addEventListener('click', renderHomePage);
    document.getElementById('cart-link').addEventListener('click', renderCartPage);
    document.getElementById('signup-link').addEventListener('click', renderSignupPage);
});

// Render Home Page - Display All Restaurants
function renderHomePage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Available Restaurants</h2>
        <input type="text" id="search-input" placeholder="Search by name..." oninput="filterRestaurants()">
        <div id="restaurant-list"></div>
    `;

    renderRestaurantList(restaurants);
}

// Render Restaurant List
function renderRestaurantList(restaurantList) {
    const restaurantListDiv = document.getElementById('restaurant-list');
    restaurantListDiv.innerHTML = '';

    restaurantList.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.classList.add('restaurant-card');
        restaurantCard.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p>Rating: ${restaurant.rating} ★ (${restaurant.reviews} reviews)</p>
            <p>Cuisine: ${restaurant.cuisine}</p>
            <button class="button" onclick="viewRestaurant(${restaurant.id})">View Menu</button>
        `;
        restaurantListDiv.appendChild(restaurantCard);
    });
}

// Filter Restaurants by Name
function filterRestaurants() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const filteredRestaurants = restaurants.filter(r => r.name.toLowerCase().includes(searchValue));
    renderRestaurantList(filteredRestaurants);
}

// View Restaurant Menu
function viewRestaurant(restaurantId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    const content = document.getElementById('content');

    content.innerHTML = `<h2>${restaurant.name} Menu</h2>`;
    restaurant.menu.forEach(item => {
        const menuItemCard = document.createElement('div');
        menuItemCard.classList.add('menu-item-card');
        menuItemCard.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button class="button" onclick="addToCart('${restaurant.name}', '${item.name}', ${item.price})">Add to Cart</button>
        `;
        content.appendChild(menuItemCard);
    });
}

// Add Item to Cart
function addToCart(restaurantName, itemName, price) {
    cart.push({ restaurantName, itemName, price });
    alert(`${itemName} added to cart.`);
}

// Render Cart Page
function renderCartPage() {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Your Cart</h2>';

    if (cart.length === 0) {
        content.innerHTML += '<p>Your cart is empty.</p>';
        return;
    }

    const cartList = document.createElement('ul');
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.itemName} from ${item.restaurantName} - $${item.price}
            <button class="remove-button" onclick="removeFromCart('${item.itemName}')">Remove</button>
        `;
        cartList.appendChild(listItem);
    });
    content.appendChild(cartList);

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    content.innerHTML += `<p>Total: $${total}</p>`;
    content.innerHTML += '<button class="button" onclick="checkout()">Proceed to Checkout</button>';
}

// Remove Item from Cart
function removeFromCart(itemName) {
    cart = cart.filter(item => item.itemName !== itemName);
    renderCartPage();
}

// Checkout Functionality
function checkout() {
    alert('Thank you for your order!');
    cart = [];  // Clear the cart after checkout
    renderHomePage();  // Redirect to Home Page
}

// Render Login Page
function renderLoginPage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Login</h2>
        <form id="login-form">
            <label>Username</label>
            <input type="text" id="login-username" required>
            <label>Password</label>
            <input type="password" id="login-password" required>
            <button class="button" type="submit">Login</button>
        </form>
    `;

    document.getElementById('login-form').addEventListener('submit', loginUser);
}
