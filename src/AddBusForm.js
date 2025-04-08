// src/AddBusForm.js
import React, { useState } from 'react';

function AddBusForm() {
  const [busId, setBusId] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [route, setRoute] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBus = { bus_id: busId, start, end, route };

    fetch('http://127.0.0.1:5000/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBus),
    })
      .then(response => response.json())
      .then(data => {
        alert('Bus schedule added successfully!');
        setBusId('');
        setStart('');
        setEnd('');
        setRoute('');
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Add New Bus Schedule</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Bus ID"
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Start Location"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Location"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <input
          type="text"
          placeholder="Route"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        />
        <button type="submit">Add Bus Schedule</button>
      </form>
    </div>
  );
}

export default AddBusForm;
