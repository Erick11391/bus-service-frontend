import React, { useState } from 'react';
import axios from 'axios';
import { TOWNS } from './constants/routes'; // Assuming this is a list of towns

function AddBusForm() {
  const [formData, setFormData] = useState({
    bus_number: '',
    source: '',
    destination: '',
    departure_time: '',
    arrival_time: ''
  });

  // Generate bus names from A to Z
  const busNames = Array.from({ length: 26 }, (_, i) => `Bus ${String.fromCharCode(65 + i)}`);

  // Function to get route_id based on source and destination
  const getRouteId = (source, destination) => {
    // Generate route name (assumes route is in "Source to Destination" format)
    return `${source} to ${destination}`;
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (formData.source === formData.destination) {
      alert("Source and destination cannot be the same.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in as admin to add a bus.");
      return;
    }

    try {
      const route_name = getRouteId(formData.source, formData.destination);

      // Send POST request to backend with route_id instead of source and destination
      const response = await axios.post(
        'http://localhost:5000/api/buses',
        {
          bus_number: formData.bus_number,
          route_id: route_name, // Using the route name instead of source and destination
          departure_time: formData.departure_time,
          arrival_time: formData.arrival_time
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Bus added successfully!');
      // Reset form
      setFormData({
        bus_number: '',
        source: '',
        destination: '',
        departure_time: '',
        arrival_time: ''
      });

    } catch (err) {
      console.error('Failed to add bus:', err);
      alert('Failed to add bus. Please check server response or token.');
    }
  };

  return (
    <div>
      <h2>Add New Bus</h2>
      <form onSubmit={handleSubmit}>
        <label>Bus Name</label>
        <select name="bus_number" value={formData.bus_number} onChange={handleChange} required>
          <option value="">Select Bus Name</option>
          {busNames.map((bus, index) => (
            <option key={index} value={bus}>{bus}</option>
          ))}
        </select>

        <label>From</label>
        <select name="source" value={formData.source} onChange={handleChange} required>
          <option value="">Select Source</option>
          {TOWNS.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>

        <label>To</label>
        <select name="destination" value={formData.destination} onChange={handleChange} required>
          <option value="">Select Destination</option>
          {TOWNS.filter(city => city !== formData.source).map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>

        <label>Departure Time</label>
        <input
          type="time"
          name="departure_time"
          value={formData.departure_time}
          onChange={handleChange}
          required
        />

        <label>Arrival Time</label>
        <input
          type="time"
          name="arrival_time"
          value={formData.arrival_time}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Bus</button>
      </form>
    </div>
  );
}

export default AddBusForm;
