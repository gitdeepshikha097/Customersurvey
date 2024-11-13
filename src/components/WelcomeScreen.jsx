import React from 'react';
import '../styles/components/WelcomeScreen.css'; // Import the CSS file for WelcomeScreen

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Our Survey!</h1>
      <button className="welcome-button" onClick={onStart}>Start Survey</button>
    </div>
  );
};

export default WelcomeScreen;
