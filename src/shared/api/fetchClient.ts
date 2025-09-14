import { API_URL } from "./endpoints";

const DEFAULT_TIMEOUT = 15000;

type RequestOptions = {
  params?: Record<string, any>;
  signal?: AbortSignal;
  timeout?: number;
  headers?: Record<string, string>;
  body?: any;
};

const buildUrl = (path: string, params?: Record<string, any>): string => {
  const url = new URL(path, API_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
};

async function request<T>(
  path: string,
  {
    method = "GET",
    params,
    signal,
    timeout = DEFAULT_TIMEOUT,
    body,
    headers,
  }: RequestOptions & { method?: string } = {}
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  const url = buildUrl(path, params);

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    // Some endpoints may return empty body
    const text = await res.text();
    return text ? (JSON.parse(text) as T) : (undefined as T);
  } catch (err) {
    return Promise.reject(err);
  } finally {
    clearTimeout(timer);
  }
}

export const fetchClient = {
  get<T>(path: string, options?: Omit<RequestOptions, "body" | "headers">) {
    return request<T>(path, { ...options, method: "GET" });
  },
  post<T>(path: string, body?: any, options?: Omit<RequestOptions, "body">) {
    return request<T>(path, { ...options, method: "POST", body });
  },
  put<T>(path: string, body?: any, options?: Omit<RequestOptions, "body">) {
    return request<T>(path, { ...options, method: "PUT", body });
  },
};
