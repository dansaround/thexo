import React from "react";
import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";

const BoardCard = ({ active, user = "nouser", index, handleMove, myTurn }) => {
  return (
    <div
      className={`card ${active && user === "x" && "shadow-blue"} ${
        active && user === "o" && "shadow-yellow"
      } ${active ? "active" : "shadow-gray"} ${
        myTurn === "x" ? "card-blue" : "card-yellow"
      }`}
      onClick={() => handleMove(index)}
    >
      {user === "x" && <Xicon color={active && "dark"} size="lg" />}
      {user === "o" && <Oicon color={active && "dark"} size="lg" />}
    </div>
  );
};

export default BoardCard;
