const express = require('express');
const cors = require('cors');
const sequelize = require('./database'); // Import database connection
const Recipe = require('./models/Recipe'); // Import model

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Read all recipes
app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.findAll();
  res.json(recipes);
});

// Read single recipe
app.get('/recipes/:id', async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json(recipe);
});

// Create a recipe
app.post('/recipes', async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;
    if (!name || !ingredients || !instructions) return res.status(400).json({ error: 'All fields required' });
    const recipe = await Recipe.create({ name, ingredients, instructions });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// Update a recipe (PUT)
app.put('/recipes/:id', async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    await recipe.update({ name, ingredients, instructions });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// Patch (Partial Update)
app.patch('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    await recipe.update(req.body); // Update only provided fields
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// Delete a recipe
app.delete('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    await recipe.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
