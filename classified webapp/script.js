document.addEventListener("DOMContentLoaded", () => {
    const addListingBtn = document.getElementById("addListingBtn");
    const modal = document.getElementById("addListingModal");
    const closeModal = document.querySelector(".close");
    const listingForm = document.getElementById("listingForm");
    const listingContainer = document.getElementById("listingContainer");

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

        const listing = document.createElement("div");
        listing.className = "listing";
        listing.innerHTML = `
            <img src="${imageUrl}" alt="${title}">
            <h3>${title}</h3>
            <p>${description}</p>
            <p>Price: $${price}</p>
            <p>Type: ${type === "sell" ? "For Sale" : "Looking to Buy"}</p>
        `;

        listingContainer.appendChild(listing);
        modal.style.display = "none";
        listingForm.reset();
    };
});
