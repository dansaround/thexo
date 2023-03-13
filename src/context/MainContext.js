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
  const {
    user: { uid: userUid },
  } = useContext(UserContext);
  const { showModal, hideModal, setModalMode } = useContext(ModalContext);

  const [myTurn, setMyTurn] = useState("");
  const [winner, setWinner] = useState(null);
  const [iMoved, setIMoved] = useState(false);
  const [socketId, setSocketId] = useState("");
  const [screen, setScreen] = useState("game");
  const [activeUser, setActiveUser] = useState("x");
  const [winnerLine, setWinnerLine] = useState(null);
  const [currentTurn, setCurrentTurn] = useState("x");
  const [pointsEarned, setPointsEarned] = useState("");
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
    setPointsEarned("");
    setScreen("start");
  };

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

  const handlePointsEarned = (points) => {
    setPointsEarned(points);
  };

  const getUid = () => {
    return userUid;
  };

  const stateData = {
    elo,
    board,
    socket,
    myTurn,
    iMoved,
    screen,
    winner,
    getUid,
    setBoard,
    socketId,
    setWinner,
    setMyTurn,
    showModal,
    hideModal,
    setIMoved,
    setScreen,
    testUsers,
    activeUser,
    navigateTo,
    winnerLine,
    handleReset,
    setSocketId,
    currentTurn,
    setModalMode,
    pointsEarned,
    setWinnerLine,
    setActiveUser,
    currentRoomId,
    setCurrentTurn,
    handlePlayerMove,
    setCurrentRoomId,

    handlePointsEarned,
  };

  const { emitters } = useSockets({ socket, stateData });
  const { putPlayerInQueue, removePlayerFromQueue } = emitters;

  return (
    <MainContext.Provider
      value={{
        ...stateData,
        putPlayerInQueue,
        removePlayerFromQueue,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, GameMainContext };
