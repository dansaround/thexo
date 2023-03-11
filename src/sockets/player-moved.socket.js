export const playerMovedSocket = (socket, stateData) => {
  const { setBoard, setIMoved, myTurn, setCurrentTurn } = stateData;

  return socket.on("player-moved", (data) => {
    const { board, turnThatJustMoved, currentTurn } = data;
    setBoard(board);
    setCurrentTurn(currentTurn);
    setIMoved(turnThatJustMoved === myTurn);
  });
};
