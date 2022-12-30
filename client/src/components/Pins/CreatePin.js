import axios from "axios";
import React from "react";
import Rating from "./Rating";

const CreatePin = ({ position, pins, setPins, setPopup }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      userName: "eeee",
      title: "eeee",
      desc: "eee",
      rating: 3,
      lat: position.lat,
      long: position.lng,
    };

    try {
      const res = await axios.post("/createPin", newPin);
      console.log("res", res);
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
        <input type="text" placeholder="Enter a title" className="pin-input" />
        <label className="pin-details-heading">Review</label>
        <textarea name="review" rows="2" placeholder="Say us something about this place" className="pin-input" />
        <Rating />
        <button type="submit" className="add-pin-btn">
          Add Pin
        </button>
      </form>
    </div>
  );
};

export default CreatePin;
