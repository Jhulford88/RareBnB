import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserBookingsThunk } from "../../store/bookingsReducer";
import "./MyBookingsPage.css";

function MyBookingsPage() {
  //Initialize things
  const history = useHistory();
  const dispatch = useDispatch();

  //UseSelectors
  const bookings = useSelector((state) => state.bookings.user.Bookings);

  useEffect(() => {
    dispatch(getUserBookingsThunk());
  }, [dispatch]);

  //  const handleNewSpotClick = () => {
  //    history.push('/spots/new')
  //   }

  //   const handleUpdateClick = (spotId) => history.push(`/spots/${spotId}/edit`)

  let bookingsCards = bookings.map((booking) => {
    return (
      <li key={booking.id}>
        <div>{booking.Spot.name}</div>
        <div>{booking.startDate}</div>
        <div>{booking.endDate}</div>
      </li>
    );
  });

  return (
    <div className="main-my-bookings-container">
      <h1> Hello from My Bookings</h1>
      <ul>{bookingsCards}</ul>
    </div>
  );
}

export default MyBookingsPage;
