import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotsOwnedByUser } from '../../store/spotsReducer'
import { Link } from "react-router-dom"
import "./ManageSpotsPage.css"


//The fetch below worked originally but after reloading db it is now just loading all the spots instead of just those owned by user
//if you navigate to the manage spots page, then refresh, it updates to the correct list....

function ManageSpotsPage() {

  const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj);
    // console.log('spots in manage spots page.............',spots)

     useEffect(() => {
        dispatch(fetchSpotsOwnedByUser())
     }, [dispatch]);


  return (
    <>
      <h1>Manage Your Spots</h1>
      <button type='button'>Create a New Spot</button>
      <ul className='spot-card-gallery-list'>
                {spots.map((spot) => (
                    <li className="spot-card">
                    <Link to={`/spots/${spot.id}`}>
                    <div className="spot-card-container">
                        <div className="spot-card-image-container">
                            <img className="spot-card-img" src={spot.previewImage}></img>
                        </div>
                            <p>{spot.city}, {spot.state}</p>
                            <p>${spot.price} /night</p>
                            <p><i className="fa-solid fa-star"></i>{(spot.avgRating ? spot.avgRating : "New")}</p>
                            <button>Update</button>
                            <button>Delete</button>
                        </div>
                    </Link>
                </li>
                ))}
            </ul>
    </>
  );
}

export default ManageSpotsPage;
