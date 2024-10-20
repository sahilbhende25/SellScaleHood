import React, { useState } from 'react';
import './SellOrder.css';

function SellOrder({sellSymbol,sellName,sellPrice}) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(sellPrice);
  const [intraday, setIntraday] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState('NSE');

  const charges = 5.85;
  const amount = quantity * price;

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 500, y: 500 });
  const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });

  const startDrag = (e) => {
    setMouseStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    setIsDragging(true);
  };

  const drag = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - mouseStart.x,
        y: e.clientY - mouseStart.y,
      });
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="sell-order-container"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }} // Fix here: Backticks for template literals
      onMouseDown={startDrag}
      onMouseMove={drag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {/* Stock Info */}
      <div className="stock-info">
        <h3>{sellSymbol}</h3>
        <div className="exchange">
          <label>
            <input
              type="radio"
              name="exchange"
              value="BSE"
              checked={selectedExchange === 'BSE'}
              onChange={() => setSelectedExchange('BSE')}
            />
            {sellPrice}
          </label>
          <label>
            <input
              type="radio"
              name="exchange"
              value="NSE"
              checked={selectedExchange === 'NSE'}
              onChange={() => setSelectedExchange('NSE')}
            />
            {sellPrice}
          </label>
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
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
          />
        </div>
        <div className="input-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
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

      {/* Sell and Cancel Buttons */}
      <div className="order-buttons">
        <button className="sell-button">Sell</button>
        <button className="cancel-button">Cancel</button>
      </div>
    </div>
  );
}

export default SellOrder;