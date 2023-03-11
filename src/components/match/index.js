import "animate.css";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./match.css";

import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";
import ProfilePic from "../../assets/profile_pic.png";
import { MainContext } from "../../context/MainContext";
import { useSessionValidation } from "../../hooks/useSessionValidation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { v4 as uuidv4 } from "uuid";

function Match() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  useSessionValidation({ userIsNotLogged: () => navigate("/login") });
  const { putPlayerInQueue, handleReset } = useContext(MainContext);

  const [isSearchingMatch, setIsSearchingMatch] = useState(false);
  const [token, setToken] = useState("abc123");

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

  const handleLogout = () => {
    logout();
  };

  const handleChangeAvatar = () => {
    setToken(uuidv4());
  };

  return (
    <div className="match">
      <div className="matchmaking__icons animate__animated animate__fadeInUp animate__fast">
        <Xicon />
        <Oicon />
      </div>
      <div className="match__container animate__animated animate__fadeInUp animate__fast ">
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
                <div className="matchmaking__user__info animate__animated animate__fadeIn animate__delay-500ms">
                  <img
                    onClick={handleChangeAvatar}
                    src={`https://avatars.dicebear.com/api/avataaars/${token}.svg`}
                  />
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
          <p
            onClick={handleLogout}
            className="logout__text animate__animated animate__fadeIn animate__delay-1s"
          >
            Log out
          </p>
        </div>
      </div>

      {!isSearchingMatch ? (
        <div
          className="btn__area btn__area animate__animated animate__fadeInUp animate__delay-1s animate__faster"
          onClick={handlePutPlayerInQueue}
        >
          <button className="btn btn-yellow btn-join">Find match</button>
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
