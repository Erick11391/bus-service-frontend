import React from "react";

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <h2>Welcome to Your Dashboard</h2>
      <p>Here are your upcoming bookings:</p>
      <ul>
        <li>Bus 101 - Downtown to Park (2023-10-15)</li>
        <li>Bus 102 - Airport to Central Station (2023-10-16)</li>
      </ul>
    </div>
  );
};

export default UserDashboard;