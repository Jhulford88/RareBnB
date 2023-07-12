import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserBookingsThunk } from "../../store/bookingsReducer";
import OpenModalButton from "../OpenModalButton";
import UpdateBookingModal from "../UpdateBookingModal";
import "./MyBookingsPage.css";
import DeleteBookingModal from "../DeleteBookingModal";

function MyBookingsPage() {
  //Initialize things
  const history = useHistory();
  const dispatch = useDispatch();

  //UseSelectors
  const bookings = useSelector((state) => state.bookings.user.Bookings);
  const sessionUser = useSelector((state) => state.session.user);

  //State
  const [isUpdated, setIsUpdated] = useState(false);

  //Dispatch thunk to load user bookings
  useEffect(() => {
    dispatch(getUserBookingsThunk());
    setIsUpdated(false);
  }, [dispatch, isUpdated]);

  //Build cards to display current bookings
  let bookingsCards = bookings?.map((booking) => {
    return (
      <li className="booking-spot-card" key={booking.id}>
        <div className="booking-spot-card-container">
          <div className="booking-spot-card-image-container">
            <Link to={`/spots/${booking.Spot.id}`}>
              <img
                className="booking-spot-card-img"
                alt="test"
                src={booking.Spot.previewImage}
              ></img>
            </Link>
          </div>
          <div className="booking-card-lower-half">
            <p className="booking-spot-name">{booking.Spot.name}</p>
            <p>
              {booking.Spot.city}, {booking.Spot.state}
            </p>
            <p>
              <span className="check-in-out">Check-in:</span> &nbsp;
              {new Date(booking.startDate).toUTCString().slice(0, 16)}
            </p>
            <p>
              {" "}
              <span className="check-in-out">Check-out:</span> &nbsp;
              {new Date(booking.endDate).toUTCString().slice(0, 16)}
            </p>
            {new Date() < new Date(booking.startDate).getTime() ? (
              <div className="booking-spot-card-button-container">
                <OpenModalButton
                  className="open-update-booking-modal-button"
                  buttonText="Update"
                  modalComponent={
                    <UpdateBookingModal
                      bookingId={booking.id}
                      setIsUpdated={setIsUpdated}
                      booking={booking}
                    />
                  }
                />
                <OpenModalButton
                  className="open-delete-booking-modal-button"
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
              <p className="booking-closed">BOOKING CLOSED</p>
            )}
          </div>
        </div>
      </li>
    );
  });

  //If user logs out, redirect to landingPage
  if (!sessionUser) history.push("/");

  return (
    <div className="main-my-bookings-container">
      <h1 className="my-bookings-header"> View Your Current Bookings</h1>
      <ul className="booking-card-gallery">{bookingsCards}</ul>
    </div>
  );
}

export default MyBookingsPage;
