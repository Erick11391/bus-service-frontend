import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    axios
      .get("/api/users", getAuthHeaders())
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching users.");
        setLoading(false);
      });
  }, []);

  const handleBlockUser = (id, isBlocked) => {
    axios
      .put(`/api/users/${id}`, { isBlocked }, getAuthHeaders())
      .then(() => {
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, isBlocked } : user
          )
        );
        setSuccessMessage(isBlocked ? "User blocked successfully" : "User unblocked successfully");
      })
      .catch((err) => {
        console.error(err);
        setError("Error updating user status.");
      });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`/api/users/${id}`, getAuthHeaders())
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
          setSuccessMessage("User deleted successfully");
        })
        .catch((err) => {
          console.error(err);
          setError("Error deleting user.");
        });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="user-management">
      <h2>User Management</h2>

      {successMessage && (
        <div style={{ color: "green", marginBottom: "10px" }}>
          {successMessage}
        </div>
      )}

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
