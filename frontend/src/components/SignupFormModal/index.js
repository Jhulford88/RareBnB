

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useEffect } from "react";

function SignupFormModal() {

  //intialize things
  const dispatch = useDispatch();
  const { closeModal } = useModal();


  //state slices
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  // useEffect(() => {

  //   if ( email.length < 1 ) setIsDisabled(true)
  //   if ( username.length < 4 ) setIsDisabled(true)
  //   if ( firstName.length < 1 ) setIsDisabled(true)
  //   if ( lastName.length < 1 ) setIsDisabled(true)
  //   if ( password.length < 6 ) setIsDisabled(true)
  //   if ( confirmPassword.length < 6 ) setIsDisabled(true)
  // }, [isDisabled, email, username, firstName, lastName, password, confirmPassword])


  return (
    <div className='signupmodal'>
      <h1>Sign Up</h1>
      <form className='signupform' onSubmit={handleSubmit}>
        <label>
          <input
            className='signupforminput'
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="errors">{errors.email}</p>}
        <label>
          <input
            className='signupforminput'
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="errors">{errors.username}</p>}
        <label>
          <input
            className='signupforminput'
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
        <label>
          <input
            className='signupforminput'
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
        <label>
          <input
            className='signupforminput'
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="errors">{errors.password}</p>}
        <label>
          <input
            className='signupforminput'
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="errors">{errors.confirmPassword}</p>
        )}
        <button className="signupbutton" type="submit" /*disabled={isDisabled}*/>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
