import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminPanel from './AdminPanel';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "user") {
      axios
        .get("http://127.0.0.1:5000/api/upcoming-trips")
        .then((response) => setUpcomingTrips(response.data))
        .catch((error) => console.error("Error fetching trips:", error));
    }
  }, [role]);

  const handleBookTrip = () => {
    // Optional: Pass default values to prefill the booking form
    const defaultDetails = {
      departure: "Downtown",
      destination: "Uptown",
      date: new Date().toISOString().split("T")[0],
      passengerCount: 1,
    };

    navigate("/booking", { state: defaultDetails });
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {role === "admin" ? (
        <AdminPanel />
      ) : (
        <div className="user-panel">
          <h3>Your Upcoming Trips</h3>

          {upcomingTrips.length > 0 ? (
            <ul>
              {upcomingTrips.map((trip, index) => (
                <li key={index}>
                  <strong>{trip.busNumber}</strong> - {trip.route} (
                  {trip.departureTime} to {trip.arrivalTime})
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming trips found.</p>
          )}

          <button onClick={handleBookTrip}>Book a Trip</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
