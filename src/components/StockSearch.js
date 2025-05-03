// src/components/StockSearch.js
import React, { useState } from 'react';
import { fetchStockData } from '../services/stockApiService';
import StockMetrics from './StockMetrics';
import FavoritesList from './FavoritesList';
import './StockSearch.css';

const StockSearch = () => {
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const symbol = ticker.toUpperCase().trim();

    if (!symbol) {
      displayError('Please enter a stock ticker symbol.');
      return;
    }

    setLoading(true);
    setError('');
    setShowError(false);

    try {
      const data = await fetchStockData(symbol);
      setStockData(data);
    } catch (err) {
      displayError(err.message || 'There was an error fetching the stock data.');
      setStockData(null);
    } finally {
      setLoading(false);
    }
  };

  const displayError = (message) => {
    setError(message);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  const addToFavorites = () => {
    if (stockData && !favorites.find(fav => fav.symbol === stockData.symbol)) {
      const newFavorite = {
        ...stockData,
        dateAdded: new Date().toISOString()
      };
      setFavorites([...favorites, newFavorite]);
      // Future enhancement: Store to Supabase here
    }
  };

  const removeFromFavorites = (symbol) => {
    setFavorites(favorites.filter(fav => fav.symbol !== symbol));
    // Future enhancement: Remove from Supabase here
  };

  return (
    <div className="stock-app">
      <header className="app-header">
        <h1 className="app-title">StackUp Finance</h1>
        <p className="app-subtitle">Professional Stock Analysis & Portfolio Tracking</p>
      </header>

      <div className="stock-search-container">
        <h1 className="app-title">📈 StackUp Stock Analytics</h1>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-container">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="Enter stock ticker (e.g., AAPL)"
              className="search-input"
            />
            <button
              type="submit"
              className="search-button"
              disabled={loading}
            >
              {loading ? <span className="spinner"></span> : 'Search'}
            </button>
          </div>
        </form>

        {showError && (
          <div className="error-popup">
            <div className="error-content">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
              <button className="close-error" onClick={() => setShowError(false)}>×</button>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Fetching stock data...</p>
          </div>
        )}

        {stockData && !loading && (
          <>
            <StockMetrics stockData={stockData} />

            <div className="action-buttons">
              <button
                onClick={addToFavorites}
                className="favorite-button"
                disabled={favorites.some(fav => fav.symbol === stockData.symbol)}
              >
                {favorites.some(fav => fav.symbol === stockData.symbol)
                  ? '✓ Added to Favorites'
                  : '+ Add to Favorites'
                }
              </button>
            </div>
          </>
        )}

        <FavoritesList
          favorites={favorites}
          onRemove={removeFromFavorites}
        />
      </div>
    </div>
  );
};

export default StockSearch;
