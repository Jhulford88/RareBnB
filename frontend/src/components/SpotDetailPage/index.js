import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleSpot } from '../../store/spotsReducer';
import "./SpotDetailPage.css"



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
    <div className='main-container'>
        <h1>{singleSpot.name}</h1>
        <h3>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h3>
        <div className='image-grid'>
          {singleSpot.SpotImages.map(image => {
            if(image.preview === true) {
              return <img className='main-image' src={image.url}/>
            }
          })}
          {singleSpot.SpotImages.map(image => {
            if(image.preview === false) {
              return <img className='small-image' src={image.url}/>
            }
          })}
        </div>
        <h2>Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName} </h2>
        <p>{singleSpot.description}</p>
    </div>
  );
}

export default SpotDetailPage;
