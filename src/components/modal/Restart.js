import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import "animate.css";

const Restart = () => {
  const navigate = useNavigate();
  const { hideModal } = useContext(ModalContext);

  const handleExitGame = () => {
    navigate("/match");
  };

  return (
    <div className="restart animate__animated animate__slideInLeft">
      <h3 className="restart__title">Exit Game?</h3>
      <div className="restart__btns">
        <button className="btn btn-sm" onClick={handleExitGame}>
          yes, exit
        </button>
        <button className="btn btn-yellow btn-sm" onClick={hideModal}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default Restart;
