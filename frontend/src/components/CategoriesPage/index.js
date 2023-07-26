import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import LandingPageCard from "../LandingPage/LandingPageCard";
import { fetchSpotsByCategoryThunk } from "../../store/spotsReducer";
// import "./landingPage.css";

function CategoriesPage() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spots = Object.values(spotsObj);

  // use useEffect to request the spots info when the page is loaded
  useEffect(() => {
    dispatch(fetchSpotsByCategoryThunk(category));
  }, [dispatch, category]);

  return (
    <div className="spot-card-gallery-container">
      <ul className="spot-card-gallery-list">
        {spots.map((spot) => (
          <LandingPageCard key={spot.id} spot={spot} />
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;
