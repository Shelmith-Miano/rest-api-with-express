import React, { useState, useEffect } from 'react';


function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', instructions: '' });

  useEffect(() => {
    fetch('http://localhost:4000/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add recipe');
        return res.json();
      })
      .then(data => {
        setRecipes([...recipes, data]);
        setNewRecipe({ name: '', ingredients: '', instructions: '' });
      })
      .catch(err => console.error('Add error:', err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/recipes/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete recipe');
        setRecipes(recipes.filter(r => r.id !== id));
      })
      .catch(err => console.error('Delete error:', err));
  };

  return (
    <div className="list">
      <h1 className="title">Recipe Manager</h1>
      
      <form onSubmit={handleAdd} className="card">
        <div className="input-group">
          <input
            type="text"
            placeholder="Recipe Name"
            value={newRecipe.name}
            onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Ingredients"
            value={newRecipe.ingredients}
            onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Instructions"
            value={newRecipe.instructions}
            onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="add-btn">Add Recipe</button>
      </form>
      
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h2 className="recipe-title">{recipe.name}</h2>
            <p className="recipe-text"><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p className="recipe-text"><strong>Instructions:</strong> {recipe.instructions}</p>
            <div className="button-group">
              <button className="view-btn" onClick={() => window.location.href = `/recipes/${recipe.id}`}>View</button>
              <button onClick={() => handleDelete(recipe.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
