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
    <div className="details">
      <button
        onClick={() => navigate('/')}
        className="back"
      >
        Back to List
      </button>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="bg-white ">
          <input
            type="text"
            value={editRecipe.name}
            onChange={(e) => setEditRecipe({ ...editRecipe, name: e.target.value })}
            className="w-full"
            required
          />
          <textarea
            value={editRecipe.ingredients}
            onChange={(e) => setEditRecipe({ ...editRecipe, ingredients: e.target.value })}
            className="w-full"
            rows="4"
            placeholder="Ingredients"
            required
          />
          <textarea
            value={editRecipe.instructions}
            onChange={(e) => setEditRecipe({ ...editRecipe, instructions: e.target.value })}
            className="w-full "
            rows="4"
            placeholder="Instructions"
            required
          />
          <button
            type="submit"
            className="w-full "
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="bg-white ">
          <h1 className=" font-bold ">{recipe.name}</h1>
          <p className="text-gray-700 "><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p className="text-gray-700 "><strong>Instructions:</strong> {recipe.instructions}</p>
         
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;