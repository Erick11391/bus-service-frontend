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
  const [loading, setLoading] = useState(false); // New state for loading

  // Fetch buses from the backend
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/buses");
        setBuses(response.data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };

    fetchBuses();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new bus
  const handleAddBus = async () => {
    if (!formData.busNumber || !formData.route || !formData.departureTime || !formData.arrivalTime) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/buses", formData);
      setBuses([...buses, response.data]);
      setFormData({ busNumber: "", route: "", departureTime: "", arrivalTime: "" });
    } catch (error) {
      console.error("Error adding bus:", error);
      alert("Failed to add bus.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Delete a bus
  const handleDeleteBus = async (id) => {
    const token = localStorage.getItem("token"); // Ensure token is stored in localStorage

    if (!token) {
      alert("You must be logged in to delete a bus.");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:5000/api/buses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setBuses(buses.filter((bus) => bus.id !== id)); // Remove the deleted bus from the state
    } catch (error) {
      console.error("Error deleting bus:", error);
      alert("Failed to delete bus. Ensure you have admin access.");
    }
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
        <button onClick={handleAddBus} disabled={loading}>
          {loading ? "Adding..." : "Add Bus"}
        </button>
      </div>

      {/* Bus List */}
      <h3>Bus List</h3>
      {buses.length > 0 ? (
        <ul>
          {buses.map((bus) => (
            <li key={bus.id}>
              <strong>{bus.busNumber}</strong> - {bus.route} ({bus.departureTime} to {bus.arrivalTime})
              <button onClick={() => handleDeleteBus(bus.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No buses available.</p>
      )}
    </div>
  );
};

export default BusManagement;
