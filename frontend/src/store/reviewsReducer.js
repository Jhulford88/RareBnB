//imports
import { csrfFetch } from "./csrf";


//Action type constants
export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const DELETE_REVIEW = "reviews/DELETE_REVIEW";


//Action creators
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});



//Thunks
export const fetchReportsThunk = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    console.log('reviews in thunk.......', reviews)
    dispatch(loadReviews(reviews.Reviews));
};

export const deleteReviewThunk = (reviewId, spotId) => async dispatch => {
    console.log('reviewId in thunk.........',reviewId)
    console.log('spotId in thunk.........', spotId)
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const errors = await response.json()
        return errors
    } else {
        const data = await response.json()
        console.log("data in thunk............", data)
        dispatch(deleteReview(reviewId))
    }
}


//initial state
//Do I need to define the inner nested objects?????
//set to be an empty object?
const initState = {}


// Reducer
const reviewsReducer = (state = initState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_REVIEWS:
            // console.log('reviews in reducer.......', action.reviews)
            const updatedReviews = {}
            action.reviews.forEach(review => {
                // console.log('review in reducer forEach.......', review)
                updatedReviews[review.id] = review;
            });
            return updatedReviews;
        case DELETE_REVIEW:
            console.log('action.reviewId in reducer...............',action.reviewId)
            console.log('newState in reducer before delete.......', newState)
            delete newState[action.reviewId]
            return newState;
        default:
            return state;
    }
};





export default reviewsReducer;
