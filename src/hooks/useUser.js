import { getUserData, updateUserData } from "../services/user";

export const useUser = () => {
  const getUser = async (uid) => {
    return await getUserData(uid);
  };

  const updateUser = async (uid, payload) => {
    return await updateUserData(uid, payload);
  };

  return { getUser, updateUser };
};
