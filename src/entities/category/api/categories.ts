import { ENDPOINTS } from "@/shared/api/endpoints";

import { fetchClient } from "@/shared/api/fetchClient";

import type { Category } from "../model/types";

/**
 * GET /Category
 * Повертає список категорій із MockAPI.
 */
export async function fetchCategories(): Promise<Category[]> {
  return fetchClient.get<Category[]>(ENDPOINTS.categories);
}

/** GET /Category/:id — одна категорія (для заголовка екрана) */
export async function fetchCategoryById(id: string): Promise<Category> {
  return fetchClient.get<Category>(`${ENDPOINTS.categories}/${id}`);
}
