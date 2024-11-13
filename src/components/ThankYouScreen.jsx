import React from 'react';
import '../styles/components/ThankYouScreen.css'; // Import the CSS file for ThankYouScreen

const ThankYouScreen = ({ onReset }) => {
  return (
    <div className="thank-you-container">
      <h1>Thank you for your responses!</h1>
      <button className="thank-you-button" onClick={onReset}>Take the Survey Again</button>
    </div>
  );
};

export default ThankYouScreen;
