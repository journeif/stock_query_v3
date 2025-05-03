// src/components/FavoritesList.js
import React, { useState } from 'react';
import './FavoritesList.css';

const FavoritesList = ({ favorites, onRemove }) => {
  const [filterIndustry, setFilterIndustry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  if (!favorites || favorites.length === 0) {
    return null;
  }

  // Get unique industries for filter dropdown
  const industries = [...new Set(favorites.map(stock => stock.industry))].filter(Boolean);
  
  // Filter favorites by industry and search term
  const filteredFavorites = favorites.filter(stock => {
    const matchesIndustry = !filterIndustry || stock.industry === filterIndustry;
    const matchesSearch = !searchTerm || 
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesIndustry && matchesSearch;
  });

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">My Favorite Stocks</h2>
      
      <div className="favorites-filters">
        <div className="search-filter">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stocks..."
            className="favorites-search"
          />
        </div>
        
        <div className="industry-filter">
          <select 
            value={filterIndustry} 
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="industry-select"
          >
            <option value="">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredFavorites.length === 0 ? (
        <p className="no-results">No stocks match your filters.</p>
      ) : (
        <div className="favorites-grid">
          {filteredFavorites.map(stock => (
            <div className="favorite-card" key={stock.symbol}>
              <div className="favorite-header">
                <h3>{stock.symbol}</h3>
                <button 
                  className="remove-favorite"
                  onClick={() => onRemove(stock.symbol)}
                  aria-label="Remove from favorites"
                >
                  ×
                </button>
              </div>
              
              <div className="favorite-company">{stock.companyName}</div>
              <div className="favorite-industry">{stock.industry}</div>
              
              <div className="favorite-metrics">
                <div className="favorite-metric">
                  <span className="metric-label">Price:</span>
                  <span className="metric-value">${stock.price}</span>
                </div>
                <div className="favorite-metric">
                  <span className="metric-label">P/E:</span>
                  <span className="metric-value">{stock.peRatio}</span>
                </div>
                <div className="favorite-metric">
                  <span className="metric-label">Growth:</span>
                  <span className="metric-value">{stock.netIncomeGrowthRate}</span>
                </div>
                <div className="favorite-metric">
                  <span className="metric-label">PEG:</span>
                  <span className="metric-value">{stock.pegRatio}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;