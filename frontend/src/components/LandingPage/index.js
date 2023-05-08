import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LandingPageCard from './LandingPageCard';
import { fetchSpots } from '../../store/spotsReducer';
import "./landingPage.css"

function LandingPage() {

    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots);
    const spots = Object.values(spotsObj);

     // use useEffect to request the spots info when the page is loaded
     useEffect(() => {
        dispatch(fetchSpots())
     }, [dispatch]);

    //  console.log('spots............',spots)

    return (
        <>
            <ul>
            {spots.map((spot) => (
                 <LandingPageCard key={spot.id} spot={spot} />
        ))}
            </ul>
        </>
    );
};

export default LandingPage;
