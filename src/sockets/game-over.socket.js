export const gameOverSocket = (socket, stateData) => {
  const { setWinner, setWinnerLine, showModal, setModalMode } = stateData;

  return socket.on("game-over", (moveResult) => {
    if (moveResult === "draw") {
      setWinner("no");
      setModalMode("winner");
      showModal();
      return;
    }

    console.log("GAME OVER ", moveResult);
    setWinner(moveResult.winner);
    setWinnerLine(moveResult.line);
    showModal();
    setModalMode("winner");
  });
};
