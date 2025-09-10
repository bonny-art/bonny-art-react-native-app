import type { Product } from "@/entities/product/model/types";

/** MockAPI часто віддає числа рядками — перетворюємо безпечно */
export const toNumOrNull = (v: unknown): number | null => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};

export const normalizeProduct = (p: any): Product => ({
  id: String(p.id),
  title: String(p.title ?? ""),
  price: Number(p.price ?? 0),
  imageUrl: String(p.imageUrl ?? ""),
  favorite: Boolean(p.favorite),
  categoryId: String(p.categoryId ?? ""),
  width: toNumOrNull(p.width),
  height: toNumOrNull(p.height),
  colors: toNumOrNull(p.colors),
  solids: toNumOrNull(p.solids),
  blends: toNumOrNull(p.blends),
});
