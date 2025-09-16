export const CATALOG_API_URL = process.env.EXPO_PUBLIC_CATALOG_API_URL ?? "";

export const USERS_API_URL = process.env.EXPO_PUBLIC_USERS_API_URL ?? "";

export const API_URLS = {
  catalog: CATALOG_API_URL,
  users: USERS_API_URL,
} as const;

export const CATALOG_RESOURCES = {
  categories: "Category",
  products: "Product",
} as const;

export const USER_RESOURCES = {
  users: "User",
} as const;

export const CATALOG_ENDPOINTS = {
  categories: `/${CATALOG_RESOURCES.categories}`,
  products: `/${CATALOG_RESOURCES.products}`,
} as const;

export const USER_ENDPOINTS = {
  users: `/${USER_RESOURCES.users}`,
} as const;
