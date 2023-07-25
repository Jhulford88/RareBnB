import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchSingleSpot } from "../../store/spotsReducer";
import { fetchReportsThunk } from "../../store/reviewsReducer";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AddReviewModal from "../AddReviewModal/index";
import DeleteReviewModal from "../DeleteReviewModal/index";
import OpenBookingModalButton from "../OpenBookingModalButton";
import SpotBookingsModal from "../SpotBookingsPage";
import CreateBookingModal from "../CreateBookingModal";
import "./SpotDetailPage.css";

function SpotDetailPage() {
  //Initialize Things
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleClick = () => {
    history.push(`/spots/bookings/${singleSpot.id}`);
  };

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
      <div className="description-and-reserve-box-container">
        <div className="highlights">
          <div className="owner-name-and-image-container">
            <h2 className="hosted-by">
              Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}{" "}
            </h2>
            <div className="spot-detail-profile-image-container">
              <img
                className="spot-detail-profile-image"
                src={singleSpot.Owner.image}
              />
            </div>
          </div>
          <hr className="highlights-bar" />
          <div className="highlights-individual">
            <i class="fa-solid fa-door-open"></i>
            <div className="check-yourself-in">
              <p>Self check-in</p>
              <p className="lower-text">Check yourself in with the keypad</p>
            </div>
          </div>
          <div className="highlights-individual">
            <i class="fa-solid fa-key"></i>
            <div className="check-yourself-in">
              <p>Great check-in experience</p>
              <p className="lower-text">
                100% of recent guests gave the check-in process a good rating
              </p>
            </div>
          </div>
          <div className="highlights-individual">
            <i class="fa-regular fa-calendar-xmark"></i>
            <div className="check-yourself-in">
              <p className="free-cancellations">
                Free cancellations for 48 hours
              </p>
            </div>
          </div>
          <hr className="highlights-bar" />
          <p className="description-text">{singleSpot.description}</p>
        </div>
        <div className="booking-box-or-owner-container">
          {sessionUser?.id && sessionUser?.id === singleSpot.ownerId ? (
            <div className="booking-box-container-view-bookings">
              <button onClick={handleClick}>View Bookings</button>
            </div>
          ) : (
            <div className="booking-box-container">
              <div className="booking-box-container-upper">
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
              </div>
              <div className="open-booking-modal-button-container">
                {
                  <CreateBookingModal
                    spotId={singleSpot?.id}
                    singleSpot={singleSpot}
                    sessionUser={sessionUser}
                  />
                }
              </div>
            </div>
          )}
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
            <li className="individual-review" key={review.id}>
              <div className="review-name-date-image-container">
                <div>
                  <img
                    className="spot-detail-reviewer-image"
                    src={review.User.image}
                  />
                </div>
                <div className="review-name-date">
                  <h2 className="reviewer-name">{review.User.firstName}</h2>
                  <h3 className="review-date">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </h3>
                </div>
              </div>
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
