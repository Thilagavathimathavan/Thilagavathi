// Register form handler
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Store user data locally (replace with backend integration later)
    localStorage.setItem('user', JSON.stringify({name, email, password}));
    alert('Registration successful!');
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let emailLogin = document.getElementById('emailLogin').value;
    let passwordLogin = document.getElementById('passwordLogin').value;

    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === emailLogin && user.password === passwordLogin) {
        alert('Login successful!');
    } else {
        alert('Incorrect email or password');
    }
});

// Sell product handler
document.getElementById('sellForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let productName = document.getElementById('productName').value;
    let productPrice = document.getElementById('productPrice').value;
    let productDescription = document.getElementById('productDescription').value;
    let productImage = document.getElementById('productImage').files[0];

    let reader = new FileReader();
    reader.onloadend = function() {
        let imageSrc = reader.result;

        let product = {
            name: productName,
            price: productPrice,
            description: productDescription,
            image: imageSrc
        };

        // Store product in local storage (or backend)
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
       
        alert('Product added successfully!');
        displayProducts(); // Refresh product list
    };

    if (productImage) {
        reader.readAsDataURL(productImage);
    }
});

// Function to display available products
function displayProducts() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let productList = document.querySelector('.product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        let productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <p>${product.description}</p>
            <button onclick="buyProduct('${product.name}')">Buy</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Function to handle buying a product
function buyProduct(productName) {
    alert(`You bought ${productName}!`);
}

// Initial call to display products on page load
displayProducts();

     // Function to handle buying a product (show delivery form)
function buyProduct(productName) {
    document.getElementById('deliveryInfo').style.display = 'block';
    let selectedProduct = productName;
    
    // Handle delivery form submission
    document.getElementById('deliveryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        let fullName = document.getElementById('fullName').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let postalCode = document.getElementById('postalCode').value;
        let phoneNumber = document.getElementById('phoneNumber').value;

        let deliveryInfo = {
            fullName,
            address,
            city,
            postalCode,
            phoneNumber,
            product: selectedProduct
        };

        // Store delivery info locally (or send it to a backend system)
        localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
        alert(`Purchase of ${selectedProduct} confirmed! Delivery to: ${address}, ${city}, ${postalCode}`);
        
        // Hide the delivery form after submission
        document.getElementById('deliveryInfo').style.display = 'none';
    });
}                                              
