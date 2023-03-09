import React from "react";
import "./match.css";

function Match() {
  const data = [
    {
      usuario: "Google Name",
      nivelActual: 5,
      experienciaActual: 4000,
      experienciaSiguienteNivel: 5000,
    },
  ];

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
                  <h2>Username: {usuario}</h2>
                  <p>Nivel Actual {nivelActual}</p>
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
                  <div className="btn__area">
                    <button className="btn btn-yellow">Join a Room</button>
                  </div>
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
