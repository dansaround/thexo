import "animate.css";
import { v4 as uuidv4 } from "uuid";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./index.css";

import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";

function SelectUser() {
  const [token, setToken] = useState("abc123");

  const handleChangeAvatar = () => {
    setToken(uuidv4());
  };

  return (
    <div className="selectUser">
      <div className="selectUser__icons animate__animated animate__fadeInUp animate__fast">
        <Xicon />
        <Oicon />
      </div>
      <div className="selectUser__container animate__animated animate__fadeInUp animate__fast ">
        <div className="form">
          <div className="avatar-container">
            <img
              className="avatar"
              src={`https://avatars.dicebear.com/api/avataaars/${token}.svg`}
            />
            <div className="btn-avt-area">
              <button onClick={handleChangeAvatar} className=" btn btn-blue">
                change Avatar{" "}
              </button>
            </div>
          </div>
          <div className="form__group">
            <input
              type="text"
              pattern="^[a-zA-Z0-9]+$"
              className="form__input"
              placeholder="Username"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectUser;
