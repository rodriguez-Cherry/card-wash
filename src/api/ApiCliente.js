import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

axiosClient.interceptors.request.use(function (config) {
  return {
    ...config,
    headers: {
      ...config.headers,
      token: localStorage.getItem('token-value')
    },
  };
});
