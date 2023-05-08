//imports


//action type constants
export const LOAD_SPOTS = "spots/LOAD_SPOTS"

//action creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

//thunks
export const fetchSpots = () => async dispatch => {
    const response = await fetch("/api/spots");
    const spots = await response.json();
    dispatch(loadSpots(spots));
}

// spotsReducer
const spotsReducer = (state={}, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const spotsState = {};
            action.spots.forEach(spot => {
                spotsState[spot.id] = spot;
            });
            return spotsState
        default:
            return state;
    }
}
