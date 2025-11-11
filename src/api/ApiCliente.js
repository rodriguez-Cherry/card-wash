import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

axiosClient.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "token-value"
  )}`;
  return config;
});
