// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import "./LoginForm.css";

// function LoginFormModal() {
//   const dispatch = useDispatch();
//   const [credential, setCredential] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors({});
//     return dispatch(sessionActions.login({ credential, password }))
//       .then(closeModal)
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) {
//           setErrors(data.errors);
//         }
//       });
//   };

//   return (
//     <>
//       <h1>Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username or Email
//           <input
//             type="text"
//             value={credential}
//             onChange={(e) => setCredential(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.credential && (
//           <p>{errors.credential}</p>
//         )}
//         <button type="submit">Log In</button>
//       </form>
//     </>
//   );
// }

// export default LoginFormModal;

import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isDisabled, setIsDisabled] = useState(true)
    const { closeModal } = useModal();

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

    useEffect(() => {

      if (credential.length >= 4 || password.length >= 6) setIsDisabled(false)
    }, [isDisabled, credential, password])



    return (
        < div className='loginmodal'>
            <h1>Log In</h1>
            <form className='loginform' onSubmit={handleSubmit}>
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
                    setCredential("SAMPLE321")
                    setPassword("SAMPLE123")
                }}
                type="submit"
                className="login-demo-button"
                >Log In as Demo User</button>
            </form>


        </div>
    );
}

export default LoginFormModal;
