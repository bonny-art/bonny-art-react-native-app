import axios, { AxiosInstance } from "axios";
import { CATALOG_API_URL, USERS_API_URL } from "./endpoints";

/**
 * Configures a pre-wired axios instance for a given API base URL.
 */
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

/**
 * HTTP client used for catalog related requests.
 */
export const catalogHttpClient = createClient(CATALOG_API_URL);
/**
 * HTTP client used for user related requests.
 */
export const usersHttpClient = createClient(USERS_API_URL);
