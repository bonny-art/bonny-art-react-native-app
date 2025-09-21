import { CATALOG_ENDPOINTS } from "@/shared/api/endpoints";

import { catalogHttpClient } from "@/shared/api/httpClient";

import type { Category } from "../model/types";

/**
 * Fetches the list of available categories from the catalog service.
 */
export async function fetchCategories(): Promise<Category[]> {
  const res = await catalogHttpClient.get<Category[]>(
    CATALOG_ENDPOINTS.categories
  );
  return res.data;
}

/**
 * Fetches the list of available categories from the catalog service.
 */
export async function fetchCategoryById(id: string): Promise<Category> {
  const res = await catalogHttpClient.get<Category>(
    `${CATALOG_ENDPOINTS.categories}/${id}`
  );
  return res.data;
}
