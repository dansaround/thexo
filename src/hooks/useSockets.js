/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

import {
  setIdSocket,
  gameOverSocket,
  gameStartedSocket,
  playerMovedSocket,
} from "../sockets";

export const useSockets = ({ socket, stateData }) => {
  const {
    user: { uid },
  } = useContext(UserContext);

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
    socket.emit("put-player-in-queue", { socketId, elo, uid });
  };

  const removePlayerFromQueue = () => {
    const { socketId, elo } = stateData;
    socket.emit("remove-player-from-queue", { socketId, elo, uid });
  };

  return {
    emitters: {
      putPlayerInQueue,
      removePlayerFromQueue,
    },
  };
};
