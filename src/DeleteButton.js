// src/DeleteButton.js
import React from 'react';

function DeleteButton({ busId, onDelete }) {
  const handleDelete = () => {
    fetch(`http://127.0.0.1:5000/schedules/${busId}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => onDelete(busId))  // Update the UI after deletion
      .catch(error => console.error('Error deleting schedule:', error));
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

export default DeleteButton;
