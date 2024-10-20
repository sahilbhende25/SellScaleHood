import React from 'react';

function WatchList({ stocks }) {
  return (
    <div className="watchlist">
      <input 
        type="text" 
        placeholder="Search in Portfolio" 
        className="watchlist__search" 
      />
      
      {stocks.map((stock, index) => (
        <div key={index} className="watchlist__item">
          <span className="watchlist__ticker">{stock.ticker}</span>
          <div className="watchlist__details">
            {/* Handle default values for change and percentage */}
            <span className={`watchlist__percentage ${stock.change > 0 ? 'watchlist__change--positive' : 'watchlist__change--negative'}`}>
              {stock.change !== undefined ? `${stock.change > 0 ? '+' : ''}${stock.change.toFixed(2)}` : '0.00'} 
              ({stock.percentage !== undefined ? stock.percentage.toFixed(2) : '0.00'}%)
            </span>
            <span className="watchlist__price">
              ₹{stock.price !== undefined ? stock.price.toFixed(2) : '0.00'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WatchList;
