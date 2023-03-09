export const playerMovedSocket = (socket, stateData) => {
  const { setSquares, setIMoved, myTurn } = stateData;

  return socket.on("player-moved", (data) => {
    const { squares, turnThatJustMoved } = data;
    setSquares(squares);
    setIMoved(turnThatJustMoved === myTurn);
  });
};
