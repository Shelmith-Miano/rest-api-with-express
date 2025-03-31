import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', instructions: '' });
  const navigate = useNavigate();

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Recipe Manager</h1>
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Recipe Name"
            value={newRecipe.name}
            onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            placeholder="Ingredients"
            value={newRecipe.ingredients}
            onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            placeholder="Instructions"
            value={newRecipe.instructions}
            onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Recipe
        </button>
      </form>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map(recipe => (
          <div key={recipe.id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-indigo-500/50 transition flex flex-col">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-indigo-700">{recipe.name}</h2>
              <p className="text-sm text-gray-600 mt-2"><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p className="text-sm text-gray-600 mt-2"><strong>Instructions:</strong> {recipe.instructions}</p>
            </div>
            <div className="mt-4 flex justify-between gap-2">
              <Link
                to={`/recipes/${recipe.id}`}
                className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition"
              >
                View
              </Link>
              <button
                onClick={() => navigate(`/recipes/${recipe.id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(recipe.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
