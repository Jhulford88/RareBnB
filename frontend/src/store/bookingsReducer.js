// -----------IMPORTS ------------
// import { normalizeObj } from './helpers';
import { csrfFetch } from "./csrf";

// -----------TYPE VARIABLES ------------
export const LOAD_BOOKING = "bookings/LOAD_BOOKING";

// ---------- ACTION CREATORS ----------
export const loadBooking = (booking) => ({
  type: LOAD_BOOKING,
  booking,
});

// ---------- THUNKS ----------
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

// ---------- INITIAL STATE -------------
const initialState = { user: {}, spot: {} };

// ---------- REDUCER ----------
const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOOKING:
      return;
    default:
      return state;
  }
};

export default bookingsReducer;
