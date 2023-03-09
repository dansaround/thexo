import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Login from "../components/login";
import Match from "../components/match";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/match",
    element: <Match />,
  },
]);
