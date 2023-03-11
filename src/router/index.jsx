import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Login from "../components/login";
import Match from "../components/match";
import { GameMainContext } from "../context/MainContext";

const ContextWrapper = ({ children }) => {
  return <GameMainContext>{children}</GameMainContext>;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ContextWrapper>
        <App />
      </ContextWrapper>
    ),
  },
  {
    path: "/login",
    element: (
      <ContextWrapper>
        <Login />
      </ContextWrapper>
    ),
  },
  {
    path: "/match",
    element: (
      <ContextWrapper>
        <Match />
      </ContextWrapper>
    ),
  },
]);
