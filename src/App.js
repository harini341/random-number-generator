import React, { useState } from 'react';
import './App.css'; // We'll create this CSS file

function App() {
  // State for random number
  const [randomNumber, setRandomNumber] = useState(null);
  
  // State to track remaining chances (starts at 5)
  const [remainingChances, setRemainingChances] = useState(5);
  
  // State to track if game is over
  const [gameOver, setGameOver] = useState(false);
  
  // State to store all generated numbers (history)
  const [history, setHistory] = useState([]);

  // Function to generate a random number between 1 and 100
  const generateRandomNumber = () => {
    // Check if game is over or no chances left
    if (gameOver || remainingChances === 0) {
      return;
    }
    
    // Generate random number
    const min = 1;
    const max = 100;
    const newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Update states
    setRandomNumber(newNumber);
    setRemainingChances(prev => prev - 1);
    setHistory(prev => [newNumber, ...prev]);
    
    // Check if this was the last chance
    if (remainingChances === 1) {
      setGameOver(true);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setRandomNumber(null);
    setRemainingChances(5);
    setGameOver(false);
    setHistory([]);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title">
            <span className="icon">🎲</span> 
            Random Number Generator
          </h1>
          <div className="chances-badge">
            ⚡ {remainingChances} / 5 Chances Left
          </div>
        </div>
        
        <div className="display-area">
          {/* Conditional Rendering based on game state */}
          {gameOver && remainingChances === 0 ? (
            <div className="game-over">
              <p className="game-over-icon">⏰</p>
              <p className="game-over-text">Game Over! No more chances left</p>
              <button className="reset-btn" onClick={resetGame}>
                Play Again 🔄
              </button>
            </div>
          ) : randomNumber === null ? (
            <div className="placeholder">
              <p className="placeholder-icon">✨</p>
              <p className="placeholder-text">Click the button to start!</p>
              <p className="placeholder-hint">{remainingChances} chances remaining</p>
            </div>
          ) : (
            <div className="number-container">
              <p className="number-label">🎯 Generated Number</p>
              <div className="number-wrapper">
                <p className="number">{randomNumber}</p>
                <div className="number-glow"></div>
              </div>
              <p className="chances-left">You have {remainingChances} chances left</p>
            </div>
          )}
        </div>

        {!gameOver && remainingChances > 0 && (
          <button 
            onClick={generateRandomNumber} 
            className="generate-btn"
            disabled={gameOver || remainingChances === 0}
          >
            <span>🎲</span> Generate Number <span>✨</span>
          </button>
        )}

        {gameOver && remainingChances === 0 && (
          <button className="new-game-btn" onClick={resetGame}>
            Start New Game 🚀
          </button>
        )}

        {/* History Section */}
        {history.length > 0 && (
          <div className="history-section">
            <h3 className="history-title">📜 History</h3>
            <div className="history-list">
              {history.map((num, index) => (
                <div key={index} className="history-item">
                  <span className="history-number">{num}</span>
                  <span className="history-badge">#{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
