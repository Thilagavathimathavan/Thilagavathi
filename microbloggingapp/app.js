// Load feed from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
});

// Create a new post
function createPost() {
    const content = document.getElementById('post-content').value;

    if (content.trim() === '') {
        alert("Post content is required!");
        return;
    }

    const post = {
        content: content,
        timestamp: new Date().toLocaleString(),
        likes: 0, // Initialize post with 0 likes
        comments: [] // Initialize post with an empty comments array
    };

    // Save the post in localStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Clear input fields
    document.getElementById('post-content').value = '';

    // Reload the feed
    loadFeed();
}

// Load the feed (all posts)
function loadFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.textContent = `${post.content} (Posted on ${post.timestamp})`;

        // Display the total number of comments
        const commentCount = document.createElement('p');
        commentCount.textContent = `Comments: ${post.comments.length}`;
        postDiv.appendChild(commentCount);

        // Create like button
        const likeBtn = document.createElement('button');
        likeBtn.innerHTML = `👍 Like (${post.likes})`; // Add the emoji next to the text
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

        // Create comment section
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Add a comment...';
        
        const commentBtn = document.createElement('button');
        commentBtn.textContent = 'Comment';
        
        // Add functionality to add a comment
        commentBtn.onclick = function () {
            const comment = commentInput.value;
            if (comment.trim() === '') {
                alert("Comment content is required!");
                return;
            }
            posts[index].comments.push(comment); // Add comment to post
            localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
            loadFeed(); // Reload feed to show updated comments
        };

        // Append elements to the post
        postDiv.appendChild(likeBtn);
        postDiv.appendChild(deleteBtn);
        postDiv.appendChild(commentInput);
        postDiv.appendChild(commentBtn);
        feed.appendChild(postDiv);
    });
}
