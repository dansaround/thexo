import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import "./firebase.init";
import { router } from "./router";
import { GameState } from "./context/GameContex";
import { ModalState } from "./context/ModalContext";
import { GameMainContext } from "./context/MainContext";

ReactDOM.render(
  // <React.StrictMode>
  <ModalState>
    <GameState>
      <RouterProvider router={router} />
    </GameState>
  </ModalState>,
  // </React.StrictMode>,
  document.getElementById("root")
);
