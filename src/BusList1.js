import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BusList1() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/buses");
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const handleDeleteBus = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a bus.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/buses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBuses(buses.filter(bus => bus.id !== id));
    } catch (error) {
      console.error("Error deleting bus:", error);
      alert("Failed to delete bus. Ensure you have admin access.");
    }
  };

  return (
    <div>
      <h3>Bus List</h3>
      {buses.length > 0 ? (
        <ul>
          {buses.map((bus) => (
            <li key={bus.id}>
              <strong>{bus.name}</strong> | From: {bus.source} → To: {bus.destination} | 
              Departure: {bus.departure_time}, Arrival: {bus.arrival_time}
              <button onClick={() => handleDeleteBus(bus.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No buses available.</p>
      )}
    </div>
  );
}

export default BusList1;
