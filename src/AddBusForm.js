// src/AddBusForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AddBusForm() {
  const [formData, setFormData] = useState({
    name: '',
    source: '',
    destination: '',
    departure_time: '',
    arrival_time: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/buses', formData);
      alert('Bus added successfully!');
      setFormData({
        name: '',
        source: '',
        destination: '',
        departure_time: '',
        arrival_time: ''
      });
    } catch (err) {
      console.error('Failed to add bus:', err);
      alert('Failed to add bus');
    }
  };

  return (
    <div>
      <h2>Add New Bus</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Bus Name" value={formData.name} onChange={handleChange} />
        <input name="source" placeholder="Source" value={formData.source} onChange={handleChange} />
        <input name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} />
        <input name="departure_time" placeholder="Departure Time" value={formData.departure_time} onChange={handleChange} />
        <input name="arrival_time" placeholder="Arrival Time" value={formData.arrival_time} onChange={handleChange} />
        <button type="submit">Add Bus</button>
      </form>
    </div>
  );
}

export default AddBusForm;
