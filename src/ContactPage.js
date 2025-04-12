import React, { useState } from "react";
import "./ContactPage.css";

const ContactPage = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State for form submission status
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulate form submission (log data to console)
    console.log("Form Submitted:", formData);

    // Optionally, send data to a backend API here

    // Show success message
    setSubmitted(true);

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <div className="contact-grid">
        {/* Contact Information Section */}
        <section className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            <strong>Headquarters:</strong>
            <br />
            123 Transit Way, Cityville ST 12345
          </p>
          <p>
            <strong>Customer Service:</strong>
            <br />
            Phone: (555) 123-4567
            <br />
            Email: support@reliablebuses.com
          </p>
          <p>
            <strong>Hours:</strong>
            <br />
            Monday-Friday: 6AM-10PM
            <br />
            Weekends: 7AM-9PM
          </p>
        </section>

        {/* Contact Form Section */}
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>

          {/* Success Message */}
          {submitted && (
            <p className="success-message">
              Thank you for contacting us! We'll get back to you soon.
            </p>
          )}
        </form>
      </div>

      {/* Map Section */}
      <section className="map-section">
        {/* Embed your RouteMap component or Google Maps iframe here */}
        <iframe
          title="Company Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912458943!2d3.3752954141015625!3d6.524379395350147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c1b0a4f0f85%3A0x7b0e9e7b8e0e7e8b!2s123%20Transit%20Way%2C%20Cityville%20ST%2012345!5e0!3m2!1sen!2sng!4v1698734598000"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;