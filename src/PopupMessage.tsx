import React, { useState } from 'react';
import './assets/css/PopupMessage.css';

const PopupMessage: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="popup-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="popup-button">Hover me</button>
      {isHovered && (
        <div className="popup-message">
          <div className="popup-arrow-up"></div>
          This is a popup message!
        </div>
      )}
    </div>
  );
};

export default PopupMessage;
