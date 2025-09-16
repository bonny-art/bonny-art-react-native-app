import axios from "axios";
import { API_URL } from "./endpoints";

export const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);
