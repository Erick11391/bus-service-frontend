import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      
      <div className="contact-grid">
        <section className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            <strong>Headquarters:</strong><br />
            123 Transit Way, Cityville ST 12345
          </p>
          <p>
            <strong>Customer Service:</strong><br />
            Phone: (555) 123-4567<br />
            Email: support@reliablebuses.com
          </p>
          <p>
            <strong>Hours:</strong><br />
            Monday-Friday: 6AM-10PM<br />
            Weekends: 7AM-9PM
          </p>
        </section>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>

      <section className="map-section">
        {/* Embed your RouteMap component here */}
      </section>
    </div>
  );
};

export default ContactPage;