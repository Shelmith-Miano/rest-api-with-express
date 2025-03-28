import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemDetail() {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    const res = await fetch(`http://localhost:5000/api/items/${id}`);
    const data = await res.json();
    setItem(data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    fetchItem();
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/api/items/${id}`, {
      method: 'DELETE',
    });
    navigate('/');
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h1>Item Details</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
        <select
          value={item.category}
          onChange={(e) => setItem({ ...item, category: e.target.value })}
        >
          <option value="Shirts">Shirts</option>
          <option value="Pants">Pants</option>
          <option value="Jackets">Jackets</option>
          <option value="Shoes">Shoes</option>
        </select>
        <input
          type="text"
          value={item.color}
          onChange={(e) => setItem({ ...item, color: e.target.value })}
        />
        <input
          type="date"
          value={item.lastWorn || ''}
          onChange={(e) => setItem({ ...item, lastWorn: e.target.value })}
        />
        <button type="submit">Update Item</button>
      </form>
      <button onClick={handleDelete}>Delete Item</button>
      <br />
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default ItemDetail;