import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

// ── Landing Page ─────────────────────────────────────────────
function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-logo">🌿</div>

        <h1 className="landing-title">
          Paradise <span>Nursery</span>
        </h1>

        <p className="landing-subtitle">
          "Where every plant finds its perfect home."
        </p>

        <Link to="/plants" className="get-started-btn">
          Get Started →
        </Link>
      </div>

      <div className="landing-badges">
        <span className="badge">🚚 Free Shipping over $50</span>
        <span className="badge">🌱 Ethically Sourced</span>
        <span className="badge">💚 30-Day Guarantee</span>
        <span className="badge">🌍 1 Order = 1 Tree Planted</span>
      </div>
    </div>
  );
}

// ── App Root ─────────────────────────────────────────────────
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/plants" element={<ProductList />} />
          <Route path="/cart" element={<CartItem />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
