import "./landingPage.css"
import { Link } from "react-router-dom";

function LandingPageCard({spot}) {

    return (
        <li className="spot-card" title={spot.name}>
            <Link to={`/spots/${spot.id}`}>
            <div className="spot-card-container">
                <div className="spot-card-image-container">
                    <img className="spot-card-img" src={spot.previewImage}></img>
                </div>
                    <p>{spot.city}, {spot.state}</p>
                    <p>${spot.price} /night</p>
                    <p><i className="fa-solid fa-star"></i>{(spot.avgRating ? spot.avgRating : "New")}</p>
                </div>
            </Link>
        </li>
    );
};

export default LandingPageCard;
