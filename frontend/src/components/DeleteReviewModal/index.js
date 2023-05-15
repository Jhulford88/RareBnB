import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteReviewThunk } from "../../store/reviewsReducer";
import "./DeleteReviewModal.css"


function DeleteReviewModal({reviewId, spotId}) {


    const { closeModal } = useModal();
    const dispatch = useDispatch();
    // const history = useHistory();

    const closeDeleteReviewModal = () => {
        return closeModal()
    }

    const deleteReviewAction = async () => {
        await dispatch(deleteReviewThunk(reviewId, spotId))
        // history.push('/spots/current')
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
