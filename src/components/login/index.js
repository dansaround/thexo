import React from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Xicon from "../icons/Xicon";
import Oicon from "../icons/Oicon";

function Login() {
  return (
    <div className="login">
      <div className="icons">
        <Xicon />
        <Oicon />
      </div>
      <div className="login__container">
        <h1>THEXO</h1>
        <button className="google-login-btn">
          <FontAwesomeIcon icon={faGoogle} /> Login with Google
        </button>
        <span>Login to play</span>
      </div>
    </div>
  );
}

export default Login;
