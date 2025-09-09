import type { Product } from "@shared/lib/catalog";
import { useMemo } from "react";

export function useCategoryProducts(products: Product[], categoryId: string) {
  return useMemo(
    () => products.filter((p) => p.categoryId === categoryId),
    [products, categoryId]
  );
}
