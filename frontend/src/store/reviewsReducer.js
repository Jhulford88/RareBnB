//imports
import { csrfFetch } from "./csrf";


//Action type constants
export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";


//Action creators
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});



//Thunks
export const fetchReportsThunk = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    console.log('reviews in thunk.......', reviews)
    dispatch(loadReviews(reviews.Reviews));
};


//initial state
//Do I need to define the inner nested objects?????
//set to be an empty object?
const initState = {}


// Reducer
const reviewsReducer = (state = initState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_REVIEWS:
            console.log('reviews in reducer.......', action.reviews)
            const updatedReviews = {}
            action.reviews.forEach(review => {
                console.log('review in reducer forEach.......', review)
                updatedReviews[review.id] = review;
            });
            return updatedReviews; //should return a normalized object or arrays
        default:
            return state;
    }
};





export default reviewsReducer;
