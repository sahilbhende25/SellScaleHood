import './App.css';
import './Portfolio.css';
import './MarketHistory.css';
import Header from "./Header";
import React, { useState, useEffect } from 'react';
import Portfolio from "./Portfolio";
import axios from 'axios'; // Import axios for making API requests
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PortfolioOverview from './PortfolioOverview';
import MarketHistory from './MarketHistory';

function App() {
  const [portfolio, setPortfolio] = useState([]);
  useEffect(() => {
    // Fetch portfolio data from the backend API
    
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/history');
        setPortfolio(response.data); // Update the portfolio state with the API data
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    fetchPortfolioData();
  }, []);
  return (
    <Router>
    <div className="app">
      <div className="app__header">
        <Header />
      </div>
      <div className="app__body">
      {/* <Portfolio portfolio={portfolio} /> */}
      {/* <Route path="/" element={} /> */}
      <Routes>
          <Route path="/portfolio-overview" element={<PortfolioOverview />} />
          <Route path="" element={<><Portfolio portfolio={portfolio} /> <MarketHistory ticker={"AAPL"} /></>} />
          {/* Add more routes here as you add more components */}
      </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
