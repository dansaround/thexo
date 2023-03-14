export const gameOverSocket = (socket, stateData) => {
  const {
    getUid,
    setWinner,
    showModal,
    setModalMode,
    setWinnerLine,
    handlePointsEarned,
  } = stateData;

  return socket.on("game-over", (gameResult) => {
    const uid = getUid();
    if (gameResult.winner === "draw") {
      handlePointsEarned(gameResult.pointsEarned[uid] || "");
      setWinner("no");
      setModalMode("winner");
      showModal();
      return;
    }

    handlePointsEarned(gameResult.pointsEarned[uid] || "");
    setWinner(gameResult.winner);
    setWinnerLine(gameResult.line);
    setModalMode("winner");
    showModal();
  });
};
