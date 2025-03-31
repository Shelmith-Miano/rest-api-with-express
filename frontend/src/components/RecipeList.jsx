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
      .then(res => res.json())
      .then(data => {
        setRecipes([...recipes, data]);
        setNewRecipe({ name: '', ingredients: '', instructions: '' });
      })
      .catch(err => console.error('Add error:', err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/recipes/${id}`, { method: 'DELETE' })
      .then(() => setRecipes(recipes.filter(r => r.id !== id)))
      .catch(err => console.error('Delete error:', err));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Recipe Manager</h1>
      
      {/* Add Recipe Form */}
      <form onSubmit={handleAdd} className="bg-white p-5 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Name" value={newRecipe.name} 
            onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })} 
            className="p-2 border rounded" required />
          <input type="text" placeholder="Ingredients" value={newRecipe.ingredients} 
            onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} 
            className="p-2 border rounded" required />
          <input type="text" placeholder="Instructions" value={newRecipe.instructions} 
            onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })} 
            className="p-2 border rounded" required />
        </div>
        <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Recipe</button>
      </form>
      
      {/* Recipe List */}
      <div className="grid gap-4">
        {recipes.map(recipe => (
          <div key={recipe.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{recipe.name}</h2>
              <p className="text-sm text-gray-600">Ingredients: {recipe.ingredients}</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/recipes/${recipe.id}`} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">View</Link>
              <button onClick={() => navigate(`/recipes/${recipe.id}`)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
              <button onClick={() => handleDelete(recipe.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
