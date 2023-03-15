import { createBrowserRouter, useNavigate } from "react-router-dom";

import App from "../App";
import Login from "../components/login";
import Match from "../components/match";
import SelectUser from "../components/SelectUser";
import { GameMainContext } from "../context/MainContext";

const ContextWrapper = ({ children, redirect = "" }) => {
  const navigate = useNavigate();
  redirect && navigate(redirect);

  return <GameMainContext>{!redirect && children}</GameMainContext>;
};

export const router = createBrowserRouter([
  {
    path: "/play",
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
  {
    path: "/create-user",
    element: (
      <ContextWrapper>
        <SelectUser />
      </ContextWrapper>
    ),
  },
  {
    path: "/",
    element: (
      <ContextWrapper redirect="/match">
        <></>
      </ContextWrapper>
    ),
  },
]);
