import React, { useState } from 'react';
import { Tab, Tabs, Box, Typography, Radio, RadioGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './PortfolioOverviewDark.css';

// Register the necessary elements for the chart
ChartJS.register(ArcElement, Tooltip, Legend);

function PortfolioOverview() {
  const [tabIndex, setTabIndex] = useState(0);
  const [view, setView] = useState('current');
  const [includeMutualFunds, setIncludeMutualFunds] = useState(true);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Monochromatic base color with accents for doughnut chart
  const monochromaticColors = [
    '#34495e', // Dark Blue-Gray
    '#2c3e50', // Slightly lighter Dark Blue-Gray
    '#5D6D7E', // Muted Accent (lighter blue-gray)
    '#566573', // Muted Dark Accent
    '#85C1E9', // Light Blue Accent
  ];

  const legendOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#ecf0f1', // Same as "Account", "Sectors" text color
          font: {
            size: 14,
            family: 'Arial, sans-serif',
          },
        },
      },
      tooltip: {
        enabled: true, // Reverting to default tooltip behavior
      },
    },
  };

  const accountData = {
    labels: ['Equity (MF)', 'Equity'],
    datasets: [
      {
        data: [97.24, 2.76],
        backgroundColor: [monochromaticColors[0], monochromaticColors[1]],
        hoverBackgroundColor: [monochromaticColors[2], monochromaticColors[3]],
      },
    ],
  };

  const sectorData = {
    labels: ['Financials', 'Materials', 'Consumer Discretionary', 'Information Technology', 'Industrials', 'Consumer Staples', 'Health Care'],
    datasets: [
      {
        data: [35.62, 13.04, 12.22, 8.93, 8.03, 7.35, 5.64],
        backgroundColor: monochromaticColors, // Use the monochromatic colors
        hoverBackgroundColor: [monochromaticColors[4], monochromaticColors[2], monochromaticColors[3], monochromaticColors[1], monochromaticColors[0]],
      },
    ],
  };

  const stocksData = {
    labels: ['TCS', 'HINDUNILVR', 'KOTAKBANK', 'SUPREMEIND', 'SCHAEFFLER', 'CUMMINSIND', 'PERSISTENT'],
    datasets: [
      {
        data: [0.89, 0.83, 0.83, 1.37, 1.18, 1.12, 1.10],
        backgroundColor: monochromaticColors,
        hoverBackgroundColor: monochromaticColors.reverse(), // Different shades of the base color for hover effect
      },
    ],
  };

  return (
    <Box className="portfolio-overview-container">
      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="portfolio tabs" className="tabs-dark">
        <Tab label="Overview" />
        <Tab label="Treemap" disabled />
        <Tab label="Insights" disabled />
      </Tabs>


      {/* Doughnut Charts */}
      <Box display="flex" justifyContent="space-around" my={3}>
        <Box>
          <Typography className="text-light">Account</Typography>
          <Doughnut data={accountData} options={legendOptions} />
        </Box>
        <Box>
          <Typography className="text-light">Sectors</Typography>
          <Doughnut data={sectorData} options={legendOptions} />
        </Box>
        <Box>
          <Typography className="text-light">Stocks</Typography>
          <Doughnut data={stocksData} options={legendOptions} />
        </Box>
      </Box>

      {/* Radio Buttons and Checkbox */}
      <Box display="flex" justifyContent="space-between" alignItems="center" className="controls-dark">
        <RadioGroup row value={view} onChange={(e) => setView(e.target.value)}>
          <FormControlLabel value="current" control={<Radio className="radio-dark" />} label="Current" />
          <FormControlLabel value="invested" control={<Radio className="radio-dark" />} label="Invested" />
        </RadioGroup>
        <FormControlLabel
          control={<Checkbox className="checkbox-dark" checked={includeMutualFunds} onChange={(e) => setIncludeMutualFunds(e.target.checked)} />}
          label="Include stocks from Mutual funds"
        />
      </Box>

      {/* Table */}
      <Box mt={2}>
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
            <tr>
              <td>TCS</td>
              <td>100</td>
              <td>₹1800</td>
              <td>₹180,000</td>
              <td>₹1900</td>
              <td>₹190,000</td>
              <td>₹10,000</td>
              <td>+5.56%</td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

export default PortfolioOverview;
