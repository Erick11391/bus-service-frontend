const BookingForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="booking-page">
      <h2>Book Your Journey</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Departure Location</label>
          <input type="text" required />
        </div>
        <div className="form-group">
          <label>Destination</label>
          <input type="text" required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" required />
        </div>
        <div className="form-group">
          <label>Passenger Count</label>
          <input type="number" min="1" defaultValue="1" required />
        </div>
        <button type="submit" className="submit-btn">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;