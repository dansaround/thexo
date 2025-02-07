import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";

const Win = () => {
  const navigate = useNavigate();
  const { winner, pointsEarned } = useContext(MainContext);

  const handlePlayAgain = () => {
    navigate("/match");
  };

  return (
    <div className="score">
      {winner && winner !== "no" ? (
        <>
          <h3
            className={`score__title ${
              winner === "o" ? "text-yellow" : "text-blue"
            } `}
          >
            {winner === "x" && <Xicon />}
            {winner === "o" && <Oicon />}
            Takes the round
          </h3>
        </>
      ) : (
        <h3 className="score__title text-light">No Winner !</h3>
      )}
      <span
        style={{
          color: pointsEarned.includes("-")
            ? "var(--color-red)"
            : "var(--color-blue)",
        }}
        className="points-earned"
      >
        {pointsEarned}
      </span>
      <div className="score__btns">
        <button onClick={handlePlayAgain} className={`btn  btn-sm `}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default Win;
