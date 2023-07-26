import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../assets/RareBnB.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div>
      <ul className="header-ul">
        <li>
          <NavLink exact to="/" className="home-button">
            <a href="/" className="logo">
              <img className="logo" alt="test" src={logo} />
            </a>
          </NavLink>
        </li>
        {isLoaded && (
          <li>
            <NavLink
              className="bookings-link"
              exact
              to={`/bookings/${sessionUser?.id}`}
            >
              {sessionUser ? "My Bookings" : ""}
            </NavLink>
            <NavLink className="create-new-spot-link" exact to="/spots/new">
              {sessionUser ? "Create a new Spot" : ""}
            </NavLink>
            <ProfileButton className="profile-button" user={sessionUser} />
          </li>
        )}
      </ul>

      <ul className="subheader-ul">
        <div className="icon-container">
          <i class="fa-solid fa-house">
            <p className="icon-text">Houses</p>
          </i>
        </div>
        <div className="icon-container">
          <i class="fa-solid fa-building">
            <p className="icon-text">Apartments</p>
          </i>
        </div>
        <div className="icon-container">
          <i class="fa-solid fa-cow">
            <p className="icon-text">Farms</p>
          </i>
        </div>
        <div className="icon-container">
          <i class="fa-solid fa-ship">
            <p className="icon-text">Boats</p>
          </i>
        </div>
        <div className="icon-container">
          <i class="fa-solid fa-leaf">
            <p className="icon-text">Earthships</p>
          </i>
        </div>
        <div className="icon-container">
          <i class="fa-solid fa-person-shelter">
            <p className="icon-text">Tiny Homes</p>
          </i>
        </div>
        <div className="icon-container">
          <i class="fa-solid fa-tree">
            <p className="icon-text">Tree Houses</p>
          </i>
        </div>
        <div className="icon-container">
          <i class="fa-solid fa-campground">
            <p className="icon-text">A-Frames</p>
          </i>
        </div>
        <div className="icon-container">
          <i class="fa-solid fa-table-cells-large">
            <p className="icon-text">Containers</p>
          </i>
        </div>
        <div className="icon-container">
          <i class="fa-solid fa-landmark-dome">
            <p className="icon-text">Domes</p>
          </i>
        </div>
        <div className="icon-container">
          <i class="fa-solid fa-tent">
            <p className="icon-text">Yurts</p>
          </i>
        </div>
        <div className="icon-container">
          <i class="fa-solid fa-igloo">
            <p className="icon-text">Other</p>
          </i>
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
