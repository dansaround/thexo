/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { TURN_TIME } from "../../constants";
import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";

import "./counter.css";

export const Counter = ({ timeUp, stopped, turn, myTurn }) => {
  const [count, setCount] = useState(TURN_TIME);

  useEffect(() => {
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
    if (stopped) {
      clearInterval(timer);
      return;
    }

    count === 0 && turn === myTurn && timeUp();
    return () => clearInterval(timer);
  }, [count, stopped]);

  return (
    <div className="counter-container">
      <div
        className="main-content"
        style={{
          backgroundColor: `${
            turn === "x" ? "var(--color-blue)" : "var(--color-yellow)"
          }`,
        }}
      >
        {turn === "x" && <Xicon color="dark" size="sm" />}
        {turn === "o" && <Oicon color="dark" size="sm" />}
        <h2 className="count-number">{count}</h2>
      </div>
    </div>
  );
};
