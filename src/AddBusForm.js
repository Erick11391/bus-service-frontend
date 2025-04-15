import React, { useState } from 'react';
import axios from 'axios';
import { TOWNS } from './constants/routes';
import './AddBusForm.css';

function AddBusForm() {
  const [formData, setFormData] = useState({
    bus_number: '',
    source: '',
    destination: '',
    departure_time: '',
    arrival_time: '',
  });

  const [loading, setLoading] = useState(false);

  const busNames = Array.from({ length: 26 }, (_, i) => `Bus ${String.fromCharCode(65 + i)}`);

  const getRouteId = (source, destination) => `${source} to ${destination}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.source === formData.destination) {
      alert('Source and destination cannot be the same.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in as an admin to add a bus.');
      return;
    }

    try {
      setLoading(true);
      const route_name = getRouteId(formData.source, formData.destination);

      await axios.post(
        'http://localhost:5000/api/buses',
        {
          bus_number: formData.bus_number,
          route_id: route_name,
          departure_time: formData.departure_time,
          arrival_time: formData.arrival_time,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Bus added successfully!');
      setFormData({
        bus_number: '',
        source: '',
        destination: '',
        departure_time: '',
        arrival_time: '',
      });
    } catch (err) {
      console.error('Failed to add bus:', err);
      alert('Error adding bus. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-bus-form-container">
      <h2>Add New Bus</h2>
      <form onSubmit={handleSubmit} className="add-bus-form">
        <label htmlFor="bus_number">Bus Name</label>
        <select
          id="bus_number"
          name="bus_number"
          value={formData.bus_number}
          onChange={handleChange}
          required
        >
          <option value="">Select Bus Name</option>
          {busNames.map((bus, index) => (
            <option key={index} value={bus}>
              {bus}
            </option>
          ))}
        </select>

        <label htmlFor="source">From</label>
        <select
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
          required
        >
          <option value="">Select Source</option>
          {TOWNS.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label htmlFor="destination">To</label>
        <select
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
        >
          <option value="">Select Destination</option>
          {TOWNS.filter((city) => city !== formData.source).map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label htmlFor="departure_time">Departure Time</label>
        <input
          id="departure_time"
          type="time"
          name="departure_time"
          value={formData.departure_time}
          onChange={handleChange}
          required
        />

        <label htmlFor="arrival_time">Arrival Time</label>
        <input
          id="arrival_time"
          type="time"
          name="arrival_time"
          value={formData.arrival_time}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Bus'}
        </button>
      </form>
    </div>
  );
}

export default AddBusForm;
