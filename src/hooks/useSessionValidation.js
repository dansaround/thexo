/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

export const useSessionValidation = ({ userIsLogged, userIsNotLogged }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { getUser } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const { handleSetUserData } = useContext(UserContext);

  const handleUserIsLogged = () => {
    userIsLogged && userIsLogged();
  };

  const handleUserIsNotLogged = () => {
    userIsNotLogged && userIsNotLogged();
  };

  const handleGetUserData = async (uid) => {
    setIsLoading(true);
    const response = await getUser(uid);
    handleSetUserData(response);
    if (!response.nickname) {
      navigate("/create-user");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && handleGetUserData(user.uid);
      user && handleUserIsLogged();
      !user && handleUserIsNotLogged();
    });
  }, []);

  return { isLoading };
};
