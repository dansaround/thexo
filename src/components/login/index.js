import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "animate.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";

import "./login.css";

import { MainContext } from "../../context/MainContext";
import Xicon from "../icons/Xicon";
import Oicon from "../icons/Oicon";

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
      <div className="icons animate__animated animate__fadeInUp">
        <Xicon />
        <Oicon />
      </div>
      <div className="login__container animate__animated animate__fadeInUp">
        <h1>THEXO </h1>
        <button className="google-login-btn" onClick={handleGoogleSignup}>
          <FontAwesomeIcon icon={faGoogle} /> Login with Google
        </button>
        <span onClick={testUsers}>Login to play</span>
      </div>
    </div>
  );
}

export default Login;
