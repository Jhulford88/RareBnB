// -----------IMPORTS ------------
// import { normalizeObj } from './helpers';
import { csrfFetch } from "./csrf";

// -----------TYPE VARIABLES ------------
export const LOAD_USER_BOOKINGS = "bookings/LOAD_USER_BOOKINGS";

// ---------- ACTION CREATORS ----------
export const loadUserBookings = (bookings) => ({
  type: LOAD_USER_BOOKINGS,
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
// ---------- INITIAL STATE -------------
const initialState = { user: {}, spot: {} };

// ---------- REDUCER ----------
const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_BOOKINGS:
      let userBookingsState = { ...state, user: { ...action.bookings } };
      return userBookingsState;
    default:
      return state;
  }
};

export default bookingsReducer;
