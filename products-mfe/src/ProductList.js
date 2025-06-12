import React, { useState } from "react";

const ProductList = () => {
  // Mock products data
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      category: "Electronics",
      stock: 25,
      description: "High-quality wireless headphones with noise cancellation",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      category: "Electronics",
      stock: 15,
      description: "Feature-rich smartwatch with health monitoring",
    },
    {
      id: 3,
      name: "Coffee Maker",
      price: 79.99,
      category: "Appliances",
      stock: 8,
      description: "Programmable coffee maker with thermal carafe",
    },
    {
      id: 4,
      name: "Yoga Mat",
      price: 29.99,
      category: "Fitness",
      stock: 50,
      description: "Non-slip yoga mat with carrying strap",
    },
    {
      id: 5,
      name: "Desk Lamp",
      price: 45.99,
      category: "Office",
      stock: 12,
      description: "LED desk lamp with adjustable brightness",
    },
  ]);

  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(filter.toLowerCase()) ||
        product.category.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "stock") return b.stock - a.stock;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="product-list">
      <div className="list-header">
        <h2>📦 Product Catalog</h2>
        <p className="mfe-note">
          💡 This is a complete page within the Products MFE
        </p>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="search-input"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="stock">Sort by Stock</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-header">
              <h3>{product.name}</h3>
              <span className="category">{product.category}</span>
            </div>

            <div className="product-details">
              <p className="description">{product.description}</p>
              <div className="product-meta">
                <span className="price">${product.price}</span>
                <span
                  className={`stock ${product.stock < 10 ? "low-stock" : ""}`}
                >
                  📦 {product.stock} in stock
                </span>
              </div>
            </div>

            <div className="product-actions">
              <button className="btn-primary">Add to Cart</button>
              <button className="btn-secondary">Add to Wishlist</button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>🔍 No products found matching your search.</p>
        </div>
      )}

      <div className="list-stats">
        <p>
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>
    </div>
  );
};

export default ProductList;
