import axios, { AxiosInstance } from "axios";
import { CATALOG_API_URL, USERS_API_URL } from "./endpoints";

const createClient = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 15000,
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
  );

  return instance;
};

export const catalogHttpClient = createClient(CATALOG_API_URL);
export const usersHttpClient = createClient(USERS_API_URL);
