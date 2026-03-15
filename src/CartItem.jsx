import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartTotal,
  selectCartCount,
} from './CartSlice';
import './App.css';

// ── Navbar (shared) ──────────────────────────────────────────
function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span>🌿</span> Paradise Nursery
      </Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/plants">Plants</Link></li>
        <li>
          <Link to="/cart" className="cart-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

// ── Cart Item Card ───────────────────────────────────────────
function CartItemCard({ item }) {
  const dispatch = useDispatch();

  const handleIncrease = () =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = () => dispatch(removeItem(item.name));

  const itemTotal = (item.cost * item.quantity).toFixed(2);

  return (
    <div className="cart-item-card">
      <img src={item.image} alt={item.name} />

      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <div className="unit-price">Unit price: ${item.cost.toFixed(2)}</div>
        <div className="cart-item-controls">
          <button className="qty-btn" onClick={handleDecrease} aria-label="Decrease quantity">−</button>
          <span className="qty-value">{item.quantity}</span>
          <button className="qty-btn" onClick={handleIncrease} aria-label="Increase quantity">+</button>
        </div>
      </div>

      <div className="cart-item-right">
        <div className="item-total-price">${itemTotal}</div>
        <button className="delete-btn" onClick={handleDelete}>🗑 Delete</button>
      </div>
    </div>
  );
}

// ── Checkout Modal ───────────────────────────────────────────
function CheckoutModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-icon">🚀</div>
        <h2>Coming Soon!</h2>
        <p>
          Our checkout experience is under construction. We're building something
          amazing! Check back soon to complete your order of beautiful plants. 🌱
        </p>
        <button className="modal-close-btn" onClick={onClose}>Got it!</button>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
function CartItem() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const cartCount = useSelector(selectCartCount);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="cart-page">
      <Navbar cartCount={cartCount} />

      <div className="cart-inner">
        <h1>🛒 Your Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">🪴</div>
            <h2>Your cart is empty</h2>
            <p>Head over to our plant collection and find your perfect green companion!</p>
            <br />
            <Link to="/plants" className="continue-btn" style={{ display: 'inline-block', marginTop: 16 }}>
              Browse Plants
            </Link>
          </div>
        ) : (
          <>
            {items.map(item => (
              <CartItemCard key={item.name} item={item} />
            ))}

            <div className="cart-summary">
              <div className="cart-total-row">
                <span>Total ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="cart-actions">
                <Link to="/plants" className="continue-btn">
                  ← Continue Shopping
                </Link>
                <button className="checkout-btn" onClick={() => setShowModal(true)}>
                  Checkout →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default CartItem;