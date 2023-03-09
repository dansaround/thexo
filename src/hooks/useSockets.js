/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
  setIdSocket,
  gameStartedSocket,
  playerMovedSocket,
  gameOverSocket,
} from "../sockets";

export const useSockets = ({ socket, stateData }) => {
  useEffect(() => {
    if (!socket) return;

    // Socket listeners
    setIdSocket(socket, stateData);
    gameOverSocket(socket, stateData);
    gameStartedSocket(socket, stateData);
    playerMovedSocket(socket, stateData);
  }, [socket, stateData]);
};
