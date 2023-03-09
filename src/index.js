import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { GameState } from "./context/GameContex";
import { ModalState } from "./context/ModalContext";
import { GameMainContext } from "./context/MainContext";

ReactDOM.render(
  // <React.StrictMode>
  <GameMainContext>
    <ModalState>
      <GameState>
        <RouterProvider router={router} />
      </GameState>
    </ModalState>
  </GameMainContext>,
  // </React.StrictMode>,
  document.getElementById("root")
);
