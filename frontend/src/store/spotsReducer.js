//<----------Imports--------------->
import { csrfFetch } from "./csrf";

//<----------Action Type Constants--------------->
export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const LOAD_SINGLE_SPOT = "spots/LOAD_SINGLE_SPOT";
export const CREATE_SPOT = "spots/CREATE_SPOT";
export const POST_SPOT_IMAGE = "spots/POST_SPOT_IMAGE";
export const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const DELETE_SPOT = "spots/DELETE_SPOT";

//<----------Action Creators--------------->

//Load all spots
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

//Load a single spot based on spotId
export const loadSingleSpot = (spot) => ({
  type: LOAD_SINGLE_SPOT,
  spot,
});

export const postSpotImage = (data) => ({
  type: POST_SPOT_IMAGE,
  data,
});

export const updateSpot = (updatedSpot) => ({
  type: UPDATE_SPOT,
  updatedSpot,
});

export const deleteSpot = (id) => ({
  type: DELETE_SPOT,
  id,
});

//<----------Thunks--------------->
export const fetchSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  const spots = await response.json();
  dispatch(loadSpots(spots));
};

export const fetchSingleSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);
  const spot = await response.json();
  dispatch(loadSingleSpot(spot));
  return spot;
};

export const createSpot = (form, imageArr, sessionUser) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch("/api/spots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newSpot = await response.json();

    const newlyCreatedImages = [];
    for (let image of imageArr) {
      const response = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(image),
      });
      const imageFromDB = await response.json();
      newlyCreatedImages.push(imageFromDB);
    }
    newSpot.SpotImages = newlyCreatedImages;
    newSpot.Owner = sessionUser;

    dispatch(loadSingleSpot(newSpot));
    return newSpot;
  } catch (e) {
    const errors = await e.json();
    return errors;
  }
};

//fetch all spots owned by current user
export const fetchSpotsOwnedByUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  const spots = await response.json();
  dispatch(loadSpots(spots));
};

//Update an existing spot
export const updateExistingSpot =
  (form, sessionUser, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      const errors = await response.json();
      return errors;
    } else {
      const data = await response.json();
      dispatch(updateSpot(data));
      return data;
    }
  };

//Delete a spot
export const deleteSpotThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errors = await response.json();
    return errors;
  } else {
    const data = await response.json();
    dispatch(deleteSpot(id));
  }
};

export const fetchSpotsByCategoryThunk = (category) => async (dispatch) => {
  const response = await fetch(`/api/spots/categories/${category}`);
  const spots = await response.json();
  console.log("spots returned from backend.............", spots);
  dispatch(loadSpots(spots));
};

//<----------Initial State--------------->
const initState = { allSpots: {}, singleSpot: {} };

//<----------Reducer--------------->
const spotsReducer = (state = initState, action) => {
  const spotsState = {
    ...state,
    allSpots: { ...state.allSpots },
    singleSpot: {},
  };
  switch (action.type) {
    case LOAD_SPOTS:
      const updatedSpots = {};
      action.spots.Spots.forEach((spot) => {
        updatedSpots[spot.id] = spot;
      });
      spotsState.allSpots = updatedSpots;
      return spotsState;
    case LOAD_SINGLE_SPOT:
      spotsState.singleSpot[action.spot.id] = action.spot;
      return spotsState;
    case POST_SPOT_IMAGE:
      return {
        ...state,
        singleSpot: {
          SpotImages: [...state.singleSpot.SpotImages, action.spotImage],
        },
      };
    case UPDATE_SPOT:
      spotsState.allSpots = {};
      spotsState.singleSpot = {};
      spotsState.allSpots[action.updatedSpot.id] = action.updatedSpot;
      spotsState.singleSpot = action.updatedSpot;
      return spotsState;
    case DELETE_SPOT:
      delete spotsState.allSpots[action.id];
      return spotsState;
    default:
      return state;
  }
};

export default spotsReducer;
