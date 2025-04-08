import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Your Navbar component
import SearchBar from './SearchBar'; // Your SearchBar component
import BusSchedules from './BusSchedules'; // Your BusSchedules component
import Home from './Home'; // Home Component (A bit more fun and informative)
import AvailableBuses from './AvailableBuses'; // New AvailableBuses component
import BookingForm from './BookingForm'; // New BookingForm component
import './App.css';

function App() {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departureLocation, setDepartureLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');

  // Dummy bus schedule data
  const dummySchedules = [
    {
      id: 1,
      busNumber: 'Bus 101',
      start: '08:00 AM',
      end: '09:00 AM',
      route: 'Downtown to Park',
    },
    {
      id: 2,
      busNumber: 'Bus 102',
      start: '09:00 AM',
      end: '10:00 AM',
      route: 'Airport to Central Station',
    },
    {
      id: 3,
      busNumber: 'Bus 103',
      start: '10:30 AM',
      end: '11:30 AM',
      route: 'Mall to City Center',
    },
    {
      id: 4,
      busNumber: 'Bus 104',
      start: '12:00 PM',
      end: '01:00 PM',
      route: 'Uptown to Suburbs',
    },
  ];

  // Simulating API fetch by setting the dummy schedules
  useEffect(() => {
    setSchedules(dummySchedules);
    setFilteredSchedules(dummySchedules); // Initially set filtered data to all schedules
    setLoading(false);
  }, []);

  // Handle search functionality
  const handleSearch = (query) => {
    if (!query) {
      setFilteredSchedules(schedules);
      return;
    }
    const filtered = schedules.filter(schedule =>
      schedule.route.toLowerCase().includes(query.toLowerCase()) ||
      schedule.start.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSchedules(filtered);
  };

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <div className="search-section">
          <h2>Find Your Bus Schedule</h2>
          <SearchBar onSearch={handleSearch} />
          <div className="location-inputs">
            <input
              type="text"
              placeholder="Departure Location"
              value={departureLocation}
              onChange={(e) => setDepartureLocation(e.target.value)}
              className="location-input"
            />
            <input
              type="text"
              placeholder="Arrival Location"
              value={arrivalLocation}
              onChange={(e) => setArrivalLocation(e.target.value)}
              className="location-input"
            />
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading schedules...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/bus-schedules"
              element={
                <div className="bus-schedule-container">
                  <BusSchedules schedules={filteredSchedules} />
                  <AvailableBuses
                    departureLocation={departureLocation}
                    arrivalLocation={arrivalLocation}
                    schedules={filteredSchedules}
                  />
                  <BookingForm />
                </div>
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
