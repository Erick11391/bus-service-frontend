import React, { useState, useEffect } from 'react';

const AvailableBuses = ({ departureLocation, arrivalLocation }) => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      if (departureLocation && arrivalLocation) {
        try {
          const response = await fetch(`/api/buses?departure=${departureLocation}&arrival=${arrivalLocation}`);
          const data = await response.json();
          setBuses(data.buses);
        } catch (error) {
          console.error('Error fetching buses:', error);
        }
      }
    };

    fetchBuses();
  }, [departureLocation, arrivalLocation]);

  return (
    <div>
      <h3>Available Buses</h3>
      {buses.length > 0 ? (
        <ul>
          {buses.map((bus) => (
            <li key={bus.id}>
              {bus.name} - {bus.time} - {bus.availableSeats} seats available
            </li>
          ))}
        </ul>
      ) : (
        <p>No buses available for the selected route.</p>
      )}
    </div>
  );
};

export default AvailableBuses;
