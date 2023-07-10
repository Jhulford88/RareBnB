import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createBookingThunk } from "../../store/bookingsReducer";
import "./CreateBookingModal.css";

function CreateBookingModal({ spotId }) {
  // Initializing stuff
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  // const history = useHistory();

  // State
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  //   const [disabled, setDisabled] = useState(true);

  // Building review object for thunk prop
  const form = {};
  form.startDate = startDate;
  form.endDate = endDate;

  // Dispatching thunk on button click
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(createBookingThunk(form, spotId));

    return closeModal();
  };

  //   useEffect(() => {
  //     if (reviewText.length > 10 && rating) setDisabled(false);
  //   }, [reviewText, rating]);

  return (
    <div className="review-modal-container">
      <h1>Book your stay!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date <span className="errors">{/*errors.startDate*/}</span>
          <input
            type="date"
            value={startDate}
            placeholder="Start Date"
            onChange={(e) => setStartDate(e.target.value)}
            className="start-date"
          />
        </label>
        <label>
          End Date <span className="errors">{/*errors.endDate*/}</span>
          <input
            type="date"
            value={endDate}
            placeholder="End Date"
            onChange={(e) => setEndDate(e.target.value)}
            className="end-date"
          />
        </label>
        <button
          type="submit"
          className="post-review-button"
          //   disabled={disabled}
        >
          Reserve
        </button>
      </form>
    </div>
  );
}

export default CreateBookingModal;
