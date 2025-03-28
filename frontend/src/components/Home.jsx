import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ItemList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', category: '', color: '', lastWorn: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/api/items');
    const data = await res.json();
    setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    setNewItem({ name: '', category: '', color: '', lastWorn: '' });
    fetchItems();
  };

  return (
    <div>
      <h1>Wardrobe Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Shirts">Shirts</option>
          <option value="Pants">Pants</option>
          <option value="Jackets">Jackets</option>
          <option value="Shoes">Shoes</option>
        </select>
        <input
          type="text"
          placeholder="Color"
          value={newItem.color}
          onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
          required
        />
        <input
          type="date"
          value={newItem.lastWorn}
          onChange={(e) => setNewItem({ ...newItem, lastWorn: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>

      <h2>All Wardrobe Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/items/${item.id}`}>
              {item.name} ({item.category}, {item.color})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;