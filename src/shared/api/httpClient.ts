import axios from "axios";
import { API_URL } from "./endpoints";

export const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// Приклад інтерсептора відповіді (опціонально)
httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    // Єдине місце для обробки помилок
    return Promise.reject(err);
  }
);
