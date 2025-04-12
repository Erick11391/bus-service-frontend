import React, { useEffect, useState } from "react";
import axios from "axios";


const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from the backend
  useEffect(() => {
    axios.get("/api/bookings").then((response) => setBookings(response.data));
  }, []);

  // Delete a booking
  const handleDeleteBooking = (id) => {
    axios.delete(`/api/bookings/${id}`).then(() => {
      setBookings(bookings.filter((booking) => booking.id !== id));
    });
  };

  return (
    <div className="booking-management">
      <h2>Booking Management</h2>

      {/* Booking List */}
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <strong>{booking.userEmail}</strong> - {booking.busNumber} ({booking.date})
            <button onClick={() => handleDeleteBooking(booking.id)}>Cancel Booking</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingManagement;