import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1>About Reliable Bus Services</h1>
      
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Since 2010, we've connected over 1 million passengers to their destinations 
          with 99.8% on-time performance. Our fleet of 50 modern buses serves 25+ routes 
          across the region.
        </p>
      </section>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">15+</span>
          <span className="stat-label">Years in Operation</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">1M+</span>
          <span className="stat-label">Passengers Annually</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">50</span>
          <span className="stat-label">Modern Buses</span>
        </div>
      </div>

      <section className="team-section">
        <h2>Leadership Team</h2>
        <div className="team-grid">
          {/* Team members would go here */}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;