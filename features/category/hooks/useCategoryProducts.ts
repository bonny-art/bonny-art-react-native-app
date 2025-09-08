import { useMemo } from "react";
import type { Product } from "@/utils/catalog";

export function useCategoryProducts(products: Product[], categoryId: string) {
  return useMemo(
    () => products.filter((p) => p.categoryId === categoryId),
    [products, categoryId]
  );
}
