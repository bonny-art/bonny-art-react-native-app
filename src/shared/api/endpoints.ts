export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "";

export const RESOURCES = {
  categories: "Category",
  products: "Product",
} as const;

export const ENDPOINTS = {
  categories: `/${RESOURCES.categories}`,
  products: `/${RESOURCES.products}`,
} as const;
