import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createBookingThunk } from "../../store/bookingsReducer";
import { updateBookingThunk } from "../../store/bookingsReducer";
import "./UpdateBookingModal.css";

function UpdateBookingModal({ bookingId, setIsUpdated, booking }) {
  // Initializing stuff
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const formatDate = (dateString) => {
    if (!dateString) return;
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // State
  const [startDate, setStartDate] = useState(
    formatDate(booking?.startDate) || ""
  );
  const [endDate, setEndDate] = useState(formatDate(booking?.endDate) || "");
  const [errors, setErrors] = useState({});
  //   const [disabled, setDisabled] = useState(true);

  // Building review object for thunk prop
  const form = {};
  form.startDate = startDate;
  form.endDate = endDate;

  // Dispatching thunk on button click
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (new Date() > new Date(startDate).getTime())
      newErrors["startDate"] = "Start date must be in the future!";
    if (!startDate) newErrors["startDate"] = "Please select a start date!";
    if (new Date(endDate) < new Date(startDate).getTime())
      newErrors["endDate"] = "End date must be after the start date!";
    if (!endDate) newErrors["endDate"] = "Please select an end date!";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    dispatch(updateBookingThunk(form, bookingId));
    setIsUpdated(true);

    return closeModal();
  };

  return (
    <div className="booking-modal-container">
      <h1>Update your Reservation!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date <span className="errors">{errors.startDate}</span>
          <input
            type="date"
            value={startDate}
            placeholder="Start Date"
            onChange={(e) => setStartDate(e.target.value)}
            className="start-date"
          />
        </label>
        <label>
          End Date <span className="errors">{errors.endDate}</span>
          <input
            type="date"
            value={endDate}
            placeholder="End Date"
            onChange={(e) => setEndDate(e.target.value)}
            className="end-date"
          />
        </label>
        <div className="post-booking-button-container">
          <button
            type="submit"
            className="post-booking-button"
            //   disabled={disabled}
          >
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBookingModal;
