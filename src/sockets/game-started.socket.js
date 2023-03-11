export const gameStartedSocket = (socket, stateData, redirectToGame) => {
  const { socketId, setScreen, setMyTurn, setCurrentRoomId, setCurrentTurn } =
    stateData;

  return socket.on("game-started", (data) => {
    setCurrentTurn(data.currentTurn);
    setMyTurn(data[socketId]);
    setCurrentRoomId(data.roomId);
    setScreen("game");
    redirectToGame();
  });
};
