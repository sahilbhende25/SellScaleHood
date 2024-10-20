import React, { useState } from 'react';
import './BuyOrder.css';

function BuyOrder() {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(1879.6);
  const [intraday, setIntraday] = useState(false);
  const charges = 1.95;
  const amount = quantity * price;

  return (
    <div className="buy-order-container">
      {/* Stock Info */}
      <div className="stock-info">
        <h3>INFY</h3>
        <div className="exchange">
          <span className="exchange-option">BSE ₹1,878.85</span>
          <span className="exchange-option active">NSE ₹1,879.60</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="order-tabs">
        <span className="tab active">Quick</span>
        <span className="tab disabled">Regular</span>
        <span className="tab disabled">Cover</span>
        <span className="tab disabled">AMO</span>
      </div>

      {/* Quantity and Price */}
      <div className="order-inputs">
        <div className="input-group">
          <label>Qty.</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
        </div>
        <div className="input-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Intraday Checkbox */}
      <div className="intraday-option">
        <input
          type="checkbox"
          checked={intraday}
          onChange={() => setIntraday(!intraday)}
        />
        <label>Intraday</label>
      </div>

      {/* Amount and Charges */}
      <div className="order-summary">
        <span>Amount ₹{amount.toFixed(2)}</span>
        <span>Charges ₹{charges}</span>
      </div>

      {/* Buy and Cancel Buttons */}
      <div className="order-buttons">
        <button className="buy-button">Buy</button>
        <button className="cancel-button">Cancel</button>
      </div>
    </div>
  );
}

export default BuyOrder;
