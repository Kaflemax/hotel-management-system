import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (username, password) => {
  const res = await axios.post(`${API}/api/token/`, {
    username,
    password,
  });

  return res.data;
};