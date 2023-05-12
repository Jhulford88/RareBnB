import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./AddReviewModal.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
//import thunk to dispatch


function AddReviewModal({spot}) {


    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();


    const createReviewAction = async () => {
        // await dispatch(deleteSpotThunk(spot.id))
        // history.push('/spots/current')
        // return closeModal()
    }

    return (
      <>
        <h1>How was your stay?</h1>
        <textarea placeholder="Leave your review here..."></textarea>
        <button onClick={createReviewAction}>Submit Your Review</button>
        {/* Need logic for closing modal on click away */}
      </>
    );
  }

  export default AddReviewModal;
