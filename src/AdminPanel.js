import React, { useState } from "react";
import BookingManagement from "./BookingManagement";
import UserManagement from "./UserManagement";
import AddBusForm from "./AddBusForm";
import BusList1 from "./BusList1"; // Corrected import

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("buses");

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <div className="tabs">
        <button onClick={() => setActiveTab("buses")}>Bus Management</button>
        <button onClick={() => setActiveTab("bookings")}>Booking Management</button>
        <button onClick={() => setActiveTab("users")}>User Management</button>
      </div>

      <div className="content">
        {activeTab === "buses" && (
          <div>
            <AddBusForm />
            <BusList1 />
          </div>
        )}
        {activeTab === "bookings" && <BookingManagement />}
        {activeTab === "users" && <UserManagement />}
      </div>
    </div>
  );
};

export default AdminPanel;
