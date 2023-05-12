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
    console.log('singgle spot on spot detail page.....', singleSpot)
    useEffect(() => {
        dispatch(fetchSingleSpot(id))
        // .then(data => console.log('data from spot detail page.....',data))
     }, [dispatch]);

     if (!singleSpot) return null;

    //  console.log('single spot on detail page.......',singleSpot)

     const handleClick = () => {
        window.alert("Feature coming soon!")
     }

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
        <div className='booking-box-container'>
          <p>{singleSpot.price} night</p>
          <p><i className="fa-solid fa-star"></i>{(singleSpot.avgRating === 0 ? "New" : singleSpot.avgRating)} {singleSpot.numReviews} {(singleSpot.numReviews === 1 ? "review" : "reviews")}</p>
          <button type="button" onClick={(e) => {handleClick(e)}} className="reserve-button">Reserve</button>
        </div>
    </div>
  );
}

export default SpotDetailPage;
