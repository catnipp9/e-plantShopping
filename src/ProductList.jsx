import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addItem, selectCartCount } from './CartSlice';
import './App.css';

// ── Plant Data ──────────────────────────────────────────────
const plantCategories = [
  {
    id: 'aromatic',
    icon: '🌸',
    title: 'Aromatic Plants',
    description: 'Fill your home with natural fragrances that soothe and invigorate the senses.',
    plants: [
      {
        name: 'Lavender',
        image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=400&auto=format&fit=crop',
        description: 'Classic purple blooms with a calming scent. Perfect for bedrooms and relaxation corners.',
        cost: 12.99,
      },
      {
        name: 'Jasmine',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop',
        description: 'Sweet, romantic fragrance with delicate white flowers. Climbs trellises beautifully.',
        cost: 14.99,
      },
      {
        name: 'Rosemary',
        image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&auto=format&fit=crop',
        description: 'Fragrant Mediterranean herb with needle-like leaves. Doubles as a culinary staple.',
        cost: 9.99,
      },
      {
        name: 'Spearmint',
        image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400&auto=format&fit=crop',
        description: 'Refreshing minty aroma that repels insects naturally. Great for kitchens.',
        cost: 7.99,
      },
      {
        name: 'Lemon Balm',
        image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=400&auto=format&fit=crop',
        description: 'Citrusy fresh scent with heart-shaped leaves. Known for reducing stress.',
        cost: 8.99,
      },
      {
        name: 'Eucalyptus',
        image: 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=400&auto=format&fit=crop',
        description: 'Bold, camphor-like scent with silver-green leaves. Stunning in vases too.',
        cost: 11.99,
      },
      {
        name: 'Gardenia',
        image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc10?w=400&auto=format&fit=crop',
        description: 'Rich, creamy fragrance with glossy leaves and pure white blooms.',
        cost: 16.99,
      },
    ],
  },
  {
    id: 'medicinal',
    icon: '🌿',
    title: 'Medicinal Plants',
    description: 'Nature\'s pharmacy — traditional healing plants that bring wellness into your everyday life.',
    plants: [
      {
        name: 'Aloe Vera',
        image: 'https://images.unsplash.com/photo-1587334207408-dbc18b0d4e1c?w=400&auto=format&fit=crop',
        description: 'The ultimate first-aid plant. Soothing gel inside leaves relieves burns and skin irritation.',
        cost: 10.99,
      },
      {
        name: 'Chamomile',
        image: 'https://images.unsplash.com/photo-1587515024889-cf7b67745e1e?w=400&auto=format&fit=crop',
        description: 'Cheerful daisy-like flowers brewed into a classic calming tea for sleep and digestion.',
        cost: 8.49,
      },
      {
        name: 'Echinacea',
        image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&auto=format&fit=crop',
        description: 'Bold purple coneflower used to boost immunity. A beautiful addition to any garden.',
        cost: 11.49,
      },
      {
        name: 'Calendula',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&auto=format&fit=crop',
        description: 'Bright orange-yellow flowers with anti-inflammatory and skin-healing properties.',
        cost: 9.49,
      },
      {
        name: 'Valerian',
        image: 'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=400&auto=format&fit=crop',
        description: 'Tall plant with clusters of pink-white flowers. Root used for natural sleep support.',
        cost: 13.99,
      },
      {
        name: "St. John's Wort",
        image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&auto=format&fit=crop',
        description: 'Star-shaped yellow flowers historically used for mood support and nervous tension.',
        cost: 12.49,
      },
      {
        name: 'Turmeric',
        image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&auto=format&fit=crop',
        description: 'Tropical plant with vibrant rhizomes rich in curcumin — a powerful antioxidant.',
        cost: 14.49,
      },
    ],
  },
  {
    id: 'airpurifying',
    icon: '💨',
    title: 'Air-Purifying Plants',
    description: 'Breathe easier — these plants naturally filter toxins and increase oxygen levels indoors.',
    plants: [
      {
        name: 'Peace Lily',
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e4de3?w=400&auto=format&fit=crop',
        description: 'Elegant white spathes and glossy leaves. One of the best plants for filtering indoor air.',
        cost: 15.99,
      },
      {
        name: 'Spider Plant',
        image: 'https://images.unsplash.com/photo-1597175587580-98f1d75028e3?w=400&auto=format&fit=crop',
        description: 'Nearly indestructible with arching green-and-white striped leaves. Perfect for beginners.',
        cost: 8.99,
      },
      {
        name: 'Snake Plant',
        image: 'https://images.unsplash.com/photo-1616690248152-fd1caf64fc4b?w=400&auto=format&fit=crop',
        description: 'Architectural upright leaves with golden edges. Converts CO₂ to oxygen at night.',
        cost: 13.99,
      },
      {
        name: 'Golden Pothos',
        image: 'https://images.unsplash.com/photo-1602923668104-8f9e03e77e62?w=400&auto=format&fit=crop',
        description: 'Cascading heart-shaped leaves that thrive in low light. Excellent toxin remover.',
        cost: 9.99,
      },
      {
        name: 'Boston Fern',
        image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&auto=format&fit=crop',
        description: 'Lush, feathery fronds that add humidity to dry rooms. NASA-approved air cleaner.',
        cost: 12.99,
      },
      {
        name: 'Bamboo Palm',
        image: 'https://images.unsplash.com/photo-1610882648335-ced8b9e14e84?w=400&auto=format&fit=crop',
        description: 'Tall, graceful palm that effectively filters formaldehyde and benzene from the air.',
        cost: 24.99,
      },
      {
        name: 'English Ivy',
        image: 'https://images.unsplash.com/photo-1560717845-968823efbee1?w=400&auto=format&fit=crop',
        description: 'Classic trailing vine that reduces airborne mold and fecal matter particles.',
        cost: 10.49,
      },
    ],
  },
];

// ── Navbar ───────────────────────────────────────────────────
function Navbar({ cartCount }) {
  const navigate = useNavigate();
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

// ── Plant Card ───────────────────────────────────────────────
function PlantCard({ plant, onAddToCart, inCart }) {
  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <div className="plant-card-body">
        <div className="plant-name">{plant.name}</div>
        <div className="plant-desc">{plant.description}</div>
        <div className="plant-footer">
          <span className="plant-price">${plant.cost.toFixed(2)}</span>
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(plant)}
            disabled={inCart}
          >
            {inCart ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
function ProductList() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const cartItems = useSelector(state => state.cart.items);
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems(prev => ({ ...prev, [plant.name]: true }));
  };

  const isInCart = (name) => {
    return !!addedItems[name] || cartItems.some(i => i.name === name);
  };

  return (
    <div className="product-page">
      <Navbar cartCount={cartCount} />

      {plantCategories.map(category => (
        <section key={category.id} className="category-section">
          <div className="category-header">
            <span className="category-icon">{category.icon}</span>
            <div>
              <div className="category-title">{category.title}</div>
              <div className="category-desc">{category.description}</div>
            </div>
          </div>
          <div className="plants-grid">
            {category.plants.map(plant => (
              <PlantCard
                key={plant.name}
                plant={plant}
                onAddToCart={handleAddToCart}
                inCart={isInCart(plant.name)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;