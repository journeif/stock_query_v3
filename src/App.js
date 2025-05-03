import React from 'react';
import './App.css';
import StockSearch from './components/StockSearch';  // Import the StockSearch component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>StackUp App</h1>
      </header>
      <StockSearch /> {/* Render StockSearch here */}
    </div>
  );
}

export default App;
