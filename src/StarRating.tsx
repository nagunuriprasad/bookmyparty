import React, { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0); // Current rating
  const [hover, setHover] = useState(0);   // Hover state

  const handleRating = (rate: number) => {
    setRating(rate);
    alert(`You rated ${rate} stars!`);
  };

  const starStyle = {
    cursor: 'pointer',
    fontSize: '24px',
    marginRight: '5px',
    transition: 'color 0.2s',
    marginTop: '10px',      // Add top margin
    marginBottom: '10px',   // Corrected bottom margin
  };

  const activeStarStyle = {
    color: '#FFD700', // Yellow color for active stars
  };

  const defaultStarStyle = {
    color: '#ccc', // Default grey color for inactive stars
  };

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const starValue = index + 1;
        return (
          <i
            key={index}
            className="fa fa-star"
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(rating)}
            style={{
              ...starStyle,
              ...(starValue <= (hover || rating) ? activeStarStyle : defaultStarStyle),
            }}
            aria-hidden="true"
          ></i>
        );
      })}
    </div>
  );
};

export default StarRating;
