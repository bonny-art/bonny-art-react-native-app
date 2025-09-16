import { CATALOG_ENDPOINTS } from "@/shared/api/endpoints";

import { catalogHttpClient } from "@/shared/api/httpClient";

import type { Category } from "../model/types";

/**
 * GET /Category
 * Повертає список категорій із MockAPI.
 */
export async function fetchCategories(): Promise<Category[]> {
  const res = await catalogHttpClient.get<Category[]>(
    CATALOG_ENDPOINTS.categories
  );
  return res.data;
}

/** GET /Category/:id — одна категорія (для заголовка екрана) */
export async function fetchCategoryById(id: string): Promise<Category> {
  const res = await catalogHttpClient.get<Category>(
    `${CATALOG_ENDPOINTS.categories}/${id}`
  );
  return res.data;
}
