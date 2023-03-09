import io from "socket.io-client";
import { useState, useEffect } from "react";
import { SOCKET_URL } from "../constants";

export const useSocketIO = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return { socket };
};
