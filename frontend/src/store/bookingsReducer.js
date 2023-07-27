// -----------IMPORTS ------------
// import { normalizeObj } from './helpers';
import { csrfFetch } from "./csrf";

// -----------TYPE VARIABLES ------------
export const LOAD_USER_BOOKINGS = "bookings/LOAD_USER_BOOKINGS";
export const LOAD_SPOT_BOOKINGS = "bookings/LOAD_SPOT_BOOKINGS";

// ---------- ACTION CREATORS ----------
export const loadUserBookings = (bookings) => ({
  type: LOAD_USER_BOOKINGS,
  bookings,
});

export const loadSpotBookings = (bookings) => ({
  type: LOAD_SPOT_BOOKINGS,
  bookings,
});

// ---------- THUNKS ----------
//Create a new booking
export const createBookingThunk = (form, spotId) => async (dispatch) => {
  let response;
  try {
    response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newBooking = await response.json();

    // dispatch(loadBooking(newBooking));
    return newBooking;
  } catch (e) {
    const errors = await e.json();
    return errors;
  }
};

//Get all of the Current User's Bookings
export const getUserBookingsThunk = () => async (dispatch) => {
  const response = await fetch("/api/bookings/current");
  const bookings = await response.json();
  dispatch(loadUserBookings(bookings));
};

//Get all of the Current spot's Bookings
export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/bookings`);
  const bookings = await response.json();
  dispatch(loadSpotBookings(bookings));
};

//Update an existing booking
export const updateBookingThunk = (form, bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  console.log("response in thunk..........", response);
  if (!response.ok) {
    const errors = await response.json();
    return errors;
  } else {
    const data = await response.json();
    console.log("newly updated booking in thunk.............", data);
    // dispatch(updateSpot(data));
    return data;
  }
};

//Delete a booking
export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  console.log("Hello from thunk.........");
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  console.log("response in thunk...............", response);
  if (!response.ok) {
    const errors = await response.json();
    console.log("errors in thunjk.......", errors);
    return errors;
  } else {
    // console.log('response in thunk.......',response)
    const data = await response.json();
    // console.log('dat in thunk............', data)
    // dispatch(deleteSpot(id));
    return data;
  }
};
// ---------- INITIAL STATE -------------
const initialState = { user: {}, spot: {} };

// ---------- REDUCER ----------
const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_BOOKINGS:
      let userBookingsState = { ...state, user: { ...action.bookings } };
      return userBookingsState;
    case LOAD_SPOT_BOOKINGS:
      let spotBookingsState = { ...state, spot: { ...action.bookings } };
      return spotBookingsState;
    default:
      return state;
  }
};

export default bookingsReducer;
