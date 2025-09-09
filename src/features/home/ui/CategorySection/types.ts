import type { Product } from "@shared/lib/catalog";

export type CategorySectionProps = {
  title: string;
  categoryId: string;
  items: Product[];
  onSeeMore: (categoryId: string) => void;
  onPressItem: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
};
