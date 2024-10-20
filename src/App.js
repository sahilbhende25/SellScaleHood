import './App.css';
import './Portfolio.css'
import Header from "./Header";
import React, { useState } from 'react';
import Portfolio from "./Portfolio"
import BuyOrder from "./BuyOrder";
import SellOrder from "./SellOrder";
import PortfolioOverview from './PortfolioOverview';

function App() {
  const [portfolio] = useState([
    { ticker: 'AAPL', price: 135.67, change: -1.23, percentage: -0.9 },
    { ticker: 'GOOGL', price: 2845.12, change: 15.67, percentage: 0.55 },
  ]);
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>
      <div className="app__body">
            {/* <BuyOrder /> */}
            {/* <PortfolioOverview /> */}
            {/* <SellOrder /> */}
            <Portfolio portfolio={portfolio} />
      </div>
    </div>
  );
}

export default App;
