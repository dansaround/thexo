import { createContext, useEffect, useState, useContext } from "react";
import calcBestMove, { calcWinner } from "../helpers/calcSquares";
import { ModalContext } from "./ModalContext";

const GameContext = createContext();

const GameState = (props) => {
  const [screen, setScreen] = useState("start"); // start || game
  const [playMode, setPlayMode] = useState("user"); // user || cpu
  const [activeUser, setActiveUser] = useState("x"); // x || o
  const [board, setBoard] = useState(new Array(9).fill(""));
  const [xnext, setXnext] = useState(false);
  const [turn, setTurn] = useState("x");
  const [myTurn, setMyTurn] = useState("");
  const [winner, setWinner] = useState(null);
  const [winnerLine, setWinnerLine] = useState(null);
  const [ties, setTies] = useState({ x: 0, o: 0 });
  const [iMoved, setIMoved] = useState(false);

  const { showModal, hideModal, setModalMode } = useContext(ModalContext);

  useEffect(() => {
    //check if cpu turn
    let currentUser = xnext ? "o" : "x";
    if (playMode === "cpu" && currentUser !== activeUser && !winner) {
      cpuNextMove(board);
    }
    checkNoWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xnext, winner, screen]);

  const handleStart = (player) => {
    setPlayMode(player);
    setScreen("game");
  };

  const handleSquareClick = (ix) => {
    if (board[ix] || winner) {
      return;
    }
    let currentUser = xnext ? "o" : "x";
    if (playMode === "cpu" && currentUser !== activeUser) {
      return;
    }

    let ns = [...board];
    ns[ix] = !xnext ? "x" : "o";
    setBoard(ns);
    setXnext(!xnext);
    checkWinner(ns);
  };

  const checkWinner = (ns) => {
    const isWinner = calcWinner(ns);
    if (isWinner) {
      setWinner(isWinner.winner);
      setWinnerLine(isWinner.line);
      const nties = { ...ties };
      nties[isWinner.winner] += 1;
      setTies(nties);
      showModal();
      setModalMode("winner");
    }
  };

  const cpuNextMove = (sqrs) => {
    let bestmove = calcBestMove(sqrs, activeUser === "x" ? "o" : "x");
    let ns = [...board];
    ns[bestmove] = !xnext ? "x" : "o";
    setBoard(ns);
    setXnext(!xnext);
    checkWinner(ns);
  };

  const handleReset = () => {
    setBoard(new Array(9).fill(""));
    setXnext(false);
    setWinner(null);
    setWinnerLine(null);
    setActiveUser("x");
    setTies({ x: 0, o: 0 });
    hideModal();
    setScreen("start");
  };

  const handleNextRound = () => {
    setBoard(new Array(9).fill(""));
    setXnext(winner === "x");
    setWinner(null);
    setWinnerLine(null);
    hideModal();
  };

  const checkNoWinner = () => {
    const moves = board.filter((sq) => sq === "");
    if (moves.length === 0) {
      setWinner("no");
      showModal();
      setModalMode("winner");
    }
  };

  return (
    <GameContext.Provider
      value={{
        board,
        setBoard,
        winner,
        setWinner,
        winnerLine,
        setWinnerLine,
        xnext,
        setXnext,
        turn,
        setTurn,
        ties,
        screen,
        setScreen,
        activeUser,
        playMode,
        handleStart,
        setActiveUser,
        setPlayMode,
        setTies,
        showModal,
        setModalMode,
        handleSquareClick,
        handleReset,
        handleNextRound,
        setIMoved,
        iMoved,
        setMyTurn,
        myTurn,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameState };
