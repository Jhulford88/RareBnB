import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleSpot } from '../../store/spotsReducer';
import { fetchReportsThunk } from '../../store/reviewsReducer';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import AddReviewModal from '../AddReviewModal/index';
import DeleteReviewModal from '../DeleteReviewModal/index';
import { deleteReviewThunk } from '../../store/reviewsReducer';
import "./SpotDetailPage.css"



function SpotDetailPage(){

    const sessionUser = useSelector(state => state.session.user);
    const {id} = useParams();///////////////////////////////////////////////////////////////////////////////

    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots.singleSpot);
    const singleSpot = spot[id];

    const reviewsObj = useSelector(state => state.reviews)
    // console.log('reviewsObj in spot detail page.............',reviewsObj)
    const reviewsArray = Object.values(reviewsObj)
    // console.log('reviewsArray in spot detail page.............',reviewsArray)

  // console.log('sessionUser in spot detail page', sessionUser)

    useEffect(() => {
        dispatch(fetchSingleSpot(id))
        dispatch(fetchReportsThunk(id))
     }, [dispatch]);

     if (!singleSpot) return null;
     if (!reviewsArray) return null;

    //  console.log('single spot on detail page.......',singleSpot)

     const handleClick = () => {
        window.alert("Feature coming soon!")
     }

     const handleDeleteClick = (reviewId, spotId) => {
        dispatch(deleteReviewThunk(reviewId, spotId))
     }
     console.log('average rating on spot detail page.........', singleSpot.avgRating)
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
        <div className='description-and-reserve-box-container'>
        <p className='description-text'>{singleSpot.description}</p>
        <div>
        <div className='booking-box-container'>
          <p className='booking-container-price'>${singleSpot.price}<span className='just-night'> night</span></p>
          <span className='booking-container-reviews'><i className="fa-solid fa-star"></i>{(singleSpot.avgRating ? singleSpot.avgRating.toFixed(2) : "New" )} {singleSpot.numReviews ? singleSpot.numReviews === 1 ? ` • ${singleSpot.numReviews} Review` : ` • ${singleSpot.numReviews} Reviews` : ''}</span>
          <button type="button" onClick={(e) => {handleClick(e)}} className="reserve-button">Reserve</button>
        </div>
        </div>
          <p><i className="fa-solid fa-star"></i>{(singleSpot.avgRating ? singleSpot.avgRating.toFixed(2) : "New" )} {singleSpot.numReviews ? singleSpot.numReviews === 1 ? ` • ${singleSpot.numReviews} Review` : ` • ${singleSpot.numReviews} Reviews` : ''}</p>
          {sessionUser?.id && sessionUser?.id !== singleSpot.ownerId && !reviewsArray.length && !reviewsArray.find(review => review.userId === sessionUser?.id) ? <p>Be the first to post a review</p> : null}
          {sessionUser?.id && sessionUser?.id !== singleSpot.ownerId && !reviewsArray.find(review => review.userId === sessionUser?.id) ? <button><OpenModalMenuItem itemText="Submit Your Review" modalComponent={<AddReviewModal spotId={singleSpot?.id}/>}/></button> : null }
          <ul>
            {reviewsArray.reverse().map(review => {
              return (
                <li key={review.id}>
                  <h2>{review.User.firstName}</h2>
                  <h3>{new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: "numeric",
                            month: "long"
                        })}</h3>
                  <p>{review.review}</p>
                  {review.userId === sessionUser?.id ? <button> <OpenModalMenuItem itemText="Delete" modalComponent={<DeleteReviewModal reviewId={review?.id} spotId={singleSpot?.id} />}/> </button> : null }
                </li>
              )
            })}
          </ul>

        </div>
    </div>
  );
}

export default SpotDetailPage;
