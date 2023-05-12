import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
//import thunk to dispatch
//import css file for modal

function DeleteSpotModal() {

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const closeDeleteModal = () => {
        return closeModal()
    }

    const deleteSpotAction = async () => {
        await dispatch() //delete thunk needs to be created
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
