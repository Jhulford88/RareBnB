import "./landingPage.css"

function LandingPageCard(spot) {
    // console.log(spot)
    // console.log(spot.address)
    // console.log(spot.spot.previewImage)
    return (
        <li>
            <div className="spot-card-container">
                {/* spot picture */}
                <div className="spot-card-image-container">
                    <img className="spot-card-img" src={spot.spot.previewImage}></img>
                </div>
                {/* spot location */}
                    <p>{spot.spot.city},{spot.spot.state}</p>
                {/* spot price */}
                    <p>${spot.spot.price} /night</p>
                {/* spot rating */}
                    <p><i class="fa-solid fa-star"></i>{(spot.spot.avgRating ? spot.spot.avgRating : "New")}</p>
                {/* spot name */}
            </div>
        </li>
    );
};

export default LandingPageCard;
