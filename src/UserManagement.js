import React, { useEffect, useState } from "react";
import axios from "axios";


const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    axios.get("/api/users").then((response) => setUsers(response.data));
  }, []);

  // Block/Unblock a user
  const handleBlockUser = (id, isBlocked) => {
    axios.put(`/api/users/${id}`, { isBlocked }).then(() => {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, isBlocked } : user
        )
      );
    });
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>

      {/* User List */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
            <button onClick={() => handleBlockUser(user.id, !user.isBlocked)}>
              {user.isBlocked ? "Unblock" : "Block"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;