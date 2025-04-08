import React from 'react';
import './BusSchedules.css';

function BusSchedules({ schedules }) {
  if (schedules.length === 0) {
    return <div className="no-schedules">No schedules available</div>;
  }

  return (
    <div className="bus-schedules">
      <h2>Bus Schedules</h2>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Start</th>
            <th>Destination</th>
            <th>Departure</th>
            <th>Arrival</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id} className={schedule.isNew ? 'new-schedule' : ''}>
              <td>{schedule.route}</td>
              <td>{schedule.start}</td>
              <td>{schedule.destination}</td>
              <td>{schedule.departure}</td>
              <td>{schedule.arrival}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BusSchedules;
