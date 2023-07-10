import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleSpot } from "../../store/spotsReducer";
import { fetchReportsThunk } from "../../store/reviewsReducer";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AddReviewModal from "../AddReviewModal/index";
import DeleteReviewModal from "../DeleteReviewModal/index";
import OpenBookingModalButton from "../OpenBookingModalButton";
import CreateBookingModal from "../CreateBookingModal";
import "./SpotDetailPage.css";

function SpotDetailPage() {
  //Initialize Things
  const { id } = useParams();
  const dispatch = useDispatch();

  //State
  const spot = useSelector((state) => state.spots.singleSpot);
  const singleSpot = spot[id];
  const sessionUser = useSelector((state) => state.session.user);
  const reviewsObj = useSelector((state) => state.reviews);
  const reviewsArray = Object.values(reviewsObj);

  //Dispatch Thunk to get single spot and reviews
  useEffect(() => {
    dispatch(fetchSingleSpot(id));
    dispatch(fetchReportsThunk(id));
  }, [dispatch, id]);

  if (!singleSpot) return null;
  if (!reviewsArray) return null;

  return (
    <div className="main-container">
      <h1>{singleSpot.name}</h1>
      <h3>
        {singleSpot.city}, {singleSpot.state}, {singleSpot.country}
      </h3>
      <div className="image-grid">
        {singleSpot.SpotImages.map((image) => {
          if (image.preview === true) {
            return (
              <img
                key={image.id}
                className="main-image"
                alt="test"
                src={image.url}
              />
            );
          } else return null;
        })}
        {singleSpot.SpotImages.map((image) => {
          if (image.preview === false) {
            return (
              <img
                key={image.id}
                className="small-image"
                alt="test"
                src={image.url}
              />
            );
          } else return null;
        })}
      </div>
      <h2>
        Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}{" "}
      </h2>
      <div className="description-and-reserve-box-container">
        <p className="description-text">{singleSpot.description}</p>
        <div className="booking-box-container">
          <p className="booking-container-price">
            ${singleSpot.price}
            <span className="just-night"> night</span>
          </p>
          <span className="booking-container-reviews">
            <i className="fa-solid fa-star"></i>
            {singleSpot.avgRating
              ? singleSpot.avgRating.toFixed(2)
              : "New"}{" "}
            {singleSpot.numReviews
              ? singleSpot.numReviews === 1
                ? ` • ${singleSpot.numReviews} Review`
                : ` • ${singleSpot.numReviews} Reviews`
              : ""}
          </span>
          <div>
            <OpenBookingModalButton
              className="open-booking-modal-button"
              buttonText="Reserve"
              modalComponent={<CreateBookingModal spotId={singleSpot?.id} />}
            />
          </div>
        </div>
      </div>
      <div className="review-summary-above-reviews-container">
        <span className="review-summary-above-reviews">
          <i className="fa-solid fa-star"></i>
          {singleSpot.avgRating ? singleSpot.avgRating.toFixed(2) : "New"}{" "}
          {singleSpot.numReviews
            ? singleSpot.numReviews === 1
              ? ` • ${singleSpot.numReviews} Review`
              : ` • ${singleSpot.numReviews} Reviews`
            : ""}
        </span>
      </div>
      {sessionUser?.id &&
      sessionUser?.id !== singleSpot.ownerId &&
      !reviewsArray.length &&
      !reviewsArray.find((review) => review.userId === sessionUser?.id) ? (
        <p>Be the first to post a review</p>
      ) : null}
      {sessionUser?.id &&
      sessionUser?.id !== singleSpot.ownerId &&
      !reviewsArray.find((review) => review.userId === sessionUser?.id) ? (
        <button className="submit-review-button">
          <OpenModalMenuItem
            itemText="Submit Your Review"
            modalComponent={<AddReviewModal spotId={singleSpot?.id} />}
          />
        </button>
      ) : null}
      <ul className="review-list">
        {reviewsArray.reverse().map((review) => {
          return (
            <li key={review.id}>
              <h2 className="reviewer-name">{review.User.firstName}</h2>
              <h3 className="review-date">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </h3>
              <p>{review.review}</p>
              {review.userId === sessionUser?.id ? (
                <button className="delete-button">
                  {" "}
                  <OpenModalMenuItem
                    itemText="Delete"
                    modalComponent={
                      <DeleteReviewModal
                        reviewId={review?.id}
                        spotId={singleSpot?.id}
                      />
                    }
                  />{" "}
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SpotDetailPage;
