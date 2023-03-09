/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState } from "react";
import { useSockets } from "../hooks/useSockets";
import { useSocketIO } from "../hooks/useSocketIO";

const MainContext = createContext();

const GameMainContext = ({ children }) => {
  const { socket } = useSocketIO();

  const [myTurn, setMyTurn] = useState("");
  const [iMoved, setIMoved] = useState(false);
  const [socketId, setSocketId] = useState("");
  const [activeUser, setActiveUser] = useState("x");
  const [squares, setSquares] = useState(new Array(9).fill(""));

  const stateData = {
    myTurn,
    iMoved,
    squares,
    socketId,
    setMyTurn,
    setIMoved,
    activeUser,
    setSquares,
    setSocketId,
    setActiveUser,
  };

  useSockets({ socket, stateData });

  const handlePlayerMove = (index) => {
    if (iMoved) return;
    socket.emit("move", { index, turn: myTurn });
  };

  return (
    <MainContext.Provider value={{ handlePlayerMove }}>
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, GameMainContext };
