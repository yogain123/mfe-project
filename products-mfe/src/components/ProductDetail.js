import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock product data (in real app, this would come from API)
  const products = {
    1: {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      category: 'Electronics',
      stock: 25,
      description: 'High-quality wireless headphones with noise cancellation',
      features: ['Bluetooth 5.0', 'Active Noise Cancellation', '30-hour battery', 'Quick charge'],
      images: ['🎧']
    },
    2: {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      category: 'Electronics',
      stock: 15,
      description: 'Feature-rich smartwatch with health monitoring',
      features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', 'Sleep Tracking'],
      images: ['⌚']
    }
  };

  const product = products[id];

  if (!product) {
    return (
      <div className="product-detail">
        <div className="not-found">
          <h2>❌ Product Not Found</h2>
          <p>The product with ID {id} could not be found.</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="detail-header">
        <button onClick={() => navigate('/products')} className="back-btn">
          ← Back to Products
        </button>
        <div className="mfe-note">
          💡 This is a detailed view with its own route within the Products MFE
        </div>
      </div>

      <div className="product-detail-content">
        <div className="product-image">
          <div className="image-placeholder">
            {product.images[0]}
          </div>
        </div>

        <div className="product-info">
          <div className="product-title">
            <h1>{product.name}</h1>
            <span className="category-badge">{product.category}</span>
          </div>

          <div className="price-section">
            <span className="price">${product.price}</span>
            <span className={`stock-status ${product.stock < 10 ? 'low-stock' : 'in-stock'}`}>
              {product.stock < 10 ? '⚠️ Low Stock' : '✅ In Stock'} ({product.stock} available)
            </span>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="features">
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          <div className="actions">
            <button className="btn-primary btn-large">
              🛒 Add to Cart
            </button>
            <button className="btn-secondary">
              ❤️ Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="related-section">
        <h3>🔗 Related Products</h3>
        <p>In a real application, this would show related products from the same category.</p>
      </div>
    </div>
  );
};

export default ProductDetail; 