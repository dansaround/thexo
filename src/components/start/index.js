/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";

import { MainContext } from "../../context/MainContext";
import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";

const Start = () => {
  const { activeUser, setActiveUser } = useContext(MainContext);

  // const handleEvent = () => {
  //   socket.emit("test-players-variable");
  // };

  // const handleEvent2 = () => {
  //   socket.emit("test-room-members");
  // };

  // const handleJoin = () => {
  //   handleJoinTheRoom();
  //   setHasJoined(true);
  // };

  return (
    <div className="start">
      <div className="start__header">
        <Xicon />
        <Oicon />
      </div>
      <div className="card shadow-gray">
        <h1 className="text-lg">Pick player 1'st mark</h1>
        <div className="start__players">
          <span
            className={activeUser === "x" ? "start__players--active" : ""}
            onClick={() => setActiveUser("x")}
          >
            <Xicon color={activeUser === "x" ? "dark" : "light"} />
          </span>
          <span
            className={activeUser === "o" ? "start__players--active" : ""}
            onClick={() => setActiveUser("o")}
          >
            <Oicon color={activeUser === "o" ? "dark" : "light"} />
          </span>
        </div>
        <p className="text-light text-normal">remember: x goes first</p>
      </div>
      <div className="start__btns">
        <button className="btn btn-yellow">Join the room</button>

        {/* <button className="btn btn-blue" onClick={() => handleStart("user")}>
          {" "}
          new game (vs Player)
        </button> */}
      </div>
    </div>
  );
};

export default Start;
