import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export const useSessionValidation = ({ userIsLogged, userIsNotLogged }) => {
  const auth = getAuth();

  const handleUserIsLogged = () => {
    userIsLogged && userIsLogged();
  };

  const handleUserIsNotLogged = () => {
    userIsNotLogged && userIsNotLogged();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && handleUserIsLogged();
      !user && handleUserIsNotLogged();
    });
  }, []);
};
