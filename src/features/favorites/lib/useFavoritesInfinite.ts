import { useEffect, useRef, useState } from "react";
import type { Product } from "@/entities/product/model";
import { fetchFavoriteProductsPage } from "@/entities/product/api";

type Options = {
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  silentErrors?: boolean;
};

export function useFavoritesInfinite(opts: Options = {}) {
  const {
    limit = 12,
    sortBy = "id",
    order = "asc",
    silentErrors = true,
  } = opts;

  const [items, setItems] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const loadPage = async (pageToLoad: number, mode: "replace" | "append") => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const res = await fetchFavoriteProductsPage({
        page: pageToLoad,
        limit,
        sortBy,
        order,
        signal: ac.signal,
      });

      const nextHasMore = (res.items?.length ?? 0) === limit;

      setItems((prev) => {
        if (mode === "replace") return res.items;
        const map = new Map<string, Product>();
        [...prev, ...res.items].forEach((p) => map.set(p.id, p));
        return Array.from(map.values());
      });

      setPage(nextHasMore ? pageToLoad + 1 : pageToLoad);
      setHasMore(nextHasMore);
      setError(null);
    } catch (e: any) {
      if (!silentErrors) setError(e?.message ?? "Failed to load");
      console.warn(
        "useFavoritesInfinite page load failed:",
        e?.response?.status ?? e
      );
    } finally {
      if (mode === "replace") setLoading(false);
      if (mode === "append") setLoadingMore(false);
      if (refreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    setError(null);
    loadPage(1, "replace");
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, sortBy, order]);

  const loadMore = () => {
    if (!hasMore || loading || loadingMore) return;
    setLoadingMore(true);
    loadPage(page, "append");
  };

  const refresh = () => {
    setRefreshing(true);
    setHasMore(true);
    loadPage(1, "replace");
  };

  return {
    items,
    setItems,
    loading,
    loadingMore,
    refreshing,
    hasMore,
    error,
    loadMore,
    refresh,
  };
}
