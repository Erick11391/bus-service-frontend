// src/EditBusForm.js
import React, { useState, useEffect } from 'react';

function EditBusForm({ match, fetchSchedules }) {
  const [busId, setBusId] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [route, setRoute] = useState('');

  useEffect(() => {
    // Fetch the bus schedule by ID to pre-fill the form fields
    const { busId } = match.params;
    fetch(`http://127.0.0.1:5000/schedules/${busId}`)
      .then(response => response.json())
      .then(data => {
        setBusId(data.bus_id);
        setStart(data.start);
        setEnd(data.end);
        setRoute(data.route);
      })
      .catch(error => console.error('Error:', error));
  }, [match.params]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBus = { bus_id: busId, start, end, route };

    fetch(`http://127.0.0.1:5000/schedules/${busId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBus),
    })
      .then(response => response.json())
      .then(data => {
        alert('Bus schedule updated successfully!');
        fetchSchedules();  // Refresh the schedule list
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Edit Bus Schedule</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={busId}
          disabled
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
        <button type="submit">Update Bus Schedule</button>
      </form>
    </div>
  );
}

export default EditBusForm;
