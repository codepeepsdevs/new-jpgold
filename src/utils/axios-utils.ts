import axios from "axios";
import Cookies from "js-cookie";

const api = process.env.NEXT_PUBLIC_BACKEND_API;
<<<<<<< HEAD
// const apiKey = process.env.NEXT_PUBLIC_BACKEND_API_KEY;
=======
>>>>>>> main

export const client = axios.create({
  baseURL: `${api}`,
});

export const request = ({ ...options }) => {
  const token = Cookies.get("accessToken");
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  client.defaults.withCredentials = true;
  return client(options);
};

export const removeHeaderToken = (): void => {
  delete client.defaults.headers.common["Authorization"];
};
