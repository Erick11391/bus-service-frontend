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
import BookingForm from "./BookingForm";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import HomeGallery from "./HomeGallary";
import Footer from "./Footer";
import Login from "./Login";
import AdminPanel from "./AdminPanel";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
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
        if (response.data && Array.isArray(response.data)) {
          setSchedules(response.data);
          setFilteredSchedules(response.data);
        } else {
          throw new Error("Invalid schedule data format");
        }
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
      const routeParts = schedule.route.toLowerCase().split(" → ");
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

  useEffect(() => {
    handleSearch();
  }, [departure, destination]);

  const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const roleCheck = Array.isArray(requiredRole)
      ? requiredRole.includes(role)
      : role === requiredRole;

    if (!token || !roleCheck) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <div className="app">
        <Navbar />

        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingForm />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole={["admin", "user"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Panel */}
            <Route
              path="/admin-panel"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPanel />
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
                  {loading ? (
                    <div className="loading">Loading schedules...</div>
                  ) : (
                    <div className="schedule-list">
                      {filteredSchedules.map((schedule) => (
                        <div key={schedule.id} className="schedule-item">
                          <p>{schedule.bus_number} - {schedule.route}</p>
                        </div>
                      ))}
                    </div>
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
                    schedules={filteredSchedules}
                    onSearch={handleSearch}
                  />
                  {loading ? (
                    <div className="loading">Loading schedules...</div>
                  ) : (
                    <div className="schedule-list">
                      {filteredSchedules.map((schedule) => (
                        <div key={schedule.id} className="schedule-item">
                          <p>{schedule.bus_number} - {schedule.route}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
