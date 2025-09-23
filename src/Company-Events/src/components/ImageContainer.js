import React, { useState, useEffect } from 'react';
import './ImageContainer.css';

const ImageContainer = ({ images }) => {
  // Load saved statuses and texts from localStorage or set default values
  const [statuses, setStatuses] = useState(() => {
    const savedStatuses = localStorage.getItem('statuses');
    return savedStatuses ? JSON.parse(savedStatuses) : Array(images.length).fill("");
  });

  const [texts, setTexts] = useState(() => {
    const savedTexts = localStorage.getItem('texts');
    return savedTexts ? JSON.parse(savedTexts) : Array(images.length).fill("");
  });

  // Save statuses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('statuses', JSON.stringify(statuses));
  }, [statuses]);

  // Save texts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('texts', JSON.stringify(texts));
  }, [texts]);

  // Handler for changing status
  const handleStatusChange = (index, event) => {
    const newStatuses = [...statuses];
    newStatuses[index] = event.target.value;
    setStatuses(newStatuses);
  };

  // Handler for changing text in the text boxes
  const handleTextChange = (index, event) => {
    const newTexts = [...texts];
    newTexts[index] = event.target.value;
    setTexts(newTexts);
  };

  // Function to get the correct CSS class based on the selected status
  const getStatusClass = (status) => {
    switch (status) {
      case "Verified":
        return "status-verified";
      case "Not Verified":
        return "status-not-verified";
      case "Renewal":
        return "status-renewal";
      case "Hold":
        return "status-hold";
      default:
        return "";
    }
  };

  return (
    <div className="image-grid-container">
      <div className="image-grid">
        {images.map((imgSrc, index) => (
          <div key={index} className={`image-item ${getStatusClass(statuses[index])}`}>
            <div className="image-circle">
              <img src={imgSrc} alt={`Container ${index + 1}`} />
              <div className="title-overlay">
                <input
                  type="text"
                  value={texts[index]}
                  onChange={(event) => handleTextChange(index, event)}
                  className="editable-text-box"
                  placeholder="Enter text"
                />
              </div>
              <div className={`status-background ${getStatusClass(statuses[index])}`} />
            </div>
            <div className="status-selector">
              <select
                onChange={(event) => handleStatusChange(index, event)}
                value={statuses[index]}
              >
                <option value="" disabled>Status</option>
                <option value="Verified">Verified</option>
                <option value="Not Verified">Not Verified</option>
                <option value="Renewal">Renewal</option>
                <option value="Hold">Hold</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageContainer;
