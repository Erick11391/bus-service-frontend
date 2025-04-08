import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">Bus Service</Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/bus-schedules" className="nav-link">
              Bus Schedules
            </Link>
          </li>
          <li>
            <Link to="/add-bus" className="nav-link">
              Add Bus
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
        </ul>
        <div className="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
