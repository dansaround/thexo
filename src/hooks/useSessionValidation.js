/* eslint-disable react-hooks/exhaustive-deps */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export const useSessionValidation = ({ userIsLogged, userIsNotLogged }) => {
  const auth = getAuth();
  const { handleSetUserData } = useContext(UserContext);

  const handleUserIsLogged = () => {
    userIsLogged && userIsLogged();
  };

  const handleUserIsNotLogged = () => {
    userIsNotLogged && userIsNotLogged();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && handleSetUserData(user.uid, user.email);
      user && handleUserIsLogged();
      !user && handleUserIsNotLogged();
    });
  }, []);
};
