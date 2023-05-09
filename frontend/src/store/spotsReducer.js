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
        default:
            return state;
    }
};

export default spotsReducer;
