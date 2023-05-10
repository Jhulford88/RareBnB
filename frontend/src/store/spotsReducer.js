//imports
import { csrfFetch } from "./csrf";


//action type constants
export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const LOAD_SINGLE_SPOT = "spots/LOAD_SINGLE_SPOT";
export const CREATE_SPOT = "spots/CREATE_SPOT";
export const POST_SPOT_IMAGE = "spots/POST_SPOT_IMAGE";




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

export const postSpotImage = (data) => ({
    type: POST_SPOT_IMAGE,
    data
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

export const createSpot = (form, imageArr, sessionUser) => async dispatch => {

    let response;
    try {
        response = await csrfFetch('/api/spots', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
      });
        const newSpot = await response.json()


        const newlyCreatedImages = [];
        for (let image of imageArr) {
            const response = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(image)
            })
            const imageFromDB = await response.json();
            newlyCreatedImages.push(imageFromDB);

        }
        newSpot.SpotImages = newlyCreatedImages
        newSpot.Owner = sessionUser;


        dispatch(loadSingleSpot(newSpot))
        return newSpot;


    } catch(e) {
        const errors = await e.json()
        return errors
      }
};

//fetch all spots owned by current user
export const fetchSpotsOwnedByUser = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current');
    const spots = await response.json();
    dispatch(loadSpots(spots))
}



//initial state
const initState = {allSpots: {}, singleSpot: {}}




// spotsReducer
const spotsReducer = (state = initState, action) => {
    const spotsState = {...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}};
    switch (action.type) {
        case LOAD_SPOTS:
            const updatedSpots = {}
            action.spots.Spots.forEach(spot => {
                updatedSpots[spot.id] = spot;
            });
            spotsState.allSpots = updatedSpots
            return spotsState
            // action.spots.Spots.forEach(spot => {
            //     spotsState.allSpots[spot.id] = spot;
            // });
            // return spotsState
        case LOAD_SINGLE_SPOT:
            spotsState.singleSpot[action.spot.id] = action.spot;
            return spotsState
        case POST_SPOT_IMAGE:
            return {...state, singleSpot:{SpotImages: [...state.singleSpot.SpotImages, action.spotImage]}}
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
