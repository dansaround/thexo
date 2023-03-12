import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { fetchUserCreation } from "../services/signup";

export const useAuth = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { handleSetUserData } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const additionalInfo = getAdditionalUserInfo(result);

      handleSetUserData(user.uid, user.email);

      if (additionalInfo?.isNewUser) {
        const response = await fetchUserCreation({
          nickname: "",
          uid: user.uid,
          email: user.email,
        });

        if (response) {
          setIsLoading(false);
          navigate("/match");
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const logout = () => {
    auth.signOut();
    navigate("/login");
  };

  return { handleGoogleSignup, isLoading, logout };
};
