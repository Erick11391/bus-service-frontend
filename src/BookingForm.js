import React, { useState } from "react";
import BusList from "./BusList"; // Displays available buses
import "./BookingForm.css"; // Import styles

const BookingForm = () => {
  const [step, setStep] = useState(1); // Step 1: Search, Step 2: Bus Selection
  const [searchDetails, setSearchDetails] = useState({
    departure: "",
    destination: "",
    date: "",
    passengerCount: 1,
  });
  const [selectedBus, setSelectedBus] = useState(null);
  const [bookedBuses, setBookedBuses] = useState([]); // Track booked buses

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

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchDetails.departure || !searchDetails.destination || !searchDetails.date) {
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
            <label>Departure Location</label>
            <input
              type="text"
              value={searchDetails.departure}
              onChange={(e) =>
                setSearchDetails({ ...searchDetails, departure: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              value={searchDetails.destination}
              onChange={(e) =>
                setSearchDetails({ ...searchDetails, destination: e.target.value })
              }
              required
            />
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