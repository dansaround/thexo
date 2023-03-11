import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserCreation } from "../services/signup";

export const useAuth = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const additionalInfo = getAdditionalUserInfo(result);

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

  return { handleGoogleSignup, isLoading };
};
