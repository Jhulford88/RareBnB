import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {

    //initialize things
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    //state slices
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isDisabled, setIsDisabled] = useState(true)

    //submition behavior
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    //diable button validators
    //CURRENTLY DOES NOT WORK!!!!
    useEffect(() => {

      if (credential.length >= 4 && password.length >= 6) setIsDisabled(false)
    }, [isDisabled, credential, password])



    return (
        < div className='loginmodal'>
            <h1>Log In</h1>
            <form className='loginform' disabled={isDisabled} onSubmit={handleSubmit}>
                <label>
                    <input
                        className='loginusername'
                        placeholder="Username or Email"
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label >
                    <input
                        className="loginpassword"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.credential && (
                    <p className="loginerrors">{errors.credential}</p>
                )}
                <button className='loginbutton' type="submit" disabled={isDisabled}>Log In</button>
                <button
                onClick={() => {
                    setCredential("IownNothingThree")
                    setPassword("password")
                }}
                type="submit"
                className="login-demo-button"
                >Log In as Demo User</button>
            </form>


        </div>
    );
}

export default LoginFormModal;
