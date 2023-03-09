/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";

import { GameContext } from "../../context/GameContex";
import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";

const Start = ({ socket, handleJoinTheRoom }) => {
  const { activeUser, setActiveUser } = useContext(GameContext);
  const [hasJoined, setHasJoined] = useState(false);

  const handleEvent = () => {
    socket.emit("test-players-variable");
  };

  const handleEvent2 = () => {
    socket.emit("test-room-members");
  };

  const handleJoin = () => {
    handleJoinTheRoom();
    setHasJoined(true);
  };

  return (
    <div className="start">
      <div className="start__header">
        <Xicon />
        <Oicon />
      </div>
      <div className="card shadow-gray">
        <h1 onClick={handleEvent} className="text-lg">
          Pick player 1'st mark
        </h1>
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
        <p onClick={handleEvent2} className="text-light text-normal">
          remember: x goes first
        </p>
      </div>
      <div className="start__btns">
        {!hasJoined ? (
          <button className="btn btn-yellow" onClick={handleJoin}>
            Join the room
          </button>
        ) : (
          <p
            style={{
              width: "100%",
              textAlign: "center",
              color: "var(--color-yellow)",
              fontWeight: "bolder",
              letterSpacing: "1px",
            }}
          >
            Waiting for the other player
          </p>
        )}

        {/* <button className="btn btn-blue" onClick={() => handleStart("user")}>
          {" "}
          new game (vs Player)
        </button> */}
      </div>
    </div>
  );
};

export default Start;
