import React, { useEffect, useState } from "react";
import axios from "axios";


const BusManagement = () => {
  const [buses, setBuses] = useState([]);
  const [formData, setFormData] = useState({
    busNumber: "",
    route: "",
    departureTime: "",
    arrivalTime: "",
  });

  // Fetch buses from the backend
  useEffect(() => {
    axios.get("/api/buses").then((response) => setBuses(response.data));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new bus
  const handleAddBus = () => {
    axios.post("/api/buses", formData).then((response) => {
      setBuses([...buses, response.data]);
      setFormData({ busNumber: "", route: "", departureTime: "", arrivalTime: "" });
    });
  };

  // Delete a bus
  const handleDeleteBus = (id) => {
    axios.delete(`/api/buses/${id}`).then(() => {
      setBuses(buses.filter((bus) => bus.id !== id));
    });
  };

  return (
    <div className="bus-management">
      <h2>Bus Management</h2>

      {/* Add Bus Form */}
      <div className="add-bus-form">
        <h3>Add New Bus</h3>
        <input
          type="text"
          name="busNumber"
          placeholder="Bus Number"
          value={formData.busNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="route"
          placeholder="Route"
          value={formData.route}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="departureTime"
          placeholder="Departure Time"
          value={formData.departureTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="arrivalTime"
          placeholder="Arrival Time"
          value={formData.arrivalTime}
          onChange={handleChange}
          required
        />
        <button onClick={handleAddBus}>Add Bus</button>
      </div>

      {/* Bus List */}
      <h3>Bus List</h3>
      <ul>
        {buses.map((bus) => (
          <li key={bus.id}>
            <strong>{bus.busNumber}</strong> - {bus.route} ({bus.departureTime} to {bus.arrivalTime})
            <button onClick={() => handleDeleteBus(bus.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusManagement;