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
            // console.log('action.spots........................',action.spots)
            const spotsState = {};
            // console.log('spotsState........BEFORE.................',spotsState)
            action.spots.Spots.forEach(spot => {
                spotsState[spot.id] = spot;
            });
            // console.log('spotsState.........................',spotsState)
            return spotsState
        default:
            return state;
    }
};

export default spotsReducer;
