import React, { useState } from 'react';
import axios from 'axios';
import "./Sighnup.css";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',      // Keeping the name field
    email: '',     // Email field
    password: '',  // Password field
    phone: ''      // Phone field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', formData);
      alert('User registered successfully!');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Sign Up</h2>
      <input
        name="name"  // Keeping the name field for the user to input their name
        placeholder="Name"
        onChange={handleChange}
        value={formData.name}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
        required
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone Number"
        onChange={handleChange}
        value={formData.phone}
        required
        pattern="[0-9]{10,15}"
        title="Enter a valid phone number"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
