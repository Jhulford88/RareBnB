import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./DeleteSpotModal.css"
import { deleteSpotThunk } from "../../store/spotsReducer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
//import thunk to dispatch


function DeleteSpotModal({spot}) {

    // console.log("spot...............",spot)

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const closeDeleteModal = () => {
        return closeModal()
    }

    const deleteSpotAction = async () => {
        await dispatch(deleteSpotThunk(spot.id))
        history.push('/spots/current')
        return closeModal()
    }

    return (
      <>
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to remove this spot from the listings?</h2>
        <button onClick={deleteSpotAction}>{"Yes (Delete Spot)"}</button>
        <button onClick={closeDeleteModal}>{"No (Keep Spot)"}</button>
      </>
    );
  }

  export default DeleteSpotModal;
