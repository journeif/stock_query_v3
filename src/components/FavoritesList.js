import React from 'react';

const FavoritesList = ({ favorites }) => {
  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Favorites</h3>
      {favorites.length === 0 ? (
        <p>No favorite stocks yet!</p>
      ) : (
        <ul>
          {favorites.map((fav) => (
            <li key={fav.symbol}>
              {fav.symbol} - 
              P/E Ratio: {fav.peRatio || 'N/A'}, 
              52-Week High: ${fav.high52Week || 'N/A'}, 
              52-Week Low: ${fav.low52Week || 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
