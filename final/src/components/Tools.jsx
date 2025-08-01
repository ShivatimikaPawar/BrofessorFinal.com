import React from 'react';
import './Tools.css';

const Tools = () => {
  return (
    <>
      <div className='Slider'>
        <div className='scroll-track'>
          <p>
            🎢 Here we go, let it flow! 🔥 No chill, just skill! 🛸 Blast off, no days off!
            🎮 Code and load, on beast mode! 💥 Click, crack, make an impact! 😎 Smart and bold, break the mold!
            🎢 Here we go, let it flow! 🔥 No chill, just skill! 🛸 Blast off, no days off!
            🎮 Code and load, on beast mode! 💥 Click, crack, make an impact! 😎 Smart and bold, break the mold!
          </p>
        </div>
      </div>

      <div className="Tool-container">
        <h2><span className='wave-emoji'>🎯</span> Prep Tools</h2>
        <div className="tool-grid">
          <a href="/planner.html" target="_blank" rel="noopener noreferrer">
            <img src="./4card.png" alt="Planner" />
          </a>
          <a href="/notes.html" target="_blank" rel="noopener noreferrer">
            <img src="./3card.png" alt="Notes" />
          </a>
          <a href="/dashboard.html" target="_blank" rel="noopener noreferrer">
            <img src="./2card.png" alt="Dashboard" />
          </a>
          <a href="/chatbot.html" target="_blank" rel="noopener noreferrer">
            <img src="./1card.png" alt="Chatbot" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Tools;



