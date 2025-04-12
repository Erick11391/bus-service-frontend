import React from "react";
import "./BookingForm.css";

const BusList = ({ buses, bookedBuses, onSelectBus, onConfirmBooking }) => {
  return (
    <div className="bus-list">
      <h2>Available Buses</h2>
      <ul>
        {buses.map((bus) => {
          const isBooked = bookedBuses.includes(bus.id);

          return (
            <li key={bus.id} className={`bus-item ${isBooked ? "booked" : ""}`}>
              <div>
                <strong>{bus.busNumber}</strong> - {bus.route}
              </div>
              <div>
                Departure: {bus.departureTime} | Arrival: {bus.arrivalTime}
              </div>
              <div className="bus-actions">
                {isBooked ? (
                  <span className="booked-status">Booked</span>
                ) : (
                  <>
                    <button onClick={() => onSelectBus(bus)}>Select Bus</button>
                    <button onClick={() => onConfirmBooking(bus)}>Confirm Booking</button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BusList;