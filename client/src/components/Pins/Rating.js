import React, { useState } from "react";
import "./style.css";

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <>
      <label className="pin-details-heading">Rating</label>
      <div>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={`star-button ${index <= (hover || rating) ? "on" : "off"}`}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="fs-1">&#9733;</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Rating;
