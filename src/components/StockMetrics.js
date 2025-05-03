// src/components/StockMetrics.js
import React from 'react';

const StockMetrics = ({ stockData, onFavorite }) => {
  if (!stockData) return null;

  return (
    <div className="card">
      <h2>Stock Metrics</h2>
      <p><strong>Ticker:</strong> {stockData.ticker}</p>
      <p><strong>Industry:</strong> {stockData.industry}</p>
      <p><strong>Growth Rate:</strong> {stockData.growthRate}%</p>
      <p><strong>P/E Ratio:</strong> {stockData.peRatio}</p>
      <p><strong>Growth over P/E:</strong> {stockData.growthOverPE}</p>
      <button onClick={onFavorite}>Favorite this Stock</button>
    </div>
  );
};

export default StockMetrics;
