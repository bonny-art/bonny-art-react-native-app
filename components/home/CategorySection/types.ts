import type { Product } from "@/utils/catalog";

export type CategorySectionProps = {
  title: string;
  categoryId: string;
  items: Product[];
  onSeeMore: (categoryId: string) => void;
  onPressItem: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
};
