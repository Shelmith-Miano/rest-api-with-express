
const express = require("express");


const app = express();
const PORT = 4000;

app.use(express.json());  // middleware to parse JSON data

const items = [
    {id: 1, name: 'jeans', type: 'trouser'},
    {id: 2, name: 'shirts', type: 'top'}
];

// get
app.get('/items', (req, res) => {
    res.json(items);
})

//post
app.post('/api/items', (req, res) => {
    const newItem = req.body;

    if (!newItem.name || !newItem.type) {
        return res.status(400).json({ error: "Name and type are required" });
    }

    newItem.id = items.length + 1; // auto increment id
    items.push(newItem);
    res.status(201).json(newItem);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})