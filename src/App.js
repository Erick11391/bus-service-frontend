import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import SearchSection from "./SearchSection";
import BusSchedules from "./BusSchedules";
import BookingForm from "./BookingForm";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import HomeGallery from "./HomeGallary";
import Footer from "./Footer";
import Login from "./Login";
import AdminPanel from "./AdminPanel";
import UserDashboard from "./UserDashboard";
import "./App.css";
import axios from "axios";

function App() {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/buses");
        setSchedules(response.data);
        setFilteredSchedules(response.data);
      } catch (error) {
        console.error("Failed to fetch bus data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSchedules();
  }, []);

  const handleSearch = () => {
    if (!departure && !destination) {
      setFilteredSchedules(schedules);
      return;
    }
    const filtered = schedules.filter((schedule) => {
      const routeParts = schedule.route.toLowerCase().split(" to ");
      const matchesDeparture = departure
        ? routeParts[0].includes(departure.toLowerCase())
        : true;
      const matchesDestination = destination
        ? routeParts[1].includes(destination.toLowerCase())
        : true;
      return matchesDeparture && matchesDestination;
    });
    setFilteredSchedules(filtered);
  };

  // Protect the admin route
  const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== requiredRole) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <div className="app">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingForm />} />

            {/* Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <HomeGallery />
                  {/* Removed SearchSection from Home */}
                  {loading ? (
                    <div className="loading">Loading schedules...</div>
                  ) : (
                    <BusSchedules schedules={filteredSchedules} />
                  )}
                </>
              }
            />

            {/* Schedules Route */}
            <Route
              path="/schedules"
              element={
                <>
                  <SearchSection
                    departure={departure}
                    setDeparture={setDeparture}
                    destination={destination}
                    setDestination={setDestination}
                    onSearch={handleSearch}
                  />
                  {loading ? (
                    <div className="loading">Loading schedules...</div>
                  ) : (
                    <BusSchedules schedules={schedules} />
                  )}
                </>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
