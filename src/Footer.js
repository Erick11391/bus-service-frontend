import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/schedules">Schedules</Link>
        </div>
        <p>© {new Date().getFullYear()} Reliable Bus Services</p>
      </div>
    </footer>
  );
};

export default Footer;