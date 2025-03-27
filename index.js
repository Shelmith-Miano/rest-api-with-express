const express = require('express');
const app = express();
const port = 3020;

// Middleware to parse JSON
app.use(express.json());

// Sample data
let users = [
    { id: 1, name: "Miano", age: 20 },
    { id: 2, name: "Shelmith", age: 25 }
];

// GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET a single user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

// POST - Add a new user
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT - Update a user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        Object.assign(user, req.body);
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// DELETE - Remove a user
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.json({ message: "User deleted" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
