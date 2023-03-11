/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import {
  setIdSocket,
  gameOverSocket,
  gameStartedSocket,
  playerMovedSocket,
} from "../sockets";

export const useSockets = ({ socket, stateData }) => {
  useEffect(() => {
    if (!socket) return;

    // Socket listeners
    setIdSocket(socket, stateData);
    playerMovedSocket(socket, stateData);
    gameOverSocket(socket, stateData);
    gameStartedSocket(socket, stateData, () => stateData.navigateTo("/"));
  }, [socket, stateData]);

  const putPlayerInQueue = () => {
    const { socketId, elo } = stateData;
    socket.emit("put-player-in-queue", { socketId, elo });
  };

  return {
    emitters: {
      putPlayerInQueue,
    },
  };
};
