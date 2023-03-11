import axios from "axios";
import { SERVER_API_URL } from "../constants";

export const fetchUserCreation = async (payload) => {
  try {
    const res = await axios.post(`${SERVER_API_URL}/create-user`, payload);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
