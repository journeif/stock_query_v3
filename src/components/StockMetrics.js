// src/components/StockMetrics.js
import React from 'react';
import './StockMetrics.css';

const StockMetrics = ({ stockData }) => {
  if (!stockData) return null;

  // Organize metrics into categories
  const priceMetrics = [
    { label: 'Current Price', value: `$${stockData.price}`, id: 'price' },
    { label: '52-Week High', value: `$${stockData.high52Week}`, id: 'high52' },
    { label: '52-Week Low', value: `$${stockData.low52Week}`, id: 'low52' },
  ];

  const valuationMetrics = [
    { 
      label: 'P/E Ratio', 
      value: stockData.peRatio, 
      id: 'pe',
      tooltip: 'Price-to-Earnings Ratio: A valuation ratio of a company\'s current share price compared to its earnings per share.'
    },
    { 
      label: 'EPS', 
      value: stockData.eps, 
      id: 'eps',
      tooltip: 'Earnings Per Share: The portion of a company\'s profit allocated to each outstanding share of common stock.' 
    },
    { 
      label: 'Net Income Growth', 
      value: stockData.netIncomeGrowthRate, 
      id: 'netIncome',
      tooltip: 'Annual growth rate of net income over the past year.' 
    },
    { 
      label: 'PEG Ratio', 
      value: stockData.pegRatio, 
      id: 'peg',
      tooltip: 'Price/Earnings to Growth Ratio: A stock\'s P/E ratio divided by its growth rate. Lower values suggest potentially undervalued stocks.' 
    }
  ];

  const renderMetric = (metric) => (
    <div className="metric-item" key={metric.id}>
      <div className="metric-tooltip" data-tooltip={metric.tooltip}>
        <span className="metric-label">{metric.label}:</span>
        <span className={`metric-value ${metric.id === 'price' ? 'highlight' : ''}`}>
          {metric.value}
        </span>
      </div>
    </div>
  );

  return (
    <div className="stock-metrics-container">
      <div className="company-header">
        <h2>{stockData.companyName} ({stockData.symbol})</h2>
        <div className="company-industry">{stockData.industry}</div>
      </div>
      
      <div className="metrics-section">
        <h3>Price Metrics</h3>
        <div className="metrics-grid">
          {priceMetrics.map(renderMetric)}
        </div>
      </div>
      
      <div className="metrics-section">
        <h3>Valuation Metrics</h3>
        <div className="metrics-grid">
          {valuationMetrics.map(renderMetric)}
        </div>
      </div>
    </div>
  );
};

export default StockMetrics;