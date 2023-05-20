import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../../assets/RareBnB.png"

function Navigation({ isLoaded }){

  //listen for user session
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='header-ul'>
      <li>
        <NavLink exact to="/" className="home-button" ><a href='/' className='logo'><img className='logo' alt='test' src={logo}/></a></NavLink>
      </li>
      {isLoaded && (
        <li>
          <NavLink className="create-new-spot-link" exact to="/spots/new">{sessionUser ? "Create a new Spot" : ''}</NavLink>
          <ProfileButton className="profile-button" user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
