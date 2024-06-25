import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditItem = ({ itemId }) => {
  const [name, setName] = useState('');
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`/api/items/${itemId}`)
      .then(response => {
        setItem(response.data);
        setName(response.data.name);
      })
      .catch(error => console.error('Error:', error));
  }, [itemId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/items/${itemId}`, { name })
      .then(() => {
        // refresh list or handle success
      })
      .catch(error => console.error('Error:', error));
  };

  if (!item) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Update Item</button>
    </form>
  );
}

export default EditItem;
