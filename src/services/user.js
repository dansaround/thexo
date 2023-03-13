import axios from "axios";
import { SERVER_API_URL } from "../constants";

export const getUserData = async (uid) => {
  try {
    const response = await axios.get(`${SERVER_API_URL}/user/${uid}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const updateUserData = (uid, payload) => {
  try {
    return axios.put(`${SERVER_API_URL}/user/${uid}`, payload);
  } catch (err) {
    console.log(err);
    return null;
  }
};
