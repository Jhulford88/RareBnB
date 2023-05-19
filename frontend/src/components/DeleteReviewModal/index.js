import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviewsReducer";
import "./DeleteReviewModal.css"


function DeleteReviewModal({reviewId, spotId}) {

    //initialize things
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    //closing modal
    const closeDeleteReviewModal = () => {
        return closeModal()
    }

    //dispatch thunk
    const deleteReviewAction = async () => {
        await dispatch(deleteReviewThunk(reviewId, spotId))
        return closeModal()
    }

    return (
      <>
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to delete this reveiw?</h2>
        <button onClick={deleteReviewAction}>{"Yes (Delete Review)"}</button>
        <button onClick={closeDeleteReviewModal}>{"No (Keep Review)"}</button>
      </>
    );
  }

  export default DeleteReviewModal;
