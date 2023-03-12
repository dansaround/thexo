/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { createContext, useState, useContext } from "react";

import { ModalContext } from "./ModalContext";
import { useSockets } from "../hooks/useSockets";
import { useSocketIO } from "../hooks/useSocketIO";
import { UserContext } from "./UserContext";

const MainContext = createContext();

const GameMainContext = ({ children }) => {
  const navigate = useNavigate();
  const { socket } = useSocketIO();
  const { userUid } = useContext(UserContext);
  const { showModal, hideModal, setModalMode } = useContext(ModalContext);

  const [myTurn, setMyTurn] = useState("");
  const [winner, setWinner] = useState(null);
  const [iMoved, setIMoved] = useState(false);
  const [socketId, setSocketId] = useState("");
  const [screen, setScreen] = useState("game");
  const [activeUser, setActiveUser] = useState("x");
  const [winnerLine, setWinnerLine] = useState(null);
  const [currentTurn, setCurrentTurn] = useState("x");
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [board, setBoard] = useState(new Array(9).fill(""));

  const elo = 1;

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleReset = () => {
    setBoard(new Array(9).fill(""));
    setWinner(null);
    setWinnerLine(null);
    setActiveUser("x");
    hideModal();
    setIMoved(false);
    setScreen("start");
  };

  const stateData = {
    elo,
    board,
    socket,
    myTurn,
    iMoved,
    screen,
    winner,
    setBoard,
    socketId,
    setWinner,
    setMyTurn,
    showModal,
    hideModal,
    setIMoved,
    setScreen,
    activeUser,
    navigateTo,
    winnerLine,
    handleReset,
    setSocketId,
    currentTurn,
    setModalMode,
    setWinnerLine,
    setActiveUser,
    currentRoomId,
    setCurrentTurn,
    setCurrentRoomId,
  };

  const { emitters } = useSockets({ socket, stateData });
  const { putPlayerInQueue } = emitters;

  const handlePlayerMove = (index) => {
    if (iMoved) return;
    socket.emit("move", {
      index,
      turn: myTurn,
      uid: userUid,
      board: board,
      roomId: currentRoomId,
    });
  };

  const testUsers = () => {
    socket.emit("test-players-variable");
  };

  return (
    <MainContext.Provider
      value={{
        ...stateData,
        handlePlayerMove,
        testUsers,
        putPlayerInQueue,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, GameMainContext };
