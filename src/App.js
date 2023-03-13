import { useContext } from "react";
import Board from "./components/board";
import Modal from "./components/modal";
import Start from "./components/start";

import { MainContext } from "./context/MainContext";

function App() {
  const { screen } = useContext(MainContext);

  return (
    <div className="App">
      <div className="container">
        {screen === "start" ? <Start /> : <Board />}
      </div>
      <Modal />
    </div>
  );
}

export default App;
