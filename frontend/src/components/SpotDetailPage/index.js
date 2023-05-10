import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleSpot } from '../../store/spotsReducer';


function SpotDetailPage(){

    const {id} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    const singleSpot = spot[id];

    useEffect(() => {
        dispatch(fetchSingleSpot(id))
     }, [dispatch]);

     if (!singleSpot) return null;

     console.log('single spot on detail page.......',singleSpot)

  return (
    <>
        <h2>{singleSpot.name}</h2>
        <h3>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h3>
        <div className='image-gallery'>
          {/* need to change logic so that the img with "preview: true" shows large and rest dynamically show small.
          Will need to update seed data preview booleans */}
            {/* <img src={singleSpot.SpotImages[0].url}/> */}

        </div>
    </>
  );
}

export default SpotDetailPage;
