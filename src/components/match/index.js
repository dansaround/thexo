import "animate.css";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./match.css";

import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";
import ProfilePic from "../../assets/profile_pic.png";
import { MainContext } from "../../context/MainContext";

function Match() {
  const [isSearchingMatch, setIsSearchingMatch] = useState(false);
  const { putPlayerInQueue, handleReset } = useContext(MainContext);

  const data = [
    {
      usuario: "UserName",
      nivelActual: 5,
      experienciaActual: 4000,
      experienciaSiguienteNivel: 5000,
    },
  ];

  useEffect(() => {
    handleReset();
  }, []);

  const handlePutPlayerInQueue = () => {
    setIsSearchingMatch(true);
    putPlayerInQueue();
  };

  return (
    <div className="match">
      <div className="matchmaking__icons animate__animated animate__fadeInUp">
        <Xicon />
        <Oicon />
      </div>
      <div className="match__container animate__animated animate__fadeInUp ">
        <div>
          {data.map(
            ({
              usuario,
              nivelActual,
              experienciaActual,
              experienciaSiguienteNivel,
            }) => {
              const porcentaje =
                (experienciaActual / experienciaSiguienteNivel) * 100;

              return (
                <div className="matchmaking__user__info animate__animated animate__fadeInUp animate__delay-1s">
                  <img src={ProfilePic} />
                  <h2>{usuario}</h2>

                  <div className="level__bar ">
                    <p className="level__current"> {nivelActual}</p>
                    <div
                      className="level__bar__completed"
                      style={{
                        width: `${porcentaje}%`,
                      }}
                    ></div>
                    <p className="level__xp ">
                      {experienciaActual} / {experienciaSiguienteNivel}
                    </p>
                  </div>
                </div>
              );
            }
          )}
          <p className="animate__animated animate__fadeInUp animate__delay-1s">
            Join a Room to Play
          </p>
        </div>
      </div>

      {!isSearchingMatch ? (
        <div
          className="btn__area btn__area animate__animated animate__fadeInUp animate__delay-2s animate__faster"
          onClick={handlePutPlayerInQueue}
        >
          <button className="btn-join btn btn-yellow ">Find match</button>
        </div>
      ) : (
        <h2
          style={{
            marginTop: 40,
            width: "100%",
            textAlign: "center",
          }}
        >
          {" "}
          Buscando rival{" "}
        </h2>
      )}
    </div>
  );
}

export default Match;
