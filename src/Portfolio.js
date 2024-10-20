import React from 'react';

function Portfolio({ portfolio = [] }) {
  return (
    <div className="portfolio">
      <input 
        type="text" 
        placeholder="Search eg: AAPL, GOOGL" 
        className="portfolio__search" 
      />
      
      {portfolio.length > 0 ? (
        portfolio.map((stock, index) => (
          <div key={index} className="portfolio__item">
            <span className={`portfolio__ticker ${stock.change > 0 ? 'portfolio__change--positive' : 'portfolio__change--negative'}`}>
              {stock.ticker}
            </span>
            <div className="portfolio__price-details">
              <span className="portfolio__price">
                ₹{stock.price !== undefined ? stock.price.toFixed(2) : '0.00'}
              </span>
              <span className={`portfolio__change ${stock.change > 0 ? 'portfolio__change--positive' : 'portfolio__change--negative'}`}>
                {stock.change !== undefined ? `${stock.change > 0 ? '+' : ''}${stock.change.toFixed(2)}` : '0.00'} 
                ({stock.percentage !== undefined ? stock.percentage.toFixed(2) : '0.00'}%)
              </span>
            </div>
            <div className="portfolio__buttons">
              <button className="portfolio__btn buy-btn">B</button>
              <button className="portfolio__btn sell-btn">S</button>
            </div>
          </div>
        ))
      ) : (
        <p>No stocks in your portfolio.</p>
      )}
    </div>
  );
}

export default Portfolio;