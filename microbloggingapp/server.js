const express = require('express');
const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory storage
let posts = [];
let users = {}; // For simplicity, store users and their followers here

// Route to create a post
app.post('/post', (req, res) => {
    const content = req.body.content;
    const post = { content, timestamp: new Date() };
    posts.push(post);
    res.status(201).send('Post created');
});

// Route to get the feed (all posts in this simple example)
app.get('/feed', (req, res) => {
    res.json(posts);
});

// Serve the front-end
app.use(express.static(__dirname));

app.listen(port, () => {
    console.log(`Microblogging app listening at http://localhost:${port}`);
});