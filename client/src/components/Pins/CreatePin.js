import axios from "axios";
import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import Rating from "./Rating";
import { BASE_URL } from "../../helper/helper";

const CreatePin = ({ position, pins, setPins, setPopup }) => {
  const { user } = useUser();
  const [title, setTitle] = useState(0);
  const [review, setReview] = useState(0);
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: user.username,
      title: title,
      desc: review,
      rating: rating,
      lat: position.lat,
      long: position.lng,
    };

    try {
      const res = await axios.post(`${BASE_URL}/createPin`, newPin);
      setPins([...pins, res.data.newPin]);
      setPopup(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-around pin-container">
        <label className="pin-details-heading">Title</label>
        <input
          type="text"
          placeholder="Enter a title"
          className="pin-input"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="pin-details-heading">Review</label>
        <textarea
          name="review"
          rows="2"
          placeholder="Say us something about this place"
          className="pin-input"
          onChange={(e) => setReview(e.target.value)}
        />
        <Rating rating={rating} setRating={setRating} />
        <button type="submit" className="add-pin-btn" disabled={!title || !review || !rating}>
          Add Pin
        </button>
      </form>
    </div>
  );
};

export default CreatePin;
