import React, { useContext } from "react";
import { GameContext } from "../../context/GameContex";
import { ModalContext } from "../../context/ModalContext";
import "animate.css";

const Restart = () => {
  const { hideModal } = useContext(ModalContext);
  const { handleReset } = useContext(GameContext);
  return (
    <div className="restart animate__animated animate__slideInLeft">
      <h3 className="restart__title">Exit Game?</h3>
      <div className="restart__btns">
        <button className="btn btn-sm" onClick={hideModal}>
          yes, exit
        </button>
        <button className="btn btn-yellow btn-sm" onClick={handleReset}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default Restart;
