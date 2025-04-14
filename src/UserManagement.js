import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [successMessage, setSuccessMessage] = useState(null); // Success message state

  // Fetch users from the backend
  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        setError("Error fetching users.");
        setLoading(false);
      });
  }, []);

  // Block/Unblock a user
  const handleBlockUser = (id, isBlocked) => {
    axios
      .put(`/api/users/${id}`, { isBlocked })
      .then(() => {
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, isBlocked } : user
          )
        );
        setSuccessMessage(isBlocked ? "User blocked successfully" : "User unblocked successfully");
      })
      .catch((err) => {
        setError("Error updating user status.");
      });
  };

  // Delete a user
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`/api/users/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
          setSuccessMessage("User deleted successfully");
        })
        .catch((err) => {
          setError("Error deleting user.");
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message or spinner while data is being fetched
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>; // Display error message if there's any issue
  }

  return (
    <div className="user-management">
      <h2>User Management</h2>

      {/* Display success message */}
      {successMessage && (
        <div style={{ color: "green", marginBottom: "10px" }}>
          {successMessage}
        </div>
      )}

      {/* User List */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
            <button onClick={() => handleBlockUser(user.id, !user.isBlocked)}>
              {user.isBlocked ? "Unblock" : "Block"}
            </button>
            <button
              onClick={() => handleDeleteUser(user.id)}
              style={{
                marginLeft: "10px",
                color: "red",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
