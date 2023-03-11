/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./match.css";
import Xicon from "../icons/Xicon";
import Oicon from "../icons/Oicon";
import { MainContext } from "../../context/MainContext";
import { useSessionValidation } from "../../hooks/useSessionValidation";
import { useNavigate } from "react-router-dom";

function Match() {
  const navigate = useNavigate();
  useSessionValidation({ userIsNotLogged: () => navigate("/login") });
  const { putPlayerInQueue, handleReset } = useContext(MainContext);

  const [isSearchingMatch, setIsSearchingMatch] = useState(false);

  const data = [
    {
      usuario: "Google Name",
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
      <div className="match__container">
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
                <div className="matchmaking__user__info">
                  <div className="matchmaking__icons">
                    <Xicon />
                    <Oicon />
                  </div>
                  <h2>Username: {usuario}</h2>
                  <p className="level__current">Nivel Actual {nivelActual}</p>
                  <div className="level__bar">
                    <div
                      className="level__bar__completed"
                      style={{
                        width: `${porcentaje}%`,
                      }}
                    ></div>
                    <p className="level__xp">
                      {experienciaActual} / {experienciaSiguienteNivel}
                    </p>
                  </div>
                  {!isSearchingMatch ? (
                    <div className="btn__area" onClick={handlePutPlayerInQueue}>
                      <button className="btn btn-yellow">Find match</button>
                    </div>
                  ) : (
                    <h2
                      style={{
                        marginTop: 20,
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Match;
