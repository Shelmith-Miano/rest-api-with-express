import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editRecipe, setEditRecipe] = useState({ name: '', ingredients: '', instructions: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/recipes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Recipe not found');
        return res.json();
      })
      .then(data => {
        setRecipe(data);
        setEditRecipe(data);
      })
      .catch(err => console.error('Fetch error:', err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editRecipe),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update recipe');
        return res.json();
      })
      .then(data => {
        setRecipe(data);
        setIsEditing(false);
      })
      .catch(err => console.error('Update error:', err));
  };

  if (!recipe) return <div className="text-center text-pink-950">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate('/')}
        className="mb-6 bg-gradient-to-r from-pink-950 to-pink-300 text-white px-4 py-2 rounded-lg hover:from-pink-900 hover:to-pink-400 transition"
      >
        Back to List
      </button>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl shadow-lg shadow-pink-950/50">
          <input
            type="text"
            value={editRecipe.name}
            onChange={(e) => setEditRecipe({ ...editRecipe, name: e.target.value })}
            className="w-full p-3 mb-4 bg-pink-50 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-950"
            required
          />
          <textarea
            value={editRecipe.ingredients}
            onChange={(e) => setEditRecipe({ ...editRecipe, ingredients: e.target.value })}
            className="w-full p-3 mb-4 bg-pink-50 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-950"
            rows="4"
            placeholder="Ingredients"
            required
          />
          <textarea
            value={editRecipe.instructions}
            onChange={(e) => setEditRecipe({ ...editRecipe, instructions: e.target.value })}
            className="w-full p-3 mb-4 bg-pink-50 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-950"
            rows="4"
            placeholder="Instructions"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-950 to-pink-300 text-white p-3 rounded-lg hover:from-pink-900 hover:to-pink-400 transition"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg shadow-pink-950/50">
          <h1 className="text-3xl font-bold text-pink-950 mb-4">{recipe.name}</h1>
          <p className="text-lg text-gray-700 mb-4"><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Instructions:</strong> {recipe.instructions}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Edit Recipe
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;