import { useContext, useEffect, useState } from "react";
import Board from "./components/board";
import Modal from "./components/modal";
import Start from "./components/start";
import { GameContext } from "./context/GameContex";

import io from "socket.io-client";

function App() {
  const {
    screen,
    setScreen,
    setSquares,
    setWinner,
    setWinnerLine,
    showModal,
    setModalMode,
    setIMoved,
    setMyTurn,
    myTurn,
  } = useContext(GameContext);
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    setSocket(io("https://258c-186-31-171-54.ngrok.io"));

    return () => {
      socket && socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("your-id", (socketId) => {
      console.log("your id is: ", socketId);
      setSocketId(socketId);
    });

    socket.on("game-started", (playersTurns) => {
      setMyTurn(playersTurns[socketId]);
      console.log("DATAAA GAME ", { socketId, playersTurns });
      setScreen("game");
      // setScreen("game");
    });

    socket.on("player-moved", (data) => {
      const { squares, turnThatJustMoved } = data;
      setSquares(squares);

      setIMoved(turnThatJustMoved === myTurn);
    });

    socket.on("game-over", (moveResult) => {
      if (moveResult === "draw") {
        setWinner("no");
        setModalMode("winner");
        showModal();
        return;
      }

      setWinner(moveResult.winner);
      setWinnerLine(moveResult.line);
      showModal();
      setModalMode("winner");
    });
  }, [socket, socketId, myTurn]);

  const handleJoinTheRoom = () => {
    socket.emit("join-room", socketId);
  };

  return (
    socket && (
      <div className="App">
        <div className="container">
          {screen === "start" ? (
            <Start socket={socket} handleJoinTheRoom={handleJoinTheRoom} />
          ) : (
            <Board socket={socket} />
          )}
        </div>
        <Modal />
      </div>
    )
  );
}

export default App;
