import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReviewThunk } from "../../store/reviewsReducer";
import { fetchReportsThunk } from "../../store/reviewsReducer";
import { fetchSingleSpot } from "../../store/spotsReducer";
import "./AddReviewModal.css";
//import thunk to dispatch


function AddReviewModal({spotId}) {

    // initializing stuff
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    // const history = useHistory();

    // setting up state slices
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [disabled, setDisabled] = useState(true)



    // building review object for thunk prop
    const review = {}
    review.review = reviewText;
    review.stars = rating;

    //dispatching thunk on button click
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createReviewThunk(spotId, review))
        await dispatch(fetchReportsThunk(spotId))
        await dispatch(fetchSingleSpot(spotId))
        return closeModal()
    }


    useEffect(() => {
      if(reviewText.length > 10 && rating) setDisabled(false)

  }, [reviewText, rating])


    return (
      <>
        <h1>How was your stay?</h1>
        <form onSubmit={handleSubmit}>
            <textarea placeholder="Leave your review here..." onChange={(e) => setReviewText(e.target.value)}></textarea>
            <div className="star-rating">
                {[1,2,3,4,5].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      id="star-button"
                      type="button"
                      key={index}
                      className={index <= (hover || rating) ? "on" : "off"}
                      onClick={() => setRating(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <span className="star"><i className="fa-solid fa-star"></i></span>
                    </button>
                  );
                })}
                <br></br>
                <span>Stars</span>
            </div>
            <button type="submit" disabled={disabled}>Post Your Review</button>
        </form>
      </>
    );
  }

  export default AddReviewModal;
