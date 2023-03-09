import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./components/login/Login";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { GameState } from "./context/GameContex";
import { ModalState } from "./context/ModalContext";

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
