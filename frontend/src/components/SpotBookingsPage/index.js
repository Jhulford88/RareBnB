import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotBookingsThunk } from "../../store/bookingsReducer";
import OpenDeleteBookingModalButton from "../OpenDeleteBookingModalButton";
import DeleteBookingModal from "../DeleteBookingModal";
import "./SpotBookingsPage.css";

function SpotBookingsPage() {
  // Initializing stuff
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const { spotId } = useParams();

  //State
  const [isUpdated, setIsUpdated] = useState(false);

  //UseSelectors
  const bookings = useSelector((state) => state.bookings.spot.Bookings);

  useEffect(() => {
    dispatch(getSpotBookingsThunk(spotId));
    setIsUpdated(false);
  }, [dispatch, isUpdated]);

  const handleClose = () => {
    closeModal();
  };

  //Build booking entries as list items
  const bookingEntries = bookings?.map((booking) => {
    return (
      <li key={booking.id} className="booking-entry-container">
        <div>
          <span className="check-in-out">Guest Name</span>&nbsp;
          {booking.User.firstName}&nbsp;{booking.User.lastName}
        </div>
        <div>
          <span className="check-in-out">Check-in</span>&nbsp;
          {new Date(booking.startDate).toDateString()}
        </div>
        <div>
          <span className="check-in-out">Check-out</span>&nbsp;
          {new Date(booking.endDate).toDateString()}
        </div>
        {new Date() < new Date(booking.startDate).getTime() ? (
          <div className="open-delete-booking-modal-button">
            <OpenDeleteBookingModalButton
              buttonText="Delete"
              modalComponent={
                <DeleteBookingModal
                  bookingId={booking.id}
                  setIsUpdated={setIsUpdated}
                />
              }
            />
          </div>
        ) : (
          <span className="booking-closed">BOOKING CLOSED</span>
        )}
      </li>
    );
  });

  return (
    <div className="spot-bookings-parent-container">
      <h1>View Your Spot's Bookings</h1>
      <ul className="spot-booking-entry-gallery">{bookingEntries}</ul>
    </div>
  );
}

export default SpotBookingsPage;
