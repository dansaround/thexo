import React, { useContext } from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Xicon from "../icons/Xicon";
import Oicon from "../icons/Oicon";
import { MainContext } from "../../context/MainContext";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";

function Login() {
  const auth = getAuth();
  const { testUsers } = useContext(MainContext);

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const additionalInfo = getAdditionalUserInfo(result);
      console.log("USER INFO", user, additionalInfo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="icons">
        <Xicon />
        <Oicon />
      </div>
      <div className="login__container">
        <h1>THEXO</h1>
        <button className="google-login-btn" onClick={handleGoogleSignup}>
          <FontAwesomeIcon icon={faGoogle} /> Login with Google
        </button>
        <span onClick={testUsers}>Login to play</span>
      </div>
    </div>
  );
}

export default Login;
