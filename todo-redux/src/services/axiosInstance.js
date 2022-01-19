import axios from "axios";
import queryString from "query-string";

export const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    "Content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
