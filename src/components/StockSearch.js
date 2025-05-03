import React, { useState } from 'react';
import axios from 'axios';
import FavoritesList from './FavoritesList';

const StockSearch = () => {
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);

  const apiKey = 'd0ajaahr01qm3l9lssagd0ajaahr01qm3l9lssb0'; // Your Finnhub API key

  // Fetch stock data and additional financial info (EPS)
  const fetchStockData = async () => {
    const symbol = ticker.toUpperCase().trim();

    if (!symbol) {
      setError('Please enter a stock ticker symbol.');
      setStockData(null);
      return;
    }

    try {
      // Fetch stock price quote
      const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
      const profileResponse = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`);
      const financialsResponse = await axios.get(`https://finnhub.io/api/v1/financials-reported?symbol=${symbol}&token=${apiKey}`);

      // Log the full responses to see what data we are getting
      console.log('Quote Response:', response.data);
      console.log('Profile Response:', profileResponse.data);
      console.log('Financials Response:', financialsResponse.data);

      // Check if the response has valid data
      if (response.data && response.data.c !== 0) {
        const price = response.data.c;

        // Retrieve EPS from the financials report (using TTM - trailing twelve months)
        const earningsPerShare = financialsResponse.data ? financialsResponse.data.epsTTM : null;

        // Calculate P/E ratio if earnings per share (EPS) exists
        const PE = earningsPerShare ? (price / earningsPerShare).toFixed(2) : 'N/A';

        // Get 52-week high and low from profile response
        const high52Week = profileResponse.data ? profileResponse.data.high52Week : 'N/A';
        const low52Week = profileResponse.data ? profileResponse.data.low52Week : 'N/A';

        // Set the stock data in state
        setStockData({
          symbol,
          price,
          PE,
          high52Week,
          low52Week,
          eps: earningsPerShare || 'N/A'
        });
        setError('');
      } else {
        setError('No data found. Please double-check the stock ticker (e.g., AAPL, MSFT).');
        setStockData(null);
      }
    } catch (err) {
      setError('There was an error fetching the stock data.');
      setStockData(null);
    }
  };

  const addToFavorites = () => {
    if (stockData && !favorites.find(fav => fav.symbol === stockData.symbol)) {
      setFavorites([...favorites, stockData]);
    }
  };

  const inputGroupStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    gap: '10px'
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '200px',
    fontSize: '16px'
  };

  const buttonStyle = {
    padding: '10px 18px',
    borderRadius: '6px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  };

  const cardStyle = {
    marginTop: '30px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'left',
    maxWidth: '400px',
    margin: '30px auto',
    backgroundColor: '#f9f9f9'
  };

  const priceStyle = {
    color: '#28a745',
    fontWeight: 'bold'
  };

  const labelStyle = {
    color: '#555'
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h2>📈 Stock Search</h2>

      <div style={inputGroupStyle}>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter stock ticker (e.g., AAPL)"
          style={inputStyle}
        />
        <button onClick={fetchStockData} style={buttonStyle}>Search</button>
      </div>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

      {stockData && (
        <div style={cardStyle}>
          <h3>{stockData.symbol}</h3>
          <p><span style={labelStyle}>Current Price:</span> <span style={priceStyle}>${stockData.price}</span></p>
          <p><span style={labelStyle}>P/E Ratio:</span> {stockData.PE}</p>
          <p><span style={labelStyle}>52-Week High:</span> ${stockData.high52Week}</p>
          <p><span style={labelStyle}>52-Week Low:</span> ${stockData.low52Week}</p>
          <p><span style={labelStyle}>EPS (Earnings per Share):</span> {stockData.eps}</p>
          <button onClick={addToFavorites} style={{ ...buttonStyle, backgroundColor: '#28a745', marginTop: '10px' }}>
            + Add to Favorites
          </button>
        </div>
      )}

      <FavoritesList favorites={favorites} />
    </div>
  );
};

export default StockSearch;
