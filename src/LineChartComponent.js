import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Example static data for the trading chart
const data = [
  { name: 'Day 1', price: 2400 },
  { name: 'Day 2', price: 2210 },
  { name: 'Day 3', price: 2290 },
  { name: 'Day 4', price: 2000 },
  { name: 'Day 5', price: 2181 },
  { name: 'Day 6', price: 2500 },
  { name: 'Day 7', price: 2100 },
];

function TradingChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default TradingChartComponent;
