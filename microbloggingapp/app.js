// Load feed from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', loadFeed);

function createPost() {
    const content = document.getElementById('post-content').value;
    if (content.trim() === '') {
        alert("Post cannot be empty!");
        return;
    }

    const post = {
        content: content,
        timestamp: new Date().toLocaleString()
    };

    // Save the post in localStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Clear the textarea
    document.getElementById('post-content').value = '';

    // Reload the feed
    loadFeed();
}

function loadFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.textContent = `${post.content} (Posted on ${post.timestamp})`;
        feed.appendChild(postDiv);
        
    });
        const likeBtn = document.createElement('button');
        likeBtn.textContent = `Like (${post.likes})`; // Display the number of likes
        likeBtn.classList.add('like-btn');
        
        // Add functionality to increment likes when clicked
        likeBtn.onclick = function () {
            posts[index].likes++; // Increment the number of likes
            localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
            loadFeed(); // Reload feed to show updated like count
        };

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        
        // Add functionality to delete post when clicked
        deleteBtn.onclick = function () {
            posts.splice(index, 1); // Remove post from array
            localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
            loadFeed(); // Reload feed to reflect the deletion
        };

        // Append like and delete buttons to each post
        postDiv.appendChild(likeBtn);
        postDiv.appendChild(deleteBtn);
        feed.appendChild(postDiv);
}) ;
}
