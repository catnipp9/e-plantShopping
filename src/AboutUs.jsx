import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="about-title">About Paradise Nursery</h1>
        <p className="about-tagline">Rooted in passion. Growing with purpose.</p>
      </div>

      <section className="about-section">
        <div className="about-card">
          <span className="about-icon">🌱</span>
          <h2>Our Story</h2>
          <p>
            Paradise Nursery was born in 2010 from a tiny backyard greenhouse and one
            unwavering belief: every home deserves a living, breathing piece of nature.
            What started as a weekend hobby quickly grew into a thriving plant sanctuary
            serving thousands of plant lovers across the country.
          </p>
        </div>

        <div className="about-card">
          <span className="about-icon">🤝</span>
          <h2>Our Mission</h2>
          <p>
            We are committed to making greenery accessible, affordable, and joyful. Every
            plant we offer is hand-selected, ethically sourced, and carefully packaged to
            ensure it arrives at your doorstep healthy, vibrant, and ready to thrive.
          </p>
        </div>

        <div className="about-card">
          <span className="about-icon">🌍</span>
          <h2>Sustainability</h2>
          <p>
            Paradise Nursery partners exclusively with eco-conscious growers who share our
            dedication to sustainable agriculture. Our packaging is 100% recyclable, and
            for every order placed, we plant a tree in reforestation efforts worldwide.
          </p>
        </div>

        <div className="about-card">
          <span className="about-icon">💚</span>
          <h2>Our Promise</h2>
          <p>
            Not happy with your plant? We offer a 30-day happiness guarantee. Our expert
            horticulturists are available seven days a week to help you care for your new
            green companions and ensure they flourish in your space.
          </p>
        </div>
      </section>

      <section className="about-team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">🧑‍🌾</div>
            <h3>Sofia Reyes</h3>
            <p>Founder & Head Horticulturist</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">👩‍💻</div>
            <h3>Marcus Lin</h3>
            <p>Operations & Logistics</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">🌺</div>
            <h3>Amara Osei</h3>
            <p>Plant Curator & Buyer</p>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="stat">
          <span className="stat-number">18,000+</span>
          <span className="stat-label">Happy Customers</span>
        </div>
        <div className="stat">
          <span className="stat-number">200+</span>
          <span className="stat-label">Plant Varieties</span>
        </div>
        <div className="stat">
          <span className="stat-number">14</span>
          <span className="stat-label">Years Growing</span>
        </div>
        <div className="stat">
          <span className="stat-number">50K+</span>
          <span className="stat-label">Trees Planted</span>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
