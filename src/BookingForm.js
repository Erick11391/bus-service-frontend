import React, { useState } from 'react';

const BookingForm = () => {
  const [departureLocation, setDepartureLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      departureLocation,
      arrivalLocation,
      date,
      seats,
    };

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Booking successful!');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div>
      <h2>Book Your Bus</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Departure Location:</label>
          <input
            type="text"
            value={departureLocation}
            onChange={(e) => setDepartureLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Arrival Location:</label>
          <input
            type="text"
            value={arrivalLocation}
            onChange={(e) => setArrivalLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Travel Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Seats:</label>
          <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            min="1"
            required
          />
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
