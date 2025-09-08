import type { Product } from "@/utils/catalog";

export type HeroCarouselProps = {
  products: Product[];
  count?: number; // кількість слайдів
  height?: number; // висота банера
};
