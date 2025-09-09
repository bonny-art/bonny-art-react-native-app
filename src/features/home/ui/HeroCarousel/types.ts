import type { Product } from "@shared/lib/catalog";

export type HeroCarouselProps = {
  products: Product[];
  count?: number; // кількість слайдів
  height?: number; // висота банера
};
