import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import SearchSection from './SearchSection';
import BusSchedules from './BusSchedules';
import BookingForm from './BookingForm';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import HomeGallery from './HomeGallary'; // Import the gallery component
import Footer from './Footer';
import './App.css';

function App() {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  const dummySchedules = [
    { id: 1, busNumber: 'Bus 101', departureTime: '08:00 AM', arrivalTime: '09:00 AM', route: 'Downtown to Park' },
    { id: 2, busNumber: 'Bus 102', departureTime: '09:00 AM', arrivalTime: '10:00 AM', route: 'Airport to Central Station' },
    { id: 3, busNumber: 'Bus 103', departureTime: '10:30 AM', arrivalTime: '11:30 AM', route: 'Mall to City Center' },
    { id: 4, busNumber: 'Bus 104', departureTime: '12:00 PM', arrivalTime: '01:00 PM', route: 'Uptown to Suburbs' },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSchedules(dummySchedules);
      setFilteredSchedules(dummySchedules);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = () => {
    if (!departure && !destination) {
      setFilteredSchedules(schedules);
      return;
    }
    const filtered = schedules.filter(schedule => {
      const routeParts = schedule.route.toLowerCase().split(' to ');
      const matchesDeparture = departure ? routeParts[0].includes(departure.toLowerCase()) : true;
      const matchesDestination = destination ? routeParts[1].includes(destination.toLowerCase()) : true;
      return matchesDeparture && matchesDestination;
    });
    setFilteredSchedules(filtered);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        
        {/* Hero Section only shows on home page */}
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <HomeGallery /> {/* Add gallery below hero on homepage */}
            </>
          } />
        </Routes>
        
        <main className="main-content">
          {/* Search Section shows on home and schedules pages */}
          <Routes>
            <Route path="/" element={
              <SearchSection 
                departure={departure}
                setDeparture={setDeparture}
                destination={destination}
                setDestination={setDestination}
                onSearch={handleSearch}
              />
            } />
            <Route path="/schedules" element={
              <SearchSection 
                departure={departure}
                setDeparture={setDeparture}
                destination={destination}
                setDestination={setDestination}
                onSearch={handleSearch}
              />
            } />
          </Routes>
          
          <Routes>
            <Route path="/" element={
              loading ? (
                <div className="loading">Loading schedules...</div>
              ) : (
                <BusSchedules schedules={filteredSchedules} />
              )
            } />
            
            <Route path="/schedules" element={
              loading ? (
                <div className="loading">Loading schedules...</div>
              ) : (
                <BusSchedules schedules={schedules} />
              )
            } />
            
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Optional: If you want gallery as a separate page */}
            {/* <Route path="/gallery" element={<HomeGallery />} /> */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;