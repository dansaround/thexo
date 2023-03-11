import React from "react";
import { useNavigate } from "react-router-dom";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./login.css";

import Xicon from "../icons/Xicon";
import Oicon from "../icons/Oicon";
import { useAuth } from "../../hooks/useAuth";
import { useSessionValidation } from "../../hooks/useSessionValidation";
import "animate.css";

function Login() {
  const { handleGoogleSignup, isLoading } = useAuth();
  const navigate = useNavigate();
  useSessionValidation({ userIsLogged: () => navigate("/match") });

  return (
    <div className="login">
      <div className="icons animate__animated animate__fadeInUp">
        <Xicon />
        <Oicon />
      </div>
      <div className="login__container">
        <h1>THEXO</h1>
        {!isLoading ? (
          <button className="google-login-btn" onClick={handleGoogleSignup}>
            <FontAwesomeIcon icon={faGoogle} /> Login with Google
          </button>
        ) : (
          <button
            className="google-login-btn"
            style={{ backgroundColor: "var(--color-gray)" }}
          >
            <FontAwesomeIcon icon={faGoogle} /> Loggin in ...
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
