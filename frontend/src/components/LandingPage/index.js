import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LandingPageCard from './LandingPageCard';
import { fetchSpots } from '../../store/spotsReducer';
import "./landingPage.css"

function LandingPage() {

    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj);
    // console.log('spots in landing page.............',spots)
     // use useEffect to request the spots info when the page is loaded
     useEffect(() => {
        dispatch(fetchSpots())
     }, [dispatch]);


    return (
        <div className='spot-card-gallery-container'>
            <ul className='spot-card-gallery-list'>
                {spots.map((spot) => (
                    <LandingPageCard key={spot.id} spot={spot} />
                ))}
            </ul>
        </div>
    );
};

export default LandingPage;
