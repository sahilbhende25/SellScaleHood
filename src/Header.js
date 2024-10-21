import React, { useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import "./Header.css";
import Logo from './robinhood.svg';
import axios from 'axios';
import BuyOrder from './BuyOrder'; // Import your BuyOrder component
import SellOrder from './SellOrder'; // Import your SellOrder component
import { useNavigate } from 'react-router-dom'; 

function Header() {
  const [ticker, setTicker] = useState('');
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState(''); 
  const [searchResult, setSearchResult] = useState([]); 
  const [selectedSymbol, setSelectedSymbol] = useState(''); // Track selected stock symbol
  const [showBuyPopup, setShowBuyPopup] = useState(false); // Show BuyOrder pop-up
  const [showSellPopup, setShowSellPopup] = useState(false); // Show SellOrder pop-up
  const navigate = useNavigate(); // Initialize navigation
  
  const handleInputChange = (e) => {
    setTicker(e.target.value);
    fetchStockData(e.target.value);
  };

  const fetchStockData = async (query) => {
    try {
      if (query) {
        const response = await axios.get(`http://localhost:5000/api/stock/${query}`);
        if (response.data && response.data.name && response.data.symbol) {
          setSearchResult([response.data]); 
        } else {
          setSearchResult([]); 
        }
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchStockData(ticker);
    }
  };

  // Buy button click handler to show BuyOrder pop-up
  const handleBuy = (symbol,name,price) => {
    setSelectedSymbol(symbol); // Set selected stock symbol
    setSymbol(symbol);
    setName(name);
    setPrice(price);
    setShowBuyPopup(true); // Show BuyOrder pop-up
    setShowSellPopup(false); // Hide SellOrder pop-up if visible
  };

  // Sell button click handler to show SellOrder pop-up
  const handleSell = (symbol,name,price) => {
    setSelectedSymbol(symbol); // Set selected stock symbol
    setSymbol(symbol);
    setName(name);
    setPrice(price);
    setShowSellPopup(true); // Show SellOrder pop-up
    setShowBuyPopup(false); // Hide BuyOrder pop-up if visible
  };

  // Function to close BuyOrder pop-up
  const closeBuyModal = () => {
    setShowBuyPopup(false);
  };

  // Function to close SellOrder pop-up
  const closeSellModal = () => {
    setShowSellPopup(false);
  };

  const goToPortfolio = () => {
    navigate('/portfolio-overview');
  };

  return (
    <div className="header__wrapper">
      <div className="header__logo">
        <a href='/'><img src={Logo} width={25} alt="Logo" /></a>
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
                  <span>Price: ${result.currentPrice}</span>
                </div>
                <div className="action-buttons">
                  {/* Buy button */}
                  <button onClick={() => handleBuy(result.symbol,result.name,result.currentPrice)} className="buy-btn">Buy</button>
                  {/* Sell button */}
                  <button onClick={() => handleSell(result.symbol,result.name,result.currentPrice)} className="sell-btn">Sell</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="header__menuItems">
      <a onClick={goToPortfolio} style={{ cursor: 'pointer' }}>Portfolio</a>
      </div>

      {/* Pop-up for BuyOrder component */}
      {showBuyPopup && <BuyOrder buySymbol={symbol} buyName={name} buyPrice={price} closeModal={closeBuyModal} />
      }

      {/* Pop-up for SellOrder component */}
      {showSellPopup && <SellOrder sellSymbol={symbol} sellName={name} sellPrice={price} closeModal={closeSellModal} />}
    </div>
  );
}

export default Header;
