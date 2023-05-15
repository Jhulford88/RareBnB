import "./landingPage.css"
import { Link } from "react-router-dom";

function LandingPageCard({spot}) {

    return (
        <li className="spot-card" title={spot.name}>
            <Link to={`/spots/${spot.id}`}>
            <div className="spot-card-container">
                <div className="spot-card-image-container">
                    <img className="spot-card-img" alt="test" src={spot.previewImage}></img>
                </div>
                <div className="card-lower-half">
                <p>{spot.city}, {spot.state}</p>
                <p><i className="fa-solid fa-star"></i>{(spot.avgRating ? spot.avgRating.toFixed(2) : "New")}</p>
                <p className="card-price">${spot.price}<span className="spot-just-night"> night</span></p>
                </div>
            </div>
            </Link>
        </li>
    );
};

export default LandingPageCard;
