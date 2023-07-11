import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./MyBookingsPage.css";

function MyBookingsPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchSpotsOwnedByUser())
  }, [dispatch]);

  //  const handleNewSpotClick = () => {
  //    history.push('/spots/new')
  //   }

  //   const handleUpdateClick = (spotId) => history.push(`/spots/${spotId}/edit`)

  return (
    <div className="main-my-bookings-container">
      <h1> Hello from My Bookings</h1>
    </div>
  );
}

export default MyBookingsPage;
