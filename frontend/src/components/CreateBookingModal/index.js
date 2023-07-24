import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { createBookingThunk } from "../../store/bookingsReducer";
import "./CreateBookingModal.css";

function CreateBookingModal({ spotId, singleSpot, sessionUser }) {
  // Initializing stuff
  const dispatch = useDispatch();
  const history = useHistory();

  // State
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState({});

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

    dispatch(createBookingThunk(form, spotId));

    history.push(`/bookings/${sessionUser.id}`);
    // closeModal();
  };

  const dateHelper = () => {
    let date1 = new Date(startDate);
    let date2 = new Date(endDate);

    // To calculate the time difference of two dates
    let differenceInTime = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays;
  };

  return (
    <div className="review-modal-container">
      <form onSubmit={handleSubmit}>
        <div className="input-field-container">
          <div className="input-label-div-left">
            <label className="date-input-label">
              CHECK-IN
              <input
                type="date"
                value={startDate}
                placeholder="Start Date"
                onChange={(e) => setStartDate(e.target.value)}
                className="date-input"
              />
            </label>
          </div>
          <div className="input-label-div-right">
            <label className="date-input-label">
              CHECK-OUT
              <input
                type="date"
                value={endDate}
                placeholder="End Date"
                onChange={(e) => setEndDate(e.target.value)}
                className="date-input"
              />
            </label>
          </div>
        </div>
        <div className="post-booking-button-container">
          <button
            type="submit"
            className="post-booking-button"
            // disabled={disabled}
          >
            {sessionUser ? "Reserve" : "Please log-in to reserve"}
            {/* Reserve */}
          </button>
        </div>
        <div className="errors-container">
          <span className="errors">{errors.startDate}</span>
          <span className="errors">{errors.endDate}</span>
        </div>
      </form>
      <p className="wont-be-charged">you wont be charged yet</p>
      <div className="price-calculation-nights">
        <p>
          ${singleSpot.price} x {startDate && endDate ? dateHelper() : 0} nights
        </p>
        <div>
          $
          {startDate && endDate
            ? (singleSpot.price * dateHelper()).toFixed(2)
            : 0}
        </div>
      </div>
      <div className="price-calculation-cleaning">
        <p>Cleaning Fee</p>
        <div>
          ${startDate && endDate ? (singleSpot.price * 0.5).toFixed(2) : 0}
        </div>
      </div>
      <div className="price-calculation-service">
        <p>Rarebnb Service Fee</p>
        <div>
          $
          {startDate && endDate
            ? (singleSpot.price * dateHelper() * 0.2).toFixed(2)
            : 0}
        </div>
      </div>
      <hr className="bar" />
      <div className="price-calculation-total">
        <p>Price before Taxes</p>
        <div>
          $
          {startDate && endDate
            ? (
                singleSpot.price * dateHelper() +
                singleSpot.price * 0.5 +
                singleSpot.price * dateHelper() * 0.2
              ).toFixed(2)
            : 0}
        </div>
      </div>
    </div>
  );
}

export default CreateBookingModal;
