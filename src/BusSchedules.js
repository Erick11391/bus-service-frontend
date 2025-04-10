import { Link } from 'react-router-dom';

const BusSchedules = ({ schedules }) => {
  return (
    <div className="schedules-container">
      {schedules.map(schedule => (
        <div key={schedule.id} className="schedule-card">
          <h3>{schedule.busNumber}</h3>
          <p><strong>Route:</strong> {schedule.route}</p>
          <p><strong>Departure:</strong> {schedule.departureTime}</p>
          <p><strong>Arrival:</strong> {schedule.arrivalTime}</p>
          <Link to="/booking" className="book-btn">Book Now</Link>
        </div>
      ))}
    </div>
  );
};

export default BusSchedules;