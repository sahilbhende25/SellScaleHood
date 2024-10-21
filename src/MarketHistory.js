import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

// Import necessary modules from Chart.js
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function MarketHistory({ ticker = 'B' }) {
  const [chartData, setChartData] = useState({});
  const [chartSize, setChartSize] = useState({ width: 700, height: 400 }); // Default size

  // Fetch stock data
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/stock_chart/${ticker}`);
        const stockHistory = response.data;

        const labels = Object.keys(stockHistory).map(date => new Date(date).toLocaleDateString());
        const prices = Object.values(stockHistory);

        setChartData({
          labels,
          datasets: [
            {
              label: `${ticker} Stock Price`,
              data: prices,
              borderColor: '#4caf50',
              fill: false,
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, [ticker]);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#333',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
        },
      },
    },
  };

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      // Update chart size based on the window size
      const newWidth = window.innerWidth * 0.8; // 80% of window width
      const newHeight = window.innerHeight * 0.6; // 60% of window height
      setChartSize({ width: newWidth, height: newHeight });
    };

    // Set initial size
    handleResize();

    // Attach event listener to resize the chart dynamically
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="marketHistory" style={{ width: chartSize.width, height: chartSize.height }}>
      {chartData.labels ? (
        <Line data={chartData} options={options} width={chartSize.width} height={chartSize.height} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}

export default MarketHistory;