const express = require("express");

const app = express();
const port = 4000;

app.use(express.json());  // Middleware to parse JSON data

const items = [
    { id: 1, name: 'jeans', type: 'trouser' },
    { id: 2, name: 'shirts', type: 'top' }
];

// GET all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// POST - Add a new item
app.post('/api/items', (req, res) => {
    const newItem = req.body;

    if (!newItem.name || !newItem.type) {
        return res.status(400).json({ error: "Name and type are required" });
    }

    newItem.id = items.length + 1; // Auto-increment ID
    items.push(newItem); // Add new item to the list
    res.status(201).json(newItem); // Return the created item
});

// PUT - Update an item (requires full update)
app.put('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;

    if (!updatedItem.name || !updatedItem.type) {
        return res.status(400).json({ error: "Name and type are required" });
    }

    const itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found" });
    }

    items[itemIndex] = { id: itemId, ...updatedItem };
    res.json(items[itemIndex]);
});

// PATCH - Update only specific fields
app.patch('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updates = req.body;

    const item = items.find(item => item.id === itemId);
    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }

    Object.assign(item, updates); // Merge updates into the existing object
    res.json(item);
});

// DELETE - Remove an item
app.delete('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found" });
    }

    const deletedItem = items.splice(itemIndex, 1); // Remove item from array
    res.json({ message: "Item deleted", deletedItem });
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
