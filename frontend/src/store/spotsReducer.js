//imports
import { csrfFetch } from "./csrf";


//action type constants
export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const LOAD_SINGLE_SPOT = "spots/LOAD_SINGLE_SPOT";
export const CREATE_SPOT = "spots/CREATE_SPOT";

//action creators
//Load all spots
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

//Load a single spot based on spotId
export const loadSingleSpot = (spot) => ({
    type: LOAD_SINGLE_SPOT,
    spot
});

//thunks
export const fetchSpots = () => async dispatch => {
    const response = await fetch("/api/spots");
    const spots = await response.json();
    dispatch(loadSpots(spots));
};

export const fetchSingleSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);
    const spot = await response.json();
    dispatch(loadSingleSpot(spot));
};

export const createSpot = (form) => async dispatch => {
    // console.log('form in thunk................',form)
    let response;
    try {
        response = await csrfFetch('/api/spots', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
      });
        const data = await response.json()
        // console.log('data in thunk............',data)
        dispatch(fetchSingleSpot(data))
        return data;


    } catch(e) {
        const errors = await e.json()
        // console.log('errrors in thunk.............',errors)
        return errors
    }

    // console.log('response in thunk..........',response)
    // if (!response.ok) {

    // } else {

    // }
  };



//initial state
const initState = {allSpots: {}, singleSpot: {}}



// spotsReducer
const spotsReducer = (state = initState, action) => {
    const spotsState = {...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}};
    switch (action.type) {
        case LOAD_SPOTS:
            action.spots.Spots.forEach(spot => {
                spotsState.allSpots[spot.id] = spot;
            });
            return spotsState
        case LOAD_SINGLE_SPOT:
            spotsState.singleSpot[action.spot.id] = action.spot;
            return spotsState
        default:
            return state;
    }
};

// const spotsReducer = (state = initState, action) => {
//     const spotsState = {...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}};
//     switch (action.type) {
//         case LOAD_SPOTS:
//             action.spots.Spots.forEach(spot => {
//                 spotsState.allSpots[spot.id] = spot;
//             });
//             return spotsState
//         case LOAD_SINGLE_SPOT:
//             spotsState.singleSpot[action.spot.id] = action.spot;
//             return spotsState
//         default:
//             return state;
//     }
// };

export default spotsReducer;
