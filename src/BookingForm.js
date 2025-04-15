import React, { useState, useEffect } from "react";
import BusList from "./BusList"; // Displays available buses
import "./BookingForm.css"; // Import styles

const BookingForm = () => {
  const [step, setStep] = useState(1); // Step 1: Search, Step 2: Bus Selection
  const [searchDetails, setSearchDetails] = useState({
    departure: "",
    destination: "",
    date: "",
    passengerCount: 1,
    name: "",         // Name field
    email: "",        // Email field
    phoneNumber: "",  // Phone Number field
  });
  const [selectedBus, setSelectedBus] = useState(null);
  const [bookedBuses, setBookedBuses] = useState([]); // Track booked buses

  // Fixed routes with 20 towns
  const routeOptions = [
    "Nairobi to Mombasa", "Nairobi to Kisumu", "Nairobi to Nakuru", "Nairobi to Eldoret", "Nairobi to Thika", 
    "Nairobi to Nyeri", "Nairobi to Meru", "Nairobi to Machakos", "Nairobi to Kisii", "Nairobi to Kericho", 
    "Nairobi to Kakamega", "Nairobi to Bungoma", "Nairobi to Malindi", "Nairobi to Kitui", "Nairobi to Garissa", 
    "Nairobi to Nyahururu", "Nairobi to Narok", "Nairobi to Voi", "Nairobi to Isiolo", 
    "Mombasa to Nairobi", "Kisumu to Nairobi", "Nakuru to Nairobi", "Eldoret to Nairobi", "Thika to Nairobi", 
    "Nyeri to Nairobi", "Meru to Nairobi", "Machakos to Nairobi", "Kisii to Nairobi", "Kericho to Nairobi", 
    "Kakamega to Nairobi", "Bungoma to Nairobi", "Malindi to Nairobi", "Kitui to Nairobi", "Garissa to Nairobi", 
    "Nyahururu to Nairobi", "Narok to Nairobi", "Voi to Nairobi", "Isiolo to Nairobi"
  ];

  // Generate unique departure and destination options
  const departureOptions = Array.from(
    new Set(routeOptions.map((route) => route.split(" to ")[0].trim()))
  );
  const destinationOptions = Array.from(
    new Set(routeOptions.map((route) => route.split(" to ")[1].trim()))
  );

  // Mock data for available buses (static)
  const staticBuses = [
    {
      id: 1,
      busNumber: "Bus 101",
      departureTime: "08:00 AM",
      arrivalTime: "09:00 AM",
    },
    {
      id: 2,
      busNumber: "Bus 102",
      departureTime: "09:00 AM",
      arrivalTime: "10:00 AM",
    },
  ];

  // Dynamically generate buses based on search details
  const dummyBuses = staticBuses.map((bus) => ({
    ...bus,
    route: `${searchDetails.departure} to ${searchDetails.destination}`,
  }));

  // Fetch user data from localStorage when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Assuming you stored user details in localStorage
    if (user) {
      setSearchDetails((prevDetails) => ({
        ...prevDetails,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }));
    }
  }, []);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (
      !searchDetails.departure ||
      !searchDetails.destination ||
      !searchDetails.date ||
      !searchDetails.name ||
      !searchDetails.email ||
      !searchDetails.phoneNumber
    ) {
      alert("Please fill in all fields.");
      return;
    }
    setStep(2); // Move to bus selection
  };

  // Handle bus selection
  const handleBusSelection = (bus) => {
    setSelectedBus(bus);
  };

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (!selectedBus) {
      alert("Please select a bus before confirming.");
      return;
    }

    // Mark the bus as booked
    setBookedBuses((prevBookedBuses) => [...prevBookedBuses, selectedBus.id]);

    // Simulate saving the booking details
    const bookingDetails = {
      busId: selectedBus.id,
      busNumber: selectedBus.busNumber,
      departure: searchDetails.departure,
      destination: searchDetails.destination,
      date: searchDetails.date,
      passengerCount: searchDetails.passengerCount,
      name: searchDetails.name,
      email: searchDetails.email,
      phoneNumber: searchDetails.phoneNumber,
    };

    console.log("Booking Confirmed:", bookingDetails);
    alert(`Booking confirmed for ${selectedBus.busNumber}`);
    setSelectedBus(null); // Reset selected bus
  };

  return (
    <div className="booking-page">
      <h2>Book Your Journey</h2>

      {/* Step 1: Search Form */}
      {step === 1 && (
        <form className="booking-form" onSubmit={handleSearch}>
          <div className="form-group">
            <label>🚌 Departure</label>
            <select
              value={searchDetails.departure}
              onChange={(e) =>
                setSearchDetails({ ...searchDetails, departure: e.target.value })
              }
              required
            >
              <option value="">Select Departure</option>
              {departureOptions.map((dep, index) => (
                <option key={index} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>🚌 Destination</label>
            <select
              value={searchDetails.destination}
              onChange={(e) =>
                setSearchDetails({ ...searchDetails, destination: e.target.value })
              }
              required
            >
              <option value="">Select Destination</option>
              {destinationOptions.map((dest, index) => (
                <option key={index} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={searchDetails.date}
              onChange={(e) =>
                setSearchDetails({ ...searchDetails, date: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Passenger Count</label>
            <input
              type="number"
              min="1"
              value={searchDetails.passengerCount}
              onChange={(e) =>
                setSearchDetails({ ...searchDetails, passengerCount: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={searchDetails.name}
              onChange={(e) =>
                setSearchDetails({ ...searchDetails, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={searchDetails.email}
              onChange={(e) =>
                setSearchDetails({ ...searchDetails, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={searchDetails.phoneNumber}
              onChange={(e) =>
                setSearchDetails({ ...searchDetails, phoneNumber: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Search Buses
          </button>
        </form>
      )}

      {/* Step 2: Bus List */}
      {step === 2 && (
        <div>
          <BusList
            buses={dummyBuses}
            bookedBuses={bookedBuses}
            onSelectBus={handleBusSelection}
            onConfirmBooking={handleConfirmBooking}
          />
        </div>
      )}
    </div>
  );
};

export default BookingForm;
