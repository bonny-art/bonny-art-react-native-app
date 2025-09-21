import { CATALOG_ENDPOINTS } from "@/shared/api/endpoints";

import { catalogHttpClient } from "@/shared/api/httpClient";
import { normalizeProduct } from "@/shared/api/normalizers";

import type { PageParams, PageResult } from "@/shared/api/types";

import type { Product } from "../model/types";

import { TOTAL_PRODUCTS } from "../model/constants";

type CategoryPageParams = PageParams & { search?: string };

/**
 * Loads a paginated list of products for a given category with optional filters.
 */
export async function fetchProductsByCategoryPage(
  categoryId: string,
  {
    page = 1,
    limit = 10,
    sortBy,
    order = "asc",
    search,
    signal,
  }: CategoryPageParams = {}
): Promise<PageResult<Product>> {
  const params: Record<string, any> = { categoryId, page, limit };
  if (sortBy) {
    params.sortBy = sortBy;
    params.order = order;
  }
  if (search) {
    params.title = search;
  }

  try {
    const res = await catalogHttpClient.get(CATALOG_ENDPOINTS.products, {
      params,
      signal,
    });

    const items = (res.data as any[]).map(normalizeProduct);

    return { items, page, limit };
  } catch (err: any) {
    if (err?.response?.status === 404) {
      return { items: [], page, limit };
    }
    throw err;
  }
}

/**
 * Retrieves a single product by its identifier.
 */
export async function fetchProductById(id: string): Promise<Product> {
  const res = await catalogHttpClient.get(
    `${CATALOG_ENDPOINTS.products}/${id}`
  );
  return normalizeProduct(res.data);
}

/**
 * Toggles the favorite state of a product and returns the updated model.
 */
export async function toggleProductFavorite(
  product: Product
): Promise<Product> {
  const payload = { favorite: !product.favorite };
  const res = await catalogHttpClient.put<Product>(
    `${CATALOG_ENDPOINTS.products}/${product.id}`,
    {
      ...product,
      ...payload,
    }
  );
  return normalizeProduct(res.data);
}

/**
 * Fetches all products marked as favorites.
 */
export async function fetchFavoriteProducts(): Promise<Product[]> {
  const res = await catalogHttpClient.get(CATALOG_ENDPOINTS.products, {
    params: { favorite: true },
  });
  return (res.data as any[]).map(normalizeProduct);
}

type Envelope<T> = { data?: T[] };

/**
 * Loads a paginated slice of favorite products, returning pagination metadata.
 */
export async function fetchFavoriteProductsPage({
  page = 1,
  limit = 12,
  sortBy,
  order = "asc",
  signal,
}: PageParams = {}): Promise<PageResult<Product>> {
  const params: Record<string, any> = { favorite: true, page, limit };
  if (sortBy) {
    params.sortBy = sortBy;
    params.order = order;
  }

  const res = await catalogHttpClient.get<Product[] | Envelope<Product>>(
    CATALOG_ENDPOINTS.products,
    {
      params,
      signal,
    }
  );

  const rawList = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
  const items = rawList.map(normalizeProduct);

  const hasMore = items.length === limit;
  const nextPage = hasMore ? page + 1 : null;

  return { items, page, limit, hasMore, nextPage };
}

/**
 * Retrieves a set of random products using the known total count as the range.
 */
export async function fetchRandomProductsKnownTotal(
  count = 5,
  total: number = TOTAL_PRODUCTS
): Promise<Product[]> {
  const wanted = Math.min(count, Math.max(0, total));
  if (wanted === 0) return [];

  const base = { limit: 1, sortBy: "id", order: "asc" as const };

  const getOne = async (page: number): Promise<Product | null> => {
    try {
      const res = await catalogHttpClient.get<Product[] | Envelope<Product>>(
        CATALOG_ENDPOINTS.products,
        {
          params: { ...base, page },
        }
      );
      const raw = Array.isArray(res.data) ? res.data[0] : res.data?.data?.[0];
      return raw ? normalizeProduct(raw) : null;
    } catch {
      return null;
    }
  };

  const pages = new Set<number>();
  while (pages.size < wanted) pages.add(Math.floor(Math.random() * total) + 1);

  const results = await Promise.all([...pages].map(getOne));
  const items: Product[] = results.filter((x): x is Product => Boolean(x));

  while (items.length < wanted) {
    const p = Math.floor(Math.random() * total) + 1;
    if (!pages.has(p)) {
      pages.add(p);
      const one = await getOne(p);
      if (one) items.push(one);
    }
  }

  return items;
}
