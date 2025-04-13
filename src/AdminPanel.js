import React, { useState } from "react";
import BusManagement from "./BusManagement";
import BookingManagement from "./BookingManagement";
import UserManagement from "./UserManagement";
import AddBusForm from "./AddBusForm";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("buses");

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Navigation Tabs */}
      <div className="tabs">
        <button onClick={() => setActiveTab("buses")}>Bus Management</button>
        <button onClick={() => setActiveTab("bookings")}>Booking Management</button>
        <button onClick={() => setActiveTab("users")}>User Management</button>
      </div>

      {/* Content Area */}
      <div className="content">
        {activeTab === "buses" && (
          <>
            <AddBusForm />
            <BusManagement />
          </>
        )}
        {activeTab === "bookings" && <BookingManagement />}
        {activeTab === "users" && <UserManagement />}
      </div>
    </div>
  );
};

export default AdminPanel;
