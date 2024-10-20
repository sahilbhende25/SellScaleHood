import React, { useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import "./Header.css";
import Logo from './robinhood.svg';
import axios from 'axios';
import BuyOrder from './BuyOrder'; // Import BuyOrder component
import SellOrder from './SellOrder'; // Import SellOrder component

function Header() {
  const [ticker, setTicker] = useState(''); // State to hold user input
  const [searchResult, setSearchResult] = useState([]); // State to hold the fetched stock data
  const [showBuyOrder, setShowBuyOrder] = useState(false); // State to control BuyOrder visibility
  const [showSellOrder, setShowSellOrder] = useState(false); // State to control SellOrder visibility
  const [selectedStock, setSelectedStock] = useState(null); // State to hold selected stock info

  // Handle input change
  const handleInputChange = (e) => {
    setTicker(e.target.value);
    fetchStockData(e.target.value); // Fetch results while typing (optional)
  };

  // Function to fetch stock data
  const fetchStockData = async (query) => {
    try {
      if (query) {
        const response = await axios.get(`http://localhost:5000/api/stock/${query}`);
        if (response.data && response.data.name && response.data.symbol) {
          setSearchResult([response.data]); // Store the valid result
        } else {
          setSearchResult([]); // Clear result if data is null or invalid
        }
      } else {
        setSearchResult([]); // Clear results if no query
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  // Handle keypress (Enter key)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchStockData(ticker);
    }
  };

  // Buy button click handler
  const handleBuy = (stock) => {
    setSelectedStock(stock); // Set the selected stock to be passed to BuyOrder
    setShowBuyOrder(true);   // Show the BuyOrder component
    setShowSellOrder(false); // Hide SellOrder if it was open
  };

  // Sell button click handler
  const handleSell = (stock) => {
    setSelectedStock(stock); // Set the selected stock to be passed to SellOrder
    setShowSellOrder(true);  // Show the SellOrder component
    setShowBuyOrder(false);  // Hide BuyOrder if it was open
  };

  // Close BuyOrder component
  const closeBuyOrder = () => {
    setShowBuyOrder(false);  // Hide the BuyOrder component
    setSelectedStock(null);  // Clear the selected stock
  };

  // Close SellOrder component
  const closeSellOrder = () => {
    setShowSellOrder(false);  // Hide the SellOrder component
    setSelectedStock(null);   // Clear the selected stock
  };

  return (
    <div className="header__wrapper">
      <div className="header__logo">
        <img src={Logo} width={25} alt="Logo" />
      </div>
      <div className="header__search">
        <div className="header__searchContainer">
          <SearchOutlinedIcon onClick={() => fetchStockData(ticker)} />
          <input 
            placeholder="Search: Ticker Name" 
            type="text" 
            value={ticker} 
            onChange={handleInputChange} 
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* Dropdown for search results */}
        {ticker.length > 0 && searchResult.length > 0 && (
          <ul className="search-result-dropdown">
            {searchResult.map((result, index) => (
              <li key={index}>
                <div className="stock-info">
                  <span>{result.name} ({result.symbol})</span>
                  <span>Price: {result.currentPrice}</span>
                </div>
                <div className="action-buttons">
                  {/* Buy button */}
                  <button onClick={() => handleBuy(result)} className="buy-btn">Buy</button>
                  {/* Sell button */}
                  <button onClick={() => handleSell(result)} className="sell-btn">Sell</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="header__menuItems">
        <a href="/">PortFolio</a>
        <a href="/">History</a>
      </div>

      {/* Render BuyOrder component if visible */}
      {showBuyOrder && selectedStock && (
        <BuyOrder 
          symbol={selectedStock.symbol} 
          price={selectedStock.currentPrice} 
          onClose={closeBuyOrder}  // Pass the close function
        />
      )}

      {/* Render SellOrder component if visible */}
      {showSellOrder && selectedStock && (
        <SellOrder 
          symbol={selectedStock.symbol} 
          price={selectedStock.currentPrice} 
          onClose={closeSellOrder}  // Pass the close function
        />
      )}
    </div>
  );
}

export default Header;
