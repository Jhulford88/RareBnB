import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotsOwnedByUser } from '../../store/spotsReducer'
import { Link, useHistory } from "react-router-dom"
import DeleteSpotModal from "../DeleteSpotModal/index";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import "./ManageSpotsPage.css"


function ManageSpotsPage() {

  //initialize things
  const history = useHistory();
  const dispatch = useDispatch();

  //listen for spots updates and produce array
  const spotsObj = useSelector(state => state.spots.allSpots);
  const spots = Object.values(spotsObj);

  //dispatch thunk
  useEffect(() => {
    dispatch(fetchSpotsOwnedByUser())
  }, [dispatch]);

  //onClick behavior - tile
  const handleNewSpotClick = () => {
    history.push('/spots/new')
  }

  // onClick behavior - update
  const handleUpdateClick = (spotId) => history.push(`/spots/${spotId}/edit`)


  return (
    <div className='main-manage-spot-container'>
      <div className='upper'>
      <h1>Manage Your Spots</h1>
      <button type='button' className='manage-buttons' onClick={() => handleNewSpotClick()}>Create a New Spot</button>
      </div>
      <ul className='spot-card-gallery-list'>
                {spots.map((spot) => (
                    <li key={spot.id} className="spot-card">
                    <Link to={`/spots/${spot.id}`}>
                    <div className="spot-card-container">
                <div className="spot-card-image-container">
                    <img className="spot-card-img" alt="test" src={spot.previewImage}></img>
                </div>
                <div className="card-lower-half">
                <p>{spot.city}, {spot.state}</p>
                <p><i className="fa-solid fa-star"></i>{(spot.avgRating ? spot.avgRating.toFixed(2) : "New")}</p>
                <p className="card-price">${spot.price}<span className="spot-just-night"> night</span></p>
                </div>
            </div>
                    </Link>
                    <div className='bottom-buttons'>
                            <button type='button' className='manage-buttons' onClick={() => handleUpdateClick(spot.id)}>Update</button>
                            <button className='manage-buttons'><OpenModalMenuItem itemText="Delete" modalComponent={<DeleteSpotModal spot={spot} />}/></button>
                    </div>
                </li>
                ))}
            </ul>
    </div>
  );
}

export default ManageSpotsPage;
