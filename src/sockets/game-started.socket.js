export const gameStartedSocket = (socket, stateData) => {
  const { socketId, setScreen, setMyTurn } = stateData;

  return socket.on("game-started", (playersTurns) => {
    setMyTurn(playersTurns[socketId]);
    setScreen("game");
  });
};
