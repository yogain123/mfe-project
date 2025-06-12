import React, { useState } from "react";

const OrderList = () => {
  const [orders] = useState([
    {
      id: "ORD-001",
      customer: "Alice Johnson",
      date: "2024-01-15",
      status: "delivered",
      total: 299.99,
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "Bob Wilson",
      date: "2024-01-14",
      status: "shipped",
      total: 149.5,
      items: 2,
    },
    {
      id: "ORD-003",
      customer: "Carol Davis",
      date: "2024-01-13",
      status: "processing",
      total: 89.99,
      items: 1,
    },
    {
      id: "ORD-004",
      customer: "David Brown",
      date: "2024-01-12",
      status: "pending",
      total: 199.99,
      items: 4,
    },
  ]);

  const [filter, setFilter] = useState("all");

  const filteredOrders = orders.filter(
    (order) => filter === "all" || order.status === filter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "#28a745";
      case "shipped":
        return "#007bff";
      case "processing":
        return "#ffc107";
      case "pending":
        return "#6c757d";
      default:
        return "#6c757d";
    }
  };

  return (
    <div className="order-list">
      <div className="list-header">
        <h2>📋 Order Management</h2>
        <p className="mfe-note">💡 This is the main view of the Orders MFE</p>
      </div>

      {/* Filters */}
      <div className="filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Orders ({orders.length})
        </button>
        <button
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending ({orders.filter((o) => o.status === "pending").length})
        </button>
        <button
          className={`filter-btn ${filter === "processing" ? "active" : ""}`}
          onClick={() => setFilter("processing")}
        >
          Processing ({orders.filter((o) => o.status === "processing").length})
        </button>
        <button
          className={`filter-btn ${filter === "shipped" ? "active" : ""}`}
          onClick={() => setFilter("shipped")}
        >
          Shipped ({orders.filter((o) => o.status === "shipped").length})
        </button>
        <button
          className={`filter-btn ${filter === "delivered" ? "active" : ""}`}
          onClick={() => setFilter("delivered")}
        >
          Delivered ({orders.filter((o) => o.status === "delivered").length})
        </button>
      </div>

      {/* Orders Table */}
      <div className="orders-table">
        <div className="table-header">
          <div className="col">Order ID</div>
          <div className="col">Customer</div>
          <div className="col">Date</div>
          <div className="col">Status</div>
          <div className="col">Items</div>
          <div className="col">Total</div>
          <div className="col">Actions</div>
        </div>

        {filteredOrders.map((order) => (
          <div key={order.id} className="table-row">
            <div className="col order-id">{order.id}</div>
            <div className="col customer">{order.customer}</div>
            <div className="col date">{order.date}</div>
            <div className="col status">
              <span
                className="status-badge"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {order.status.toUpperCase()}
              </span>
            </div>
            <div className="col items">{order.items} items</div>
            <div className="col total">${order.total}</div>
            <div className="col actions">
              <button className="btn-view">📧 Email</button>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="no-orders">
          <p>📭 No orders found for the selected filter.</p>
        </div>
      )}

      <div className="list-stats">
        <p>
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
        <p>
          Total Revenue: $
          {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderList;
