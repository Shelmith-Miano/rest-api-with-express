import React, { useState, useEffect } from 'react';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', instructions: '' });
  const [editingRecipe, setEditingRecipe] = useState(null); // State to track which recipe is being edited
  const [updatedRecipe, setUpdatedRecipe] = useState({ name: '', ingredients: '', instructions: '' });

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

  // Handle Edit Button Click
  const handleEditClick = (recipe) => {
    setEditingRecipe(recipe.id);
    setUpdatedRecipe({ name: recipe.name, ingredients: recipe.ingredients, instructions: recipe.instructions });
  };

  // Handle Update Recipe
  const handleUpdate = (id) => {
    fetch(`http://localhost:4000/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRecipe),
    })
      .then(res => res.json())
      .then(data => {
        setRecipes(recipes.map(r => (r.id === id ? data : r)));
        setEditingRecipe(null);
      })
      .catch(err => console.error('Update error:', err));
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
            {editingRecipe === recipe.id ? (
              <div>
                <input type="text" value={updatedRecipe.name} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, name: e.target.value })} />
                <input type="text" value={updatedRecipe.ingredients} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, ingredients: e.target.value })} />
                <input type="text" value={updatedRecipe.instructions} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, instructions: e.target.value })} />
                <button onClick={() => handleUpdate(recipe.id)}>Save</button>
                <button onClick={() => setEditingRecipe(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h2 className="recipe-title">{recipe.name}</h2>
                <p className="recipe-text"><strong>Ingredients:</strong> {recipe.ingredients}</p>
                <p className="recipe-text"><strong>Instructions:</strong> {recipe.instructions}</p>
                <div className="button-group">
                  <button className="view-btn" onClick={() => window.location.href = `/recipes/${recipe.id}`}>View</button>
                  <button onClick={() => handleEditClick(recipe)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(recipe.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;