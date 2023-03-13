import "animate.css";
import { v4 as uuidv4 } from "uuid";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./select-user.css";

import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";
import { UserContext } from "../../context/UserContext";
import { useSessionValidation } from "../../hooks/useSessionValidation";
import { Spinner } from "../spinner";
import { useNavigate } from "react-router-dom";
import { animationAfterAnother } from "../../utils/animation.utils";
import { useUser } from "../../hooks/useUser";

function SelectUser() {
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const { isLoading: isLoadingUser } = useSessionValidation({
    userIsNotLogged: () => navigate("/login"),
  });

  const { user } = useContext(UserContext);

  const [url, setUrl] = useState("");
  const [nickname, setNickname] = useState("");
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  useEffect(() => {
    if (!user) return;
    user.nickname && setNickname(user.nickname);

    if (user.profilePic) {
      setUrl(user.profilePic);
      return;
    }
    setUrl(`https://avatars.dicebear.com/api/avataaars/${user.uid}.svg`);
  }, [user]);

  const handleChangeAvatar = () => {
    const imgElement = document.querySelector(".avatar");
    animationAfterAnother(imgElement, "slide-out", "slide-in", 400);

    setUrl(`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg`);
  };

  const handleStart = async () => {
    setIsUpdatingUser(true);
    const updated = await updateUser(user.uid, { nickname, profilePic: url });
    if (updated) {
      setIsUpdatingUser(false);
      navigate("/match");
    }
  };

  const isStartDisabled = () => {
    return nickname.length < 3 || isUpdatingUser;
  };

  if (isLoadingUser) {
    return <Spinner />;
  }

  return (
    <div className="selectUser">
      <div className="selectUser__icons animate__animated animate__fadeInUp animate__fast">
        <Xicon />
        <Oicon />
      </div>
      <div className="selectUser__container animate__animated animate__fadeInUp animate__fast ">
        <div className="form">
          <div className="avatar-container">
            <img className="avatar" alt="avatar" src={url} />
            <div className="btn-avt-area">
              <button onClick={handleChangeAvatar} className=" btn btn-blue">
                change Avatar{" "}
              </button>
            </div>
          </div>
          <div className="form__group">
            <input
              type="text"
              value={nickname}
              pattern="^[a-zA-Z0-9]+$"
              className="form__input"
              placeholder="Username"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="start-btn-container">
            <button
              disabled={isStartDisabled()}
              onClick={handleStart}
              className={`btn btn-yellow start-btn ${
                isStartDisabled() && "disabled"
              }`}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectUser;
