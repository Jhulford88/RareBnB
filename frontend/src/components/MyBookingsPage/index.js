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

  let bookingsCards = bookings?.map((booking) => {
    return (
      <li className="booking-spot-card" key={booking.id}>
        <Link to={`/spots/${booking.Spot.id}`}>
          <div className="booking-spot-card-container">
            <div className="booking-spot-card-image-container">
              <img
                className="booking-spot-card-img"
                alt="test"
                src={booking.Spot.previewImage}
              ></img>
            </div>
            <div className="booking-card-lower-half">
              <p>
                {booking.Spot.city}, {booking.Spot.state}
              </p>
              <p>{booking.Spot.name}</p>
              <p>{booking.startDate}</p>
              <p>{booking.endDate}</p>
            </div>
          </div>
        </Link>
      </li>
    );
  });

  return (
    <div className="main-my-bookings-container">
      <h1 className="my-bookings-header"> View Your Current Bookings</h1>
      <ul className="booking-card-gallery">{bookingsCards}</ul>
    </div>
  );
}

export default MyBookingsPage;
