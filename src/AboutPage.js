import React from "react";
import { Link } from "react-router-dom"; // Use React Router for navigation
import "./AboutPage.css"; // Import your custom CSS file

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="text-content">
              <h1>About Our Bus Management System</h1>
              <p>
                Streamlining public transportation operations with cutting-edge
                technology and exceptional service since 2010.
              </p>
             
            </div>
            
             
            </div>
          </div>
        
      </section>
      
      {/* Our Mission */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              To revolutionize public transportation management by providing
              efficient, reliable, and sustainable solutions that enhance
              mobility for communities worldwide.
            </p>
          </div>
          <div className="mission-grid">
           
            <ul className="mission-list">
              <li>
                <h3>Efficiency</h3>
                <p>
                  We optimize routes, schedules, and resources to maximize
                  operational efficiency and minimize costs.
                </p>
              </li>
              <li>
                <h3>Reliability</h3>
                <p>
                  Our systems ensure consistent, dependable service that
                  passengers and operators can count on.
                </p>
              </li>
              <li>
                <h3>Sustainability</h3>
                <p>
                  We're committed to reducing environmental impact through smart
                  routing and resource management.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="features-section">
        <div className="container">
          <h2>Key Features</h2>
          <p>
            Our comprehensive bus management system offers a suite of powerful
            tools designed to streamline operations.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Fleet Management</h3>
              <p>
                Track and manage your entire fleet in real-time, including
                maintenance schedules, fuel consumption, and vehicle status.
              </p>
            </div>
            <div className="feature-card">
              <h3>Schedule Optimization</h3>
              <p>
                Create and adjust schedules based on demand patterns, traffic
                conditions, and resource availability.
              </p>
            </div>
            <div className="feature-card">
              <h3>Route Planning</h3>
              <p>
                Design efficient routes that minimize travel time and maximize
                passenger convenience with our advanced algorithms.
              </p>
            </div>
            <div className="feature-card">
              <h3>Driver Management</h3>
              <p>
                Manage driver assignments, track performance, monitor compliance
                with regulations, and optimize work schedules.
              </p>
            </div>
            <div className="feature-card">
              <h3>Safety & Compliance</h3>
              <p>
                Ensure adherence to safety standards and regulatory requirements
                with automated monitoring and reporting.
              </p>
            </div>
            <div className="feature-card">
              <h3>Real-time Tracking</h3>
              <p>
                Monitor your fleet in real-time with GPS tracking, providing
                accurate location data and performance metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="team-section">
        <div className="container">
          <h2>Our Leadership Team</h2>
          <p>
            Meet the experts behind our innovative bus management solutions.
          </p>
          <div className="team-grid">
            <div className="team-member">
            
              <h3>Sarah Achieng</h3>
              <p>Chief Executive Officer</p>
            </div>
            <div className="team-member">
            
              <h3>Michael Ruto</h3>
              <p>Chief Technology Officer</p>
            </div>
            <div className="team-member">
              <h3>Job Mwangi</h3>
              <p>Chief Operations Officer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <p>
            Hear from transportation authorities who have transformed their
            operations with our system.
          </p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <h3>Metropolitan Transit Authority</h3>
              <p>Nairobi, Kenya</p>
              <p>
                "Since implementing this bus management system, we've seen a 30%
                reduction in delays and a 25% increase in passenger
                satisfaction."
              </p>
            </div>
            <div className="testimonial-card">
              <h3>City Transport Services</h3>
              <p>Nirobi, Kenya</p>
              <p>
                "The comprehensive fleet management tools have helped us extend
                the lifespan of our vehicles and reduce maintenance costs by
                20%."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Bus Operations?</h2>
          <p>
            Join hundreds of transportation authorities who have revolutionized
            their services with our bus management system.
          </p>
       
        </div>
      </section>
    </div>
  );
}