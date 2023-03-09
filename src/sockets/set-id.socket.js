export const setIdSocket = (socket, stateData) => {
  const { setSocketId } = stateData;

  return socket.on("your-id", (socketId) => {
    console.log("Your socket id is ", socketId);
    setSocketId(socketId);
  });
};
