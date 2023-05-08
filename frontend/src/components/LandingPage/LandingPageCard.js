import "./landingPage.css"
import { Link } from "react-router-dom";

function LandingPageCard({spot}) {
    // console.log(spot)
    // console.log(spot.address)
    // console.log(spot.spot.previewImage)
    return (
        <li>
            <Link to="">
            <div className="spot-card-container">
                {/* spot picture */}
                <div className="spot-card-image-container">
                    <img className="spot-card-img" src={spot.previewImage}></img>
                </div>
                {/* spot location */}
                    <p>{spot.city},{spot.state}</p>
                {/* spot price */}
                    <p>${spot.price} /night</p>
                {/* spot rating */}
                    <p><i class="fa-solid fa-star"></i>{(spot.avgRating ? spot.avgRating : "New")}</p>
                {/* spot name */}
            </div>
            </Link>
        </li>
    );
};

export default LandingPageCard;
