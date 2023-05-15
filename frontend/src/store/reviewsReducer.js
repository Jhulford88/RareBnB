//imports
import { csrfFetch } from "./csrf";


//Action type constants
export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const DELETE_REVIEW = "reviews/DELETE_REVIEW";
export const CREATE_REVIEW = "reviews/CREATE_REVIEWS";


//Action creators
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});



//Thunks
export const fetchReportsThunk = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    console.log('reviews in thunk.......', reviews)
    dispatch(loadReviews(reviews.Reviews));
};

export const deleteReviewThunk = (reviewId, spotId) => async dispatch => {
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
};


//just added a try catch block to this thunk 9:53pm
export const createReviewThunk = (spotId, review) => async dispatch => {
    try{
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(review)
        });
        if (!response.ok) {
            const errors = await response.json()
            return errors
        } else {
            const data = await response.json()
            console.log('data in thunk.........', data)
            dispatch(createReview(data))
        }

    } catch (e) {
        let response = await e.json()
        return response
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
            const updatedReviews = {}
            action.reviews.forEach(review => {
                updatedReviews[review.id] = review;
            });
            return updatedReviews;
        case DELETE_REVIEW:
            delete newState[action.reviewId]
            return newState;
        case CREATE_REVIEW:
            // console.log('action.review in reducer.............',action.review)
            // console.log('newstate.reviews in reducer.............',newState)
            // newState[action.review.id] = action.review;
            return newState
        default:
            return state;
    }
};





export default reviewsReducer;
