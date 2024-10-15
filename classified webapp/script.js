document.addEventListener("DOMContentLoaded", () => {
    const addListingBtn = document.getElementById("addListingBtn");
    const modal = document.getElementById("addListingModal");
    const closeModal = document.querySelector(".close");
    const listingForm = document.getElementById("listingForm");
    const listingContainer = document.getElementById("listingContainer");

    // Load existing listings from local storage
    loadListings();

    // Open modal
    addListingBtn.onclick = () => modal.style.display = "block";

    // Close modal
    closeModal.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Handle form submission
    listingForm.onsubmit = (e) => {
        e.preventDefault();
        
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        const imageFile = document.getElementById("image").files[0];
        const type = document.getElementById("type").value;
        const imageUrl = URL.createObjectURL(imageFile);

        const listing = {
            title,
            description,
            price,
            imageUrl,
            type,
        };

        // Save to local storage
        saveListing(listing);
        modal.style.display = "none";
        listingForm.reset();
    };

    function saveListing(listing) {
        let listings = JSON.parse(localStorage.getItem("listings")) || [];
        listings.push(listing);
        localStorage.setItem("listings", JSON.stringify(listings));
        displayListing(listing);
    }

    function loadListings() {
        const listings = JSON.parse(localStorage.getItem("listings")) || [];
        listings.forEach(displayListing);
    }

    function displayListing(listing) {
        const listingDiv = document.createElement("div");
        listingDiv.className = "listing";
        listingDiv.innerHTML = `
            <img src="${listing.imageUrl}" alt="${listing.title}">
            <h3>${listing.title}</h3>
            <p>${listing.description}</p>
            <p>Price: $${listing.price}</p>
            <p>Type: ${listing.type === "sell" ? "For Sale" : "Looking to Buy"}</p>
        `;
        listingContainer.appendChild(listingDiv);
    }
});
