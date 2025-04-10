import React from 'react';
import './App.css';

const HomeGallery = () => {
  // Sample bus system images - replace with your actual images
  const galleryItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Modern Fleet',
      description: 'Our state-of-the-art buses equipped with the latest amenities'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'City Connectivity',
      description: 'Seamlessly connecting major city hubs and suburbs'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Comfortable Travel',
      description: 'Spacious seating and climate control for your journey'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Night Services',
      description: 'Safe and reliable transportation around the clock'
    }
  ];

  const stats = [
    { number: '50+', label: 'Modern Buses' },
    { number: '25', label: 'Routes' },
    { number: '1M+', label: 'Passengers Monthly' },
    { number: '99%', label: 'On-time Performance' }
  ];

  return (
    <>
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-header">
            <h2>Our Bus System</h2>
            <p>Experience the future of public transportation with our modern fleet and exceptional service</p>
          </div>
          
          <div className="gallery-grid">
            {galleryItems.map(item => (
              <div key={item.id} className="gallery-card">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="gallery-image"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="stats-banner">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeGallery;