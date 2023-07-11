import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotBookingsThunk } from "../../store/bookingsReducer";
import OpenModalButton from "../OpenModalButton";
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
          {booking.User.firstName}&nbsp;{booking.User.lastName}
        </div>
        <div>
          <span>Check-in</span>
          {booking.startDate}
        </div>
        <div>
          <span>Check-out</span>
          {booking.endDate}
        </div>
        <div>
          <OpenModalButton
            itemText="Delete"
            modalComponent={
              <DeleteBookingModal
                bookingId={booking.id}
                setIsUpdated={setIsUpdated}
              />
            }
          />
        </div>
      </li>
    );
  });

  return (
    <div className="spot-bookings-modal-container">
      <h1>Hello from Spot Bookings Page</h1>
      <ul>{bookingEntries}</ul>
    </div>
  );
}

export default SpotBookingsPage;
