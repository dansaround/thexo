import { createContext, useState } from "react";

const UserContext = createContext();

const UserState = (props) => {
  const [user, setUser] = useState({
    uid: "",
    elo: 0,
    email: "",
    points: 0,
    nickname: "",
  });

  const handleSetUserData = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        handleSetUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserState };
