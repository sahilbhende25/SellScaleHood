import React, { useState } from 'react';
import axios from 'axios';
import './BuyOrder.css';

function BuyOrder({ buySymbol, buyName, buyPrice, closeModal }) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(buyPrice);
  const [message, setMessage] = useState('');
  const [intraday, setIntraday] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState('NYSE');

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

  // Handle Buy action
  const handleBuy = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/buy_stock', {
        ticker: buySymbol,
        quantity: quantity,
        price: price,
      });

      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred');
      }
    }
  };

  return (
    <div
      className="buy-order-container"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseDown={startDrag}
      onMouseMove={drag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {/* Stock Info */}
      <div className="stock-info">
        <h3>{buySymbol}</h3>
        <div className="exchange">
          <label>
            <input
              type="radio"
              name="exchange"
              value="NYSE"
              checked={selectedExchange === 'NYSE'}
              onChange={() => setSelectedExchange('NYSE')}
            />
            NYSE {buyPrice}
          </label>
          <label>
            <input
              type="radio"
              name="exchange"
              value="CHX"
              checked={selectedExchange === 'CHX'}
              onChange={() => setSelectedExchange('CHX')}
            />
            CHX {buyPrice}
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
        <span>Amount ${amount.toFixed(2)}</span>
        <span>Charges ${charges}</span>
      </div>

      {/* Buy and Cancel Buttons */}
      <div className="order-buttons">
        <button className="buy-button" onClick={handleBuy}>Buy</button>
        <button className="cancel-button" onClick={closeModal}>Cancel</button>
      </div>

      {/* Display message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default BuyOrder;
