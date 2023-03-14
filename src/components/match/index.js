import "animate.css";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./match.css";

import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";
import { MainContext } from "../../context/MainContext";
import { useSessionValidation } from "../../hooks/useSessionValidation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "../spinner";
import { UserContext } from "../../context/UserContext";
import { Counter } from "../counter";

function Match() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isLoading: isLoadingUser } = useSessionValidation({
    userIsNotLogged: () => navigate("/login"),
  });
  const { user } = useContext(UserContext);
  const {
    putPlayerInQueue,
    removePlayerFromQueue,
    handleReset,
    getUid,
    testUsers,
  } = useContext(MainContext);

  const [isSearchingMatch, setIsSearchingMatch] = useState(false);
  const [token, setToken] = useState("abc123");

  useEffect(() => {
    handleReset();
  }, []);

  const handlePutPlayerInQueue = () => {
    setIsSearchingMatch(true);
    putPlayerInQueue();
  };

  const handleLogout = () => {
    logout();
  };

  const handleChangeAvatar = () => {
    testUsers();
  };

  const handleExitQueue = () => {
    setIsSearchingMatch(false);
    removePlayerFromQueue();
  };

  if (isLoadingUser) {
    return <Spinner />;
  }

  return (
    <div className="match">
      <div className="matchmaking__icons animate__animated animate__fadeInUp animate__fast">
        <Xicon />
        <Oicon />
      </div>
      <div className="match__container animate__animated animate__fadeInUp animate__fast ">
        <div>
          <div className="matchmaking__user__info animate__animated animate__fadeIn animate__delay-500ms">
            <img
              onClick={handleChangeAvatar}
              alt="user"
              src={user.profilePic}
            />
            <h2>{user.nickname}</h2>

            <div className="level__bar ">
              <p className="level__current"> {user.elo}</p>
              <div
                className="level__bar__completed"
                style={{
                  width: `${(user.points * 100) / 500}%`,
                }}
              ></div>
              <p className="level__xp ">
                {user.points} / {500}
              </p>
            </div>
          </div>
          <p
            onClick={handleLogout}
            className="logout__text animate__animated animate__fadeIn animate__delay-1s"
          >
            Log out
          </p>
        </div>
      </div>

      {!isSearchingMatch ? (
        <div
          className="btn__area btn__area animate__animated animate__fadeInUp animate__delay-1s animate__faster"
          onClick={handlePutPlayerInQueue}
        >
          <button className="btn btn-yellow btn-join">Find match</button>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              marginTop: 40,
              width: "100%",
              textAlign: "center",
            }}
          >
            Buscando rival
          </h2>
          <button
            onClick={handleExitQueue}
            style={{ marginTop: 20 }}
            className="btn"
          >
            Exit queue
          </button>
        </div>
      )}
    </div>
  );
}

export default Match;
