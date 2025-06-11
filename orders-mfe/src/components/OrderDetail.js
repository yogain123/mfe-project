import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock order data
  const orders = {
    'ORD-001': {
      id: 'ORD-001',
      customer: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: [
        { name: 'Wireless Headphones', price: 99.99, quantity: 1 },
        { name: 'Smart Watch', price: 199.99, quantity: 1 }
      ],
      shipping: {
        address: '123 Main St, City, State 12345',
        method: 'Express Shipping',
        cost: 15.99
      }
    },
    'ORD-002': {
      id: 'ORD-002',
      customer: 'Bob Wilson',
      email: 'bob.wilson@email.com',
      date: '2024-01-14',
      status: 'shipped',
      total: 149.50,
      items: [
        { name: 'Coffee Maker', price: 79.99, quantity: 1 },
        { name: 'Desk Lamp', price: 45.99, quantity: 1 }
      ],
      shipping: {
        address: '456 Oak Ave, Town, State 67890',
        method: 'Standard Shipping',
        cost: 9.99
      }
    }
  };

  const order = orders[id];

  if (!order) {
    return (
      <div className="order-detail">
        <div className="not-found">
          <h2>❌ Order Not Found</h2>
          <p>The order with ID {id} could not be found.</p>
          <button onClick={() => navigate('/orders')} className="btn-primary">
            ← Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#28a745';
      case 'shipped': return '#007bff';
      case 'processing': return '#ffc107';
      case 'pending': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="order-detail">
      <div className="detail-header">
        <button onClick={() => navigate('/orders')} className="back-btn">
          ← Back to Orders
        </button>
        <div className="mfe-note">
          💡 This is a detailed view within the Orders MFE
        </div>
      </div>

      <div className="order-info">
        <div className="order-header">
          <h1>Order {order.id}</h1>
          <span 
            className="status-badge large"
            style={{ backgroundColor: getStatusColor(order.status) }}
          >
            {order.status.toUpperCase()}
          </span>
        </div>

        <div className="order-meta">
          <div className="meta-item">
            <strong>Customer:</strong> {order.customer}
          </div>
          <div className="meta-item">
            <strong>Email:</strong> {order.email}
          </div>
          <div className="meta-item">
            <strong>Order Date:</strong> {order.date}
          </div>
        </div>
      </div>

      <div className="order-content">
        <div className="items-section">
          <h3>📦 Order Items</h3>
          <div className="items-list">
            {order.items.map((item, index) => (
              <div key={index} className="item-row">
                <div className="item-name">{item.name}</div>
                <div className="item-quantity">Qty: {item.quantity}</div>
                <div className="item-price">${item.price}</div>
                <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="shipping-section">
          <h3>🚚 Shipping Information</h3>
          <div className="shipping-info">
            <div className="shipping-item">
              <strong>Address:</strong> {order.shipping.address}
            </div>
            <div className="shipping-item">
              <strong>Method:</strong> {order.shipping.method}
            </div>
            <div className="shipping-item">
              <strong>Cost:</strong> ${order.shipping.cost}
            </div>
          </div>
        </div>

        <div className="totals-section">
          <h3>💰 Order Summary</h3>
          <div className="totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>${order.shipping.cost}</span>
            </div>
            <div className="total-row final">
              <span><strong>Total:</strong></span>
              <span><strong>${order.total}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-actions">
        <button className="btn-primary">📧 Send Update Email</button>
        <button className="btn-secondary">📄 Print Invoice</button>
        <button className="btn-secondary">🔄 Update Status</button>
      </div>
    </div>
  );
};

export default OrderDetail; 