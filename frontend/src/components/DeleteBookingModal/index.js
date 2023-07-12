import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteReviewThunk } from "../../store/reviewsReducer";
import { deleteBookingThunk } from "../../store/bookingsReducer";
import "./DeleteBookingModal.css";

function DeleteBookingModal({ bookingId, setIsUpdated }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  // const history = useHistory();

  const closeDeleteBookingModal = () => {
    return closeModal();
  };

  const deleteBookingAction = async () => {
    await dispatch(deleteBookingThunk(bookingId));
    setIsUpdated(true);
    return closeModal();
  };

  return (
    <div className="delete-booking-modal-parent">
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to delete this booking?</h2>
      <div className="delete-booking-modal-buttons-container">
        <button
          className="delete-booking-modal-buttons"
          onClick={deleteBookingAction}
        >
          {"Yes (Delete Booking)"}
        </button>
        <button
          className="delete-booking-modal-buttons"
          onClick={closeDeleteBookingModal}
        >
          {"No (Keep Booking)"}
        </button>
      </div>
    </div>
  );
}

export default DeleteBookingModal;
