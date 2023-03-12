import { createContext, useState } from "react";

const UserContext = createContext();

const UserState = (props) => {
  const [userUid, setUserUid] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleSetUserData = (uid, email) => {
    setUserUid(uid);
    setUserEmail(email);
  };

  return (
    <UserContext.Provider
      value={{
        userUid,
        userEmail,
        handleSetUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserState };
