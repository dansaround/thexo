import { useContext, useEffect, useState } from "react";
import Board from "./components/board";
import Modal from "./components/modal";
import Start from "./components/start";
import { GameContext } from "./context/GameContex";

import io from "socket.io-client";

function App() {
  return (
    <div className="App">
      <div className="container">
        {/* {screen === "start" ? (
            <Start socket={socket} handleJoinTheRoom={handleJoinTheRoom} />
          ) : (
            <Board socket={socket} />
          )} */}
        <Start />
      </div>
      <Modal />
    </div>
  );
}

export default App;
