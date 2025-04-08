// src/BusList.js
import React from 'react';
import DeleteButton from './DeleteButton';

function BusList({ schedules }) {
  return (
    <div>
      <h2>Bus Schedules</h2>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule.bus_id}>
            <h3>{schedule.route}</h3>
            <p>Start: {schedule.start}</p>
            <p>End: {schedule.end}</p>
            <DeleteButton busId={schedule.bus_id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BusList;
