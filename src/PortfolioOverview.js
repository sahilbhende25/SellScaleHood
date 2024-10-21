import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Box, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './PortfolioOverviewDark.css';

// Register the necessary elements for the chart
ChartJS.register(ArcElement, Tooltip, Legend);

function PortfolioOverview() {
  const [tabIndex, setTabIndex] = useState(0);
  const [sectorData, setSectorData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tradingHistory, setTradingHistory] = useState([]); // Trading history state

  useEffect(() => {
    const fetchSectorAndStockData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sectors_and_stocks');
        const { sectors, stocks } = response.data;
        setSectorData(sectors);
        setStockData(stocks);
      } catch (error) {
        console.error('Error fetching sector and stock data:', error);
      }
    };

    const fetchTableData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/table_data_holdings');
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    const fetchTradingHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trading_history');
        setTradingHistory(response.data); // Set the trading history data
      } catch (error) {
        console.error('Error fetching trading history:', error);
      }
    };

    fetchSectorAndStockData();
    fetchTableData();
    fetchTradingHistory(); // Fetch trading history data
  }, []);

  const sectorChartData = {
    labels: sectorData.map(item => item.sector),
    datasets: [
      {
        data: sectorData.map(item => item.percentage),
        backgroundColor: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'],
        hoverBackgroundColor: ['#5D6D7E', '#566573', '#34495e', '#85C1E9', '#2c3e50'],
      },
    ],
  };

  const stockChartData = {
    labels: stockData.map(item => item.ticker),
    datasets: [
      {
        data: stockData.map(item => item.value),
        backgroundColor: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'],
        hoverBackgroundColor: ['#85C1E9', '#566573', '#5D6D7E', '#34495e', '#2c3e50'],
      },
    ],
  };

  return (
    <Box className="portfolio-overview-container">
      {/* Tabs */}
      <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} className="tabs-dark">
        <Tab label="Current Holdings" />
        <Tab label="Trading History" />
      </Tabs>

      {tabIndex === 0 && (
        <>
          {/* Doughnut Charts */}
          <Box display="flex" justifyContent="space-around" my={3}>
            <Box>
              <Typography className="text-light">Sectors</Typography>
              <Doughnut data={sectorChartData} />
            </Box>
            <Box>
              <Typography className="text-light">Stocks</Typography>
              <Doughnut data={stockChartData} />
            </Box>
          </Box>

          {/* Table */}
          <Box mt={0}>
            {tableData.length > 0 ? (
              <table className="portfolio-table-dark">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Qty.</th>
                    <th>Buy Avg.</th>
                    <th>Buy Value</th>
                    <th>LTP</th>
                    <th>Present Value</th>
                    <th>P&L</th>
                    <th>P&L Change</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.ticker}</td>
                      <td>{row.quantity}</td>
                      <td>${row.buy_avg.toFixed(2)}</td>
                      <td>${row.buy_value.toFixed(2)}</td>
                      <td>${row.ltp.toFixed(2)}</td>
                      <td>${row.present_value.toFixed(2)}</td>
                      <td>${row.pnl.toFixed(2)}</td>
                      <td>{row.pnl_change.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Typography className="text-light">No data available</Typography>
            )}
          </Box>
        </>
      )}

      {tabIndex === 1 && (
        <Box mt={0}>
          {tradingHistory.length > 0 ? (
            <table className="portfolio-table-dark">
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Timestamp</th>
                  <th>Order Type</th>
                </tr>
              </thead>
              <tbody>
                {tradingHistory.map((order, index) => (
                  <tr key={index}>
                    <td>{order.ticker}</td>
                    <td>{order.quantity}</td>
                    <td>${order.price}</td>
                    <td>{new Date(order.timestamp).toLocaleString()}</td>
                    <td>{order.order_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Typography className="text-light">No trading history available</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default PortfolioOverview;
