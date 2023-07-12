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
        <div className="booking-entry-contents">
          <div>
            <span className="check-in-out">Guest Name:</span>&nbsp;
            {booking.User.firstName}&nbsp;{booking.User.lastName}
          </div>
          <div>
            <span className="check-in-out">Booking ID:</span>&nbsp;
            {booking.id}
          </div>
          <div>
            <span className="check-in-out">Check-in</span>&nbsp;
            {new Date(booking.startDate).toUTCString().slice(0, 16)}
          </div>
          <div>
            <span className="check-in-out">Check-out</span>&nbsp;
            {new Date(booking.endDate).toUTCString().slice(0, 16)}
          </div>
          <div className="booking-entry-contents-bottom">
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
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="spot-bookings-parent-container">
      {bookings?.length ? (
        <div>
          <h1>View Your Spot's Bookings</h1>
          <ul className="spot-booking-entry-gallery">{bookingEntries}</ul>
        </div>
      ) : (
        <div className="no-res-h1-container">
          <h1 className="no-res-h1">
            This Spot Has No Reservations At The Moment!
          </h1>
        </div>
      )}
    </div>
  );
}

export default SpotBookingsPage;
