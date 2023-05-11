import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotsOwnedByUser } from '../../store/spotsReducer'
import { Link, useHistory } from "react-router-dom"
import "./ManageSpotsPage.css"


//NEED TO REASSIGN ALL CLASSES AND POPULATE CSS FILE. CURRENTLY CSS IS COMING FROM LANDINGPAGE.CSS!!!!! WTF!!!

function ManageSpotsPage() {

  const history = useHistory();
  const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj);

     useEffect(() => {
        dispatch(fetchSpotsOwnedByUser())
     }, [dispatch]);

     const handleNewSpotClick = () => {
      history.push('/spots/new')
     }

  return (
    <div>
      <h1>Manage Your Spots</h1>
      <button type='button' onClick={() => handleNewSpotClick()}>Create a New Spot</button>
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
    </div>
  );
}

export default ManageSpotsPage;
