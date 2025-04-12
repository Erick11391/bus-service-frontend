import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Mock users with roles
  const mockUsers = [
    { email: "user@example.com", password: "password123", role: "user" },
    { email: "admin@example.com", password: "admin123", role: "admin" },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();

    // Find the user in the mock data
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Save token and role in localStorage
      localStorage.setItem("token", "mock-auth-token");
      localStorage.setItem("role", user.role);

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin"); // Redirect admins to the admin panel
      } else {
        navigate("/user-dashboard"); // Redirect regular users to their dashboard
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;