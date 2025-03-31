const express = require('express');
const cors = require('cors');
const app = express();

const port = 4000; // Define port

app.use(cors());
app.use(express.json()); // Using body-parser built into Express

// In-memory recipe storage (replace with database later if needed)
let recipes = [
  { id: 1, name: 'Chocolate Cake', ingredients: 'Flour, Sugar, Cocoa', instructions: 'Mix, bake at 350°F for 30 mins' },
  { id: 2, name: 'Pasta Primavera', ingredients: 'Pasta, Veggies, Olive Oil', instructions: 'Boil pasta, sauté veggies' },
];
let nextId = 3;

// CRUD Endpoints
// Read all recipes
app.get('/recipes', (req, res) => {
  res.json(recipes);
});

// Read single recipe
app.get('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json(recipe);
});

// Create a recipe
app.post('/recipes', (req, res) => {
  const { name, ingredients, instructions } = req.body;
  if (!name || !ingredients || !instructions) return res.status(400).json({ error: 'All fields required' });
  const recipe = { id: nextId++, name, ingredients, instructions };
  recipes.push(recipe);
  res.status(201).json(recipe);
});

// Update a recipe
app.put('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, ingredients, instructions } = req.body;
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  recipe.name = name || recipe.name;
  recipe.ingredients = ingredients || recipe.ingredients;
  recipe.instructions = instructions || recipe.instructions;
  res.json(recipe);
});

// Delete a recipe
app.delete('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = recipes.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: 'Recipe not found' });
  recipes.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => { // Use 'port' (lowercase) to match the variable
  console.log(`Server running on http://localhost:${port}`);
});