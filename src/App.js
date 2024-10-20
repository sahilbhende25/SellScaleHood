import React, { useState } from 'react';
import './App.css'; // Your main App styles
// import './AppLayout.css'; // Your layout styles for the app body
import Portfolio from './Portfolio'; // Your existing Portfolio component
import LineChartComponent from './LineChartComponent' // Import the chart component

function App() {
  const [portfolio] = useState([
    { ticker: 'AAPL', price: 135.67, change: -1.23, percentage: -0.9 },
    { ticker: 'GOOGL', price: 2845.12, change: 15.67, percentage: 0.55 },
  ]);

  return (
    <div className="app">
      <div className="app__header">
        {/* Your header content */}
      </div>
      <div className="app__body">
          <Portfolio portfolio={portfolio} />
      </div>
    </div>
  );
}

export default App;
